[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / IndexResult

# Type Alias: IndexResult

> **IndexResult** = `object`

Defined in: [lib/index.ts:61](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/index.ts#L61)

A result contains details of a document matching a search query.

## Properties

### matchData

> **matchData**: [`MatchData`](../classes/MatchData.md)

Defined in: [lib/index.ts:64](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/index.ts#L64)

Contains metadata about this match including which term(s) caused the match.

***

### ref

> **ref**: `string`

Defined in: [lib/index.ts:62](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/index.ts#L62)

The reference of the document this result represents.

***

### score

> **score**: `number`

Defined in: [lib/index.ts:63](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/index.ts#L63)

A number between 0 and 1 representing how similar this document is to the query.
