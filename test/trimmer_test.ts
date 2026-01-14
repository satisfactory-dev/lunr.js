import lunr from '@satisfactory-dev/lunr'

import assert from 'assert/strict'

import {
  suite,
  test,
} from './shim.ts'

void suite('lunr.trimmer', function () {
  void test('latin characters', function () {
    var token = new lunr.Token ('hello')
    assert.equal(lunr.trimmer(token).toString(), token.toString())
  })

  void suite('punctuation', function () {
    var trimmerTest = function (description: string, str: string, expected: string) {
      void test(description, function () {
        var token = new lunr.Token(str),
            trimmed = lunr.trimmer(token).toString()

        assert.equal(expected, trimmed)
      })
    }

    trimmerTest('full stop', 'hello.', 'hello')
    trimmerTest('inner apostrophe', "it's", "it's")
    trimmerTest('trailing apostrophe', "james'", 'james')
    trimmerTest('exclamation mark', 'stop!', 'stop')
    trimmerTest('comma', 'first,', 'first')
    trimmerTest('brackets', '[tag]', 'tag')
  })

  void test('is a registered pipeline function', function () {
    assert.equal(lunr.trimmer.label, 'trimmer')
    assert.equal(lunr.Pipeline.registeredFunctions['trimmer'], lunr.trimmer)
  })
})
