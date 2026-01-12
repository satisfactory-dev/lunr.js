/*!
 * QueryLexer
 * Copyright (C) 2020 Oliver Nightingale
 * Copyright (C) @YEAR SignpostMarv
 */

import {
  separator
} from './tokenizer.mjs'

/**
 * @typedef {Object} QueryLexemeType
 * @property {QueryLexer.EOS|QueryLexer.FIELD|QueryLexer.TERM|QueryLexer.EDIT_DISTANCE|QueryLexer.BOOST|QueryLexer.PRESENCE} type
 * @property {string} str
 * @property {number} start
 * @property {number} end
 */

export class QueryLexeme {
  /** @type {QueryLexer.EOS|QueryLexer.FIELD|QueryLexer.TERM|QueryLexer.EDIT_DISTANCE|QueryLexer.BOOST|QueryLexer.PRESENCE} */
  type

  /** @type {string} */
  str

  /** @type {number} */
  start

  /** @type {end} */
  end

  /**
   *
   * @param {QueryLexemeType} options
   */
  constructor ({
    type,
    str,
    start,
    end
  }) {
    this.type = type
    this.str = str
    this.start = start
    this.end = end
  }
}

export class QueryLexer {
  /** @type {RegExp|undefined} */
  static #termSeparator = undefined

  /**
   * @type {QueryLexeme[]}
   */
  lexemes

  /**
   * @param {string} str
   */
  constructor (str) {
    this.lexemes = []
    this.str = str
    this.length = str.length
    this.pos = 0
    this.start = 0
    this.escapeCharPositions = []
  }

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

  emit (type) {
    this.lexemes.push(new QueryLexeme({
      type: type,
      str: this.sliceString(),
      start: this.start,
      end: this.pos
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
  static get EOS () {
    return 'EOS'
  }

  /**
   * @return {'FIELD'}
   */
  static get FIELD () {
    return 'FIELD'
  }

  /**
   * @return {'TERM'}
   */
  static get TERM () {
    return 'TERM'
  }

  /**
   * @return {'EDIT_DISTANCE'}
   */
  static get EDIT_DISTANCE () {
    return 'EDIT_DISTANCE'
  }

  /**
   * @return {'BOOST'}
   */
  static get BOOST () {
    return 'BOOST'
  }

  /**
   * @return {'PRESENCE'}
   */
  static get PRESENCE () {
    return 'PRESENCE'
  }

  static lexField (lexer) {
    lexer.backup()
    lexer.emit(QueryLexer.FIELD)
    lexer.ignore()
    return QueryLexer.lexText
  }

  static lexTerm (lexer) {
    if (lexer.width() > 1) {
      lexer.backup()
      lexer.emit(QueryLexer.TERM)
    }

    lexer.ignore()

    if (lexer.more()) {
      return QueryLexer.lexText
    }
  }

  static lexEditDistance (lexer) {
    lexer.ignore()
    lexer.acceptDigitRun()
    lexer.emit(QueryLexer.EDIT_DISTANCE)
    return QueryLexer.lexText
  }

  static lexBoost (lexer) {
    lexer.ignore()
    lexer.acceptDigitRun()
    lexer.emit(QueryLexer.BOOST)
    return QueryLexer.lexText
  }

  static lexEOS (lexer) {
    if (lexer.width() > 0) {
      lexer.emit(QueryLexer.TERM)
    }
  }

  /**
   * @return {RegExp}
   */
  static get termSeparator () {
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
  static set termSeparator (separator) {
    this.#termSeparator = separator
  }

  static lexText (lexer) {
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

      if (char.match(QueryLexer.termSeparator)) {
        return QueryLexer.lexTerm
      }
    }
  }
}
