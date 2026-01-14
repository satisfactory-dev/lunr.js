import lunr, { TokenSet } from '@satisfactory-dev/lunr'

import assert from 'assert/strict'

import {
  suite,
  test,
} from './shim.ts'

void suite('lunr.TokenSet', function () {
  void suite('#toString', function () {
    void test('includes node finality', function () {
      var nonFinal = new lunr.TokenSet,
          final = new lunr.TokenSet,
          otherFinal = new lunr.TokenSet

      final.final = true
      otherFinal.final = true

      assert.notEqual(nonFinal.toString(), final.toString())
      assert.equal(otherFinal.toString(), final.toString())
    })

    void test('includes all edges', function () {
      var zeroEdges = new TokenSet,
          oneEdge = TokenSet.fromString('a'),
          twoEdges = TokenSet.fromArray(['a', 'b'])

      oneEdge.edges['a']._str = 1
      twoEdges.edges['a']._str = 1
      twoEdges.edges['b']._str = 1

      assert.notEqual(zeroEdges.toString(), oneEdge.toString())
      assert.notEqual(twoEdges.toString(), oneEdge.toString())
      assert.notEqual(twoEdges.toString(), zeroEdges.toString())
    })

    void test('includes edge id', function () {
      var childA = new lunr.TokenSet,
          childB = new lunr.TokenSet,
          parentA = new lunr.TokenSet,
          parentB = new lunr.TokenSet,
          parentC = new lunr.TokenSet

      parentA.edges['a'] = childA
      parentB.edges['a'] = childB
      parentC.edges['a'] = childB

      assert.equal(parentB.toString(), parentC.toString())
      assert.notEqual(parentA.toString(), parentC.toString())
      assert.notEqual(parentA.toString(), parentB.toString())
    })
  })

  void suite('.fromString', function () {
    void test('without wildcard', function () {
      lunr.TokenSet.resetNextId()
      var x = lunr.TokenSet.fromString('a')

      assert.equal(x.toString(), '0a2')
      assert.equal(x.edges['a'].final, true)
    })

    void test('with trailing wildcard', function () {
      var x = lunr.TokenSet.fromString('a*'),
          wild = x.edges['a'].edges['*']

      // a state reached by a wildcard has
      // an edge with a wildcard to itself.
      // the resulting automata is
      // non-deterministic
      assert.equal(wild, wild.edges['*'])
      assert.equal(wild.final, true)
    })
  })

  void suite('.fromArray', function () {
    void test('with unsorted array', function () {
      assert.throws(function () {
        lunr.TokenSet.fromArray(['z', 'a'])
      })
    })

    void test('with sorted array', function () {
      var tokenSet = lunr.TokenSet.fromArray(['a', 'z'])

      assert.deepEqual(['a', 'z'], tokenSet.toArray().sort())
    })

    void test('is minimal', function () {
      var tokenSet = lunr.TokenSet.fromArray(['ac', 'dc']),
          acNode = tokenSet.edges['a'].edges['c'],
          dcNode = tokenSet.edges['d'].edges['c']

      assert.deepEqual(acNode, dcNode)
    })
  })

  void suite('#toArray', function () {
    void test('includes all words', function () {
      var words = ['bat', 'cat'],
          tokenSet = lunr.TokenSet.fromArray(words).toArray()

      for (const word of words) {
        assert.equal(tokenSet.includes(word), true)
      }
    })

    void test('includes single words', function () {
      var word = 'bat',
          tokenSet = lunr.TokenSet.fromString(word)

      assert.deepEqual([word], tokenSet.toArray())
    })
  })

  void suite('#intersect', function () {
    void test('no intersection', function () {
      var x = lunr.TokenSet.fromString('cat'),
          y = lunr.TokenSet.fromString('bar'),
          z = x.intersect(y)

      assert.equal(0, z.toArray().length)
    })

    void test('simple intersection', function () {
      var x = lunr.TokenSet.fromString('cat'),
          y = lunr.TokenSet.fromString('cat'),
          z = x.intersect(y)

      assert.deepEqual(['cat'], z.toArray())
    })

    void test('trailing wildcard intersection', function () {
      var x = lunr.TokenSet.fromString('cat'),
          y = lunr.TokenSet.fromString('c*'),
          z = x.intersect(y)

      assert.deepEqual(['cat'], z.toArray())
    })

    void test('trailing wildcard no intersection', function () {
      var x = lunr.TokenSet.fromString('cat'),
          y = lunr.TokenSet.fromString('b*'),
          z = x.intersect(y)

      assert.equal(0, z.toArray().length)
    })

    void test('leading wildcard intersection', function () {
      var x = lunr.TokenSet.fromString('cat'),
          y = lunr.TokenSet.fromString('*t'),
          z = x.intersect(y)

      assert.deepEqual(['cat'], z.toArray())
    })

    void test('leading wildcard backtracking intersection', function () {
      // eslint-disable-next-line @cspell/spellchecker
      var x = lunr.TokenSet.fromString('aaacbab'),
          y = lunr.TokenSet.fromString('*ab'),
          z = x.intersect(y)

      // eslint-disable-next-line @cspell/spellchecker
      assert.deepEqual(['aaacbab'], z.toArray())
    })

    void test('leading wildcard no intersection', function () {
      var x = lunr.TokenSet.fromString('cat'),
          y = lunr.TokenSet.fromString('*r'),
          z = x.intersect(y)

      assert.equal(0, z.toArray().length)
    })

    void test('leading wildcard backtracking no intersection', function () {
      // eslint-disable-next-line @cspell/spellchecker
      var x = lunr.TokenSet.fromString('aaabdcbc'),
          y = lunr.TokenSet.fromString('*abc'),
          z = x.intersect(y)

      assert.equal(0, z.toArray().length)
    })

    void test('contained wildcard intersection', function () {
      var x = lunr.TokenSet.fromString('foo'),
          y = lunr.TokenSet.fromString('f*o'),
          z = x.intersect(y)

      assert.deepEqual(['foo'], z.toArray())
    })

    void test('contained wildcard backtracking intersection', function () {
      // eslint-disable-next-line @cspell/spellchecker
      var x = lunr.TokenSet.fromString('ababc'),
          y = lunr.TokenSet.fromString('a*bc'),
          z = x.intersect(y)

      // eslint-disable-next-line @cspell/spellchecker
      assert.deepEqual(['ababc'], z.toArray())
    })

    void test('contained wildcard no intersection', function () {
      var x = lunr.TokenSet.fromString('foo'),
          y = lunr.TokenSet.fromString('b*r'),
          z = x.intersect(y)

      assert.equal(0, z.toArray().length)
    })

    void test('contained wildcard backtracking no intersection', function () {
      // eslint-disable-next-line @cspell/spellchecker
      var x = lunr.TokenSet.fromString('ababc'),
          y = lunr.TokenSet.fromString('a*ac'),
          z = x.intersect(y)

      assert.equal(0, z.toArray().length)
    })

    void test('wildcard matches zero or more characters', function () {
      var x = lunr.TokenSet.fromString('foo'),
          y = lunr.TokenSet.fromString('foo*'),
          z = x.intersect(y)

      assert.deepEqual(['foo'], z.toArray())
    })

    // This test is intended to prevent 'bugs' that have lead to these
    // kind of intersections taking a _very_ long time. The assertion
    // is not of interest, just that the test does not timeout.
    void test('catastrophic backtracking with leading characters', function () {
      var x = lunr.TokenSet.fromString('fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'),
          y = lunr.TokenSet.fromString('*ff'),
          z = x.intersect(y)

      assert.equal(1, z.toArray().length)
    })

    void test('leading and trailing backtracking intersection', function () {
      // eslint-disable-next-line @cspell/spellchecker
      var x = lunr.TokenSet.fromString('acbaabab'),
          y = lunr.TokenSet.fromString('*ab*'),
          z = x.intersect(y)

      // eslint-disable-next-line @cspell/spellchecker
      assert.deepEqual(['acbaabab'], z.toArray())
    })

    void test('multiple contained wildcard backtracking', function () {
      // eslint-disable-next-line @cspell/spellchecker
      var x = lunr.TokenSet.fromString('acbaabab'),
          y = lunr.TokenSet.fromString('a*ba*b'),
          z = x.intersect(y)

      // eslint-disable-next-line @cspell/spellchecker
      assert.deepEqual(['acbaabab'], z.toArray())
    })

    void test('intersect with fuzzy string substitution', function () {
      var x1 = lunr.TokenSet.fromString('bar'),
          x2 = lunr.TokenSet.fromString('cur'),
          x3 = lunr.TokenSet.fromString('cat'),
          x4 = lunr.TokenSet.fromString('car'),
          x5 = lunr.TokenSet.fromString('foo'),
          y = lunr.TokenSet.fromFuzzyString('car', 1)

      assert.deepEqual(x1.intersect(y).toArray(), ["bar"])
      assert.deepEqual(x2.intersect(y).toArray(), ["cur"])
      assert.deepEqual(x3.intersect(y).toArray(), ["cat"])
      assert.deepEqual(x4.intersect(y).toArray(), ["car"])
      assert.equal(x5.intersect(y).toArray().length, 0)
    })

    void test('intersect with fuzzy string deletion', function () {
      var x1 = lunr.TokenSet.fromString('ar'),
          x2 = lunr.TokenSet.fromString('br'),
          x3 = lunr.TokenSet.fromString('ba'),
          x4 = lunr.TokenSet.fromString('bar'),
          x5 = lunr.TokenSet.fromString('foo'),
          y = lunr.TokenSet.fromFuzzyString('bar', 1)

      assert.deepEqual(x1.intersect(y).toArray(), ["ar"])
      assert.deepEqual(x2.intersect(y).toArray(), ["br"])
      assert.deepEqual(x3.intersect(y).toArray(), ["ba"])
      assert.deepEqual(x4.intersect(y).toArray(), ["bar"])
      assert.equal(x5.intersect(y).toArray().length, 0)
    })

    void test('intersect with fuzzy string insertion', function () {
      // eslint-disable-next-line @cspell/spellchecker
      var x1 = lunr.TokenSet.fromString('bbar'),
          // eslint-disable-next-line @cspell/spellchecker
          x2 = lunr.TokenSet.fromString('baar'),
          x3 = lunr.TokenSet.fromString('barr'),
          x4 = lunr.TokenSet.fromString('bar'),
          x5 = lunr.TokenSet.fromString('ba'),
          x6 = lunr.TokenSet.fromString('foo'),
          x7 = lunr.TokenSet.fromString('bara'),
          y = lunr.TokenSet.fromFuzzyString('bar', 1)

      // eslint-disable-next-line @cspell/spellchecker
      assert.deepEqual(x1.intersect(y).toArray(), ["bbar"])
      // eslint-disable-next-line @cspell/spellchecker
      assert.deepEqual(x2.intersect(y).toArray(), ["baar"])
      assert.deepEqual(x3.intersect(y).toArray(), ["barr"])
      assert.deepEqual(x4.intersect(y).toArray(), ["bar"])
      assert.deepEqual(x5.intersect(y).toArray(), ["ba"])
      assert.equal(x6.intersect(y).toArray().length, 0)
      assert.deepEqual(x7.intersect(y).toArray(), ["bara"])
    })

    void test('intersect with fuzzy string transpose', function () {
      var x1 = lunr.TokenSet.fromString('abr'),
          x2 = lunr.TokenSet.fromString('bra'),
          x3 = lunr.TokenSet.fromString('foo'),
          y = lunr.TokenSet.fromFuzzyString('bar', 1)

      assert.deepEqual(x1.intersect(y).toArray(), ["abr"])
      assert.deepEqual(x2.intersect(y).toArray(), ["bra"])
      assert.equal(x3.intersect(y).toArray().length, 0)
    })

    void test('fuzzy string insertion', function () {
    // eslint-disable-next-line @cspell/spellchecker
      var x = lunr.TokenSet.fromString('abcxx'),
          y = lunr.TokenSet.fromFuzzyString('abc', 2)

      // eslint-disable-next-line @cspell/spellchecker
      assert.deepEqual(x.intersect(y).toArray(), ['abcxx'])
    })

    void test('fuzzy string substitution', function () {
      var x = lunr.TokenSet.fromString('axx'),
          y = lunr.TokenSet.fromFuzzyString('abc', 2)

      assert.deepEqual(x.intersect(y).toArray(), ['axx'])
    })

    void test('fuzzy string deletion', function () {
      var x = lunr.TokenSet.fromString('a'),
          y = lunr.TokenSet.fromFuzzyString('abc', 2)

      assert.deepEqual(x.intersect(y).toArray(), ['a'])
    })

    void test('fuzzy string transpose', function () {
      var x = lunr.TokenSet.fromString('bca'),
          y = lunr.TokenSet.fromFuzzyString('abc', 2)

      assert.deepEqual(x.intersect(y).toArray(), ['bca'])
    })

  })
})
