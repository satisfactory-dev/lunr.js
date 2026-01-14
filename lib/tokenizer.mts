/*!
 * tokenizer
 * Copyright (C) 2020 Oliver Nightingale
 * Copyright (C) @YEAR SignpostMarv
 */

import {
  Token,
} from './token.mts'

import {
  utils,
} from './utils.mts'

import type {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Pipeline,
} from './pipeline.mts'

/**
 * A function for splitting a string into tokens ready to be inserted into
 * the search index. Uses `separator` to split strings, change
 * the value of this property to change how strings are split into tokens.
 *
 * This tokenizer will convert its parameter to a string by calling `toString` and
 * then will split this string on the character in `separator`.
 * Arrays will have their elements converted to strings and wrapped in a Token.
 *
 * Optional metadata can be passed to the tokenizer, this metadata will be cloned and
 * added as metadata to every token that is created from the object to be tokenized.
 *
 * @param {(boolean|number|string|null|object|object[])} [obj] - The object to convert into tokens
 * @param {Object<string, unknown>} [metadata] - Optional metadata to associate with every token
 * @param {RegExp} [usingSeparator] separator to use
 * @returns {Token[]}
 * @see {@link Pipeline}
 */
export const tokenizer = function (
  obj?: (boolean | number | string | null | object | object[]),
  metadata?: {[key: string]: unknown},
  usingSeparator?: RegExp,
): Token[] {
  if (obj == null || obj == undefined) {
    return []
  }

  if (Array.isArray(obj)) {
    return obj.map(function (t) {
      return new Token(
        utils.asString(t).toLowerCase(),
        utils.clone(metadata) || {},
      )
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  var str = obj.toString().toLowerCase(),
      len = str.length,
      tokens = []

  for (var sliceEnd = 0, sliceStart = 0; sliceEnd <= len; sliceEnd++) {
    var char = str.charAt(sliceEnd),
        sliceLength = sliceEnd - sliceStart

    if ((char.match(usingSeparator || separator) || sliceEnd == len)) {

      if (sliceLength > 0) {
        var tokenMetadata = utils.clone(metadata) || {}
        tokenMetadata["position"] = [sliceStart, sliceLength]
        tokenMetadata["index"] = tokens.length

        tokens.push(
          new Token (
            str.slice(sliceStart, sliceEnd),
            tokenMetadata,
          ),
        )
      }

      sliceStart = sliceEnd + 1
    }

  }

  return tokens
}

/**
 * The separator used to split a string into tokens. Override this property to change the behaviour of
 * `tokenizer` behaviour when tokenizing strings. By default this splits on whitespace and hyphens.
 *
 * @see tokenizer
 */
export const separator = /[\s-]+/
