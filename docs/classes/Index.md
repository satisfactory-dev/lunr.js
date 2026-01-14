[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / Index

# Class: Index

Defined in: [lib/index.mts:159](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/index.mts#L159)

An index contains the built index of all documents and provides a query interface
to the index.

Usually instances of Index will not be created using this constructor, instead
Builder should be used to construct new indexes, or Index.load should be
used to load previously built and serialized indexes.

## Constructors

### Constructor

> **new Index**(`attrs`): `Index`

Defined in: [lib/index.mts:183](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/index.mts#L183)

#### Parameters

##### attrs

The attributes of the built search index.

###### fields

`string`[]

The names of indexed document fields.

###### fieldVectors

\{\[`s`: `string`\]: [`Vector`](Vector.md); \}

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

Defined in: [lib/index.mts:166](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/index.mts#L166)

***

### fieldVectors

> **fieldVectors**: `object`

Defined in: [lib/index.mts:162](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/index.mts#L162)

#### Index Signature

\[`s`: `string`\]: [`Vector`](Vector.md)

***

### invertedIndex

> **invertedIndex**: `object`

Defined in: [lib/index.mts:160](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/index.mts#L160)

#### Index Signature

\[`key`: `string`\]: [`invertedIndexEntry`](../type-aliases/invertedIndexEntry.md)

***

### pipeline

> **pipeline**: [`Pipeline`](Pipeline.md)

Defined in: [lib/index.mts:168](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/index.mts#L168)

***

### tokenSet

> **tokenSet**: [`TokenSet`](TokenSet.md)

Defined in: [lib/index.mts:164](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/index.mts#L164)

## Methods

### query()

> **query**(`fn`): [`IndexResult`](../type-aliases/IndexResult.md)[]

Defined in: [lib/index.mts:237](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/index.mts#L237)

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

Defined in: [lib/index.mts:215](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/index.mts#L215)

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

Defined in: [lib/index.mts:550](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/index.mts#L550)

Prepares the index for JSON serialization.

The schema for this JSON blob will be described in a
separate JSON schema file.

#### Returns

[`SerializedIndex`](../type-aliases/SerializedIndex.md)

***

### load()

> `static` **load**(`serializedIndex`, `__namedParameters`): `Index`

Defined in: [lib/index.mts:580](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/index.mts#L580)

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
