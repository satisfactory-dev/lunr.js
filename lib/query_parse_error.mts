/*!
 * QueryParseError
 * Copyright (C) 2020 Oliver Nightingale
 * Copyright (C) @YEAR SignpostMarv
 */

export class QueryParseError extends Error {
  /**
   * @type {number}
   */
  start: number

  /**
   * @type {number}
   */
  end: number

  constructor (message: string, start: number, end: number) {
    super(message)
    this.start = start
    this.end = end
  }
}
