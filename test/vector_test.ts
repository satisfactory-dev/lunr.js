import {
  NumberVector,
  Vector,
} from '../lunr.ts'

import assert from 'assert/strict'

import {
  suite,
  test,
} from './shim.ts'

const testSuiteForImplementation = <T extends Vector<number>>(
  Implementation: (
    | typeof Vector<number>
    | typeof NumberVector
  ),
) => {
  var vectorFromArgs = function (...args: number[]): T {
    var vector = new Implementation()

    Array.prototype.slice.call(args)
      .forEach(function (el: number, i) {
        vector.insert(i, el)
      })

    return vector as T
  }

  void suite('#magnitude', function () {
    void test('calculates magnitude of a vector', function () {
      var vector = vectorFromArgs(4, 5, 6)
      assert.equal(77, vector.magnitudeSquared)
      assert.equal(Math.sqrt(77), vector.magnitude)
    })
  })

  void suite('#dot', function () {
    void test('calculates dot product of two vectors', function () {
      var v1 = vectorFromArgs(1, 3, -5),
          v2 = vectorFromArgs(4, -2, -1)

      assert.equal(3, v1.dot(v2))
    })
  })

  void suite('#similarity', function () {
    void test('calculates the similarity between two vectors', function () {
      var v1 = vectorFromArgs(1, 3, -5),
          v2 = vectorFromArgs(4, -2, -1)

      const similarity = v1.similarity(v2)

      assert.ok(0.49 <= similarity && similarity <= 0.515)
    })

    void test('empty vector', function () {
      var vEmpty = new Implementation,
          v1 = vectorFromArgs(1)

      assert.equal(0, vEmpty.similarity(v1))
      assert.equal(0, v1.similarity(vEmpty))
    })

    void test('non-overlapping vector', function () {
      var v1 = new Implementation([1, 1]),
          v2 = new Implementation([2, 1])

      assert.equal(0, v1.similarity(v2))
      assert.equal(0, v2.similarity(v1))
    })
  })

  void suite('#insert', function () {
    void test('invalidates magnitude cache', function () {
      var vector = vectorFromArgs(4, 5, 6)

      assert.equal(77, vector.magnitudeSquared)
      assert.equal(Math.sqrt(77), vector.magnitude)

      vector.insert(3, 7)

      assert.equal(126, vector.magnitudeSquared)
      assert.equal(Math.sqrt(126), vector.magnitude)
    })

    void test('keeps items in index specified order', function () {
      var vector = new Implementation

      vector.insert(2, 4)
      vector.insert(1, 5)
      vector.insert(0, 6)

      assert.deepEqual([6, 5, 4], vector.toArray())
    })

    void test('fails when duplicate entry', function () {
      var vector = vectorFromArgs(4, 5, 6)
      assert.throws(function () { vector.insert(0, 44) })
    })
  })

  void suite('#upsert', function () {
    void test('invalidates magnitude cache', function () {
      var vector = vectorFromArgs(4, 5, 6)

      assert.equal(77, vector.magnitudeSquared)
      assert.equal(Math.sqrt(77), vector.magnitude)

      vector.upsert(3, 7)

      assert.equal(126, vector.magnitudeSquared)
      assert.equal(Math.sqrt(126), vector.magnitude)
    })

    void test('keeps items in index specified order', function () {
      var vector = new Implementation

      vector.upsert(2, 4)
      vector.upsert(1, 5)
      vector.upsert(0, 6)

      assert.deepEqual([6, 5, 4], vector.toArray())
    })

    void test('calls fn for value on duplicate', function () {
      var vector = vectorFromArgs(4, 5, 6)
      vector.upsert(0, 4, function (current, passed) { return current + passed })
      assert.deepEqual([8, 5, 6], vector.toArray())
    })
  })
}

void suite('lunr.Vector', () => testSuiteForImplementation(Vector))
void suite('lunr.Vector<string>', () => {
  void suite('#positionForIndex', function () {
    var vector = new Vector<string> ([
      1, 'a',
      2, 'b',
      4, 'c',
      7, 'd',
      11, 'e',
    ])

    void test('at the beginning', function () {
      assert.equal(0, vector.positionForIndex(0))
    })

    void test('at the end', function () {
      assert.equal(5, vector.positionForIndex(20))
    })

    void test('consecutive', function () {
      assert.equal(2, vector.positionForIndex(3))
    })

    void test('non-consecutive gap after', function () {
      assert.equal(3, vector.positionForIndex(5))
    })

    void test('non-consecutive gap before', function () {
      assert.equal(3, vector.positionForIndex(6))
    })

    void test('non-consecutive gave before and after', function () {
      assert.equal(4, vector.positionForIndex(9))
    })

    void test('duplicate at the beginning', function () {
      assert.equal(0, vector.positionForIndex(1))
    })

    void test('duplicate at the end', function () {
      assert.equal(4, vector.positionForIndex(11))
    })

    void test('duplicate consecutive', function () {
      assert.equal(2, vector.positionForIndex(4))
    })
  })
})
void suite('lunr.NumberVector', () => testSuiteForImplementation(NumberVector))
