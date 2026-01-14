[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / Query

# Class: Query

Defined in: [lib/query.ts:77](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/query.ts#L77)

A Query provides a programmatic way of defining queries to be performed
against a [Index](Index.md).

Prefer constructing a Query using the [Index#query](Index.md#query) method
so the query object is pre-initialized with the right index fields.

## Constructors

### Constructor

> **new Query**(`allFields`): `Query`

Defined in: [lib/query.ts:92](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/query.ts#L92)

#### Parameters

##### allFields

`string`[]

#### Returns

`Query`

## Properties

### allFields

> **allFields**: `string`[]

Defined in: [lib/query.ts:90](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/query.ts#L90)

An array of all available fields in a Index.

***

### clauses

> **clauses**: [`QueryClause`](QueryClause.md)[]

Defined in: [lib/query.ts:85](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/query.ts#L85)

An array of query clauses.

## Accessors

### wildcard

#### Get Signature

> **get** `static` **wildcard**(): `Readonly`\<\{ `LEADING`: `1`; `NONE`: `0`; `TRAILING`: `2`; \}\>

Defined in: [lib/query.ts:78](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/query.ts#L78)

##### Returns

`Readonly`\<\{ `LEADING`: `1`; `NONE`: `0`; `TRAILING`: `2`; \}\>

## Methods

### clause()

> **clause**(`clause`): `this`

Defined in: [lib/query.ts:106](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/query.ts#L106)

Adds a [QueryClause](QueryClause.md) to this query.

Unless the clause contains the fields to be matched all fields will be matched. In addition
a default boost of 1 is applied to the clause.

#### Parameters

##### clause

`Partial`\<[`QueryClause`](QueryClause.md)\>

The clause to add to this query.

#### Returns

`this`

#### See

QueryClause

***

### isNegated()

> **isNegated**(): `boolean`

Defined in: [lib/query.ts:164](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/query.ts#L164)

A negated query is one in which every clause has a presence of
prohibited. These queries require some special processing to return
the expected results.

#### Returns

`boolean`

***

### term()

> **term**(`term`, `options?`): `this`

Defined in: [lib/query.ts:200](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/query.ts#L200)

Adds a term to the current query, under the covers this will create a [QueryClause](QueryClause.md)
to the list of clauses that make up this query.

The term is used as is, i.e. no tokenization will be performed by this method. Instead conversion
to a token or token-like string should be done before calling this method.

The term will be converted to a string by calling `toString`. Multiple terms can be passed as an
array, each term in the array will share the same options.

#### Parameters

##### term

The term(s) to add to the query.

`string` | `object` | `object`[]

##### options?

`Partial`\<[`QueryClause`](QueryClause.md)\>

Any additional properties to add to the query clause.

#### Returns

`this`

#### See

 - Query#clause
 - QueryClause

#### Examples

```ts
query.term("foo")
```

```ts
query.term("foo", {
  fields: ["title"],
  boost: 10,
  wildcard: QueryWildcard.TRAILING
})
```

```ts
query.term(tokenizer("foo bar"))
```
