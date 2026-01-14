[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / QueryClause

# Class: QueryClause

Defined in: [lib/query.mts:20](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query.mts#L20)

A single clause in a [Query](Query.md) contains a term and details on how to
match that term against a [Index](Index.md).

## Constructors

### Constructor

> **new QueryClause**(): `QueryClause`

#### Returns

`QueryClause`

## Properties

### boost

> **boost**: `number` \| `undefined` = `1`

Defined in: [lib/query.mts:31](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query.mts#L31)

Any boost that should be applied when matching this clause.

***

### editDistance

> **editDistance**: `number` \| `undefined`

Defined in: [lib/query.mts:36](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query.mts#L36)

Whether the term should have fuzzy matching applied, and how fuzzy the match should be.

***

### fields

> **fields**: `string`[] \| `undefined` = `undefined`

Defined in: [lib/query.mts:24](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query.mts#L24)

The fields in an index this clause should be matched against.

***

### presence

> **presence**: `2` \| `1` \| `3` \| `undefined` = `QueryPresence.OPTIONAL`

Defined in: [lib/query.mts:57](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query.mts#L57)

The terms presence in any matching documents.

***

### term

> **term**: `string` \| `undefined` = `undefined`

Defined in: [lib/query.mts:67](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query.mts#L67)

***

### usePipeline

> **usePipeline**: `boolean` \| `undefined` = `undefined`

Defined in: [lib/query.mts:41](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query.mts#L41)

Whether the term should be passed through the search pipeline.

***

### wildcard

> **wildcard**: `0` \| `2` \| `1` \| `3` \| `undefined` = `QueryWildcard.NONE`

Defined in: [lib/query.mts:46](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query.mts#L46)

Whether the term should have wildcards appended or prepended.
