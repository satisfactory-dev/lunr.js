/*!
 * trimmer
 * Copyright (C) 2020 Oliver Nightingale
 * Copyright (C) @YEAR SignpostMarv
 */

import {
  // eslint-disable-next-line no-unused-vars
  PipelineFunction,
  Pipeline,
} from './pipeline.mjs'

import {
  // eslint-disable-next-line no-unused-vars
  Token,
} from './token.mjs'

/**
 * trimmer is a pipeline function for trimming non word
 * characters from the beginning and end of tokens before they
 * enter the index.
 *
 * This implementation may not work correctly for non latin
 * characters and should either be removed or adapted for use
 * with languages with non-latin characters.
 *
 * @static
 * @implements {PipelineFunction}
 * @param {Token} token The token to pass through the filter
 * @return {Token}
 * @see Pipeline
 */
export const trimmer = function (token) {
  return token.update(function (s) {
    return s.replace(/^\W+/, '').replace(/\W+$/, '')
  })
}

Pipeline.registerFunction(trimmer, 'trimmer')
