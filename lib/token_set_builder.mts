/*!
 * TokenSetBuilder
 * Copyright (C) 2020 Oliver Nightingale
 * Copyright (C) @YEAR SignpostMarv
 */

import {
  TokenSet,
} from './token_set.mts'

export type TokenSetBuilderNode = {
  parent: TokenSet | TokenSetBuilderNode,
  char: string,
  child: TokenSet | TokenSetBuilderNode,
  _str?: string,
  edges?: { [s: string]: TokenSet | TokenSetBuilderNode },
  final?: boolean,
}

export class TokenSetBuilder {
  previousWord: string

  root: TokenSet

  uncheckedNodes: TokenSetBuilderNode[]

  minimizedNodes: { [s: string]: TokenSetBuilderNode | TokenSet }

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
  insert (word: string): void {
    let node: TokenSet | TokenSetBuilderNode
    let commonPrefix = 0

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

      if (undefined === node.edges) {
        node.edges = Object.create(null) as Exclude<typeof node['edges'], undefined>
      }

      node.edges[char] = nextNode

      this.uncheckedNodes.push({
        parent: node,
        char: char,
        child: nextNode,
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
  minimize (downTo: number): void {
    for (var i = this.uncheckedNodes.length - 1; i >= downTo; i--) {
      var node = this.uncheckedNodes[i],
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          childKey = node.child.toString()

      if (childKey in this.minimizedNodes) {
        if (undefined === node.parent.edges) {
          node.parent.edges = Object.create(null) as Exclude<typeof node['parent']['edges'], undefined>
        }
        node.parent.edges[node.char] = this.minimizedNodes[childKey]
      } else {
        // Cache the key for this node since
        // we know it can't change any more
        node.child._str = childKey

        this.minimizedNodes[childKey] = node.child
      }

      this.uncheckedNodes.pop()
    }
  }
}
