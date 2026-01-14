[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / Vector

# Class: Vector\<Odd\>

Defined in: [lib/vector.ts:24](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/vector.ts#L24)

A vector is used to construct the vector space of documents and queries. These
vectors support operations to determine the similarity between two documents or
a document and a query.

Normally no parameters are required for initializing a vector, but in the case of
loading a previously dumped vector the raw elements can be provided to the constructor.

For performance reasons vectors are implemented with a flat array, where an elements
index is immediately followed by its value. E.g. [index, value, index, value]. This
allows the underlying array to be as sparse as possible and still offer decent
performance when being used for vector calculations.

## Type Parameters

### Odd

`Odd` *extends* `number` \| `string` = `number` \| `string`

## Constructors

### Constructor

> **new Vector**\<`Odd`\>(`elements?`): `Vector`\<`Odd`\>

Defined in: [lib/vector.ts:37](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/vector.ts#L37)

#### Parameters

##### elements?

The flat list of element index and element value pairs.

`never`[] | \[`number`, `Odd`, ...(number \| Odd)\[\]\]

#### Returns

`Vector`\<`Odd`\>

## Properties

### elements

> `readonly` **elements**: `never`[] \| \[`number`, `Odd`, ...(number \| Odd)\[\]\]

Defined in: [lib/vector.ts:32](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/vector.ts#L32)

## Accessors

### magnitude

#### Get Signature

> **get** **magnitude**(): `number`

Defined in: [lib/vector.ts:134](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/vector.ts#L134)

Calculates the magnitude of this vector.

##### Returns

`number`

## Methods

### dot()

> **dot**(`otherVector`): `number`

Defined in: [lib/vector.ts:154](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/vector.ts#L154)

Calculates the dot product of this vector and another vector.

#### Parameters

##### otherVector

`Vector`

The vector to compute the dot product with.

#### Returns

`number`

***

### insert()

> **insert**(`insertIdx`, `val`): `void`

Defined in: [lib/vector.ts:101](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/vector.ts#L101)

Inserts an element at an index within the vector.

Does not allow duplicates, will throw an error if there is already an entry
for this index.

#### Parameters

##### insertIdx

`number`

The index at which the element should be inserted.

##### val

`Odd`

The value to be inserted into the vector.

#### Returns

`void`

***

### positionForIndex()

> **positionForIndex**(`index`): `number`

Defined in: [lib/vector.ts:51](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/vector.ts#L51)

Calculates the position within the vector to insert a given index.

This is used internally by insert and upsert. If there are duplicate indexes then
the position is returned as if the value for that index were to be updated, but it
is the callers responsibility to check whether there is a duplicate at that index

#### Parameters

##### index

`number`

The index at which the element should be inserted.

#### Returns

`number`

***

### similarity()

> **similarity**(`otherVector`): `number`

Defined in: [lib/vector.ts:185](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/vector.ts#L185)

Calculates the similarity between this vector and another vector.

#### Parameters

##### otherVector

`Vector`

The other vector to calculate the
similarity with.

#### Returns

`number`

***

### toArray()

> **toArray**(): `Odd`[]

Defined in: [lib/vector.ts:192](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/vector.ts#L192)

Converts the vector to an array of the elements within the vector.

#### Returns

`Odd`[]

***

### toJSON()

> **toJSON**(): `never`[] \| \[`number`, `Odd`, ...(number \| Odd)\[\]\]

Defined in: [lib/vector.ts:205](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/vector.ts#L205)

A JSON serializable representation of the vector.

#### Returns

`never`[] \| \[`number`, `Odd`, ...(number \| Odd)\[\]\]

***

### upsert()

> **upsert**(`insertIdx`, `val`, `fn?`): `void`

Defined in: [lib/vector.ts:115](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/vector.ts#L115)

Inserts or updates an existing index within the vector.

#### Parameters

##### insertIdx

`number`

The index at which the element should be inserted.

##### val

`Odd`

The value to be inserted into the vector.

##### fn?

[`upsertFunction`](../type-aliases/upsertFunction.md)\<`Odd`\>

A function that is called for updates, the existing value and the
requested value are passed as arguments

#### Returns

`void`
