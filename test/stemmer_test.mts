import lunr from '@satisfactory-dev/lunr'

import assert from 'assert/strict'

import {
  suite,
  test,
} from './shim.mts'

import testData from './fixtures/stemming_vocab.json' with {type: 'json'}

void suite('lunr.stemmer', function () {
  void test('reduces words to their stem', function () {
    for (const [word, expected] of Object.entries(testData)) {
      var
            token = new lunr.Token(word),
            result = lunr.stemmer(token).toString()

        assert.equal(expected, result)
    }
  })

  void test('is a registered pipeline function', function () {
    assert.equal('stemmer', lunr.stemmer.label)
    assert.equal(lunr.stemmer, lunr.Pipeline.registeredFunctions['stemmer'])
  })
})
