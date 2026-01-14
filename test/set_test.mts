import lunr from '@satisfactory-dev/lunr'

import assert from 'assert/strict'

import {
  suite,
  test,
} from './shim.mts'

void suite('lunr.Set', () => {
  void suite('#contains', function () {
    void suite('complete set', function () {
      const completeSet = new lunr.SetComplete
      void test('returns true', function () {
        assert.equal(completeSet.contains('foo'), true)
      })
    })

    void suite('empty set', function () {
      const emptySet = new lunr.SetEmpty
      void test('returns false', function () {
        assert.equal(emptySet.contains('foo'), false)
      })
    })

    void suite('populated set', function () {
      void test('element contained in set', function () {
        const set = new lunr.Set (['foo'])
        assert.equal(set.contains('foo'), true)
      })

      void test('element not contained in set', function () {
        const set = new lunr.Set (['foo'])
        assert.equal(set.contains('bar'), false)
      })
    })
  })

  void suite('#union', function () {
    void suite('complete set', function () {
      const completeSet = new lunr.SetComplete
      void test('union is complete', function () {
        const set = new lunr.Set(['foo'])
        var result = completeSet.union(set)
        assert.equal(result.contains('foo'), true)
        assert.equal(result.contains('bar'), true)
      })
    })

    void suite('empty set', function () {
      const emptySet = new lunr.SetEmpty
      void test('contains element', function () {
        const set = new lunr.Set(['foo'])
        var result = emptySet.union(set)
        assert.equal(result.contains('foo'), true)
        assert.equal(result.contains('bar'), false)
      })
    })

    void suite('populated set', function () {
      void suite('with other populated set', function () {
        void test('contains both elements', function () {
          var target = new lunr.Set (['bar'])
          const set = new lunr.Set(['foo'])
          var result = target.union(set)

          assert.equal(result.contains('foo'), true)
          assert.equal(result.contains('bar'), true)
          assert.equal(result.contains('baz'), false)
        })
      })

      void suite('with empty set', function () {
        const emptySet = new lunr.SetEmpty
        void test('contains all elements', function () {
          var target = new lunr.Set (['bar'])
          var result = target.union(emptySet)

          assert.equal(result.contains('bar'), true)
          assert.equal(result.contains('baz'), false)
        })
      })

      void suite('with complete set', function () {
        const completeSet = new lunr.SetComplete
        void test('contains all elements', function () {
          var target = new lunr.Set (['bar'])
          var result = target.union(completeSet)

          assert.equal(result.contains('foo'), true)
          assert.equal(result.contains('bar'), true)
          assert.equal(result.contains('baz'), true)
        })
      })
    })
  })

  void suite('#intersect', function () {
    void suite('complete set', function () {
      const completeSet = new lunr.SetComplete
      void test('contains element', function () {
        const set = new lunr.Set(['foo'])
        var result = completeSet.intersect(set)
        assert.equal(result.contains('foo'), true)
        assert.equal(result.contains('bar'), false)
      })
    })

    void suite('empty set', function () {
      const emptySet = new lunr.SetEmpty
      void test('does not contain element', function () {
        const set = new lunr.Set(['foo'])
        var result = emptySet.intersect(set)
        assert.equal(result.contains('foo'), false)
      })
    })

    void suite('populated set', function () {
      void suite('no intersection', function () {
        void test('does not contain intersection elements', function () {
          var target = new lunr.Set (['bar'])
          const set = new lunr.Set(['foo'])
          var result = target.intersect(set)

          assert.equal(result.contains('foo'), false)
          assert.equal(result.contains('bar'), false)
        })
      })

      void suite('intersection', function () {
        void test('contains intersection elements', function () {
          var target = new lunr.Set (['foo', 'bar'])
          const set = new lunr.Set(['foo'])
          var result = target.intersect(set)

          assert.equal(result.contains('foo'), true)
          assert.equal(result.contains('bar'), false)
        })
      })

      void suite('with empty set', function () {
        const emptySet = new lunr.SetEmpty
        void test('returns empty set', function () {
          var target = new lunr.Set(['foo']),
              result = target.intersect(emptySet)

          assert.equal(result.contains('foo'), false)
        })
      })

      void suite('with complete set', function () {
        const completeSet = new lunr.SetComplete
        void test('returns populated set', function () {
          var target = new lunr.Set(['foo']),
              result = target.intersect(completeSet)

          assert.equal(result.contains('foo'), true)
          assert.equal(result.contains('bar'), false)
        })
      })
    })
  })
})
