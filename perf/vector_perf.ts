import * as lunr from '../lunr.ts'

import type {
  SuiteCallback,
} from './perf_helper.ts'
import {
  suite,
} from './perf_helper.ts'

const suiteCallback = (Implementation: { new (): lunr.Vector}): SuiteCallback => function () {
  var index: number, val

  var v1 = new Implementation,
      v2 = new Implementation

  for (var i = 0; i < 1000; i++) {
    index = Math.floor(i + Math.random() * 100)
    val = Math.random() * 100
    v1.insert(i, val)
  }

  for (var i = 0; i < 1000; i++) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    index = Math.floor(i + Math.random() * 100)
    val = Math.random() * 100
    v2.insert(i, val)
  }

  this.add('magnitude', function () {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    v1.magnitude
  })

  this.add('dot', function () {
    v1.dot(v2)
  })

  this.add('similarity', function () {
    v1.similarity(v2)
  })

}

suite('lunr.Vector', suiteCallback(lunr.Vector))
suite('lunr.NumberVector', suiteCallback(lunr.NumberVector))
