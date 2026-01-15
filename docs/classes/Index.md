[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / Index

# Class: Index

Defined in: [lib/index.ts:160](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/index.ts#L160)

An index contains the built index of all documents and provides a query interface
to the index.

Usually instances of Index will not be created using this constructor, instead
Builder should be used to construct new indexes, or Index.load should be
used to load previously built and serialized indexes.

## Constructors

### Constructor

> **new Index**(`attrs`): `Index`

Defined in: [lib/index.ts:184](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/index.ts#L184)

#### Parameters

##### attrs

The attributes of the built search index.

###### fields

`string`[]

The names of indexed document fields.

###### fieldVectors

\{\[`s`: `string`\]: [`Vector`](Vector.md)\<`string` \| `number`, \[`number`, `string` \| `number`, ...(string \| number)\[\]\]\>; \}

Field vectors

###### invertedIndex

\{\[`key`: `string`\]: [`invertedIndexEntry`](../type-aliases/invertedIndexEntry.md); \}

An index of term/field to document reference.

###### pipeline

[`Pipeline`](Pipeline.md)

The pipeline to use for search terms.

###### tokenSet

[`TokenSet`](TokenSet.md)

An set of all corpus tokens.

#### Returns

`Index`

## Properties

### fields

> **fields**: `string`[]

Defined in: [lib/index.ts:167](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/index.ts#L167)

***

### fieldVectors

> **fieldVectors**: `object`

Defined in: [lib/index.ts:163](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/index.ts#L163)

#### Index Signature

\[`s`: `string`\]: [`Vector`](Vector.md)\<`string` \| `number`, \[`number`, `string` \| `number`, ...(string \| number)\[\]\]\>

***

### invertedIndex

> **invertedIndex**: `object`

Defined in: [lib/index.ts:161](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/index.ts#L161)

#### Index Signature

\[`key`: `string`\]: [`invertedIndexEntry`](../type-aliases/invertedIndexEntry.md)

***

### pipeline

> **pipeline**: [`Pipeline`](Pipeline.md)

Defined in: [lib/index.ts:169](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/index.ts#L169)

***

### tokenSet

> **tokenSet**: [`TokenSet`](TokenSet.md)

Defined in: [lib/index.ts:165](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/index.ts#L165)

## Methods

### query()

> **query**(`fn`): [`IndexResult`](../type-aliases/IndexResult.md)[]

Defined in: [lib/index.ts:238](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/index.ts#L238)

Performs a query against the index using the yielded Query object.

If performing programmatic queries against the index, this method is preferred
over Index#search so as to avoid the additional query parsing overhead.

A query object is yielded to the supplied function which should be used to
express the query to be run against the index.

Note that although this function takes a callback parameter it is _not_ an
asynchronous operation, the callback is just yielded a query object to be
customized.

#### Parameters

##### fn

[`IndexQueryBuilder`](../type-aliases/IndexQueryBuilder.md)

A function that is used to build the query.

#### Returns

[`IndexResult`](../type-aliases/IndexResult.md)[]

***

### search()

> **search**(`queryString`): [`IndexResult`](../type-aliases/IndexResult.md)[]

Defined in: [lib/index.ts:216](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/index.ts#L216)

Performs a search against the index using lunr query syntax.

Results will be returned sorted by their score, the most relevant results
will be returned first.  For details on how the score is calculated, please see
the [https://lunrjs.com/guides/searching.html#scoring\|guide](https://lunrjs.com/guides/searching.html#scoring|guide).

For more programmatic querying use Index#query.

#### Parameters

##### queryString

`string`

A string containing a lunr query.

#### Returns

[`IndexResult`](../type-aliases/IndexResult.md)[]

#### Throws

If the passed query string cannot be parsed.

***

### toJSON()

> **toJSON**(): [`SerializedIndex`](../type-aliases/SerializedIndex.md)

Defined in: [lib/index.ts:551](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/index.ts#L551)

Prepares the index for JSON serialization.

The schema for this JSON blob will be described in a
separate JSON schema file.

#### Returns

[`SerializedIndex`](../type-aliases/SerializedIndex.md)

***

### load()

> `static` **load**(`serializedIndex`, `__namedParameters`): `Index`

Defined in: [lib/index.ts:581](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/index.ts#L581)

Loads a previously serialized Index

#### Parameters

##### serializedIndex

[`SerializedIndex`](../type-aliases/SerializedIndex.md)

##### \_\_namedParameters

###### versionConflictFormatter?

[`versionConflictFormatter`](../type-aliases/versionConflictFormatter.md) = `...`

###### versionConflictHandler?

[`versionConflictHandler`](../type-aliases/versionConflictHandler.md) \| `"throw"` = `...`

#### Returns

`Index`
