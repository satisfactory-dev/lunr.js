/*!
 * QueryParser
 * Copyright (C) 2020 Oliver Nightingale
 * Copyright (C) @YEAR SignpostMarv
 */

import type {
  Query,
} from './query.ts'
import {
  QueryClause,
  QueryPresence,
} from './query.ts'

import type {
  QueryLexeme,
} from './query_lexer.ts'
import {
  QueryLexer,
} from './query_lexer.ts'

import {
  QueryParseError,
} from './query_parse_error.ts'

type QueryParserState = (this: void, parser: QueryParser) => QueryParserState | undefined

export class QueryParser {
  /**
   * @type {QueryLexer}
   */
  lexer: QueryLexer

  /**
   * @type {Query}
   */
  query: Query

  currentClause: Partial<QueryClause>

  /**
   * @type {number}
   */
  lexemeIdx: number

  lexemes: QueryLexeme[] | undefined

  /**
   * @param {string} str
   * @param {Query} query
   */
  constructor (str: string, query: Query) {
    this.lexer = new QueryLexer (str)
    this.query = query
    this.currentClause = {}
    this.lexemeIdx = 0
  }

  /**
   * @return {Query}
   */
  parse (): Query {
    this.lexer.run()
    this.lexemes = this.lexer.lexemes

    /** @type {QueryParserState|undefined} */
    var state: QueryParserState | undefined = QueryParser.#parseClause

    while (state) {
      state = state(this)
    }

    return this.query
  }

  peekLexeme () {
    if (undefined === this.lexemes) {
      return undefined
    }

    return this.lexemes[this.lexemeIdx]
  }

  consumeLexeme () {
    var lexeme = this.peekLexeme()
    this.lexemeIdx += 1
    return lexeme
  }

  nextClause () {
    var completedClause = this.currentClause
    this.query.clause(completedClause)
    this.currentClause = new QueryClause
  }

  /**
   * @param {QueryParser} parser
   * @return {QueryParserState|undefined}
   */
  static #parseClause (this: void, parser: QueryParser): QueryParserState | undefined {
    var lexeme = parser.peekLexeme()

    if (lexeme == undefined) {
      return
    }

    switch (lexeme.type) {
      case QueryLexer.PRESENCE:
        return QueryParser.#parsePresence
      case QueryLexer.FIELD:
        return QueryParser.#parseField
      case QueryLexer.TERM:
        return QueryParser.#parseTerm
      default:
        var errorMessage = "expected either a field or a term, found " + lexeme.type

        if (lexeme.str.length >= 1) {
          errorMessage += " with value '" + lexeme.str + "'"
        }

        throw new QueryParseError (errorMessage, lexeme.start, lexeme.end)
    }
  }

  /**
   * @param {QueryParser} parser
   * @return {QueryParserState|undefined}
   */
  static #parsePresence (this: void, parser: QueryParser): QueryParserState | undefined {
    var lexeme = parser.consumeLexeme()

    if (lexeme == undefined) {
      return
    }

    switch (lexeme.str) {
      case "-":
        parser.currentClause.presence = QueryPresence.PROHIBITED
        break
      case "+":
        parser.currentClause.presence = QueryPresence.REQUIRED
        break
      default:
        var errorMessage = "unrecognised presence operator'" + lexeme.str + "'"
        throw new QueryParseError (errorMessage, lexeme.start, lexeme.end)
    }

    var nextLexeme = parser.peekLexeme()

    if (nextLexeme == undefined) {
      var errorMessage = "expecting term or field, found nothing"
      throw new QueryParseError (errorMessage, lexeme.start, lexeme.end)
    }

    switch (nextLexeme.type) {
      case QueryLexer.FIELD:
        return QueryParser.#parseField
      case QueryLexer.TERM:
        return QueryParser.#parseTerm
      default:
        var errorMessage = "expecting term or field, found '" + nextLexeme.type + "'"
        throw new QueryParseError (errorMessage, nextLexeme.start, nextLexeme.end)
    }
  }

  /**
   * @param {QueryParser} parser
   * @return {QueryParserState|undefined}
   */
  static #parseField (this: void, parser: QueryParser): QueryParserState | undefined {
    var lexeme = parser.consumeLexeme()

    if (lexeme == undefined) {
      return
    }

    if (parser.query.allFields.indexOf(lexeme.str) == -1) {
      var possibleFields = parser.query.allFields.map(function (f) { return "'" + f + "'" }).join(', '),
          errorMessage = "unrecognised field '" + lexeme.str + "', possible fields: " + possibleFields

      throw new QueryParseError (errorMessage, lexeme.start, lexeme.end)
    }

    parser.currentClause.fields = [lexeme.str]

    var nextLexeme = parser.peekLexeme()

    if (nextLexeme == undefined) {
      var errorMessage = "expecting term, found nothing"
      throw new QueryParseError (errorMessage, lexeme.start, lexeme.end)
    }

    switch (nextLexeme.type) {
      case QueryLexer.TERM:
        return QueryParser.#parseTerm
      default:
        var errorMessage = "expecting term, found '" + nextLexeme.type + "'"
        throw new QueryParseError (errorMessage, nextLexeme.start, nextLexeme.end)
    }
  }

  /**
   * @param {QueryParser} parser
   * @return {QueryParserState|undefined}
   */
  static #parseTerm (this: void, parser: QueryParser): QueryParserState | undefined {
    var lexeme = parser.consumeLexeme()

    if (lexeme == undefined) {
      return
    }

    parser.currentClause.term = lexeme.str.toLowerCase()

    if (lexeme.str.indexOf("*") != -1) {
      parser.currentClause.usePipeline = false
    }

    var nextLexeme = parser.peekLexeme()

    if (nextLexeme == undefined) {
      parser.nextClause()
      return
    }

    switch (nextLexeme.type) {
      case QueryLexer.TERM:
        parser.nextClause()
        return QueryParser.#parseTerm
      case QueryLexer.FIELD:
        parser.nextClause()
        return QueryParser.#parseField
      case QueryLexer.EDIT_DISTANCE:
        return QueryParser.#parseEditDistance
      case QueryLexer.BOOST:
        return QueryParser.#parseBoost
      case QueryLexer.PRESENCE:
        parser.nextClause()
        return QueryParser.#parsePresence
      default:
        var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'"
        throw new QueryParseError (errorMessage, nextLexeme.start, nextLexeme.end)
    }
  }

  /**
   * @param {QueryParser} parser
   * @return {QueryParserState|undefined}
   */
  static #parseEditDistance (this: void, parser: QueryParser): QueryParserState | undefined {
    var lexeme = parser.consumeLexeme()

    if (lexeme == undefined) {
      return
    }

    var editDistance = parseInt(lexeme.str, 10)

    if (isNaN(editDistance)) {
      var errorMessage = "edit distance must be numeric"
      throw new QueryParseError (errorMessage, lexeme.start, lexeme.end)
    }

    parser.currentClause.editDistance = editDistance

    var nextLexeme = parser.peekLexeme()

    if (nextLexeme == undefined) {
      parser.nextClause()
      return
    }

    switch (nextLexeme.type) {
      case QueryLexer.TERM:
        parser.nextClause()
        return QueryParser.#parseTerm
      case QueryLexer.FIELD:
        parser.nextClause()
        return QueryParser.#parseField
      case QueryLexer.EDIT_DISTANCE:
        return QueryParser.#parseEditDistance
      case QueryLexer.BOOST:
        return QueryParser.#parseBoost
      case QueryLexer.PRESENCE:
        parser.nextClause()
        return QueryParser.#parsePresence
      default:
        var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'"
        throw new QueryParseError (errorMessage, nextLexeme.start, nextLexeme.end)
    }
  }

  /**
   * @param {QueryParser} parser
   * @return {QueryParserState|undefined}
   */
  static #parseBoost (this: void, parser: QueryParser): QueryParserState | undefined {
    var lexeme = parser.consumeLexeme()

    if (lexeme == undefined) {
      return
    }

    var boost = parseInt(lexeme.str, 10)

    if (isNaN(boost)) {
      var errorMessage = "boost must be numeric"
      throw new QueryParseError (errorMessage, lexeme.start, lexeme.end)
    }

    parser.currentClause.boost = boost

    var nextLexeme = parser.peekLexeme()

    if (nextLexeme == undefined) {
      parser.nextClause()
      return
    }

    switch (nextLexeme.type) {
      case QueryLexer.TERM:
        parser.nextClause()
        return QueryParser.#parseTerm
      case QueryLexer.FIELD:
        parser.nextClause()
        return QueryParser.#parseField
      case QueryLexer.EDIT_DISTANCE:
        return QueryParser.#parseEditDistance
      case QueryLexer.BOOST:
        return QueryParser.#parseBoost
      case QueryLexer.PRESENCE:
        parser.nextClause()
        return QueryParser.#parsePresence
      default:
        var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'"
        throw new QueryParseError (errorMessage, nextLexeme.start, nextLexeme.end)
    }
  }
}
