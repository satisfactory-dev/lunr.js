import lunr from '@satisfactory-dev/lunr'

import assert from 'assert/strict'

import {
  suite,
  test,
} from './shim.mts'

void suite('lunr.stopWordFilter', function () {
  void test('filters stop words', function () {
    var stopWords = ['the', 'and', 'but', 'than', 'when']

    stopWords.forEach(function (word: string, i, arr) {
      assert.equal(lunr.stopWordFilter(word, i, arr), undefined)
    })
  })

  void test('ignores non stop words', function () {
    var nonStopWords = ['interesting', 'words', 'pass', 'through']

    nonStopWords.forEach(function (word, i, arr) {
      assert.equal(word, lunr.stopWordFilter(word, i, arr))
    })
  })

  void test('ignores properties of Object.prototype', function () {
    var nonStopWords = ['constructor', 'hasOwnProperty', 'toString', 'valueOf']

    nonStopWords.forEach(function (word, i, arr) {
      assert.equal(word, lunr.stopWordFilter(word, i, arr))
    })
  })

  void test('is a registered pipeline function', function () {
    assert.equal('stopWordFilter', lunr.stopWordFilter.label)
    assert.equal(lunr.stopWordFilter, lunr.Pipeline.registeredFunctions['stopWordFilter'])
  })
})
