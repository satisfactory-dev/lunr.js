/*!
 * Builder
 * Copyright (C) 2020 Oliver Nightingale
 * Copyright (C) @YEAR SignpostMarv
 */

import {
  Index,
} from './index.mts'

import {
  tokenizer,
} from './tokenizer.mts'

import {
  Pipeline,
} from './pipeline.mts'

import {
  FieldRef,
} from './field_ref.mts'

import {
  Vector,
} from './vector.mts'

import {
  TokenSet,
} from './token_set.mts'

/**
 * A function that is used to extract a field from a document.
 *
 * Lunr expects a field to be at the top level of a document, if however the field
 * is deeply nested within a document an extractor function can be used to extract
 * the right field for indexing.
 *
 * @callback fieldExtractor
 * @param {object} doc - The document being added to the index.
 * @returns {?(string|object|object[])} obj - The object that will be indexed for this field.
 * @example <caption>Extracting a nested field</caption>
 * function (doc) { return doc.nested.field }
 */
type fieldExtractor = (doc: object) => (
  | null
  | string
  | object
  | (object[])
)

type plugin<T extends Builder> = (this: T, builder: T, ...args: unknown[]) => unknown

type invertedIndexEntryWithoutIndex = {
  [key: string]: {
    [key: string]: {
      [key: string]: unknown[],
    },
  },
}

type invertedIndexEntry = (
  & invertedIndexEntryWithoutIndex
  & {
    _index: number,
  }
)

type BuilderPrivateProperties = {
  fields: {
    [key: string]: {
      boost?: number,
      extractor?: fieldExtractor,
    }
  },
  documents: {
    [key: string]: (
      & {
        [key: string]: unknown
      }
      & {
        boost?: number,
      }
    )
  },
}

/**
 * Builder performs indexing on a set of documents and
 * returns instances of Index ready for querying.
 *
 * All configuration of the index is done via the builder, the
 * fields to index, the document reference, the text processing
 * pipeline and document scoring parameters are all set on the
 * builder before indexing.
 */
export class Builder {
  /**
   * Internal reference to the document reference field.
   */
  #ref: string

  /**
   * Internal reference to the document fields to index.
   */
  #fields: BuilderPrivateProperties['fields']

  #documents: BuilderPrivateProperties['documents']

  /**
   * A parameter to control field length normalization, setting this to 0 disabled normalization, 1 fully normalizes field lengths, the default value is 0.75.
   */
  #b: number

  /**
   * A parameter to control how quickly an increase in term frequency results in term frequency saturation, the default value is 1.2.
   */
  #k1: number

  /**
   * The inverted index maps terms to document fields.
   */
  invertedIndex: {
    [key: string]: invertedIndexEntry,
  }

  /**
   * Keeps track of document term frequencies.
   */
  fieldTermFrequencies: {[key: string]: {[key: string]: number}}

  /**
   * Keeps track of the length of documents added to the index.
   */
  fieldLengths: {[key: string]: number}

  /**
   * Function for splitting strings into tokens for indexing.
   */
  tokenizer: typeof tokenizer

  /**
   * The pipeline performs text processing on tokens before indexing.
   */
  pipeline: Pipeline

  /**
   * A pipeline for processing search terms before querying the index.
   */
  searchPipeline: Pipeline

  /**
   * Keeps track of the total number of documents indexed.
   */
  documentCount: number

  /**
   * A counter incremented for each unique term, used to identify a terms position in the vector space.
   */
  termIndex: number

  /**
   * A list of metadata keys that have been whitelisted for entry in the index.
   */
  metadataWhitelist: string[]

  /**
   * Separator to use with the tokenizer
   */
  #tokenizerSeparator: RegExp | undefined

  set tokenizerSeparator (value: RegExp | undefined) {
    this.#tokenizerSeparator = value
  }

  #averageFieldLength: {[key: string]: number} = Object.create(null) as {[key: string]: number}

  get averageFieldLength () {
    return this.#averageFieldLength
  }

  #fieldVectors: {[key: string]: Vector} = Object.create(null) as {[key: string]: Vector}

  get fieldVectors () {
    return this.#fieldVectors
  }

  #tokenSet: TokenSet | undefined

  get tokenSet () {
    if (!(this.#tokenSet)) {
      throw new TypeError(`${this.constructor.name}.tokenSet not yet created!`)
    }

    return this.#tokenSet
  }

  constructor ({
    tokenizer: {
      separator: tokenizerSeparator,
    },
  }: {
    tokenizer: {
      separator?: RegExp,
    },
  } = {
    tokenizer: {},
  }) {
    this.#ref = "id"
    this.#fields = Object.create(null) as BuilderPrivateProperties['fields']
    this.#documents = Object.create(null) as BuilderPrivateProperties['documents']
    this.invertedIndex = Object.create(null) as Builder['invertedIndex']
    this.fieldTermFrequencies = Object.create(null) as Builder['fieldTermFrequencies']
    this.fieldLengths = Object.create(null) as Builder['fieldLengths']
    this.tokenizer = tokenizer
    this.pipeline = new Pipeline
    this.searchPipeline = new Pipeline
    this.documentCount = 0
    this.#b = 0.75
    this.#k1 = 1.2
    this.termIndex = 0
    this.metadataWhitelist = []
    this.#tokenizerSeparator = tokenizerSeparator
  }

  get fields () {
    return this.#fields
  }

  get ref (): string {
    return this.#ref
  }

  /**
   * Sets the document field used as the document reference. Every document must have this field.
   * The type of this field in the document should be a string, if it is not a string it will be
   * coerced into a string by calling toString.
   *
   * The default ref is 'id'.
   *
   * The ref should _not_ be changed during indexing, it should be set before any documents are
   * added to the index. Changing it during indexing can lead to inconsistent results.
   *
   * @param {string} ref - The name of the reference field in the document.
   */
  set ref (ref: string) {
    this.#ref = ref
  }


  /**
   * Adds a field to the list of document fields that will be indexed. Every document being
   * indexed should have this field. Null values for this field in indexed documents will
   * not cause errors but will limit the chance of that document being retrieved by searches.
   *
   * All fields should be added before adding documents to the index. Adding fields after
   * a document has been indexed will have no effect on already indexed documents.
   *
   * Fields can be boosted at build time. This allows terms within that field to have more
   * importance when ranking search results. Use a field boost to specify that matches within
   * one field are more important than other fields.
   *
   * @param {string} fieldName - The name of a field to index in all documents.
   * @param {object} attributes - Optional attributes associated with this field.
   * @param {number} [attributes.boost=1] - Boost applied to all terms within this field.
   * @param {fieldExtractor} [attributes.extractor] - Function to extract a field from a document.
   * @throws {RangeError} fieldName cannot contain unsupported characters '/'
   */
  field (
    fieldName: string,
    attributes?: {
      boost?: number,
      extractor?: fieldExtractor,
    },
  ) {
    if (/\//.test(fieldName)) {
      throw new RangeError ("Field '" + fieldName + "' contains illegal character '/'")
    }

    this.#fields[fieldName] = attributes || {}
  }

  /**
   * @return {number}
   */
  get b (): number {
    return this.#b
  }

  /**
   * A parameter to tune the amount of field length normalisation that is applied when
   * calculating relevance scores. A value of 0 will completely disable any normalisation
   * and a value of 1 will fully normalise field lengths. The default is 0.75. Values of b
   * will be clamped to the range 0 - 1.
   *
   * @param {number} number - The value to set for this tuning parameter.
   */
  set b (number: number) {
    if (number < 0) {
      this.#b = 0
    } else if (number > 1) {
      this.#b = 1
    } else {
      this.#b = number
    }
  }

  /**
   * @return {number}
   */
  get k1 (): number {
    return this.#k1
  }

  /**
   * A parameter that controls the speed at which a rise in term frequency results in term
   * frequency saturation. The default value is 1.2. Setting this to a higher value will give
   * slower saturation levels, a lower value will result in quicker saturation.
   *
   * @param {number} number - The value to set for this tuning parameter.
   */
  set k1 (number: number) {
    this.#k1 = number
  }

  /**
   * Adds a document to the index.
   *
   * Before adding fields to the index the index should have been fully setup, with the document
   * ref and all fields to index already having been specified.
   *
   * The document must have a field name as specified by the ref (by default this is 'id') and
   * it should have all fields defined for indexing, though null or undefined values will not
   * cause errors.
   *
   * Entire documents can be boosted at build time. Applying a boost to a document indicates that
   * this document should rank higher in search results than other documents.
   *
   * @param {Object<string, (string | object | object[])>} doc - The document to add to the index.
   * @param {object} attributes - Optional attributes associated with this document.
   * @param {number} [attributes.boost=1] - Boost applied to all terms within this document.
   */
  add (
    doc: {[key: string]: (string | object | object[])},
    attributes: { boost?: number },
  ) {
    if (!(this.#ref in doc)) {
      throw new TypeError(`${this.#ref} not present on document!`)
    }

    var docRef = doc[this.#ref as keyof typeof doc]

    if ('string' !== typeof docRef && 'number' !== typeof docRef) {
      throw new TypeError(`doc[${this.#ref}] must be a string or number!`)
    }

    var fields = Object.keys(this.#fields)

    this.#documents[docRef] = attributes || {}
    this.documentCount += 1

    for (var i = 0; i < fields.length; i++) {
      var fieldName = fields[i],
          extractor = this.#fields[fieldName].extractor,
          field = extractor ? extractor(doc) : doc[fieldName],
          tokens = this.tokenizer(
            field || undefined,
            {
              fields: [fieldName],
            },
            this.#tokenizerSeparator,
          ),
          terms = this.pipeline.run(tokens),
          fieldRef = new FieldRef (docRef, fieldName)
      var fieldTerms = Object.create(null) as {[key: string]: number}

      this.fieldTermFrequencies[fieldRef.toString()] = fieldTerms
      this.fieldLengths[fieldRef.toString()] = 0

      // store the length of this field for this document
      this.fieldLengths[fieldRef.toString()] += terms.length

      // calculate term frequencies for this field
      for (var j = 0; j < terms.length; j++) {
        var term = terms[j]
        const termStr = term.toString()

        if ('number' !== typeof fieldTerms[termStr]) {
          fieldTerms[termStr] = 0
        }

        fieldTerms[termStr] += 1

        if ('_index' === termStr) {
          throw new Error('Cannot populate inverted index with term of _index')
        }

        const invertedIndexKey: Exclude<string, '_index'> = termStr

        // add to inverted index
        // create an initial posting if one doesn't exist
        if (this.invertedIndex[invertedIndexKey] == undefined) {
          var posting = Object.create(null) as Partial<Builder['invertedIndex'][typeof invertedIndexKey]>
          posting["_index"] = this.termIndex
          this.termIndex += 1

          for (var k = 0; k < fields.length; k++) {
            posting[fields[k]] = Object.create(null) as Builder['invertedIndex'][typeof invertedIndexKey][typeof fields[typeof k]]
          }

          this.invertedIndex[invertedIndexKey] = posting as Builder['invertedIndex'][typeof invertedIndexKey]
        }

        // add an entry for this term/fieldName/docRef to the invertedIndex
        if (this.invertedIndex[invertedIndexKey][fieldName][docRef] == undefined) {
          this.invertedIndex[invertedIndexKey][fieldName][docRef] = Object.create(null) as Builder['invertedIndex'][typeof invertedIndexKey][typeof fieldName][typeof docRef]
        }

        // store all whitelisted metadata about this token in the
        // inverted index
        for (var l = 0; l < this.metadataWhitelist.length; l++) {
          var metadataKey = this.metadataWhitelist[l],
              metadata = term.metadata[metadataKey]

          if (this.invertedIndex[invertedIndexKey][fieldName][docRef][metadataKey] == undefined) {
            this.invertedIndex[invertedIndexKey][fieldName][docRef][metadataKey] = []
          }

          this.invertedIndex[invertedIndexKey][fieldName][docRef][metadataKey].push(metadata)
        }
      }

    }
  }

  /**
   * Calculates the average document length for this index
   */
  #calculateAverageFieldLengths () {

    var fieldRefs = Object.keys(this.fieldLengths),
        numberOfFields = fieldRefs.length

    var accumulator: {[key: string]: number} = {}
    var documentsWithField: {[key: string]: number} = {}

    for (var i = 0; i < numberOfFields; i++) {
      var fieldRef = FieldRef.fromString(fieldRefs[i]),
          field = fieldRef.fieldName

      if (!(field in documentsWithField)) {
        documentsWithField[field] = 0
      }
      documentsWithField[field] += 1

      if (!(field in accumulator)) {
        accumulator[field] = 0
      }
      accumulator[field] += this.fieldLengths[fieldRef.toString()]
    }

    var fields = Object.keys(this.#fields)

    for (var i = 0; i < fields.length; i++) {
      var fieldName = fields[i]
      accumulator[fieldName] = accumulator[fieldName] / documentsWithField[fieldName]
    }

    this.#averageFieldLength = accumulator
  }

  /**
   * Builds a vector space model of every document using Vector
   */
  #createFieldVectors () {
    var fieldVectors: {[key: string]: Vector} = {}
    var
        fieldRefs = Object.keys(this.fieldTermFrequencies),
        fieldRefsLength = fieldRefs.length
    var termIdfCache = Object.create(null) as {[key: string]: number}

    for (var i = 0; i < fieldRefsLength; i++) {
      var fieldRef = FieldRef.fromString(fieldRefs[i]),
          fieldName = fieldRef.fieldName,
          fieldLength = this.fieldLengths[fieldRef.toString()],
          fieldVector = new Vector,
          termFrequencies = this.fieldTermFrequencies[fieldRef.toString()],
          terms = Object.keys(termFrequencies),
          termsLength = terms.length


      var fieldBoost = this.#fields[fieldName].boost || 1,
          docBoost = this.#documents[fieldRef.docRef].boost || 1

      for (var j = 0; j < termsLength; j++) {
        var term = terms[j],
            tf = termFrequencies[term],
            termIndex = this.invertedIndex[term]._index,
            idf, score, scoreWithPrecision

        if (termIdfCache[term] === undefined) {
          idf = this.#idf(this.invertedIndex[term], this.documentCount)
          termIdfCache[term] = idf
        } else {
          idf = termIdfCache[term]
        }

        score = idf * ((this.#k1 + 1) * tf) / (this.#k1 * (1 - this.#b + this.#b * (fieldLength / this.averageFieldLength[fieldName])) + tf)
        score *= fieldBoost
        score *= docBoost
        scoreWithPrecision = Math.round(score * 1000) / 1000
        // Converts 1.23456789 to 1.234.
        // Reducing the precision so that the vectors take up less
        // space when serialised. Doing it now so that they behave
        // the same before and after serialisation. Also, this is
        // the fastest approach to reducing a number's precision in
        // JavaScript.

        fieldVector.insert(termIndex, scoreWithPrecision)
      }

      fieldVectors[fieldRef.toString()] = fieldVector
    }

    this.#fieldVectors = fieldVectors
  }

  /**
   * Creates a token set of all tokens in the index using TokenSet
   */
  #createTokenSet () {
    this.#tokenSet = TokenSet.fromArray(
      Object.keys(this.invertedIndex).sort(),
    )
  }

  /**
   * A function to calculate the inverse document frequency for
   * a posting. This is shared between the builder and the index
   *
   * @param {Object<string, object>} posting - The posting for a given term
   * @param {number} documentCount - The total number of documents.
   */
  #idf (posting: {[key: string]: object}, documentCount: number) {
    var documentsWithTerm = 0

    for (var fieldName in posting) {
      if (fieldName == '_index') continue // Ignore the term index, its not a field
      documentsWithTerm += Object.keys(posting[fieldName]).length
    }

    var x = (documentCount - documentsWithTerm + 0.5) / (documentsWithTerm + 0.5)

    return Math.log(1 + Math.abs(x))
  }

  /**
   * Builds the index, creating an instance of Index.
   *
   * This completes the indexing process and should only be called
   * once all documents have been added to the index.
   *
   * @returns {Index}
   */
  build (): Index {
    this.#calculateAverageFieldLengths()
    this.#createFieldVectors()
    this.#createTokenSet()

    return new Index({
      invertedIndex: this.invertedIndex,
      fieldVectors: this.fieldVectors,
      tokenSet: this.tokenSet,
      fields: Object.keys(this.#fields),
      pipeline: this.searchPipeline,
    })
  }

  /**
   * Applies a plugin to the index builder.
   *
   * A plugin is a function that is called with the index builder as its context.
   * Plugins can be used to customise or extend the behaviour of the index
   * in some way. A plugin is just a function, that encapsulated the custom
   * behaviour that should be applied when building the index.
   *
   * The plugin function will be called with the index builder as its argument, additional
   * arguments can also be passed when calling use. The function will be called
   * with the index builder as its context.
   *
   * @param {plugin} plugin The plugin to apply.
   */
  use (
    fn: plugin<this>,
    ...args: unknown[]
  ) {
    fn.apply(this, [this, ...args])
  }
}
