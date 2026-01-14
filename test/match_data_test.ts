import { MatchData } from '@satisfactory-dev/lunr'

import assert from 'assert/strict'

import {
  suite,
  test,
} from './shim.ts'

void suite('MatchData', function () {
  void suite('#combine', function () {
    const setup = () => {
      const match = new MatchData('foo', 'title', {
        position: [1],
      })

      match.combine(new MatchData('bar', 'title', {
        position: [2],
      }))

      match.add('baz', 'title', {
        position: [3],
        test: ['foo'],
      })

      match.add('baz', 'title', {
        test: ['bar'],
      })

      match.add('baz', 'body', {
        position: [3],
      })

      match.add('baz', 'body', {
        position: [4],
        test: ['foo'],
      })

      return match
    }

    void test('#terms', function () {
      assert.deepEqual(['foo', 'bar', 'baz'], Object.keys(setup().metadata))
    })

    void test('#metadata', function () {
      const match = setup()
      assert.deepEqual(match.metadata.foo.title.position, [1])
      assert.deepEqual(match.metadata.bar.title.position, [2])
      assert.deepEqual(match.metadata.baz.body.position, [3, 4])
      assert.deepEqual(match.metadata.baz.title.test, ['foo', 'bar'])
      assert.deepEqual(match.metadata.baz.body.test, ['foo'])
    })

    void test('does not mutate source data', function () {
      var metadata = { foo: [1] },
          matchData1 = new MatchData('foo', 'title', metadata),
          matchData2 = new MatchData('foo', 'title', metadata)

      matchData1.combine(matchData2)

      assert.deepEqual(metadata.foo, [1])
    })
  })
})
