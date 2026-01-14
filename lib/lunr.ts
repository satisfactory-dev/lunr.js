/*!
 * Builder
 * Copyright (C) 2020 Oliver Nightingale
 * Copyright (C) @YEAR SignpostMarv
 */
import {
  Builder,
} from './builder.ts'

import {
  FieldRef,
} from './field_ref.ts'

import {
  Index,
} from './index.ts'

import {
  MatchData,
} from './match_data.ts'

import {
  Pipeline,
} from './pipeline.ts'

import {
  Query,
  QueryPresence,
  QueryWildcard,
} from './query.ts'

import {
  QueryLexeme,
  QueryLexer,
} from './query_lexer.ts'

import {
  QueryParser,
} from './query_parser.ts'

import {
  Set,
  SetComplete,
  SetEmpty,
} from './set.ts'

import {
  stemmer,
} from './stemmer.ts'

import {
  stopWordFilter,
} from './stop_word_filter.ts'

import {
  Token,
} from './token.ts'

import {
  TokenSet,
} from './token_set.ts'

import {
  tokenizer,
} from './tokenizer.ts'

import {
  trimmer,
} from './trimmer.ts'

import {
  utils,
} from './utils.ts'

import {
  Vector,
} from './vector.ts'

import versionInfo from './version.json' with {type: 'json'}

export type LunrConfig = (this: Builder, builder: Builder) => void
export type AsyncLunrConfig = (this: Builder, builder: Builder) => Promise<void>

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
function lunr (config: LunrConfig): Index
function lunr (config: AsyncLunrConfig): Promise<Index>
function lunr (
  config: (
    | LunrConfig
    | AsyncLunrConfig
  ),
): Promise<Index> | Index {
  if (isAsync(config)) {
    return (new AsyncLunr(config)).build()
  }

  return (new Lunr(config)).build()
}

const isAsync = function (maybe: LunrConfig | AsyncLunrConfig): maybe is AsyncLunrConfig {
  return 'AsyncFunction' === maybe.constructor.name
}

abstract class AbstractLunr {
  protected builder: Builder

  constructor (builder: Builder) {
    this.builder = builder

    builder.pipeline.add(
      trimmer,
      stopWordFilter,
      stemmer,
    )

    builder.searchPipeline.add(
      stemmer,
    )
  }

  /**
   * The current version of the library
   */
  static get version () {
    return versionInfo.version
  }

  /**
   * Versions for which the current library is compatible with
   */
  static get compatibleVersions () {
    return versionInfo.legacyCompatibility
  }
}

export class Lunr extends AbstractLunr {
  constructor (config: LunrConfig) {
    super(new Builder)

    config.call(this.builder, this.builder)
  }

  build () {
    return this.builder.build()
  }
}

export class AsyncLunr extends AbstractLunr {
  #promise: Promise<Builder>

  constructor (config: AsyncLunrConfig) {
    super(new Builder)

    this.#promise = config.call(this.builder, this.builder).then(() => this.builder)
  }

  build (): Promise<Index> {
    return this.#promise.then((builder) => builder.build())
  }
}

lunr.version = Lunr.version
lunr.compatibleVersions = Lunr.compatibleVersions
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

Object.seal(lunr)

export default lunr
