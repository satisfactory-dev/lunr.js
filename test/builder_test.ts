import type { fieldExtractor, PipelineFunction, Token} from '../lunr.ts'
import { Builder, Index, Pipeline, TokenSet, Vector } from '../lunr.ts'

import assert from 'assert/strict'

import {
  suite,
  test,
} from './shim.ts'

void suite('Builder', function () {
  void suite('#add', function () {
    void test('field contains terms that clash with object prototype', function () {
      const builder = new Builder()

      builder.field('title')
      builder.add({ id: 'id', title: 'constructor'})

      assert.ok('constructor' in builder.invertedIndex)

      const constructor = (builder.invertedIndex.constructor as unknown as Builder['invertedIndex'][string])

      assert.ok('title' in constructor)
      assert.ok('id' in constructor.title)
      assert.deepEqual(constructor.title.id, Object.create(null))

      assert.equal(builder.fieldTermFrequencies['title/id'].constructor, 1)
    })

    void test('field name clashes with object prototype', function () {
      const builder = new Builder()

      builder.field('constructor')
      builder.add({ id: 'id', constructor: 'constructor'})

      assert.ok('constructor' in builder.invertedIndex)

      const constructor = (builder.invertedIndex.constructor as unknown as Builder['invertedIndex'][string])

      assert.ok('constructor' in constructor)
      assert.ok('id' in constructor.constructor)

      assert.deepEqual(constructor.constructor.id, Object.create(null))
    })

    void test('document ref clashes with object prototype', function () {
      const builder = new Builder()

      builder.field('title')
      builder.add({ id: 'constructor', title: 'word'})

      assert.ok('word' in builder.invertedIndex)
      assert.ok('title' in builder.invertedIndex.word)
      assert.ok('constructor' in builder.invertedIndex.word.title)

      assert.deepEqual(builder.invertedIndex.word.title.constructor, Object.create(null))
    })

    void test('token metadata clashes with object prototype', function () {
      const builder = new Builder()

      var pipelineFunction: PipelineFunction<Token> = function (t: Token) {
        t.metadata['constructor'] = 'foo'
        return t
      }

      builder.pipeline.add(Pipeline.registerFunction(pipelineFunction, 'test'))

      // the registeredFunctions object is global, this is to prevent
      // polluting any other tests.
      delete Pipeline.registeredFunctions.test

      builder.metadataWhitelist.push('constructor')

      builder.field('title')
      builder.add({ id: 'id', title: 'word'})

      assert.ok('word' in builder.invertedIndex)
      assert.ok('title' in builder.invertedIndex.word)
      assert.ok('id' in builder.invertedIndex.word.title)
      assert.ok('constructor' in builder.invertedIndex.word.title.id)

      assert.deepEqual(builder.invertedIndex.word.title.id.constructor, ['foo'])
    })

    void test('extracting nested properties from a document', function () {
      const builder = new Builder()

      var extractor: fieldExtractor<{
        id: string,
        person: {
          name: string,
        },
      }> = function (d) { return d.person.name }

      builder.field('name', {
        extractor: extractor,
      })

      builder.add({
        id: 'id',
        person: {
          name: 'bob',
        },
      })

      assert.ok('bob' in builder.invertedIndex)
      assert.ok('name' in builder.invertedIndex.bob)
      assert.ok('id' in builder.invertedIndex.bob.name)
    })
  })

  void suite('#field', function () {
    void test('defining fields to index', function () {
      var builder = new Builder
      builder.field('foo')
      assert.ok('foo' in builder.fields)
    })

    void test('field with illegal characters', function () {
      var builder = new Builder
      assert.throws(function () {
        builder.field('foo/bar')
      })
    })
  })

  void suite('#ref', function () {
    void test('default reference', function () {
      var builder = new Builder
      assert.equal('id', builder.ref)
    })

    void test('defining a reference field', function () {
      var builder = new Builder
      builder.ref = 'foo'
      assert.equal('foo', builder.ref)
    })
  })

  void suite('#b', function () {
    void test('default value', function () {
      var builder = new Builder
      assert.equal(0.75, builder.b)
    })

    void test('values less than zero', function () {
      var builder = new Builder
      builder.b = -1
      assert.equal(0, builder.b)
    })

    void test('values higher than one', function () {
      var builder = new Builder
      builder.b = 1.5
      assert.equal(1, builder.b)
    })

    void test('value within range', function () {
      var builder = new Builder
      builder.b = 0.5
      assert.equal(0.5, builder.b)
    })
  })

  void suite('#k1', function () {
    void test('default value', function () {
      var builder = new Builder
      assert.equal(1.2, builder.k1)
    })

    void test('values less than zero', function () {
      var builder = new Builder
      builder.k1 = 1.6
      assert.equal(1.6, builder.k1)
    })
  })

  void suite('#use', function () {
    void test('calls plugin function', function () {
      const builder = new Builder()

      var wasCalled = false,
          plugin = function () { wasCalled = true }

      builder.use(plugin)
      assert.ok(wasCalled)
    })

    void test('sets context to the builder instance', function () {
      const builder = new Builder()

      var context = null,
          // eslint-disable-next-line @typescript-eslint/no-this-alias
          plugin = function (this: Builder) { context = this }

      builder.use(plugin)
      assert.equal(context, builder)
    })

    void test('passes builder as first argument', function () {
      const builder = new Builder()

      var arg = null,
          plugin = function (a: Builder) { arg = a }

      builder.use(plugin)
      assert.equal(arg, builder)
    })

    void test('forwards arguments to the plugin', function () {
      const builder = new Builder()

      var args = null,
          plugin = function (...foo: unknown[]) { args = [].slice.call(foo) }

      builder.use(plugin, 1, 2, 3)
      assert.deepEqual(args, [builder, 1, 2, 3])
    })
  })

  void suite('#build', function () {
    const setup = function () {
      var builder = new Builder,
          doc = { id: 'id', title: 'test', body: 'missing' }

      builder.ref = 'id'
      builder.field('title')
      builder.add(doc)
      builder.build()

      return builder
    }

    void test('adds tokens to invertedIndex', function () {
      const builder = setup()

      assert.ok('test' in builder.invertedIndex)
      assert.ok('title' in builder.invertedIndex.test)
      assert.ok('id' in builder.invertedIndex.test.title)
    })

    void test('builds a vector space of the document fields', function () {
      const builder = setup()

      assert.ok('title/id' in builder.fieldVectors)
      assert.ok(builder.fieldVectors['title/id'] instanceof Vector)
    })

    void test('skips fields not defined for indexing', function () {
      const builder = setup()

      assert.ok(!('missing' in builder.invertedIndex))
    })

    void test('builds a token set for the corpus', function () {
      const builder = setup()

      var needle = TokenSet.fromString('test')
      assert.ok(builder.tokenSet.intersect(needle).toArray().includes('test'))
    })

    void test('calculates document count', function () {
      const builder = setup()

      assert.equal(1, builder.documentCount)
    })

    void test('calculates average field length', function () {
      const builder = setup()

      assert.equal(1, builder.averageFieldLength['title'])
    })

    void test('index returned', function () {
      var builder = new Builder,
          doc = { id: 'id', title: 'test', body: 'missing' }

      builder.ref = 'id'
      builder.field('title')
      builder.add(doc)
      assert.ok(builder.build() instanceof Index)
    })
  })
})
