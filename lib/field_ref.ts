/*!
 * FieldRef
 * Copyright (C) 2020 Oliver Nightingale
 * Copyright (C) @YEAR SignpostMarv
 */

export class FieldRef {
  static joiner = "/"

  docRef: string

  fieldName: string

  #stringValue: string | undefined

  constructor (docRef: string, fieldName: string, stringValue: string | undefined = undefined) {
    this.docRef = docRef
    this.fieldName = fieldName
    this.#stringValue = stringValue
  }

  static fromString (s: string): FieldRef {
    var n = s.indexOf(this.joiner)

    if (n === -1) {
      throw new Error("malformed field ref string")
    }

    var fieldRef = s.slice(0, n),
        docRef = s.slice(n + 1)

    return new FieldRef (docRef, fieldRef, s)
  }

  toString () {
    if (this.#stringValue == undefined) {
      this.#stringValue = this.fieldName + FieldRef.joiner + this.docRef
    }

    return this.#stringValue
  }
}
