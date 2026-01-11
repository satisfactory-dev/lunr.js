/*!
 * FieldRef
 * Copyright (C) 2020 Oliver Nightingale
 * Copyright (C) @YEAR SignpostMarv
 */

export class FieldRef {
  static joiner = "/"

  /**
   * @type {string}
   */
  docRef

  /**
   * @type {string}
   */
  fieldName

  /**
   * @type {string|undefined}
   */
  #stringValue

  /**
   * @param {string} docRef
   * @param {string} fieldName
   * @param {string|undefined} stringValue
   */
  constructor (docRef, fieldName, stringValue = undefined) {
    this.docRef = docRef
    this.fieldName = fieldName
    this.#stringValue = stringValue
  }

  /**
   * @param {string} s
   * @return {FieldRef}
   */
  static fromString (s) {
    var n = s.indexOf(this.joiner)

    if (n === -1) {
      throw "malformed field ref string"
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
