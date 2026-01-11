/*!
 * QueryParseError
 * Copyright (C) 2020 Oliver Nightingale
 * Copyright (C) @YEAR SignpostMarv
 */

export class QueryParseError extends Error {
  /**
   * @type {number}
   */
  start

  /**
   * @type {number}
   */
  end

  /**
   * @param {string} message
   * @param {number} start
   * @param {number} end
   */
  constructor (message, start, end) {
    super(message)
    this.start = start
    this.end = end
  }
}
