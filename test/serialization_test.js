suite('serialization', function () {
  setup(function () {
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

    const config = function () {
      this.ref = 'id'
      this.field('title')
      this.field('body')

      documents.forEach(function (document) {
        this.add(document)
      }, this)
    }

    this.idx = lunr.default(config)

    this.serializedIdx = JSON.stringify(this.idx)
    this.loadedIdx = lunr.Index.load(JSON.parse(this.serializedIdx))

    this.upstreamSerializedIdx = JSON.stringify(upstreamLunr(config))
  })

  test('search', function () {
    var idxResults = this.idx.search('green'),
        serializedResults = this.loadedIdx.search('green')

    assert.deepEqual(idxResults, serializedResults)
  })

  test('load version mismatch', function () {
    const index = JSON.parse(this.serializedIdx)
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
      `'not a supported version' != '${lunr.version}'`,
    )
  })

  test('load upstream index', function () {
    assert.include(
      lunr.compatibleVersions,
      upstreamLunr.version,
    )

    const index = JSON.parse(this.upstreamSerializedIdx)

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

  test('__proto__ double serialization', function () {
    var doubleLoadedIdx = lunr.Index.load(JSON.parse(JSON.stringify(this.loadedIdx))),
        idxResults = this.idx.search('__proto__'),
        doubleSerializedResults = doubleLoadedIdx.search('__proto__')

    assert.deepEqual(idxResults, doubleSerializedResults)
  })
})
