import lunr from '../lunr.ts'
import Benchmark from 'benchmark'
import wordList from 'word-list'
import fs from 'node:fs'

var suite = function (name, fn) {
  var s = new Benchmark.Suite(name, {
    onStart: function (e) { console.log(e.currentTarget.name) },
    onCycle: function (e) { console.log("  " + String(e.target)) },
    onError: function (e) { console.error(e.target.error) }
  })

  fn.call(s, s)

  s.run()
}

var words = fs.readFileSync(wordList, 'utf-8')
  .split('\n')
  .slice(0, 1000)
  .sort()

global.lunr = lunr
global.Benchmark = Benchmark
global.suite = suite
global.words = words
