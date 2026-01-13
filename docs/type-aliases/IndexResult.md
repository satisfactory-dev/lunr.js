[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / IndexResult

# Type Alias: IndexResult

> **IndexResult** = `object`

Defined in: [lib/index.mts:60](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/index.mts#L60)

A result contains details of a document matching a search query.

## Properties

### matchData

> **matchData**: [`MatchData`](../classes/MatchData.md)

Defined in: [lib/index.mts:63](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/index.mts#L63)

Contains metadata about this match including which term(s) caused the match.

***

### ref

> **ref**: `string`

Defined in: [lib/index.mts:61](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/index.mts#L61)

The reference of the document this result represents.

***

### score

> **score**: `number`

Defined in: [lib/index.mts:62](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/index.mts#L62)

A number between 0 and 1 representing how similar this document is to the query.
