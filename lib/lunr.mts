/*!
 * Builder
 * Copyright (C) 2020 Oliver Nightingale
 * Copyright (C) @YEAR SignpostMarv
 */
import {
  Builder,
} from './builder.mts'

import {
  FieldRef,
} from './field_ref.mts'

import {
  Index,
} from './index.mts'

import {
  MatchData,
} from './match_data.mts'

import {
  Pipeline,
} from './pipeline.mts'

import {
  Query,
  QueryPresence,
  QueryWildcard,
} from './query.mts'

import {
  QueryLexeme,
  QueryLexer,
} from './query_lexer.mts'

import {
  QueryParser,
} from './query_parser.mts'

import {
  Set,
  SetComplete,
  SetEmpty,
} from './set.mts'

import {
  stemmer,
} from './stemmer.mts'

import {
  stopWordFilter,
} from './stop_word_filter.mts'

import {
  Token,
} from './token.mts'

import {
  TokenSet,
} from './token_set.mts'

import {
  tokenizer,
} from './tokenizer.mts'

import {
  trimmer,
} from './trimmer.mts'

import {
  utils,
} from './utils.mts'

import {
  Vector,
} from './vector.mts'

type LunrConfig = (this: Builder, builder: Builder) => void

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
 */
const lunr = function (config: LunrConfig) {
  return (new Lunr(config)).build()
}

export class Lunr {
  #builder: Builder

  constructor (config: LunrConfig) {
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
lunr.QueryWildcard = QueryWildcard
lunr.QueryPresence = QueryPresence
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
