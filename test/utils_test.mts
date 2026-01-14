import type { QueryClause } from '@satisfactory-dev/lunr'
import lunr from '@satisfactory-dev/lunr'

import assert from 'assert/strict'

import {
  suite,
  test,
} from './shim.mts'

void suite('lunr.utils', function () {
  void suite('#clone', function () {
    var subject = function <
      T extends object | QueryClause,
    >(obj?: T | null) {
      const clone: (
        typeof obj extends null
          ? null
          : (
            typeof obj extends undefined
              ? undefined
              : T
          )
      ) = lunr.utils.clone<T>(obj)

      return {
        obj: obj as (
          typeof obj extends null
            ? null
            : (
              typeof obj extends undefined
                ? undefined
                : T
            )
        ),
        clone,
      }
    }

    void suite('handles null', function () {
      const {obj, clone} = subject(null)

      void test('returns null', function () {
        assert.equal(null, clone)
        assert.equal(obj, clone)
      })
    })

    void suite('handles undefined', function () {
      const {obj, clone} = subject(undefined)

      void test('returns null', function () {
        assert.equal(undefined, clone)
        assert.equal(obj, clone)
      })
    })

    void suite('object with primitives', function () {
      const {obj, clone} = subject<{
        number: 1,
        string: 'foo',
        bool: true,
      }>({
        number: 1,
        string: 'foo',
        bool: true,
      })

      void test('clones number correctly', function () {
        assert.equal(obj.number, clone.number)
      })

      void test('clones string correctly', function () {
        assert.equal(obj.string, clone.string)
      })

      void test('clones bool correctly', function () {
        assert.equal(obj.bool, clone.bool)
      })
    })

    void suite('object with array property', function () {
      const {obj, clone} = subject({
        array: [1, 2, 3],
      })

      void test('clones array correctly', function () {
        assert.deepEqual(obj.array, clone.array)
      })

      void test('mutations on clone do not affect original', function () {
        clone.array.push(4)
        assert.notDeepEqual(obj.array, clone.array)
        assert.equal(obj.array.length, 3)
        assert.equal(clone.array.length, 4)
      })
    })

    void suite('nested object', function () {
      void test('throws type error', function () {
        assert.throws(function () {
          lunr.utils.clone({
            'foo': {
              'bar': 1,
            },
          })
        }, TypeError)
      })
    })
  })
})
