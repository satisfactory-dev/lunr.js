class QueryParseError extends Error {
  /**
   * @property {number}
   */
  start

  /**
   * @property {number}
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

lunr.QueryParseError = QueryParseError
