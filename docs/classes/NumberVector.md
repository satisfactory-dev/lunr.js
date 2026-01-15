[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / NumberVector

# Class: NumberVector

Defined in: [lib/vector.ts:218](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/vector.ts#L218)

Number-only implementation of Vector

Since the test cases revealed the default implementation should support
strings, this implementation is type-hinted to only support numbers.

## Extends

- [`Vector`](Vector.md)\<`number`\>

## Constructors

### Constructor

> **new NumberVector**(`elements?`): `NumberVector`

Defined in: [lib/vector.ts:43](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/vector.ts#L43)

#### Parameters

##### elements?

\[`number`, `number`, `...number[]`\]

The flat list of element index and element value pairs.

#### Returns

`NumberVector`

#### Inherited from

[`Vector`](Vector.md).[`constructor`](Vector.md#constructor)

## Accessors

### magnitude

#### Get Signature

> **get** **magnitude**(): `number`

Defined in: [lib/vector.ts:138](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/vector.ts#L138)

Calculates the magnitude of this vector.

##### Returns

`number`

#### Inherited from

[`Vector`](Vector.md).[`magnitude`](Vector.md#magnitude)

## Methods

### dot()

> **dot**(`otherVector`): `number`

Defined in: [lib/vector.ts:157](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/vector.ts#L157)

Calculates the dot product of this vector and another vector.

#### Parameters

##### otherVector

[`Vector`](Vector.md)

The vector to compute the dot product with.

#### Returns

`number`

#### Inherited from

[`Vector`](Vector.md).[`dot`](Vector.md#dot)

***

### insert()

> **insert**(`insertIdx`, `val`): `void`

Defined in: [lib/vector.ts:107](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/vector.ts#L107)

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

#### Inherited from

[`Vector`](Vector.md).[`insert`](Vector.md#insert)

***

### positionForIndex()

> **positionForIndex**(`index`): `number`

Defined in: [lib/vector.ts:57](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/vector.ts#L57)

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

#### Inherited from

[`Vector`](Vector.md).[`positionForIndex`](Vector.md#positionforindex)

***

### similarity()

> **similarity**(`otherVector`): `number`

Defined in: [lib/vector.ts:187](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/vector.ts#L187)

Calculates the similarity between this vector and another vector.

#### Parameters

##### otherVector

[`Vector`](Vector.md)

The other vector to calculate the
similarity with.

#### Returns

`number`

#### Inherited from

[`Vector`](Vector.md).[`similarity`](Vector.md#similarity)

***

### toArray()

> **toArray**(): `number`[]

Defined in: [lib/vector.ts:194](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/vector.ts#L194)

Converts the vector to an array of the elements within the vector.

#### Returns

`number`[]

#### Inherited from

[`Vector`](Vector.md).[`toArray`](Vector.md#toarray)

***

### toJSON()

> **toJSON**(): `never`[] \| \[`number`, `number`, `...number[]`\]

Defined in: [lib/vector.ts:207](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/vector.ts#L207)

A JSON serializable representation of the vector.

#### Returns

`never`[] \| \[`number`, `number`, `...number[]`\]

#### Inherited from

[`Vector`](Vector.md).[`toJSON`](Vector.md#tojson)

***

### upsert()

> **upsert**(`insertIdx`, `val`, `fn?`): `void`

Defined in: [lib/vector.ts:121](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/vector.ts#L121)

Inserts or updates an existing index within the vector.

#### Parameters

##### insertIdx

`number`

The index at which the element should be inserted.

##### val

`number`

The value to be inserted into the vector.

##### fn?

[`upsertFunction`](../type-aliases/upsertFunction.md)\<`number`\>

A function that is called for updates, the existing value and the
requested value are passed as arguments

#### Returns

`void`

#### Inherited from

[`Vector`](Vector.md).[`upsert`](Vector.md#upsert)
