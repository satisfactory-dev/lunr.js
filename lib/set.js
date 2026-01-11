/*!
 * lunr.Set
 * Copyright (C) 2020 Oliver Nightingale
 * Copyright (C) @YEAR SignpostMarv
 */

/**
 * A lunr set.
 */
class LunrSet {
  /**
   * @type {Object<string, boolean>}
   */
  elements

  constructor (elements) {
  this.elements = Object.create(null)

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
 * @param {object} object - Object whose presence in this set is to be tested.
 * @returns {boolean} - True if this set contains the specified object.
 */
  contains (object) {
  return !!this.elements[object]
}

/**
 * Returns a new set containing only the elements that are present in both
 * this set and the specified set.
 *
 * @param {lunr.Set} other - set to intersect with this set.
 * @returns {lunr.Set} a new set that is the intersection of this and the specified set.
 */
  intersect (other) {
  var a, b, elements, intersection = []

  if (other instanceof LunrSetComplete) {
    return this
  }

  if (other instanceof LunrSetEmpty) {
    return other
  }

  if (this.length < other.length) {
    a = this
    b = other
  } else {
    a = other
    b = this
  }

  elements = Object.keys(a.elements)

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i]
    if (element in b.elements) {
      intersection.push(element)
    }
  }

  return new LunrSet(intersection)
}

/**
 * Returns a new set combining the elements of this and the specified set.
 *
 * @param {lunr.Set} other - set to union with this set.
 * @return {lunr.Set} a new set that is the union of this and the specified set.
 */
  union (other) {
    if (other instanceof LunrSetComplete) {
      return other
  }

    if (other instanceof LunrSetEmpty) {
    return this
  }

    return new LunrSet(Object.keys(this.elements).concat(Object.keys(other.elements)))
}
}

/**
 * A complete set that contains all elements.
 *
 * @static
 */
class LunrSetComplete extends LunrSet {
  intersect (other) {
    return other
  }

  union () {
    return this
  }

  contains () {
    return true
  }
}

/**
 * An empty set that contains no elements.
 */
class LunrSetEmpty extends LunrSet {
  /**
   * @return {this}
   */
  intersect () {
    return this
  }

  union (other) {
    return other
  }

  contains () {
    return false
  }
}

lunr.Set = LunrSet
lunr.SetComplete = LunrSetComplete
lunr.SetEmpty = LunrSetEmpty
