import type {
  PipelineFunction,
  LabeledPipelineFunction,
} from '../lunr.ts'

import { Pipeline } from '../lunr.ts'

import assert from 'assert/strict'

import {
  suite,
  test,
  beforeEach,
  afterEach,
} from './shim.ts'

void suite('lunr.Pipeline', function () {
  var noop = () => {}

  let existingRegisteredFunctions: typeof Pipeline['registeredFunctions']
  let existingWarnIfFunctionNotRegistered: typeof Pipeline['functionNotRegisteredHandler']

  beforeEach((): Promise<void> => {
    existingRegisteredFunctions = Pipeline.registeredFunctions
    existingWarnIfFunctionNotRegistered = Pipeline.functionNotRegisteredHandler

    Pipeline.registeredFunctions = {}
    Pipeline.functionNotRegisteredHandler = noop

    return Promise.resolve()
  })

  afterEach((): Promise<void> => {
    Pipeline.registeredFunctions = existingRegisteredFunctions
    Pipeline.functionNotRegisteredHandler = existingWarnIfFunctionNotRegistered

    return Promise.resolve()
  })

  void suite('#add', function () {
    void test('add function to pipeline', function () {
      const pipeline = new Pipeline()

      pipeline.add(noop as unknown as LabeledPipelineFunction)
      assert.equal(1, pipeline.stackLength)
    })

    void test('add multiple functions to the pipeline', function () {
      const pipeline = new Pipeline()
      pipeline.add(
        noop as unknown as LabeledPipelineFunction,
        noop as unknown as LabeledPipelineFunction,
      )
      assert.equal(2, pipeline.stackLength)
    })
  })

  void suite('#remove', function () {
    void test('function exists in pipeline', function () {
      const pipeline = new Pipeline()
      pipeline.add(noop as unknown as LabeledPipelineFunction)
      assert.equal(1, pipeline.stackLength)
      pipeline.remove(noop as unknown as LabeledPipelineFunction)
      assert.equal(0, pipeline.stackLength)
    })

    void test('function does not exist in pipeline', function () {
      var fn = function () {} as unknown as LabeledPipelineFunction
      const pipeline = new Pipeline()
      pipeline.add(noop as unknown as LabeledPipelineFunction)
      assert.equal(1, pipeline.stackLength)
      pipeline.remove(fn)
      assert.equal(1, pipeline.stackLength)
    })
  })

  void suite('#before', function () {
    var fn = function () {} as unknown as LabeledPipelineFunction

    void test('other function exists', function () {
      const pipeline = new Pipeline()
      pipeline.add(noop as unknown as LabeledPipelineFunction)
      pipeline.before(noop as unknown as LabeledPipelineFunction, fn)

      assert.deepEqual([fn, noop], pipeline.toArray())
    })

    void test('other function does not exist', function () {
      const pipeline = new Pipeline()

      assert.throws(() => {

        pipeline.before(noop as unknown as LabeledPipelineFunction, fn)
      })
      assert.equal(0, pipeline.stackLength)
    })
  })

  void suite('#after', function () {
    var fn = function () {} as unknown as LabeledPipelineFunction

    void test('other function exists', function () {
      const pipeline = new Pipeline()
      pipeline.add(noop as unknown as LabeledPipelineFunction)
      pipeline.after(noop as unknown as LabeledPipelineFunction, fn)

      assert.deepEqual([noop as unknown as LabeledPipelineFunction, fn], pipeline.toArray())
    })

    void test('other function does not exist', function () {
      const pipeline = new Pipeline()
      assert.throws(() => {
        pipeline.after(noop as unknown as LabeledPipelineFunction, fn)
      })
      assert.equal(0, pipeline.stackLength)
    })
  })

  void suite('#run', function () {
    void test('calling each function for each token', function () {
      const pipeline = new Pipeline()
      var count1 = 0, count2 = 0,
          fn1 = Pipeline.labelFunction(
            function (t: number) { count1++; return t },
            'fn1',
          ),
          fn2 = Pipeline.labelFunction(
            function (t: number) { count2++; return t },
            'fn2',
          )

      pipeline.add(fn1, fn2)
      pipeline.run([1, 2, 3])

      assert.equal(3, count1)
      assert.equal(3, count2)
    })

    void test('passes token to pipeline function', function () {
      const pipeline = new Pipeline()
      pipeline.add(Pipeline.labelFunction(function (token: string) {
        assert.equal('foo', token)

        return token
      }, 'test'))

      pipeline.run(['foo'])
    })

    void test('passes index to pipeline function', function () {
      const pipeline = new Pipeline()
      pipeline.add(Pipeline.labelFunction(function (token: string, index: number) {
        assert.equal(0, index)

        return token
      }, 'test'))

      pipeline.run(['foo'])
    })

    void test('passes entire token array to pipeline function', function () {
      const pipeline = new Pipeline()
      pipeline.add(Pipeline.labelFunction<PipelineFunction<string>>(function (token: string, index?: number, tokens?: string[]) {
        assert.deepEqual(['foo'], tokens)

        return token
      }, 'test'))

      pipeline.run(['foo'])
    })

    void test('passes output of one function as input to the next', function () {
      const pipeline = new Pipeline()
      pipeline.add(Pipeline.labelFunction(function (t: string) {
        return t.toUpperCase()
      }, 'toUppercase'))

      pipeline.add(Pipeline.labelFunction(function (t: string) {
        assert.equal('FOO', t)

        return t
      }, 'test'))

      pipeline.run(['foo'])
    })

    void test('returns the results of the last function', function () {
      const pipeline = new Pipeline()
      pipeline.add(Pipeline.labelFunction(function (t: string) {
        return t.toUpperCase()
      }, 'toUppercase'))

      assert.deepEqual(['FOO'], pipeline.run(['foo']))
    })

    void test('filters out null, undefined and empty string values', function () {
      const pipeline = new Pipeline()
      var tokens: string[] = [],
          output

      // only pass on tokens for even token indexes
      // return null for 'foo'
      // return undefined for 'bar'
      // return '' for 'baz'
      pipeline.add(Pipeline.labelFunction(function (t: string, i: number) {
        if (i == 4) {
          return null
        } else if (i == 5) {
          return ''
        } if (i % 2) {
          return t
        } else {
          return undefined
        }
      }, 'procedural'))

      pipeline.add(Pipeline.labelFunction(function (t: string) {
        tokens.push(t)
        return t
      }, 'test'))

      output = pipeline.run(['a', 'b', 'c', 'd', 'foo', 'bar', 'baz'])

      assert.deepEqual(['b', 'd'], tokens)
      assert.deepEqual(['b', 'd'], output)
    })

    void suite('expanding tokens', function () {
      void test('passed to output', function () {
        const pipeline = new Pipeline()
        pipeline.add(Pipeline.labelFunction(function (t: string) {
          return [t, t.toUpperCase()]
        }, 'test'))

        assert.deepEqual(["foo", "FOO"], pipeline.run(['foo']))
      })

      void test('not passed to same function', function () {
        const pipeline = new Pipeline()
        var received: string[] = []

        pipeline.add(Pipeline.labelFunction(function (t: string) {
          received.push(t)
          return [t, t.toUpperCase()]
        }, 'test'))

        pipeline.run(['foo'])

        assert.deepEqual(['foo'], received)
      })

      void test('passed to the next pipeline function', function () {
        const pipeline = new Pipeline()
        var received: string[] = []

        pipeline.add(Pipeline.labelFunction(function (t: string) {
          return [t, t.toUpperCase()]
        }, 'mixedCase'))

        pipeline.add(Pipeline.labelFunction(function (t: string) {
          received.push(t)

          return t
        }, 'test'))

        pipeline.run(['foo'])

        assert.deepEqual(['foo', 'FOO'], received)
      })
    })
  })

  void suite('#toJSON', function () {
    void test('returns an array of registered function labels', function () {
      const pipeline = new Pipeline()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      var fn: PipelineFunction<string> = function (_t: string) {}

      pipeline.add(Pipeline.registerFunction(fn, 'fn'))

      assert.deepEqual(['fn'], pipeline.toJSON())
    })
  })

  void suite('.registerFunction', function () {
    void test('adds a label property to the function', function () {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const fn: PipelineFunction<string> = (_t: string) => {}

      assert.equal('label' in fn, false)

      Pipeline.registerFunction(fn, 'fn')

      assert.equal('label' in fn, true)
      assert.equal('fn', (fn as LabeledPipelineFunction).label)
    })

    void test('adds function to the list of registered functions', function () {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const fn: PipelineFunction<string> = (_t: string) => {}
      Pipeline.registerFunction(fn, 'fn')

      assert.equal(fn, Pipeline.registeredFunctions['fn'])
    })

    void test('throws if instructed', () => {
      const fn = Pipeline.labelFunction(() => {}, 'fn')

      assert.doesNotThrow(() => {
        Pipeline.warnIfFunctionNotRegistered(fn)
      })

      Pipeline.functionNotRegisteredHandler = existingWarnIfFunctionNotRegistered

      assert.doesNotThrow(() => {
        Pipeline.warnIfFunctionNotRegistered(fn)
      })

      Pipeline.functionNotRegisteredHandler = (fn) => {
        console.error(fn)

        throw new Error('threw')
      }

      assert.throws(() => {
        Pipeline.warnIfFunctionNotRegistered(fn)
      })
    })
  })

  void suite('.load', function () {
    void test('with registered functions', function () {
      var fn = function () {},
          serializedPipeline = ['fn'],
          pipeline

      Pipeline.registerFunction(fn, 'fn')

      pipeline = Pipeline.load(serializedPipeline)

      assert.equal(1, pipeline.stackLength)
      assert.equal(fn, pipeline.atIndex(0))
    })

    void test('with unregistered functions', function () {
      var serializedPipeline = ['fn']

      assert.throws(function () {
        Pipeline.load(serializedPipeline)
      })
    })
  })

  void suite('#reset', function () {
    void test('empties the stack', function () {
      const pipeline = new Pipeline()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      pipeline.add(Pipeline.labelFunction((_t: string) => {}, 'test'))

      assert.equal(1, pipeline.stackLength)

      pipeline.reset()

      assert.equal(0, pipeline.stackLength)
    })
  })
})
