[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / Query

# Class: Query

Defined in: [lib/query.mts:76](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query.mts#L76)

A Query provides a programmatic way of defining queries to be performed
against a [Index](Index.md).

Prefer constructing a Query using the [Index#query](Index.md#query) method
so the query object is pre-initialized with the right index fields.

## Constructors

### Constructor

> **new Query**(`allFields`): `Query`

Defined in: [lib/query.mts:91](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query.mts#L91)

#### Parameters

##### allFields

`string`[]

#### Returns

`Query`

## Properties

### allFields

> **allFields**: `string`[]

Defined in: [lib/query.mts:89](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query.mts#L89)

An array of all available fields in a Index.

***

### clauses

> **clauses**: [`QueryClause`](QueryClause.md)[]

Defined in: [lib/query.mts:84](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query.mts#L84)

An array of query clauses.

## Accessors

### wildcard

#### Get Signature

> **get** `static` **wildcard**(): `Readonly`\<\{ `LEADING`: `1`; `NONE`: `0`; `TRAILING`: `2`; \}\>

Defined in: [lib/query.mts:77](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query.mts#L77)

##### Returns

`Readonly`\<\{ `LEADING`: `1`; `NONE`: `0`; `TRAILING`: `2`; \}\>

## Methods

### clause()

> **clause**(`clause`): `this`

Defined in: [lib/query.mts:105](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query.mts#L105)

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

Defined in: [lib/query.mts:163](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query.mts#L163)

A negated query is one in which every clause has a presence of
prohibited. These queries require some special processing to return
the expected results.

#### Returns

`boolean`

***

### term()

> **term**(`term`, `options?`): `this`

Defined in: [lib/query.mts:199](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query.mts#L199)

Adds a term to the current query, under the covers this will create a [QueryClause](QueryClause.md)
to the list of clauses that make up this query.

The term is used as is, i.e. no tokenization will be performed by this method. Instead conversion
to a token or token-like string should be done before calling this method.

The term will be converted to a string by calling `toString`. Multiple terms can be passed as an
array, each term in the array will share the same options.

#### Parameters

##### term

The term(s) to add to the query.

`object` | `object`[]

##### options?

[`QueryClause`](QueryClause.md)

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
