/*!
 * TokenSetBuilder
 * Copyright (C) 2020 Oliver Nightingale
 * Copyright (C) @YEAR SignpostMarv
 */

import {
  TokenSet
} from './token_set.mjs'

/**
 * @typedef {Object} TokenSetBuilderNode
 * @property {TokenSet|TokenSetBuilderNode} parent
 * @property {string} char
 * @property {TokenSetBuilderNode} child
 */


export class TokenSetBuilder {
  /**
   * @type {string}
   */
  previousWord

  /**
   * @type {TokenSet}
   */
  root

  /**
   * @type {TokenSetBuilderNode[]}
   */
  uncheckedNodes

  /**
   * @type {Object<string, TokenSetBuilderNode>}
   */
  minimizedNodes

  constructor () {
    this.previousWord = ""
    this.root = new TokenSet
    this.uncheckedNodes = []
    this.minimizedNodes = {}
  }

  /**
   * @param {string} word
   *
   * @return {void}
   */
  insert (word) {
    var node,
        commonPrefix = 0

    if (word < this.previousWord) {
      throw new Error ("Out of order word insertion")
    }

    for (var i = 0; i < word.length && i < this.previousWord.length; i++) {
      if (word[i] != this.previousWord[i]) break
      commonPrefix++
    }

    this.minimize(commonPrefix)

    if (this.uncheckedNodes.length == 0) {
      node = this.root
    } else {
      node = this.uncheckedNodes[this.uncheckedNodes.length - 1].child
    }

    for (var i = commonPrefix; i < word.length; i++) {
      var nextNode = new TokenSet,
          char = word[i]

      node.edges[char] = nextNode

      this.uncheckedNodes.push({
        parent: node,
        char: char,
        child: nextNode
      })

      node = nextNode
    }

    node.final = true
    this.previousWord = word
  }

  finish () {
    this.minimize(0)
  }

  /**
   * @param {number} downTo
   *
   * @return {void}
   */
  minimize (downTo) {
    for (var i = this.uncheckedNodes.length - 1; i >= downTo; i--) {
      var node = this.uncheckedNodes[i],
          childKey = node.child.toString()

      if (childKey in this.minimizedNodes) {
        node.parent.edges[node.char] = this.minimizedNodes[childKey]
      } else {
        // Cache the key for this node since
        // we know it can't change anymore
        node.child._str = childKey

        this.minimizedNodes[childKey] = node.child
      }

      this.uncheckedNodes.pop()
    }
  }
}
