import Benchmark from 'benchmark'
import wordList from 'word-list'
import fs from 'node:fs'

type BenchmarkEvent<T extends object> = (
  & Benchmark.Event
  & {
    target: T & { toString(): string }
    currentTarget: T,
  }
)

export const words = fs.readFileSync(wordList, 'utf-8')
  .split('\n')
  .slice(0, 1000)
  .sort()

export type SuiteCallback = (
  this: Benchmark.Suite,
  suite: Benchmark.Suite,
) => void

export const suite = function (name: string, fn: SuiteCallback) {
  var s = new Benchmark.Suite(name, {
    onStart: function (e: BenchmarkEvent<Benchmark.Suite>) { console.log(e.currentTarget.name) },
    onCycle: function (e: BenchmarkEvent<Benchmark>) { console.log("  " + String(e.target)) },
    onError: function (e: BenchmarkEvent<Benchmark>) { console.error(e.target.error) },
  })

  fn.call(s, s)

  s.run()
}
