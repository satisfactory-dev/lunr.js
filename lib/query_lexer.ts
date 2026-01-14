/*!
 * QueryLexer
 * Copyright (C) 2020 Oliver Nightingale
 * Copyright (C) @YEAR SignpostMarv
 */

import {
  separator,
} from './tokenizer.ts'

export interface QueryLexemeType {
  type: (
    | typeof QueryLexer['EOS']
    | typeof QueryLexer['FIELD']
    | typeof QueryLexer['TERM']
    | typeof QueryLexer['EDIT_DISTANCE']
    | typeof QueryLexer['BOOST']
    | typeof QueryLexer['PRESENCE']
  ),
  str: string,
  start: number,
  end: number,
}

export class QueryLexeme implements QueryLexemeType {
  type: QueryLexemeType['type']

  str: QueryLexemeType['str']

  start: QueryLexemeType['start']

  end: QueryLexemeType['end']

  /**
   *
   * @param {QueryLexemeType} options
   */
  constructor ({
    type,
    str,
    start,
    end,
  }: QueryLexemeType) {
    this.type = type
    this.str = str
    this.start = start
    this.end = end
  }
}

export class QueryLexer {
  /** @type {RegExp|undefined} */
  static #termSeparator: RegExp | undefined = undefined

  /** @type {RegExp|undefined} */
  #instanceTermSeparator: RegExp | undefined = undefined

  lexemes: QueryLexeme[] = []

  str: string

  get length () {
    return this.str.length
  }

  pos: number = 0

  start: number = 0

  escapeCharPositions: number[] = []

  /**
   * @param {string} str
   */
  constructor (str: string) {
    this.str = str
  }

  /**
   * @return void
   */
  run () {
    var state = QueryLexer.lexText

    while (state) {
      state = state(this)
    }
  }

  sliceString () {
    var subSlices = [],
        sliceStart = this.start,
        sliceEnd = this.pos

    for (var i = 0; i < this.escapeCharPositions.length; i++) {
      sliceEnd = this.escapeCharPositions[i]
      subSlices.push(this.str.slice(sliceStart, sliceEnd))
      sliceStart = sliceEnd + 1
    }

    subSlices.push(this.str.slice(sliceStart, this.pos))
    this.escapeCharPositions.length = 0

    return subSlices.join('')
  }

  emit (type: QueryLexeme['type']) {
    this.lexemes.push(new QueryLexeme({
      type: type,
      str: this.sliceString(),
      start: this.start,
      end: this.pos,
    }))

    this.start = this.pos
  }

  escapeCharacter () {
    this.escapeCharPositions.push(this.pos - 1)
    this.pos += 1
  }

  next () {
    if (this.pos >= this.length) {
      return QueryLexer.EOS
    }

    var char = this.str.charAt(this.pos)
    this.pos += 1
    return char
  }

  width () {
    return this.pos - this.start
  }

  ignore () {
    if (this.start == this.pos) {
      this.pos += 1
    }

    this.start = this.pos
  }

  backup () {
    this.pos -= 1
  }

  acceptDigitRun () {
    var char, charCode

    do {
      char = this.next()
      charCode = char.charCodeAt(0)
    } while (charCode > 47 && charCode < 58)

    if (char != QueryLexer.EOS) {
      this.backup()
    }
  }

  more () {
    return this.pos < this.length
  }

  /**
   * @return {'EOS'}
   */
  static get EOS (): 'EOS' {
    return 'EOS'
  }

  /**
   * @return {'FIELD'}
   */
  static get FIELD (): 'FIELD' {
    return 'FIELD'
  }

  /**
   * @return {'TERM'}
   */
  static get TERM (): 'TERM' {
    return 'TERM'
  }

  /**
   * @return {'EDIT_DISTANCE'}
   */
  static get EDIT_DISTANCE (): 'EDIT_DISTANCE' {
    return 'EDIT_DISTANCE'
  }

  /**
   * @return {'BOOST'}
   */
  static get BOOST (): 'BOOST' {
    return 'BOOST'
  }

  /**
   * @return {'PRESENCE'}
   */
  static get PRESENCE (): 'PRESENCE' {
    return 'PRESENCE'
  }

  static lexField (this: void, lexer: QueryLexer) {
    lexer.backup()
    lexer.emit(QueryLexer.FIELD)
    lexer.ignore()
    return QueryLexer.lexText
  }

  static lexTerm (this: void, lexer: QueryLexer) {
    if (lexer.width() > 1) {
      lexer.backup()
      lexer.emit(QueryLexer.TERM)
    }

    lexer.ignore()

    if (lexer.more()) {
      return QueryLexer.lexText
    }
  }

  static lexEditDistance (this: void, lexer: QueryLexer) {
    lexer.ignore()
    lexer.acceptDigitRun()
    lexer.emit(QueryLexer.EDIT_DISTANCE)
    return QueryLexer.lexText
  }

  static lexBoost (this: void, lexer: QueryLexer) {
    lexer.ignore()
    lexer.acceptDigitRun()
    lexer.emit(QueryLexer.BOOST)
    return QueryLexer.lexText
  }

  static lexEOS (this: void, lexer: QueryLexer) {
    if (lexer.width() > 0) {
      lexer.emit(QueryLexer.TERM)
    }
  }

  /**
   * @return {RegExp}
   */
  get termSeparator (): RegExp {
    return this.#instanceTermSeparator || QueryLexer.termSeparator
  }

  /**
   * Overrides the default term separator **for this instance**, or sets it to default if undefined is specified
   *
   * @param {RegExp|undefined} separator
   */
  set termSeparator (separator: RegExp | undefined) {
    this.#instanceTermSeparator = separator
  }

  /**
   * @return {RegExp}
   */
  static get termSeparator (): RegExp {
    // This matches the separator used when tokenising fields
    // within a document. These should match otherwise it is
    // not possible to search for some tokens within a document.
    //
    // It is possible for the user to change the separator on the
    // tokenizer so it _might_ clash with any other of the special
    // characters already used within the search string, e.g. :.
    //
    // This means that it is possible to change the separator in
    // such a way that makes some words unsearchable using a search
    // string.
    if (this.#termSeparator) {
      return this.#termSeparator
    }

    return separator
  }

  /**
   * Overrides the default term separator, or sets it to default if undefined is specified
   *
   * @param {RegExp|undefined} separator
   */
  static set termSeparator (separator: RegExp | undefined) {
    this.#termSeparator = separator
  }

  static lexText (this: void, lexer: QueryLexer) {
    while (true) {
      var char = lexer.next()

      if (char == QueryLexer.EOS) {
        return QueryLexer.lexEOS
      }

      // Escape character is '\'
      if (char.charCodeAt(0) == 92) {
        lexer.escapeCharacter()
        continue
      }

      if (char == ":") {
        return QueryLexer.lexField
      }

      if (char == "~") {
        lexer.backup()
        if (lexer.width() > 0) {
          lexer.emit(QueryLexer.TERM)
        }
        return QueryLexer.lexEditDistance
      }

      if (char == "^") {
        lexer.backup()
        if (lexer.width() > 0) {
          lexer.emit(QueryLexer.TERM)
        }
        return QueryLexer.lexBoost
      }

      // "+" indicates term presence is required
      // checking for length to ensure that only
      // leading "+" are considered
      if (char == "+" && lexer.width() === 1) {
        lexer.emit(QueryLexer.PRESENCE)
        return QueryLexer.lexText
      }

      // "-" indicates term presence is prohibited
      // checking for length to ensure that only
      // leading "-" are considered
      if (char == "-" && lexer.width() === 1) {
        lexer.emit(QueryLexer.PRESENCE)
        return QueryLexer.lexText
      }

      if (char.match(lexer.termSeparator)) {
        return QueryLexer.lexTerm
      }
    }
  }
}
