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
export type TokenUpdateFunction = (str: string, metadata: object) => string

/**
 * A token wraps a string representation of a token
 * as it is passed through the text processing pipeline.
 */
export class Token {
  str: string
  metadata: {[key: string]: unknown}

  /**
   * @param {string} [str=''] - The string token being wrapped.
   * @param {Object<string, unknown>} [metadata={}] - Metadata associated with this token.
   */
  constructor (str?: string, metadata?: {[key: string]: unknown}) {
    this.str = str || ""
    this.metadata = metadata || {}
  }

  /**
   * Returns the token string that is being wrapped by this object.
   *
   * @returns {string}
   */
  toString (): string {
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
  update (fn: TokenUpdateFunction): this {
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
  clone (fn?: TokenUpdateFunction): Token {
    fn = fn || function (s) { return s }
    return new Token (fn(this.str, this.metadata), this.metadata)
  }
}
