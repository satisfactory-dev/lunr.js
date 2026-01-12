/*!
 * Index
 * Copyright (C) 2020 Oliver Nightingale
 */

import {
  Query
} from './query.mjs'

import {
  MatchData
} from './match_data.mjs'

import {
  Vector
} from './vector.mjs'

import {
  TokenSet
} from './token_set.mjs'

import {
  Pipeline
} from './pipeline.mjs'

import {
  SetComplete,
  SetEmpty,
  Set
} from './set.mjs'

import {
  QueryParser
} from './query_parser.mjs'

import {
  FieldRef
} from './field_ref.mjs'

import {
  Lunr
} from './lunr.mjs'

/**
 * A result contains details of a document matching a search query.
 * @typedef {Object} Index~Result
 * @property {string} ref - The reference of the document this result represents.
 * @property {number} score - A number between 0 and 1 representing how similar this document is to the query.
 * @property {MatchData} matchData - Contains metadata about this match including which term(s) caused the match.
 */

/**
 * Although lunr provides the ability to create queries using Query, it also provides a simple
 * query language which itself is parsed into an instance of Query.
 *
 * For programmatically building queries it is advised to directly use Query, the query language
 * is best used for human entered text rather than program generated text.
 *
 * At its simplest queries can just be a single term, e.g. `hello`, multiple terms are also supported
 * and will be combined with OR, e.g `hello world` will match documents that contain either 'hello'
 * or 'world', though those that contain both will rank higher in the results.
 *
 * Wildcards can be included in terms to match one or more unspecified characters, these wildcards can
 * be inserted anywhere within the term, and more than one wildcard can exist in a single term. Adding
 * wildcards will increase the number of documents that will be found but can also have a negative
 * impact on query performance, especially with wildcards at the beginning of a term.
 *
 * Terms can be restricted to specific fields, e.g. `title:hello`, only documents with the term
 * hello in the title field will match this query. Using a field not present in the index will lead
 * to an error being thrown.
 *
 * Modifiers can also be added to terms, lunr supports edit distance and boost modifiers on terms. A term
 * boost will make documents matching that term score higher, e.g. `foo^5`. Edit distance is also supported
 * to provide fuzzy matching, e.g. 'hello~2' will match documents with hello with an edit distance of 2.
 * Avoid large values for edit distance to improve query performance.
 *
 * Each term also supports a presence modifier. By default a term's presence in document is optional, however
 * this can be changed to either required or prohibited. For a term's presence to be required in a document the
 * term should be prefixed with a '+', e.g. `+foo bar` is a search for documents that must contain 'foo' and
 * optionally contain 'bar'. Conversely a leading '-' sets the terms presence to prohibited, i.e. it must not
 * appear in a document, e.g. `-foo bar` is a search for documents that do not contain 'foo' but may contain 'bar'.
 *
 * To escape special characters the backslash character '\' can be used, this allows searches to include
 * characters that would normally be considered modifiers, e.g. `foo\~2` will search for a term "foo~2" instead
 * of attempting to apply a boost of 2 to the search term "foo".
 *
 * @typedef {string} Index~QueryString
 * @example <caption>Simple single term query</caption>
 * hello
 * @example <caption>Multiple term query</caption>
 * hello world
 * @example <caption>term scoped to a field</caption>
 * title:hello
 * @example <caption>term with a boost of 10</caption>
 * hello^10
 * @example <caption>term with an edit distance of 2</caption>
 * hello~2
 * @example <caption>terms with presence modifiers</caption>
 * -foo +bar baz
 */

/**
 * A query builder callback provides a query object to be used to express
 * the query to perform on the index.
 *
 * @callback Index~queryBuilder
 * @param {Query} query - The query object to build up.
 * @this Query
 */

/**
 * An index contains the built index of all documents and provides a query interface
 * to the index.
 *
 * Usually instances of Index will not be created using this constructor, instead
 * Builder should be used to construct new indexes, or Index.load should be
 * used to load previously built and serialized indexes.
 *
 * @param {Object} attrs - The attributes of the built search index.
 * @param {Object} attrs.invertedIndex - An index of term/field to document reference.
 * @param {Object<string, Vector>} attrs.fieldVectors - Field vectors
 * @param {TokenSet} attrs.tokenSet - An set of all corpus tokens.
 * @param {string[]} attrs.fields - The names of indexed document fields.
 * @param {Pipeline} attrs.pipeline - The pipeline to use for search terms.
 */
export class Index {
  /** @type {Object} */
  invertedIndex

  /** @type {Object<string, Vector>} */
  fieldVectors

  /** @type {TokenSet} */
  tokenSet

  /** @type {string[]} */
  fields

  /** @type {Pipeline} */
  pipeline

  /** @type {SetComplete} */
  #completeSet

  /** @type {SetEmpty} */
  #emptySet

  constructor (attrs) {
    this.invertedIndex = attrs.invertedIndex
    this.fieldVectors = attrs.fieldVectors
    this.tokenSet = attrs.tokenSet
    this.fields = attrs.fields
    this.pipeline = attrs.pipeline
    this.#completeSet = new SetComplete
    this.#emptySet = new SetEmpty
  }

  /**
   * Performs a search against the index using lunr query syntax.
   *
   * Results will be returned sorted by their score, the most relevant results
   * will be returned first.  For details on how the score is calculated, please see
   * the {@link https://lunrjs.com/guides/searching.html#scoring|guide}.
   *
   * For more programmatic querying use Index#query.
   *
   * @param {Index~QueryString} queryString - A string containing a lunr query.
   * @throws {QueryParseError} If the passed query string cannot be parsed.
   * @returns {Index~Result[]}
   */
  search (queryString) {
    return this.query(function (query) {
      var parser = new QueryParser(queryString, query)
      parser.parse()
    })
  }

  /**
   * Performs a query against the index using the yielded Query object.
   *
   * If performing programmatic queries against the index, this method is preferred
   * over Index#search so as to avoid the additional query parsing overhead.
   *
   * A query object is yielded to the supplied function which should be used to
   * express the query to be run against the index.
   *
   * Note that although this function takes a callback parameter it is _not_ an
   * asynchronous operation, the callback is just yielded a query object to be
   * customized.
   *
   * @param {Index~queryBuilder} fn - A function that is used to build the query.
   * @returns {Index~Result[]}
   */
  query (fn) {
    // for each query clause
    // * process terms
    // * expand terms from token set
    // * find matching documents and metadata
    // * get document vectors
    // * score documents

    var query = new Query(this.fields),
        matchingFields = Object.create(null),
        queryVectors = Object.create(null),
        termFieldCache = Object.create(null),
        requiredMatches = Object.create(null),
        prohibitedMatches = Object.create(null)

    /*
    * To support field level boosts a query vector is created per
    * field. An empty vector is eagerly created to support negated
    * queries.
    */
    for (var i = 0; i < this.fields.length; i++) {
      queryVectors[this.fields[i]] = new Vector
    }

    fn.call(query, query)

    for (var i = 0; i < query.clauses.length; i++) {
      /*
      * Unless the pipeline has been disabled for this term, which is
      * the case for terms with wildcards, we need to pass the clause
      * term through the search pipeline. A pipeline returns an array
      * of processed terms. Pipeline functions may expand the passed
      * term, which means we may end up performing multiple index lookups
      * for a single query term.
      */
      var clause = query.clauses[i],
          terms = null,
          clauseMatches = this.#emptySet

      if (clause.usePipeline) {
        terms = this.pipeline.runString(clause.term, {
          fields: clause.fields
        })
      } else {
        terms = [clause.term]
      }

      for (var m = 0; m < terms.length; m++) {
        var term = terms[m]

        /*
        * Each term returned from the pipeline needs to use the same query
        * clause object, e.g. the same boost and or edit distance. The
        * simplest way to do this is to re-use the clause object but mutate
        * its term property.
        */
        clause.term = term

        /*
        * From the term in the clause we create a token set which will then
        * be used to intersect the indexes token set to get a list of terms
        * to lookup in the inverted index
        */
        var termTokenSet = TokenSet.fromClause(clause),
            expandedTerms = this.tokenSet.intersect(termTokenSet).toArray()

        /*
        * If a term marked as required does not exist in the tokenSet it is
        * impossible for the search to return any matches. We set all the field
        * scoped required matches set to empty and stop examining any further
        * clauses.
        */
        if (expandedTerms.length === 0 && clause.presence === Query.presence.REQUIRED) {
          for (var k = 0; k < clause.fields.length; k++) {
            var field = clause.fields[k]
            requiredMatches[field] = this.#emptySet
          }

          break
        }

        for (var j = 0; j < expandedTerms.length; j++) {
          /*
          * For each term get the posting and termIndex, this is required for
          * building the query vector.
          */
          var expandedTerm = expandedTerms[j],
              posting = this.invertedIndex[expandedTerm],
              termIndex = posting._index

          for (var k = 0; k < clause.fields.length; k++) {
            /*
            * For each field that this query term is scoped by (by default
            * all fields are in scope) we need to get all the document refs
            * that have this term in that field.
            *
            * The posting is the entry in the invertedIndex for the matching
            * term from above.
            */
            var field = clause.fields[k],
                fieldPosting = posting[field],
                matchingDocumentRefs = Object.keys(fieldPosting),
                termField = expandedTerm + "/" + field,
                matchingDocumentsSet = new Set(matchingDocumentRefs)

            /*
            * if the presence of this term is required ensure that the matching
            * documents are added to the set of required matches for this clause.
            *
            */
            if (clause.presence == Query.presence.REQUIRED) {
              clauseMatches = clauseMatches.union(matchingDocumentsSet)

              if (requiredMatches[field] === undefined) {
                requiredMatches[field] = this.#completeSet
              }
            }

            /*
            * if the presence of this term is prohibited ensure that the matching
            * documents are added to the set of prohibited matches for this field,
            * creating that set if it does not yet exist.
            */
            if (clause.presence == Query.presence.PROHIBITED) {
              if (prohibitedMatches[field] === undefined) {
                prohibitedMatches[field] = this.#emptySet
              }

              prohibitedMatches[field] = prohibitedMatches[field].union(matchingDocumentsSet)

              /*
              * Prohibited matches should not be part of the query vector used for
              * similarity scoring and no metadata should be extracted so we continue
              * to the next field
              */
              continue
            }

            /*
            * The query field vector is populated using the termIndex found for
            * the term and a unit value with the appropriate boost applied.
            * Using upsert because there could already be an entry in the vector
            * for the term we are working with. In that case we just add the scores
            * together.
            */
            queryVectors[field].upsert(termIndex, clause.boost, function (a, b) { return a + b })

            /**
             * If we've already seen this term, field combo then we've already collected
             * the matching documents and metadata, no need to go through all that again
             */
            if (termFieldCache[termField]) {
              continue
            }

            for (var l = 0; l < matchingDocumentRefs.length; l++) {
              /*
              * All metadata for this term/field/document triple
              * are then extracted and collected into an instance
              * of MatchData ready to be returned in the query
              * results
              */
              var matchingDocumentRef = matchingDocumentRefs[l],
                  matchingFieldRef = new FieldRef (matchingDocumentRef, field),
                  metadata = fieldPosting[matchingDocumentRef],
                  fieldMatch

              if ((fieldMatch = matchingFields[matchingFieldRef]) === undefined) {
                matchingFields[matchingFieldRef] = new MatchData (expandedTerm, field, metadata)
              } else {
                fieldMatch.add(expandedTerm, field, metadata)
              }

            }

            termFieldCache[termField] = true
          }
        }
      }

      /**
       * If the presence was required we need to update the requiredMatches field sets.
       * We do this after all fields for the term have collected their matches because
       * the clause terms presence is required in _any_ of the fields not _all_ of the
       * fields.
       */
      if (clause.presence === Query.presence.REQUIRED) {
        for (var k = 0; k < clause.fields.length; k++) {
          var field = clause.fields[k]
          requiredMatches[field] = requiredMatches[field].intersect(clauseMatches)
        }
      }
    }

    /**
     * Need to combine the field scoped required and prohibited
     * matching documents into a global set of required and prohibited
     * matches
     */
    var allRequiredMatches = this.#completeSet,
        allProhibitedMatches = this.#emptySet

    for (var i = 0; i < this.fields.length; i++) {
      var field = this.fields[i]

      if (requiredMatches[field]) {
        allRequiredMatches = allRequiredMatches.intersect(requiredMatches[field])
      }

      if (prohibitedMatches[field]) {
        allProhibitedMatches = allProhibitedMatches.union(prohibitedMatches[field])
      }
    }

    var matchingFieldRefs = Object.keys(matchingFields),
        results = [],
        matches = Object.create(null)

    /*
    * If the query is negated (contains only prohibited terms)
    * we need to get _all_ fieldRefs currently existing in the
    * index. This is only done when we know that the query is
    * entirely prohibited terms to avoid any cost of getting all
    * fieldRefs unnecessarily.
    *
    * Additionally, blank MatchData must be created to correctly
    * populate the results.
    */
    if (query.isNegated()) {
      matchingFieldRefs = Object.keys(this.fieldVectors)

      for (var i = 0; i < matchingFieldRefs.length; i++) {
        var matchingFieldRef = matchingFieldRefs[i]
        var fieldRef = FieldRef.fromString(matchingFieldRef)
        matchingFields[matchingFieldRef] = new MatchData
      }
    }

    for (var i = 0; i < matchingFieldRefs.length; i++) {
      /*
      * Currently we have document fields that match the query, but we
      * need to return documents. The matchData and scores are combined
      * from multiple fields belonging to the same document.
      *
      * Scores are calculated by field, using the query vectors created
      * above, and combined into a final document score using addition.
      */
      var fieldRef = FieldRef.fromString(matchingFieldRefs[i]),
          docRef = fieldRef.docRef

      if (!allRequiredMatches.contains(docRef)) {
        continue
      }

      if (allProhibitedMatches.contains(docRef)) {
        continue
      }

      var fieldVector = this.fieldVectors[fieldRef],
          score = queryVectors[fieldRef.fieldName].similarity(fieldVector),
          docMatch

      if ((docMatch = matches[docRef]) !== undefined) {
        docMatch.score += score
        docMatch.matchData.combine(matchingFields[fieldRef])
      } else {
        var match = {
          ref: docRef,
          score: score,
          matchData: matchingFields[fieldRef]
        }
        matches[docRef] = match
        results.push(match)
      }
    }

    /*
    * Sort the results objects by score, highest first.
    */
    return results.sort(function (a, b) {
      return b.score - a.score
    })
  }

  /**
   * Prepares the index for JSON serialization.
   *
   * The schema for this JSON blob will be described in a
   * separate JSON schema file.
   *
   * @returns {Object}
   */
  toJSON () {
    var invertedIndex = Object.keys(this.invertedIndex)
      .sort()
      .map(function (term) {
        return [term, this.invertedIndex[term]]
      }, this)

    var fieldVectors = Object.keys(this.fieldVectors)
      .map(function (ref) {
        return [ref, this.fieldVectors[ref].toJSON()]
      }, this)

    return {
      version: "@VERSION",
      fields: this.fields,
      fieldVectors: fieldVectors,
      invertedIndex: invertedIndex,
      pipeline: this.pipeline.toJSON()
    }
  }

  /**
   * Loads a previously serialized Index
   *
   * @param {Object} serializedIndex - A previously serialized Index
   * @param {Object} options
   * @param {'throw'|(message: string) => void} [options.throwOnVersionConflict]
   * @param {(actual: string, expected: string) => string} [options.versionConflictFormatter]
   * @returns {Index}
   */
  static load (serializedIndex, {
    versionConflictHandler = (message) => {
      console.warn(message)
    },
    versionConflictFormatter = (version, lunrVersion) => `Version mismatch when loading serialised index. Current version of lunr '${
      lunrVersion
    }' does not match serialized index '${
      version
    }'`
  } = {}) {
    var attrs = {},
        fieldVectors = {},
        serializedVectors = serializedIndex.fieldVectors,
        invertedIndex = Object.create(null),
        serializedInvertedIndex = serializedIndex.invertedIndex,
        tokenSetBuilder = new TokenSet.Builder,
        pipeline = Pipeline.load(serializedIndex.pipeline)

    this.#checkVersion(
      serializedIndex?.version,
      versionConflictHandler,
      versionConflictFormatter
    )

    for (var i = 0; i < serializedVectors.length; i++) {
      var tuple = serializedVectors[i],
          ref = tuple[0],
          elements = tuple[1]

      fieldVectors[ref] = new Vector(elements)
    }

    for (var i = 0; i < serializedInvertedIndex.length; i++) {
      var tuple = serializedInvertedIndex[i],
          term = tuple[0],
          posting = tuple[1]

      tokenSetBuilder.insert(term)
      invertedIndex[term] = posting
    }

    tokenSetBuilder.finish()

    attrs.fields = serializedIndex.fields

    attrs.fieldVectors = fieldVectors
    attrs.invertedIndex = invertedIndex
    attrs.tokenSet = tokenSetBuilder.root
    attrs.pipeline = pipeline

    return new Index(attrs)
  }

  /**
   * @param {string} version
   * @param {'throw'|(message) => void} handler
   * @param {(actual, expected) => string}
   */
  static #checkVersion (
    version,
    handler,
    formatter
  ) {
    if (Lunr.version !== version) {
      const message = formatter(version, Lunr.version)
      if ('throw' === handler) {
        throw new Error(message)
      } else {
        handler(message)
      }
    }
  }
}
