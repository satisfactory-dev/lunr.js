import lunr from '@satisfactory-dev/lunr'

import assert from 'assert/strict'

import {
  suite,
  test,
} from './shim.mts'

void suite('lunr.tokenizer', function () {
  var toString = function (o: { toString(): string}) { return o.toString() }

  void test('splitting into tokens', function () {
    var tokens = lunr.tokenizer('foo bar baz')
      .map(toString)

    assert.deepEqual(['foo', 'bar', 'baz'], tokens)
  })

  void test('downcases tokens', function () {
    var tokens = lunr.tokenizer('Foo BAR BAZ')
      .map(toString)

    assert.deepEqual(['foo', 'bar', 'baz'], tokens)
  })

  void test('array of strings', function () {
    var tokens = lunr.tokenizer(['foo', 'bar', 'baz'])
      .map(toString)

    assert.deepEqual(['foo', 'bar', 'baz'], tokens)
  })

  void test('undefined is converted to empty string', function () {
    var tokens = lunr.tokenizer(['foo', undefined, 'baz'])
      .map(toString)

    assert.deepEqual(['foo', '', 'baz'], tokens)
  })

  void test('null is converted to empty string', function () {
    var tokens = lunr.tokenizer(['foo', null, 'baz'])
      .map(toString)

    assert.deepEqual(['foo', '', 'baz'], tokens)
  })

  void test('multiple white space is stripped', function () {
    var tokens = lunr.tokenizer('   foo    bar   baz  ')
      .map(toString)

    assert.deepEqual(['foo', 'bar', 'baz'], tokens)
  })

  void test('handling null-like arguments', function () {
    assert.equal(lunr.tokenizer().length, 0)
    assert.equal(lunr.tokenizer(undefined).length, 0)
    assert.equal(lunr.tokenizer(null).length, 0)
  })

  void test('converting a date to tokens', function () {
    var date = new Date(Date.UTC(2013, 0, 1, 12))

    // NOTE: slicing here to prevent asserting on parts
    // of the date that might be affected by the timezone
    // the test is running in.
    assert.deepEqual(['tue', 'jan', '01', '2013'], lunr.tokenizer(date).slice(0, 4).map(toString))
  })

  void test('converting a number to tokens', function () {
    assert.equal('41', lunr.tokenizer(41).map(toString).toString())
  })

  void test('converting a boolean to tokens', function () {
    assert.equal('false', lunr.tokenizer(false).map(toString).toString())
  })

  void test('converting an object to tokens', function () {
    var obj = {
      toString: function () { return 'custom object' },
    }

    assert.deepEqual(lunr.tokenizer(obj).map(toString), ['custom', 'object'])
  })

  void test('splits strings with hyphens', function () {
    assert.deepEqual(lunr.tokenizer('foo-bar').map(toString), ['foo', 'bar'])
  })

  void test('splits strings with hyphens and spaces', function () {
    assert.deepEqual(lunr.tokenizer('foo - bar').map(toString), ['foo', 'bar'])
  })

  void test('tracking the token index', function () {
    var tokens = lunr.tokenizer('foo bar')
    assert.equal(tokens[0].metadata.index, 0)
    assert.equal(tokens[1].metadata.index, 1)
  })

  void test('tracking the token position', function () {
    var tokens = lunr.tokenizer('foo bar')
    assert.deepEqual(tokens[0].metadata.position, [0, 3])
    assert.deepEqual(tokens[1].metadata.position, [4, 3])
  })

  void test('tracking the token position with additional left-hand whitespace', function () {
    var tokens = lunr.tokenizer(' foo bar')
    assert.deepEqual(tokens[0].metadata.position, [1, 3])
    assert.deepEqual(tokens[1].metadata.position, [5, 3])
  })

  void test('tracking the token position with additional right-hand whitespace', function () {
    var tokens = lunr.tokenizer('foo bar ')
    assert.deepEqual(tokens[0].metadata.position, [0, 3])
    assert.deepEqual(tokens[1].metadata.position, [4, 3])
  })

  void test('providing additional metadata', function () {
    // eslint-disable-next-line @cspell/spellchecker
    var tokens = lunr.tokenizer('foo bar', { 'hurp': 'durp' })
    // eslint-disable-next-line @cspell/spellchecker
    assert.deepEqual(tokens[0].metadata.hurp, 'durp')
    // eslint-disable-next-line @cspell/spellchecker
    assert.deepEqual(tokens[1].metadata.hurp, 'durp')
  })
})
