import type {
  cycleFormatter,
} from '@satisfactory-dev/benchmark'
import {
  Suite,
} from '@satisfactory-dev/benchmark'

import type {
  BMF,
  stats,
} from '@satisfactory-dev/benchmark/integrations/bencher'
import {
  bencherLogger,
  bencherReduction,
  extractStats,
} from '@satisfactory-dev/benchmark/integrations/bencher'

import wordList from 'word-list'
import fs from 'node:fs'

export const words = fs.readFileSync(wordList, 'utf-8')
  .split('\n')
  .slice(0, 1000)
  .sort()

const reducer = function (was: BMF, stats: stats): BMF {
  was[`${stats.suite}::${stats.benchmark}`] = {
    hz: {
      value: stats.hz,
    },
    rme: {
      value: stats.stats.rme,
    },
    sample: {
      value: stats.stats.mean,
      // eslint-disable-next-line camelcase
      lower_value: stats.sample.sort((a, b) => a - b)[0],
      // eslint-disable-next-line camelcase
      upper_value: stats.sample.sort((a, b) => b - a)[0],
    },
  }

  return was
}

const formatter = async function* (
  cycleFormatter: cycleFormatter<stats>,
  reducer: (was: BMF, stats: stats) => BMF,
  suiteSets: [Suite, ...Suite[]][],
) {
  for (const suites of suiteSets) {
    const result = await Suite.formatCycles<stats>(cycleFormatter, ...suites)
    yield bencherReduction(reducer, ...result)
  }
}

const bulkFormatter = async function* (
  cycleFormatter: cycleFormatter<stats>,
  reducer: (was: BMF, stats: stats) => BMF,
  suiteSets: [Suite, ...Suite[]][],
) {
  const results: BMF = {}

  for await (const result of formatter(cycleFormatter, reducer, suiteSets)) {
    Object.assign(results, result)
  }

  yield results
}

export const suitesLogger = function (
  ...suites: [Suite, ...Suite[]]
) {
  return bencherLogger(
    extractStats,
    reducer,
    bulkFormatter,
    [suites],
    process.stdout,
  )
}

export const suite = function (
  name: string,
  fn: (this: Suite) => void,
) {
  var s = new Suite(name)

  fn.call(s)

  return s
}
