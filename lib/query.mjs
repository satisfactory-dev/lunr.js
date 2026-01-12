/*!
 * Query
 * Copyright (C) 2020 Oliver Nightingale
 * Copyright (C) @YEAR SignpostMarv
 */

import {
  // eslint-disable-next-line no-unused-vars
  Index,
} from './index.mjs'

import {
  utils,
} from './utils.mjs'

/**
 * A single clause in a {@link Query} contains a term and details on how to
 * match that term against a {@link Index}.
 */
export class QueryClause {
  /**
   * The fields in an index this clause should be matched against.
   *
   * @type {string[]|undefined}
   */
  fields = undefined

  /**
   * Any boost that should be applied when matching this clause.
   *
   * @type {number|undefined}
   */
  boost = 1

  /**
   * Whether the term should have fuzzy matching applied, and how fuzzy the match should be.
   *
   * @type {number}
   */
  editDistance

  /**
   * Whether the term should be passed through the search pipeline.
   *
   * @type {boolean|undefined}
   */
  usePipeline = undefined

  /**
   * Whether the term should have wildcards appended or prepended.
   *
   * @type {QueryWildcard.NONE|QueryWildcard.LEADING|QueryWildcard.TRAILING|undefined}
   */
  wildcard = QueryWildcard.NONE

  /**
   * The terms presence in any matching documents.
   *
   * @type {QueryPresence.OPTIONAL|QueryPresence.REQUIRED|QueryPresence.PROHIBITED|undefined}
   */
  presence = QueryPresence.OPTIONAL

  /**
   * @type {string|undefined}
   */
  term = undefined
}

/**
 * A Query provides a programmatic way of defining queries to be performed
 * against a {@link Index}.
 *
 * Prefer constructing a Query using the {@link Index#query} method
 * so the query object is pre-initialized with the right index fields.
 */
export class Query {
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
      this.#wildcard = QueryWildcard
    }

    return this.#wildcard
  }

  /**
   * @return {QueryPresence}
   */
  static get presence () {
    if (!this.#presence) {
      this.#presence = QueryPresence
    }

    return this.#presence
  }

  /**
   * An array of query clauses.
   *
   * @type {QueryClause[]}
   */
  clauses

  /**
   * An array of all available fields in a Index.
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
   * Adds a {@link QueryClause} to this query.
   *
   * Unless the clause contains the fields to be matched all fields will be matched. In addition
   * a default boost of 1 is applied to the clause.
   *
   * @param {QueryClause} clause - The clause to add to this query.
   * @see QueryClause
   * @return {this}
   */
  clause (clause) {
    if (undefined === clause?.fields) {
      clause.fields = this.allFields
    }

    if (undefined === clause?.boost) {
      clause.boost = 1
    }

    if (undefined === clause?.usePipeline) {
      clause.usePipeline = true
    }

    if (undefined === clause?.wildcard) {
      clause.wildcard = QueryWildcard.NONE
    }

    if ((clause.wildcard & QueryWildcard.LEADING) && (clause.term.charAt(0) != wildcard)) {
      clause.term = "*" + clause.term
    }

    if ((clause.wildcard & QueryWildcard.TRAILING) && (clause.term.slice(-1) != wildcard)) {
      clause.term = "" + clause.term + "*"
    }

    if (undefined === clause?.presence) {
      clause.presence = QueryPresence.OPTIONAL
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
      if (this.clauses[i].presence != QueryPresence.PROHIBITED) {
        return false
      }
    }

    return true
  }

  /**
   * Adds a term to the current query, under the covers this will create a {@link QueryClause}
   * to the list of clauses that make up this query.
   *
   * The term is used as is, i.e. no tokenization will be performed by this method. Instead conversion
   * to a token or token-like string should be done before calling this method.
   *
   * The term will be converted to a string by calling `toString`. Multiple terms can be passed as an
   * array, each term in the array will share the same options.
   *
   * @param {object|object[]} term - The term(s) to add to the query.
   * @param {QueryClause|undefined} [options] - Any additional properties to add to the query clause.
   * @return {this}
   * @see Query#clause
   * @see QueryClause
   * @example <caption>adding a single term to a query</caption>
   * query.term("foo")
   * @example <caption>adding a single term to a query and specifying search fields, term boost and automatic trailing wildcard</caption>
   * query.term("foo", {
   *   fields: ["title"],
   *   boost: 10,
   *   wildcard: QueryWildcard.TRAILING
   * })
   * @example <caption>using tokenizer to convert a string to tokens before using them as terms</caption>
   * query.term(tokenizer("foo bar"))
   */
  term (term, options) {
    if (Array.isArray(term)) {
      term.forEach(function (t) { this.term(t, utils.clone(options)) }, this)
      return this
    }

    var clause = options || new QueryClause
    clause.term = term.toString()

    this.clause(clause)

    return this
  }
}

const wildcard = '*'

/**
 * Constants for indicating what kind of automatic wildcard insertion will be used when constructing a query clause.
 *
 * This allows wildcards to be added to the beginning and end of a term without having to manually do any string
 * concatenation.
 *
 * The wildcard constants can be bitwise combined to select both leading and trailing wildcards.
 *
 * @see QueryClause
 * @see Query#clause
 * @see Query#term
 * @example <caption>query term with trailing wildcard</caption>
 * query.term('foo', { wildcard: QueryWildcard.TRAILING })
 * @example <caption>query term with leading and trailing wildcard</caption>
 * query.term('foo', {
 *   wildcard: QueryWildcard.LEADING | QueryWildcard.TRAILING
 * })
 */
class QueryWildcard {
  /**
   * @return {0}
   */
  static get NONE () {
    return 0
  }

  /**
   * @return {1}
   */
  static get LEADING () {
    return 1
  }

  /**
   * @return {2}
   */
  static get TRAILING () {
    return 2
  }
}

/**
 * Constants for indicating what kind of presence a term must have in matching documents.
 *
 * @enum {number}
 * @see QueryClause
 * @see Query#clause
 * @see Query#term
 * @example <caption>query term with required presence</caption>
 * query.term('foo', { presence: QueryPresence.REQUIRED })
 */
export class QueryPresence {
  /**
   * Term's presence in a document is optional, this is the default value.
   *
   * @return {1}
   */
  static get OPTIONAL () {
    return 1
  }

  /**
   * Term's presence in a document is required, documents that do not contain
   * this term will not be returned.
   *
   * @return {2}
   */
  static get REQUIRED () {
    return 2
  }

  /**
   * Term's presence in a document is prohibited, documents that do contain
   * this term will not be returned.
   *
   * @return {3}
   */
  static get PROHIBITED () {
    return 3
  }
}
