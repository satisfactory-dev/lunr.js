[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / QueryClause

# Class: QueryClause

Defined in: [lib/query.ts:20](https://github.com/satisfactory-dev/lunr.js/blob/a784e792ded62f9529ed9cad4ce843741d12ef24/lib/query.ts#L20)

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

Defined in: [lib/query.ts:31](https://github.com/satisfactory-dev/lunr.js/blob/a784e792ded62f9529ed9cad4ce843741d12ef24/lib/query.ts#L31)

Any boost that should be applied when matching this clause.

***

### editDistance

> **editDistance**: `number` \| `undefined`

Defined in: [lib/query.ts:36](https://github.com/satisfactory-dev/lunr.js/blob/a784e792ded62f9529ed9cad4ce843741d12ef24/lib/query.ts#L36)

Whether the term should have fuzzy matching applied, and how fuzzy the match should be.

***

### fields

> **fields**: `string`[] \| `undefined` = `undefined`

Defined in: [lib/query.ts:24](https://github.com/satisfactory-dev/lunr.js/blob/a784e792ded62f9529ed9cad4ce843741d12ef24/lib/query.ts#L24)

The fields in an index this clause should be matched against.

***

### presence

> **presence**: `2` \| `1` \| `3` \| `undefined` = `QueryPresence.OPTIONAL`

Defined in: [lib/query.ts:57](https://github.com/satisfactory-dev/lunr.js/blob/a784e792ded62f9529ed9cad4ce843741d12ef24/lib/query.ts#L57)

The terms presence in any matching documents.

***

### term

> **term**: `string` \| `undefined` = `undefined`

Defined in: [lib/query.ts:67](https://github.com/satisfactory-dev/lunr.js/blob/a784e792ded62f9529ed9cad4ce843741d12ef24/lib/query.ts#L67)

***

### usePipeline

> **usePipeline**: `boolean` \| `undefined` = `undefined`

Defined in: [lib/query.ts:41](https://github.com/satisfactory-dev/lunr.js/blob/a784e792ded62f9529ed9cad4ce843741d12ef24/lib/query.ts#L41)

Whether the term should be passed through the search pipeline.

***

### wildcard

> **wildcard**: `0` \| `2` \| `1` \| `3` \| `undefined` = `QueryWildcard.NONE`

Defined in: [lib/query.ts:46](https://github.com/satisfactory-dev/lunr.js/blob/a784e792ded62f9529ed9cad4ce843741d12ef24/lib/query.ts#L46)

Whether the term should have wildcards appended or prepended.
