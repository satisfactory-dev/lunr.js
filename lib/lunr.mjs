/*!
 * Builder
 * Copyright (C) 2020 Oliver Nightingale
 * Copyright (C) @YEAR SignpostMarv
 */
import {
  Builder,
} from './builder.mjs'

import {
  FieldRef,
} from './field_ref.mjs'

import {
  Index,
} from './index.mjs'

import {
  MatchData,
} from './match_data.mjs'

import {
  Pipeline,
} from './pipeline.mjs'

import {
  Query,
} from './query.mjs'

import {
  QueryLexeme,
  QueryLexer,
} from './query_lexer.mjs'

import { QueryParser } from './query_parser.mjs'

import {
  Set,
  SetComplete,
  SetEmpty,
} from './set.mjs'

import {
  stemmer,
} from './stemmer.mjs'

import {
  stopWordFilter,
} from './stop_word_filter.mjs'

import {
  Token,
} from './token.mjs'

import {
  TokenSet,
} from './token_set.mjs'

import {
  tokenizer,
} from './tokenizer.mjs'

import {
  trimmer,
} from './trimmer.mjs'

import {
  utils,
} from './utils.mjs'

import {
  Vector,
} from './vector.mjs'

/**
 * @callback LunrConfig
 * @this Builder
 */

/**
 * A convenience function for configuring and constructing
 * a new lunr Index.
 *
 * A Builder instance is created and the pipeline setup
 * with a trimmer, stop word filter and stemmer.
 *
 * This builder object is yielded to the configuration function
 * that is passed as a parameter, allowing the list of fields
 * and other builder parameters to be customised.
 *
 * All documents _must_ be added within the passed config function.
 *
 * @example
 * var idx = lunr(function () {
 *   this.field('title')
 *   this.field('body')
 *   this.ref = 'id'
 *
 *   documents.forEach(function (doc) {
 *     this.add(doc)
 *   }, this)
 * })
 *
 * @see {@link Builder}
 * @see {@link Pipeline}
 * @see {@link trimmer}
 * @see {@link stopWordFilter}
 * @see {@link stemmer}
 *
 * @param {LunrConfig} config
 */
const lunr = function (config) {
  return (new Lunr(config)).build()
}

export class Lunr {
  /**
   * @type {Builder}
   */
  #builder

  /**
   * @param {LunrConfig} config
   */
  constructor (config) {
    const builder = this.#builder = new Builder

    builder.pipeline.add(
      trimmer,
      stopWordFilter,
      stemmer,
    )

    builder.searchPipeline.add(
      stemmer,
    )

    config.call(this.#builder, this.#builder)
  }

  build () {
    return this.#builder.build()
  }

  static get version () {
    return "@VERSION"
  }
}

lunr.version = "@VERSION"
lunr.default = lunr
lunr.Builder = Builder
lunr.FieldRef = FieldRef
lunr.Index = Index
lunr.MatchData = MatchData
lunr.Pipeline = Pipeline
lunr.Query = Query
lunr.QueryLexer = QueryLexer
lunr.QueryLexeme = QueryLexeme
lunr.QueryParser = QueryParser
lunr.Set = Set
lunr.SetComplete = SetComplete
lunr.SetEmpty = SetEmpty
lunr.stemmer = stemmer
lunr.stopWordFilter = stopWordFilter
lunr.trimmer = trimmer
lunr.tokenizer = tokenizer
lunr.TokenSet = TokenSet
lunr.Token = Token
lunr.utils = utils
lunr.Vector = Vector

export default lunr
