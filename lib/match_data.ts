/*!
 * MatchData
 * Copyright (C) 2020 Oliver Nightingale
 * Copyright (C) @YEAR SignpostMarv
 */

import type {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  IndexResult,
} from './index.ts'

/**
 * Contains and collects metadata about a matching document.
 * A single instance of MatchData is returned as part of every
 * IndexResult.
 */
export class MatchData {
  /**
   * A cloned collection of metadata associated with this document.
   */
  metadata: {[key: string]: {[key: string]: {[key: string]: unknown[]}}}

  /**
   * @param {string} [term] - The term this match data is associated with
   * @param {string} [field] - The field in which the term was found
   * @param {Object<string, unknown[]>} [metadata] - The metadata recorded about this term in this field
   * @see {@link IndexResult}
   */
  constructor (
    term?: string,
    field?: string,
    metadata?: {[key: string]: unknown[]},
  ) {
    var clonedMetadata = Object.create(null) as {[key: string]: unknown[]}

    // Cloning the metadata to prevent the original
    // being mutated during match data combination.
    // Metadata is kept in an array within the inverted
    // index so cloning the data can be done with
    // Array#slice
    for (const [key, value] of Object.entries(metadata || {})) {
      clonedMetadata[key] = value.slice()
    }

    this.metadata = Object.create(null) as MatchData['metadata']

    if (term !== undefined && field !== undefined) {
      this.metadata[term] = Object.create(null) as MatchData['metadata'][typeof term]
      this.metadata[term][field] = clonedMetadata
    }
  }

  /**
   * An instance of MatchData will be created for every term that matches a
   * document. However only one instance is required in a IndexResult. This
   * method combines metadata from another instance of MatchData with this
   * objects metadata.
   *
   * @param {MatchData} otherMatchData - Another instance of match data to merge with this one.
   * @see {@link IndexResult}
   */
  combine (otherMatchData: MatchData) {
    var terms = Object.keys(otherMatchData.metadata)

    for (var i = 0; i < terms.length; i++) {
      var term = terms[i],
          fields = Object.keys(otherMatchData.metadata[term])

      if (this.metadata[term] == undefined) {
        this.metadata[term] = Object.create(null) as MatchData['metadata'][typeof term]
      }

      for (var j = 0; j < fields.length; j++) {
        var field = fields[j],
            keys = Object.keys(otherMatchData.metadata[term][field])

        if (this.metadata[term][field] == undefined) {
          this.metadata[term][field] = Object.create(null) as MatchData['metadata'][typeof term][typeof field]
        }

        for (var k = 0; k < keys.length; k++) {
          var key = keys[k]

          if (this.metadata[term][field][key] == undefined) {
            this.metadata[term][field][key] = otherMatchData.metadata[term][field][key]
          } else {
            this.metadata[term][field][key] = this.metadata[term][field][key].concat(otherMatchData.metadata[term][field][key])
          }

        }
      }
    }
  }

  /**
   * Add metadata for a term/field pair to this instance of match data.
   *
   * @param {string} term - The term this match data is associated with
   * @param {string} field - The field in which the term was found
   * @param {Object<string, unknown[]>} metadata - The metadata recorded about this term in this field
   */
  add (
    term: string,
    field: string,
    metadata: Exclude<
      ConstructorParameters<typeof MatchData>[2],
      undefined
    >,
  ) {
    if (!(term in this.metadata)) {
      this.metadata[term] = {
        [field]: metadata,
      }
      return
    }

    if (!(field in this.metadata[term])) {
      this.metadata[term][field] = metadata
      return
    }

    var metadataKeys = Object.keys(metadata)

    for (var i = 0; i < metadataKeys.length; i++) {
      var key = metadataKeys[i]

      if (key in this.metadata[term][field]) {
        this.metadata[term][field][key] = this.metadata[term][field][key].concat(metadata[key])
      } else {
        this.metadata[term][field][key] = metadata[key]
      }
    }
  }
}
