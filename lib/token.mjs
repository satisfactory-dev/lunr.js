/*!
 * Token
 * Copyright (C) 2020 Oliver Nightingale
 * Copyright (C) @YEAR SignpostMarv
 */

/**
 * A token update function is used when updating or optionally
 * when cloning a token.
 *
 * @callback TokenUpdateFunction
 * @param {string} str - The string representation of the token.
 * @param {Object} metadata - All metadata associated with this token.
 */

/**
 * A token wraps a string representation of a token
 * as it is passed through the text processing pipeline.
 */
export class Token {
  /**
   * @param {string} [str=''] - The string token being wrapped.
   * @param {object} [metadata={}] - Metadata associated with this token.
   */
  constructor (str, metadata) {
    this.str = str || ""
    this.metadata = metadata || {}
  }

  /**
   * Returns the token string that is being wrapped by this object.
   *
   * @returns {string}
   */
  toString () {
    return this.str
  }

  /**
   * Applies the given function to the wrapped string token.
   *
   * @example
   * token.update(function (str, metadata) {
   *   return str.toUpperCase()
   * })
   *
   * @param {TokenUpdateFunction} fn - A function to apply to the token string.
     * @returns {this}
   */
  update (fn) {
    this.str = fn(this.str, this.metadata)
    return this
  }

  /**
   * Creates a clone of this token. Optionally a function can be
   * applied to the cloned token.
   *
   * @param {TokenUpdateFunction} [fn] - An optional function to apply to the cloned token.
   * @returns {Token}
   */
  clone (fn) {
    fn = fn || function (s) { return s }
    return new Token (fn(this.str, this.metadata), this.metadata)
  }
}
