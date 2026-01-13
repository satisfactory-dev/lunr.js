/*!
 * Query
 * Copyright (C) 2020 Oliver Nightingale
 * Copyright (C) @YEAR SignpostMarv
 */

import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Index,
} from './index.mts'

import {
  utils,
} from './utils.mts'

/**
 * A single clause in a {@link Query} contains a term and details on how to
 * match that term against a {@link Index}.
 */
export class QueryClause {
  /**
   * The fields in an index this clause should be matched against.
   */
  fields: string[] | undefined = undefined

  /**
   * Any boost that should be applied when matching this clause.
   *
   * @type {number|undefined}
   */
  boost: number | undefined = 1

  /**
   * Whether the term should have fuzzy matching applied, and how fuzzy the match should be.
   */
  editDistance: number | undefined

  /**
   * Whether the term should be passed through the search pipeline.
   */
  usePipeline: boolean | undefined = undefined

  /**
   * Whether the term should have wildcards appended or prepended.
   */
  wildcard: (
    | typeof QueryWildcard['NONE']
    | typeof QueryWildcard['LEADING']
    | typeof QueryWildcard['TRAILING']
    | undefined
  ) = QueryWildcard.NONE

  /**
   * The terms presence in any matching documents.
   */
  presence: (
    | typeof QueryPresence['OPTIONAL']
    | typeof QueryPresence['REQUIRED']
    | typeof QueryPresence['PROHIBITED']
    | undefined
  ) = QueryPresence.OPTIONAL

  /**
   * @type {string|undefined}
   */
  term: string | undefined = undefined
}

/**
 * A Query provides a programmatic way of defining queries to be performed
 * against a {@link Index}.
 *
 * Prefer constructing a Query using the {@link Index#query} method
 * so the query object is pre-initialized with the right index fields.
 */
export class Query {
  static get wildcard () {
    return QueryWildcard
  }

  /**
   * An array of query clauses.
   */
  clauses: QueryClause[]

  /**
   * An array of all available fields in a Index.
   */
  allFields: string[]

  constructor (allFields: string[]) {
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
   */
  clause (clause: Partial<QueryClause>): this {
    let {
      fields,
      boost,
      usePipeline,
      wildcard: clauseWildcard,
      term,
      presence,
    } = clause

    if (undefined === fields) {
      fields = this.allFields
    }

    if (undefined === boost) {
      boost = 1
    }

    if (undefined === usePipeline) {
      usePipeline = true
    }

    if (undefined === clauseWildcard) {
      clauseWildcard = QueryWildcard.NONE
    }

    if ((clauseWildcard & QueryWildcard.LEADING) && (term?.charAt(0) != wildcard)) {
      term = "*" + term
    }

    if ((clauseWildcard & QueryWildcard.TRAILING) && (term?.slice(-1) != wildcard)) {
      term = "" + term + "*"
    }

    if (undefined === presence) {
      presence = QueryPresence.OPTIONAL
    }

    this.clauses.push({
      fields,
      editDistance: clause.editDistance,
      boost,
      usePipeline,
      wildcard: clauseWildcard,
      term,
      presence,
    })

    return this
  }

  /**
   * A negated query is one in which every clause has a presence of
   * prohibited. These queries require some special processing to return
   * the expected results.
   *
   * @return {boolean}
   */
  isNegated (): boolean {
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
  term (term: object | object[], options: QueryClause | undefined): this {
    if (Array.isArray(term)) {
      term.forEach((t: object) => { this.term(t, utils.clone(options) as typeof options) })
      return this
    }

    var clause = options || new QueryClause
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    clause.term = term.toString()

    this.clause(clause)

    return this
  }
}

export const wildcard = '*'

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
export const QueryWildcard = Object.freeze({
  NONE: 0,
  LEADING: 1,
  TRAILING: 2,
})

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
export const QueryPresence = Object.freeze({
  OPTIONAL: 1,
  REQUIRED: 2,
  PROHIBITED: 3,
})
