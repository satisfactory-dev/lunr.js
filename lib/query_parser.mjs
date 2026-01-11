/*!
 * QueryParser
 * Copyright (C) 2020 Oliver Nightingale
 * Copyright (C) @YEAR SignpostMarv
 */

import {
  // eslint-disable-next-line no-unused-vars
  Query,
  QueryClause,
  QueryPresence
} from './query.mjs'

import {
  // eslint-disable-next-line no-unused-vars
  QueryLexeme,
  QueryLexer
} from './query_lexer.mjs'

import {
  QueryParseError
} from './query_parse_error.mjs'

export class QueryParser {
  /**
   * @type {QueryLexer}
   */
  lexer

  /**
   * @type {Query}
   */
  query

  /**
   * @type {QueryClause}
   */
  currentClause

  /**
   * @type {number}
   */
  lexemeIdx

  /**
   * @type {QueryLexeme[]|undefined}
   */
  lexemes

  /**
   * @param {string} str
   * @param {Query} query
   */
  constructor (str, query) {
    this.lexer = new QueryLexer (str)
    this.query = query
    this.currentClause = {}
    this.lexemeIdx = 0
  }

  /**
   * @return {Query}
   */
  parse () {
    this.lexer.run()
    this.lexemes = this.lexer.lexemes

    var state = QueryParser.parseClause

    while (state) {
      state = state(this)
    }

    return this.query
  }

  peekLexeme () {
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

  static parseClause (parser) {
    var lexeme = parser.peekLexeme()

    if (lexeme == undefined) {
      return
    }

    switch (lexeme.type) {
      case QueryLexer.PRESENCE:
        return QueryParser.parsePresence
      case QueryLexer.FIELD:
        return QueryParser.parseField
      case QueryLexer.TERM:
        return QueryParser.parseTerm
      default:
        var errorMessage = "expected either a field or a term, found " + lexeme.type

        if (lexeme.str.length >= 1) {
          errorMessage += " with value '" + lexeme.str + "'"
        }

        throw new QueryParseError (errorMessage, lexeme.start, lexeme.end)
    }
  }

  static parsePresence (parser) {
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
        return QueryParser.parseField
      case QueryLexer.TERM:
        return QueryParser.parseTerm
      default:
        var errorMessage = "expecting term or field, found '" + nextLexeme.type + "'"
        throw new QueryParseError (errorMessage, nextLexeme.start, nextLexeme.end)
    }
  }

  static parseField (parser) {
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
        return QueryParser.parseTerm
      default:
        var errorMessage = "expecting term, found '" + nextLexeme.type + "'"
        throw new QueryParseError (errorMessage, nextLexeme.start, nextLexeme.end)
    }
  }

  static parseTerm (parser) {
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
        return QueryParser.parseTerm
      case QueryLexer.FIELD:
        parser.nextClause()
        return QueryParser.parseField
      case QueryLexer.EDIT_DISTANCE:
        return QueryParser.parseEditDistance
      case QueryLexer.BOOST:
        return QueryParser.parseBoost
      case QueryLexer.PRESENCE:
        parser.nextClause()
        return QueryParser.parsePresence
      default:
        var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'"
        throw new QueryParseError (errorMessage, nextLexeme.start, nextLexeme.end)
    }
  }

  static parseEditDistance (parser) {
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
        return QueryParser.parseTerm
      case QueryLexer.FIELD:
        parser.nextClause()
        return QueryParser.parseField
      case QueryLexer.EDIT_DISTANCE:
        return QueryParser.parseEditDistance
      case QueryLexer.BOOST:
        return QueryParser.parseBoost
      case QueryLexer.PRESENCE:
        parser.nextClause()
        return QueryParser.parsePresence
      default:
        var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'"
        throw new QueryParseError (errorMessage, nextLexeme.start, nextLexeme.end)
    }
  }

  static parseBoost (parser) {
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
        return QueryParser.parseTerm
      case QueryLexer.FIELD:
        parser.nextClause()
        return QueryParser.parseField
      case QueryLexer.EDIT_DISTANCE:
        return QueryParser.parseEditDistance
      case QueryLexer.BOOST:
        return QueryParser.parseBoost
      case QueryLexer.PRESENCE:
        parser.nextClause()
        return QueryParser.parsePresence
      default:
        var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'"
        throw new QueryParseError (errorMessage, nextLexeme.start, nextLexeme.end)
    }
  }
}
