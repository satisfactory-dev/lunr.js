import * as lunr from '../lunr.ts'

import {
  suite,
  words,
} from './perf_helper.ts'

suite('lunr.stemmer', function () {
  this.add('#call', function () {
    for (var i = 0; i < words.length; i++) {
      lunr.stemmer(new lunr.Token (words[i]))
    }
  })
})
