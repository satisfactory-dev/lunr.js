/*!
 * Set
 * Copyright (C) 2020 Oliver Nightingale
 * Copyright (C) @YEAR SignpostMarv
 */

/**
 * A lunr set.
 */
export class Set {
  elements: { [s: string]: boolean }

  readonly length: number

  constructor (elements?: string[]) {
    this.elements = Object.create(null) as Set['elements']

    if (elements) {
      this.length = elements.length

      for (var i = 0; i < this.length; i++) {
        this.elements[elements[i]] = true
      }
    } else {
      this.length = 0
    }
  }

  /**
   * Returns true if this set contains the specified object.
   *
   * @param {string} object - Object whose presence in this set is to be tested.
   * @returns {boolean} - True if this set contains the specified object.
   */
  contains (object: string): boolean {
    return !!this.elements[object]
  }

  /**
   * Returns a new set containing only the elements that are present in both
   * this set and the specified set.
   *
   * @param {Set} other - set to intersect with this set.
   * @returns {Set} a new set that is the intersection of this and the specified set.
   */
  intersect (other: Set): Set {
    var a: Set | this
    var b: Set | this
    var elements, intersection = []

    if (other instanceof SetComplete) {
      return this
    }

    if (other instanceof SetEmpty) {
      return other
    }

    if (this.length < other.length) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      a = this
      b = other
    } else {
      a = other
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      b = this
    }

    elements = Object.keys(a.elements)

    for (var i = 0; i < elements.length; i++) {
      var element = elements[i]
      if (element in b.elements) {
        intersection.push(element)
      }
    }

    return new Set(intersection)
  }

  /**
   * Returns a new set combining the elements of this and the specified set.
   *
   * @param {Set} other - set to union with this set.
   * @return {Set} a new set that is the union of this and the specified set.
   */
  union (other: Set): Set {
    if (other instanceof SetComplete) {
      return other
    }

    if (other instanceof SetEmpty) {
      return this
    }

    return new Set(Object.keys(this.elements).concat(Object.keys(other.elements)))
  }
}

/**
 * A complete set that contains all elements.
 */
export class SetComplete extends Set {
  intersect (other: Set) {
    return other
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  union (other: Set): this {
    return this
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  contains (object: object | string) {
    return true
  }
}

/**
 * An empty set that contains no elements.
 */
export class SetEmpty extends Set {
  intersect (): this {
    return this
  }

  union (other: Set) {
    return other
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  contains (object: object | string) {
    return false
  }
}
