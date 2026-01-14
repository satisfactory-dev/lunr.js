/*!
 * trimmer
 * Copyright (C) 2020 Oliver Nightingale
 * Copyright (C) @YEAR SignpostMarv
 */

import {
  Pipeline,
} from './pipeline.ts'

import type {
  Token,
} from './token.ts'

/**
 * trimmer is a pipeline function for trimming non word
 * characters from the beginning and end of tokens before they
 * enter the index.
 *
 * This implementation may not work correctly for non latin
 * characters and should either be removed or adapted for use
 * with languages with non-latin characters.
 *
 * @param {Token} token The token to pass through the filter
 * @return {Token}
 * @see Pipeline
 */
export var trimmer = Pipeline.labelFunction((token: Token) => {
  return token.update(function (s: string) {
    return s.replace(/^\W+/, '').replace(/\W+$/, '')
  })
}, 'trimmer')

Pipeline.registerFunction(trimmer, 'trimmer')
