[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / Query

# Class: Query

Defined in: [lib/query.ts:77](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/query.ts#L77)

A Query provides a programmatic way of defining queries to be performed
against a [Index](Index.md).

Prefer constructing a Query using the [Index#query](Index.md#query) method
so the query object is pre-initialized with the right index fields.

## Constructors

### Constructor

> **new Query**(`allFields`): `Query`

Defined in: [lib/query.ts:88](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/query.ts#L88)

#### Parameters

##### allFields

`string`[]

#### Returns

`Query`

## Properties

### allFields

> **allFields**: `string`[]

Defined in: [lib/query.ts:86](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/query.ts#L86)

An array of all available fields in a Index.

***

### clauses

> **clauses**: [`QueryClause`](QueryClause.md)[]

Defined in: [lib/query.ts:81](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/query.ts#L81)

An array of query clauses.

## Methods

### clause()

> **clause**(`clause`): `this`

Defined in: [lib/query.ts:102](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/query.ts#L102)

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

Defined in: [lib/query.ts:160](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/query.ts#L160)

A negated query is one in which every clause has a presence of
prohibited. These queries require some special processing to return
the expected results.

#### Returns

`boolean`

***

### term()

> **term**(`term`, `options?`): `this`

Defined in: [lib/query.ts:196](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/query.ts#L196)

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
