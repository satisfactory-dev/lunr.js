import lunr from '@satisfactory-dev/lunr'

import assert from 'assert/strict'

import {
  suite,
  test,
} from './shim.ts'

void suite('lunr.Token', function () {
  void suite('#toString', function () {
    void test('converts the token to a string', function () {
      var token = new lunr.Token('foo')
      assert.equal('foo', token.toString())
    })
  })

  void suite('#metadata', function () {
    void test('can attach arbitrary metadata', function () {
      var token = new lunr.Token('foo', { length: 3 })
      assert.equal(3, token.metadata.length)
    })
  })

  void suite('#update', function () {
    void test('can update the token value', function () {
      var token = new lunr.Token('foo')

      token.update(function (s) {
        return s.toUpperCase()
      })

      assert.equal('FOO', token.toString())
    })

    void test('metadata is yielded when updating', function () {
      var metadata = { bar: true },
          token = new lunr.Token('foo', metadata),
          yieldedMetadata

      token.update(function (_, md) {
        yieldedMetadata = md

        return _
      })

      assert.equal(metadata, yieldedMetadata)
    })
  })

  void suite('#clone', function () {
    var token = new lunr.Token('foo', { bar: true })

    void test('clones value', function () {
      assert.equal(token.toString(), token.clone().toString())
    })

    void test('clones metadata', function () {
      assert.equal(token.metadata, token.clone().metadata)
    })

    void test('clone and modify', function () {
      var clone = token.clone(function (s) {
        return s.toUpperCase()
      })

      assert.equal('FOO', clone.toString())
      assert.equal(token.metadata, clone.metadata)
    })
  })
})
