[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / Vector

# Class: Vector

Defined in: [lib/vector.mts:22](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/vector.mts#L22)

A vector is used to construct the vector space of documents and queries. These
vectors support operations to determine the similarity between two documents or
a document and a query.

Normally no parameters are required for initializing a vector, but in the case of
loading a previously dumped vector the raw elements can be provided to the constructor.

For performance reasons vectors are implemented with a flat array, where an elements
index is immediately followed by its value. E.g. [index, value, index, value]. This
allows the underlying array to be as sparse as possible and still offer decent
performance when being used for vector calculations.

## Constructors

### Constructor

> **new Vector**(`elements?`): `Vector`

Defined in: [lib/vector.mts:33](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/vector.mts#L33)

#### Parameters

##### elements?

`number`[]

The flat list of element index and element value pairs.

#### Returns

`Vector`

## Properties

### elements

> `readonly` **elements**: `number`[]

Defined in: [lib/vector.mts:28](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/vector.mts#L28)

## Accessors

### magnitude

#### Get Signature

> **get** **magnitude**(): `number`

Defined in: [lib/vector.mts:128](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/vector.mts#L128)

Calculates the magnitude of this vector.

##### Returns

`number`

## Methods

### dot()

> **dot**(`otherVector`): `number`

Defined in: [lib/vector.mts:148](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/vector.mts#L148)

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

Defined in: [lib/vector.mts:98](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/vector.mts#L98)

Inserts an element at an index within the vector.

Does not allow duplicates, will throw an error if there is already an entry
for this index.

#### Parameters

##### insertIdx

`number`

The index at which the element should be inserted.

##### val

`number`

The value to be inserted into the vector.

#### Returns

`void`

***

### positionForIndex()

> **positionForIndex**(`index`): `number`

Defined in: [lib/vector.mts:48](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/vector.mts#L48)

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

Defined in: [lib/vector.mts:179](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/vector.mts#L179)

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

> **toArray**(): `number`[]

Defined in: [lib/vector.mts:186](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/vector.mts#L186)

Converts the vector to an array of the elements within the vector.

#### Returns

`number`[]

***

### toJSON()

> **toJSON**(): `number`[]

Defined in: [lib/vector.mts:201](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/vector.mts#L201)

A JSON serializable representation of the vector.

#### Returns

`number`[]

***

### upsert()

> **upsert**(`insertIdx`, `val`, `fn`): `void`

Defined in: [lib/vector.mts:112](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/vector.mts#L112)

Inserts or updates an existing index within the vector.

#### Parameters

##### insertIdx

`number`

The index at which the element should be inserted.

##### val

`number`

The value to be inserted into the vector.

##### fn

[`upsertFunction`](../type-aliases/upsertFunction.md)

A function that is called for updates, the existing value and the
requested value are passed as arguments

#### Returns

`void`
