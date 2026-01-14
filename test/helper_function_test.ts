import lunr, { Index } from '@satisfactory-dev/lunr'

import assert from 'assert/strict'

import {
  suite,
  test,
} from './shim.ts'

void suite ('lunr', () => {
  void test ('sync return type', () => {
    const res = lunr(() => {})

    assert.ok(res instanceof Index)
  })

  void test ('async return type', async () => {
    const res = lunr(async () => {
    })

    assert.ok(res instanceof Promise)
    assert.ok(await res instanceof Index)
  })
})
