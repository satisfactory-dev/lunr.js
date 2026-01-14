/*!
 * Pipeline
 * Copyright (C) 2020 Oliver Nightingale
 * Copyright (C) @YEAR SignpostMarv
 */

import {
  Token,
} from './token.ts'

/**
 * A pipeline function maps Token to Token. A Token contains the token
 * string as well as all known metadata. A pipeline function can mutate the token string
 * or mutate (or add) metadata for a given token.
 *
 * A pipeline function can indicate that the passed token should be discarded by returning
 * null, undefined or an empty string. This token will not be passed to any downstream pipeline
 * functions and will not be added to the index.
 *
 * Multiple tokens can be returned by returning an array of tokens. Each token will be passed
 * to any downstream pipeline functions and all will returned tokens will be added to the index.
 *
 * Any number of pipeline functions may be chained together using a Pipeline.
 *
 * @param {Token} token - A token from the document being processed.
 * @param {number} i - The index of this token in the complete list of tokens for this document/field.
 * @param {Token[]} tokens - All tokens for this document/field.
 * @returns {(?Token|Token[])}
 */
export type PipelineFunction<
  T extends { toString(): string },
> = (
  & ((
    token: T,
    i: number,
    tokens: T[],
  ) => (
    | void
    | null
    | undefined
    | T
    | (T[])
  ))
)

export type UnlabelledPipelineFunction = (
  | PipelineFunction<Token>
  | PipelineFunction<string>
  | PipelineFunction<number>
  | PipelineFunction<{ toString(): string}>
)

export type LabeledPipelineFunction<
  T1 extends UnlabelledPipelineFunction = UnlabelledPipelineFunction,
  T2 extends string = string,
> = (
  & T1
  & {
    label: T2,
  }
)

export type FunctionNotRegisteredHandler = (fn: LabeledPipelineFunction) => void

/**
 * Instances of Pipeline maintain an ordered list of functions to be applied to all
 * tokens in documents entering the search index and queries being ran against
 * the index.
 *
 * An instance of Index created with the lunr shortcut will contain a
 * pipeline with a stop word filter and an English language stemmer. Extra
 * functions can be added before or after either of these functions or these
 * default functions can be removed.
 *
 * When run the pipeline will call each function in turn, passing a token, the
 * index of that token in the original list of all tokens and finally a list of
 * all the original tokens.
 *
 * The output of functions in the pipeline will be passed to the next function
 * in the pipeline. To exclude a token from entering the index the function
 * should return undefined, the rest of the pipeline will not be called with
 * this token.
 *
 * For serialisation of pipelines to work, all functions used in an instance of
 * a pipeline should be registered with Pipeline. Registered functions can
 * then be loaded. If trying to load a serialised pipeline that uses functions
 * that are not registered an error will be thrown.
 *
 * If not planning on serialising the pipeline then registering pipeline functions
 * is not necessary.
 */
export class Pipeline {
  #stack: LabeledPipelineFunction[] = []

  get stackLength () {
    return this.#stack.length
  }

  static registeredFunctions: { [s: string]: LabeledPipelineFunction } = {}

  /**
   * Register a function with the pipeline.
   *
   * Functions that are used in the pipeline should be registered if the pipeline
   * needs to be serialised, or a serialised pipeline needs to be loaded.
   *
   * Registering a function does not add it to a pipeline, functions must still be
   * added to instances of the pipeline for them to be used when running a pipeline.
   *
   * @param {PipelineFunction} fn - The function to check for.
   * @param {String} label - The label to register this function with
   */
  static registerFunction (fn: UnlabelledPipelineFunction, label: string): LabeledPipelineFunction<typeof fn, typeof label> {
    if (label in this.registeredFunctions) {
      console.warn('Overwriting existing registered function: ' + label)
    }

    return Pipeline.registeredFunctions[label] = this.labelFunction(
      fn,
      label,
    )
  }

  /**
   * Warns if the function is not registered as a Pipeline function.
   *
   * @param {LabeledPipelineFunction} fn - The function to check for.
   * @private
   */
  static warnIfFunctionNotRegistered (this: typeof Pipeline, fn: LabeledPipelineFunction) {
    var isRegistered = fn.label && (fn.label in this.registeredFunctions)

    if (!isRegistered) {
      this.functionNotRegisteredHandler(fn)
    }
  }

  static functionNotRegisteredHandler: FunctionNotRegisteredHandler = (fn) => {
    console.warn('Function is not registered with pipeline. This may cause problems when serialising the index.\n', fn)
  }

  /**
   * Loads a previously serialised pipeline.
   *
   * All functions to be loaded must already be registered with Pipeline.
   * If any function from the serialised data has not been registered then an
   * error will be thrown.
   *
   * @param {string[]} serialised - The serialised pipeline to load.
   * @returns {Pipeline}
   */
  static load (serialised: ReturnType<Pipeline['toJSON']>): Pipeline {
    var pipeline = new Pipeline

    serialised.forEach((fnName) => {
      var fn = this.registeredFunctions[fnName]

      if (fn) {
        pipeline.add(fn)
      } else {
        throw new Error('Cannot load unregistered function: ' + fnName)
      }
    })

    return pipeline
  }

  /**
   * @param {number} index
   *
   * @return {LabeledPipelineFunction|undefined}
   */
  atIndex (index: number): LabeledPipelineFunction | undefined {
    return this.#stack[index]
  }

  /**
   * Adds new functions to the end of the pipeline.
   *
   * Logs a warning if the function has not been registered.
   *
   * @param {LabeledPipelineFunction[]} fns - Any number of functions to add to the pipeline.
   */
  add (...fns: LabeledPipelineFunction[]) {
    fns.forEach((fn) => {
      Pipeline.warnIfFunctionNotRegistered(fn)
      this.#stack.push(fn)
    })
  }

  /**
   * Adds a single function after a function that already exists in the
   * pipeline.
   *
   * Logs a warning if the function has not been registered.
   *
   * @param {LabeledPipelineFunction} existingFn - A function that already exists in the pipeline.
   * @param {LabeledPipelineFunction} newFn - The new function to add to the pipeline.
   */
  after (existingFn: LabeledPipelineFunction, newFn: LabeledPipelineFunction) {
    Pipeline.warnIfFunctionNotRegistered(newFn)

    var pos = this.#stack.indexOf(existingFn)
    if (pos == -1) {
      throw new Error('Cannot find existingFn')
    }

    pos = pos + 1
    this.#stack.splice(pos, 0, newFn)
  }

  /**
   * Adds a single function before a function that already exists in the
   * pipeline.
   *
   * Logs a warning if the function has not been registered.
   *
   * @param {LabeledPipelineFunction} existingFn - A function that already exists in the pipeline.
   * @param {LabeledPipelineFunction} newFn - The new function to add to the pipeline.
   */
  before (existingFn: LabeledPipelineFunction, newFn: LabeledPipelineFunction) {
    Pipeline.warnIfFunctionNotRegistered(newFn)

    var pos = this.#stack.indexOf(existingFn)
    if (pos == -1) {
      throw new Error('Cannot find existingFn')
    }

    this.#stack.splice(pos, 0, newFn)
  }

  /**
   * Removes a function from the pipeline.
   *
   * @param {LabeledPipelineFunction} fn The function to remove from the pipeline.
   */
  remove (fn: LabeledPipelineFunction) {
    var pos = this.#stack.indexOf(fn)
    if (pos == -1) {
      return
    }

    this.#stack.splice(pos, 1)
  }

  /**
   * Runs the current list of functions that make up the pipeline against the
   * passed tokens.
   *
   * @param {(Token | number | string)[]} tokens The tokens to run through the pipeline.
   * @returns {Array}
   */
  run<
    T extends { toString(): string},
  > (tokens: T[]): T[] {
    var stackLength = this.#stack.length

    for (var i = 0; i < stackLength; i++) {
      var fn = this.#stack[i]
      var memo = []

      for (var j = 0; j < tokens.length; j++) {
        var result = (fn as unknown as PipelineFunction<T>)(tokens[j], j, tokens)

        if (result === null || result === void 0 || result.toString() === '') continue

        if (Array.isArray(result)) {
          for (var k = 0; k < result.length; k++) {
            memo.push(result[k])
          }
        } else {
          memo.push(result)
        }
      }

      tokens = memo
    }

    return tokens
  }

  /**
   * Convenience method for passing a string through a pipeline and getting
   * strings out. This method takes care of wrapping the passed string in a
   * token and mapping the resulting tokens back to strings.
   *
   * @param {string} [str] - The string to pass through the pipeline.
   * @param {Object<string, unknown>} [metadata] - Optional metadata to associate with the token
   * passed to the pipeline.
   * @returns {string[]}
   */
  runString (str?: string, metadata?: {[key: string]: unknown}): string[] {
    var token = new Token (str, metadata)

    return this.run([token]).map(function (t) {
      return t.toString()
    })
  }

  /**
   * Resets the pipeline by removing any existing processors.
   *
   */
  reset () {
    this.#stack = []
  }

  /**
   * Returns a light copy of Pipeline.#stack
   */
  toArray (): LabeledPipelineFunction[] {
    return [...this.#stack]
  }

  /**
   * Returns a representation of the pipeline ready for serialisation.
   *
   * Logs a warning if the function has not been registered.
   */
  toJSON (): string[] {
    return this.#stack.map(function (fn) {
      Pipeline.warnIfFunctionNotRegistered(fn)

      return fn.label
    })
  }

  static labelFunction<
    T extends UnlabelledPipelineFunction = UnlabelledPipelineFunction,
  > (
    fn: T,
    label: string,
  ): LabeledPipelineFunction<T> {
    (fn as LabeledPipelineFunction<T>).label = label

    return fn as LabeledPipelineFunction<T>
  }
}
