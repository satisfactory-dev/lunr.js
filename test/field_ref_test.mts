import { FieldRef } from '@satisfactory-dev/lunr'

import assert from 'assert/strict'

import {
  suite,
  test,
} from './shim.mts'

void suite('FieldRef', function () {
  void suite('#toString', function () {
    void test('combines document ref and field name', function () {
      var fieldName = "title",
          documentRef = "123",
          fieldRef = new FieldRef (documentRef, fieldName)

      assert.equal(fieldRef.toString(), "title/123")
    })
  })

  void suite('.fromString', function () {
    void test('splits string into parts', function () {
      var fieldRef = FieldRef.fromString("title/123")

      assert.equal(fieldRef.fieldName, "title")
      assert.equal(fieldRef.docRef, "123")
    })

    void test('docRef contains join character', function () {
      var fieldRef = FieldRef.fromString("title/http://example.com/123")

      assert.equal(fieldRef.fieldName, "title")
      assert.equal(fieldRef.docRef, "http://example.com/123")
    })

    void test('string does not contain join character', function () {
      var s = "docRefOnly"

      assert.throws(function () {
        FieldRef.fromString(s)
      })
    })
  })
})
