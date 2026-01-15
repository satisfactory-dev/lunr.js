import lunr, {
  Token,
  Pipeline,
} from '../lunr.ts'

import {
  suite,
  words,
} from './perf_helper.ts'

suite('lunr.Pipeline', function () {
  var tokenToToken = function (token: Token) {
    return token
  }

  var tokenToTokenArray = function (token: Token) {
    return [token, token]
  }

  var buildTokens = function (count: number) {
    return words.slice(0, count).map(function (word) {
      return new Token(word)
    })
  }

  lunr.Pipeline.registerFunction(tokenToToken, 'tokenToToken')
  lunr.Pipeline.registerFunction(tokenToTokenArray, 'tokenToTokenArray')

  var fewTokens = buildTokens(50)
  var manyTokens = buildTokens(1000)

  var tokenToTokenPipeline = new lunr.Pipeline
  tokenToTokenPipeline.add(Pipeline.registeredFunctions.tokenToToken)

  var tokenToTokenArrayPipeline = new lunr.Pipeline
  tokenToTokenArrayPipeline.add(Pipeline.registeredFunctions.tokenToTokenArray)

  this.add('few tokens, token -> token', function () {
    tokenToTokenPipeline.run(fewTokens)
  })

  this.add('many tokens, token -> token', function () {
    tokenToTokenPipeline.run(manyTokens)
  })

  this.add('few tokens, token -> token array', function () {
    tokenToTokenArrayPipeline.run(fewTokens)
  })

  this.add('many tokens, token -> token array', function () {
    tokenToTokenArrayPipeline.run(manyTokens)
  })
})
