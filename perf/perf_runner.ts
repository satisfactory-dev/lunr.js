import type {
  Suite,
} from '@satisfactory-dev/benchmark'

import builderPerf from './builder_perf.ts'

import {
  suitesLogger,
} from './perf_helper.ts'

import pipelinePerf from './pipeline_perf.ts'

import queryParserPerf from './query_parser_perf.ts'

import searchPerf from './search_perf.ts'

import stemmerPerf from './stemmer_perf.ts'

import tokenSetPerf from './token_set_perf.ts'

import tokenizerPerf from './tokenizer_perf.ts'

import vectorPerf from './vector_perf.ts'

const suites: [Suite, ...Suite[]] = [
  builderPerf,
  pipelinePerf,
  queryParserPerf,
  searchPerf,
  stemmerPerf,
  tokenSetPerf,
  tokenizerPerf,
  ...vectorPerf,
]

await suitesLogger(...suites)
