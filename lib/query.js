/*!
 * lunr.Query
 * Copyright (C) 2020 Oliver Nightingale
 * Copyright (C) @YEAR SignpostMarv
 */

/**
 * A single clause in a {@link lunr.Query} contains a term and details on how to
 * match that term against a {@link lunr.Index}.
 *
 * @typedef {Object} lunr.Query~Clause
 * @property {string[]} fields - The fields in an index this clause should be matched against.
 * @property {number} [boost=1] - Any boost that should be applied when matching this clause.
 * @property {number} [editDistance] - Whether the term should have fuzzy matching applied, and how fuzzy the match should be.
 * @property {boolean} [usePipeline] - Whether the term should be passed through the search pipeline.
 * @property {number} [wildcard=lunr.Query.wildcard.NONE] - Whether the term should have wildcards appended or prepended.
 * @property {number} [presence=lunr.Query.presence.OPTIONAL] - The terms presence in any matching documents.
 */

/**
 * A lunr.Query provides a programmatic way of defining queries to be performed
 * against a {@link lunr.Index}.
 *
 * Prefer constructing a lunr.Query using the {@link lunr.Index#query} method
 * so the query object is pre-initialized with the right index fields.
 */
class Query {
  /**
   * @type {QueryWildcard|undefined}
   */
  static #wildcard = undefined

  /**
   * @type {QueryPresence|undefined}
   */
  static #presence = undefined

  /**
   * @return {QueryWildcard}
   */
  static get wildcard () {
    if (!this.#wildcard) {
      this.#wildcard = new QueryWildcard
    }

    return this.#wildcard
  }

  /**
   * @return {QueryPresence}
   */
  static get presence () {
    if (!this.#presence) {
      this.#presence = new QueryPresence
    }

    return this.#presence
  }

  /**
   * An array of query clauses.
   *
   * @type {lunr.Query~Clause[]}
   */
  clauses

  /**
   * An array of all available fields in a lunr.Index.
   *
   * @type {string[]}
   */
  allFields

  /**
   * @param {string[]} allFields
   */
  constructor (allFields) {
    this.clauses = []
    this.allFields = allFields
  }

  /**
   * Adds a {@link lunr.Query~Clause} to this query.
   *
   * Unless the clause contains the fields to be matched all fields will be matched. In addition
   * a default boost of 1 is applied to the clause.
   *
   * @param {lunr.Query~Clause} clause - The clause to add to this query.
   * @see lunr.Query~Clause
   * @return {this}
   */
  clause (clause) {
    if (!('fields' in clause)) {
      clause.fields = this.allFields
    }

    if (!('boost' in clause)) {
      clause.boost = 1
    }

    if (!('usePipeline' in clause)) {
      clause.usePipeline = true
    }

    if (!('wildcard' in clause)) {
      clause.wildcard = lunr.Query.wildcard.NONE
    }

    if ((clause.wildcard & lunr.Query.wildcard.LEADING) && (clause.term.charAt(0) != lunr.Query.wildcard)) {
      clause.term = "*" + clause.term
    }

    if ((clause.wildcard & lunr.Query.wildcard.TRAILING) && (clause.term.slice(-1) != lunr.Query.wildcard)) {
      clause.term = "" + clause.term + "*"
    }

    if (!('presence' in clause)) {
      clause.presence = lunr.Query.presence.OPTIONAL
    }

    this.clauses.push(clause)

    return this
  }

  /**
   * A negated query is one in which every clause has a presence of
   * prohibited. These queries require some special processing to return
   * the expected results.
   *
   * @return {boolean}
   */
  isNegated () {
    for (var i = 0; i < this.clauses.length; i++) {
      if (this.clauses[i].presence != lunr.Query.presence.PROHIBITED) {
        return false
      }
    }

    return true
  }

  /**
   * Adds a term to the current query, under the covers this will create a {@link lunr.Query~Clause}
   * to the list of clauses that make up this query.
   *
   * The term is used as is, i.e. no tokenization will be performed by this method. Instead conversion
   * to a token or token-like string should be done before calling this method.
   *
   * The term will be converted to a string by calling `toString`. Multiple terms can be passed as an
   * array, each term in the array will share the same options.
   *
   * @param {object|object[]} term - The term(s) to add to the query.
   * @param {object} [options] - Any additional properties to add to the query clause.
   * @return {this}
   * @see lunr.Query#clause
   * @see lunr.Query~Clause
   * @example <caption>adding a single term to a query</caption>
   * query.term("foo")
   * @example <caption>adding a single term to a query and specifying search fields, term boost and automatic trailing wildcard</caption>
   * query.term("foo", {
   *   fields: ["title"],
   *   boost: 10,
   *   wildcard: lunr.Query.wildcard.TRAILING
   * })
   * @example <caption>using lunr.tokenizer to convert a string to tokens before using them as terms</caption>
   * query.term(lunr.tokenizer("foo bar"))
   */
  term (term, options) {
    if (Array.isArray(term)) {
      term.forEach(function (t) { this.term(t, lunr.utils.clone(options)) }, this)
      return this
    }

    var clause = options || {}
    clause.term = term.toString()

    this.clause(clause)

    return this
  }
}

lunr.Query = Query

/**
 * Constants for indicating what kind of automatic wildcard insertion will be used when constructing a query clause.
 *
 * This allows wildcards to be added to the beginning and end of a term without having to manually do any string
 * concatenation.
 *
 * The wildcard constants can be bitwise combined to select both leading and trailing wildcards.
 *
 * @see lunr.Query~Clause
 * @see lunr.Query#clause
 * @see lunr.Query#term
 * @example <caption>query term with trailing wildcard</caption>
 * query.term('foo', { wildcard: lunr.Query.wildcard.TRAILING })
 * @example <caption>query term with leading and trailing wildcard</caption>
 * query.term('foo', {
 *   wildcard: lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING
 * })
 */
class QueryWildcard extends String {
  constructor () {
    super('*')
  }

  /**
   * @return {0}
   */
  get NONE () {
    return 0
  }

  /**
   * @return {1}
   */
  get LEADING () {
    return 1
  }

  /**
   * @return {2}
   */
  get TRAILING () {
    return 2
  }
}

/**
 * Constants for indicating what kind of presence a term must have in matching documents.
 *
 * @enum {number}
 * @see lunr.Query~Clause
 * @see lunr.Query#clause
 * @see lunr.Query#term
 * @example <caption>query term with required presence</caption>
 * query.term('foo', { presence: lunr.Query.presence.REQUIRED })
 */
class QueryPresence {
  /**
   * Term's presence in a document is optional, this is the default value.
   *
   * @return {1}
   */
  get OPTIONAL () {
    return 1
  }

  /**
   * Term's presence in a document is required, documents that do not contain
   * this term will not be returned.
   *
   * @return {2}
   */
  get REQUIRED () {
    return 2
  }

  /**
   * Term's presence in a document is prohibited, documents that do contain
   * this term will not be returned.
   *
   * @return {3}
   */
  get PROHIBITED () {
    return 3
  }
}
