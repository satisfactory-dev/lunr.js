import * as lunr from '../lunr.ts'

import {
  suite,
  suitesLogger,
  words,
} from './perf_helper.ts'

const stemmer = suite('lunr.stemmer', function () {
  this.add('#call', function () {
    for (var i = 0; i < words.length; i++) {
      lunr.stemmer(new lunr.Token (words[i]))
    }
  })
})

export default stemmer

if (process.argv[1] === import.meta.filename) {
  await suitesLogger(stemmer)
}
