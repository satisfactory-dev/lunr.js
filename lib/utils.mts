/*!
 * utils
 * Copyright (C) 2020 Oliver Nightingale
 * Copyright (C) @YEAR SignpostMarv
 */

import type {
  QueryClause,
} from "./query.mts"

/**
 * A class containing utility functions for the rest of the lunr library
 */
export class utils {
  /**
   * Convert an object to a string.
   *
   * In the case of `null` and `undefined` the function returns
   * the empty string, in all other cases the result of calling
   * `toString` on the passed object is returned.
   *
   * @param {unknown} obj The object to convert to a string.
   * @return {String} string representation of the passed object.
   */
  static asString (obj: unknown): string {
    if (obj === void 0 || obj === null) {
      return ""
    } else {
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      return obj.toString()
    }
  }

  /**
   * Clones an object.
   *
   * Will create a copy of an existing object such that any mutations
   * on the copy cannot affect the original.
   *
   * Only shallow objects are supported, passing a nested object to this
   * function will cause a TypeError.
   *
   * Objects with primitives, and arrays of primitives are supported.
   *
   * @param {null|undefined|object|QueryClause} [obj] The object to clone.
   * @return {Object<string, unknown> | null | undefined} a clone of the passed object.
   * @throws {TypeError} when a nested object is passed.
   */
  static clone<T extends object | QueryClause>(obj?: T | null): (
    typeof obj extends null
      ? null
      : (
        typeof obj extends undefined
          ? undefined
          : T
      )
  ) {
    if (obj === null || obj === undefined) {
      return obj as (
        typeof obj extends null
          ? null
          : (
            typeof obj extends undefined
              ? undefined
              : never
          )
      )
    }

    var clone = Object.create(null) as Partial<T>,
        keys = Object.keys(obj) as (keyof T)[]

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i],
          val = obj[key]

      if (Array.isArray(val)) {
        clone[key] = val.slice() as T[keyof T]
        continue
      }

      if (typeof val === 'string' ||
          typeof val === 'number' ||
          typeof val === 'boolean') {
        clone[key] = val
        continue
      }

      throw new TypeError("clone is not deep and does not support nested objects")
    }

    return clone as (
      typeof obj extends null
        ? never
        : (
          typeof obj extends undefined
            ? never
            : T
        )
    )
  }
}
