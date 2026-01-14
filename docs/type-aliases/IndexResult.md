[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / IndexResult

# Type Alias: IndexResult

> **IndexResult** = `object`

Defined in: [lib/index.ts:60](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/index.ts#L60)

A result contains details of a document matching a search query.

## Properties

### matchData

> **matchData**: [`MatchData`](../classes/MatchData.md)

Defined in: [lib/index.ts:63](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/index.ts#L63)

Contains metadata about this match including which term(s) caused the match.

***

### ref

> **ref**: `string`

Defined in: [lib/index.ts:61](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/index.ts#L61)

The reference of the document this result represents.

***

### score

> **score**: `number`

Defined in: [lib/index.ts:62](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/index.ts#L62)

A number between 0 and 1 representing how similar this document is to the query.
