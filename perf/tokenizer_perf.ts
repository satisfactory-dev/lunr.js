import * as lunr from '../lunr.ts'

import {
  suite,
  suitesLogger,
} from './perf_helper.ts'

const tokenizer = suite('lunr.tokenizer', function () {
  // eslint-disable-next-line @cspell/spellchecker
  var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"

  this.add('#call', function () {
    lunr.tokenizer(lorem)
  })
})

export default tokenizer

if (process.argv[1] === import.meta.filename) {
  await suitesLogger(tokenizer)
}
