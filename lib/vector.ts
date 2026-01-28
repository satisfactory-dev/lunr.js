/*!
 * Vector
 * Copyright (C) 2020 Oliver Nightingale
 * Copyright (C) @YEAR SignpostMarv
 */

export type upsertFunction<
  Odd extends number | string = number | string,
> = (a: Odd, b: Odd) => Odd

/**
 * A vector is used to construct the vector space of documents and queries. These
 * vectors support operations to determine the similarity between two documents or
 * a document and a query.
 *
 * Normally no parameters are required for initializing a vector, but in the case of
 * loading a previously dumped vector the raw elements can be provided to the constructor.
 *
 * For performance reasons vectors are implemented with a flat array, where an elements
 * index is immediately followed by its value. E.g. [index, value, index, value]. This
 * allows the underlying array to be as sparse as possible and still offer decent
 * performance when being used for vector calculations.
 */
export class Vector<
  Odd extends number | string = number | string,
  Elements extends Odd[] = Odd[],
> {
  #magnitude: number | undefined = undefined
  #magnitudeSquared: number = 0

  readonly #positions: number[]
  readonly #elements: Elements | never[]

  /**
 * @param {Elements} [elements] - The flat list of element index and element value pairs.
   */
  constructor (positions: number[] = [], elements: Elements | never[] = []) {
    if (positions.length !== elements.length) {
      throw new Error('Positions and Elements must be of equal length!')
    }
    this.#positions = positions
    this.#elements = elements
  }

  /**
   * Calculates the position within the vector to insert a given index.
   *
   * This is used internally by insert and upsert. If there are duplicate indexes then
   * the position is returned as if the value for that index were to be updated, but it
   * is the callers responsibility to check whether there is a duplicate at that index
   *
   * @param {number} index - The index at which the element should be inserted.
   */
  positionForIndex (index: number): number {
    // For an empty vector the tuple can be inserted at the beginning
    if (this.#elements.length == 0) {
      return 0
    }

    var start = 0,
        end = this.#elements.length,
        sliceLength = end - start,
        pivotPoint = Math.floor(sliceLength / 2),
        pivotIndex = this.#positions[pivotPoint]

    while (sliceLength > 1) {
      if (pivotIndex < index) {
        start = pivotPoint
      }

      if (pivotIndex > index) {
        end = pivotPoint
      }

      if (pivotIndex == index) {
        break
      }

      sliceLength = end - start
      pivotPoint = start + Math.floor(sliceLength / 2)
      pivotIndex = this.#positions[pivotPoint]
    }

    if (pivotIndex == index) {
      return pivotPoint
    }

    if (pivotIndex > index) {
      return pivotPoint
    }

    return (pivotPoint + 1)
  }

  /**
   * Inserts an element at an index within the vector.
   *
   * Does not allow duplicates, will throw an error if there is already an entry
   * for this index.
   *
   * @param {number} insertIdx - The index at which the element should be inserted.
   * @param {Odd} val - The value to be inserted into the vector.
   */
  insert (insertIdx: number, val: Odd) {
    this.upsert(insertIdx, val, function () {
      throw new Error("duplicate index")
    })
  }

  /**
   * Inserts or updates an existing index within the vector.
   *
   * @param {number} insertIdx - The index at which the element should be inserted.
   * @param {Odd} val - The value to be inserted into the vector.
   * @param {upsertFunction<Odd>} [fn] - A function that is called for updates, the existing value and the
   * requested value are passed as arguments
   */
  upsert (insertIdx: number, val: Odd, fn?: upsertFunction<Odd>) {
    this.#magnitudeSquared = 0
    this.#magnitude = undefined
    var position = this.positionForIndex(insertIdx)

    if (this.#positions[position] == insertIdx) {
      if (!fn) {
        return
      }
      this.#elements[position] = fn(this.#elements[position], val)
    } else {
      this.#positions.splice(position, 0, insertIdx)
      this.#elements.splice(position, 0, val)
    }
  }

  /**
   * Calculates the magnitude of this vector.
   */
  get magnitude (): number {
    if (undefined === this.#magnitude) {
      this.#magnitude = Math.sqrt(this.magnitudeSquared)
    }

    return this.#magnitude
  }

  /**
   * Calculates the square of the magnitude of this vector.
   */
  get magnitudeSquared (): number {
    if (this.#magnitudeSquared) return this.#magnitudeSquared

    var sumOfSquares = 0,
        elementsLength = this.#elements.length

    for (var i = 0; i < elementsLength; i += 1) {
      var val = this.#elements[i] as number
      sumOfSquares += val * val
    }

    return this.#magnitudeSquared = sumOfSquares
  }

  /**
   * Calculates the dot product of this vector and another vector.
   *
   * @param {Vector} otherVector - The vector to compute the dot product with.
  */
  dot (otherVector: Vector): number {
    var dotProduct = 0,
        aPositions = this.#positions,
        bPositions = otherVector.#positions,
        a = this.#elements, b = otherVector.#elements,
        aLen = a.length, bLen = b.length,
        aVal = 0, bVal = 0,
        i = 0, j = 0

    while (i < aLen && j < bLen) {
      aVal = aPositions[i]
      bVal = bPositions[j]
      if (aVal < bVal) {
        i += 1
      } else if (aVal > bVal) {
        j += 1
      } else if (aVal == bVal) {
        dotProduct += (a[i] as number) * (b[j] as number)
        i += 1
        j += 1
      }
    }

    return dotProduct
  }

  /**
   * Calculates the similarity between this vector and another vector.
   *
   * @param {Vector} otherVector - The other vector to calculate the
   * similarity with.
   */
  similarity (otherVector: Vector): number {
    const dot = (this.dot(otherVector) ** 2) * 2
    return (dot / this.magnitudeSquared) || 0
  }

  /**
   * Converts the vector to an array of the elements within the vector.
   */
  toArray (): (Odd)[] {
    return this.#elements
  }

  /**
   * A JSON serializable representation of the vector.
   */
  toJSON () {
    const output: {
      positions: number[],
      elements: Odd[],
    } = {
      positions: [],
      elements: [],
    }

    for (let i = 0; i < this.#elements.length; ++i) {
      output.positions.push(this.#positions[i])
      output.elements.push(this.#elements[i])
    }

    return output
  }
}

/**
 * Number-only implementation of Vector
 *
 * Since the test cases revealed the default implementation should support
 * strings, this implementation is type-hinted to only support numbers.
 */
export class NumberVector extends Vector<number> {}
