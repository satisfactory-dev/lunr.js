import type { LunrConfig, SerializedIndex} from '@satisfactory-dev/lunr'
import lunr from '@satisfactory-dev/lunr'

import type {
  ConfigFunction,
} from 'lunr'
import type upstreamLunrFunc from 'lunr'

import upstreamLunr from 'lunr'

import assert from 'assert/strict'

import {
  suite,
  test,
} from './shim.ts'

declare global {
  const upstreamLunr: typeof upstreamLunrFunc
}

void suite('serialization', function () {
  const setup = () => {
    var documents = [
      {
        id: 'a',
        title: 'Mr. Green kills Colonel Mustard',
        body: 'Mr. Green killed Colonel Mustard in the study with the candlestick. Mr. Green is not a very nice fellow.',
        wordCount: 19,
      },
      {
        id: 'b',
        title: 'Plumb waters plant',
        body: 'Professor Plumb has a green plant in his study',
        wordCount: 9,
      },
      {
        id: 'c',
        title: 'Scarlett helps Professor',
        body: 'Miss Scarlett watered Professor Plumbs green plant while he was away from his office last week.',
        wordCount: 16,
      },
      {
        id: 'd',
        title: 'All about JavaScript',
        body: 'JavaScript objects have a special __proto__ property',
        wordCount: 7,
      },
    ]

    const config: LunrConfig & ConfigFunction = function () {
      this.ref = 'id'
      this.field('title')
      this.field('body')

      documents.forEach((document) => {
        this.add(document)
      })
    }

    const idx = lunr(config)

    const serializedIdx = JSON.stringify(idx)
    const loadedIdx = lunr.Index.load(JSON.parse(serializedIdx) as SerializedIndex)

    const upstreamSerializedIdx = JSON.stringify(upstreamLunr(config))

    return {
      idx,
      serializedIdx,
      loadedIdx,
      upstreamSerializedIdx,
    }
  }

  void test('search', function () {
    const {
      idx,
      loadedIdx,
    } = setup()
    var idxResults = idx.search('green'),
        serializedResults = loadedIdx.search('green')

    assert.deepEqual(idxResults, serializedResults)
  })

  void test('load version mismatch', function () {
    const {
      serializedIdx,
    } = setup()
    const index = JSON.parse(serializedIdx) as SerializedIndex
    assert.doesNotThrow(() => {
      lunr.Index.load(index)
    })
    assert.doesNotThrow(() => {
      lunr.Index.load({
        ...index,
        version: 'not a supported version',
      })
    })
    let called = false
    assert.doesNotThrow(() => {
      lunr.Index.load(
        {
          ...index,
          version: 'not a supported version',
        },
        {
          versionConflictHandler: () => {
            called = true
          },
        },
      )
    })
    assert.equal(called, true, 'Custom conflict handler was not called!')
    assert.throws(
      () => {
        lunr.Index.load(
          {
            ...index,
            version: 'not a supported version',
          },
          {
            versionConflictHandler: 'throw',
          },
        )
      },
      Error,
      `Version mismatch when loading serialised index. Current version of lunr '${
        lunr.version
      }' does not match serialized index 'not a supported version'`,
    )
    assert.throws(
      () => {
        lunr.Index.load(
          {
            ...index,
            version: 'not a supported version',
          },
          {
            versionConflictHandler: 'throw',
            versionConflictFormatter: (a, b) => `'${a}' != '${b}'`,
          },
        )
      },
      Error,
      `'not a supported version' != '${lunr.version}'`,
    )
  })

  void test('load upstream index', function () {
    assert.equal(
      lunr.compatibleVersions.includes(upstreamLunr.version),
      true,
    )

    const {
      upstreamSerializedIdx,
    } = setup()

    const index = JSON.parse(upstreamSerializedIdx) as SerializedIndex

    assert.doesNotThrow(() => {
      lunr.Index.load(
        index,
        {
          versionConflictHandler: 'throw',
        },
      )
    })

    assert.throws(() => {
      lunr.Index.load(
        {
          ...index,
          version: '2.3.8',
        },
        {
          versionConflictHandler: 'throw',
        },
      )
    })
  })

  void test('__proto__ double serialization', function () {
    const {
      loadedIdx,
      idx,
    } = setup()

    var doubleLoadedIdx = lunr.Index.load(JSON.parse(JSON.stringify(loadedIdx)) as SerializedIndex),
        idxResults = idx.search('__proto__'),
        doubleSerializedResults = doubleLoadedIdx.search('__proto__')

    assert.deepEqual(idxResults, doubleSerializedResults)
  })
})
