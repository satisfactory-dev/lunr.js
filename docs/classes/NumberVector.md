[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / NumberVector

# Class: NumberVector

Defined in: [lib/vector.ts:238](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/vector.ts#L238)

Number-only implementation of Vector

Since the test cases revealed the default implementation should support
strings, this implementation is type-hinted to only support numbers.

## Extends

- [`Vector`](Vector.md)\<`number`\>

## Constructors

### Constructor

> **new NumberVector**(`positions`, `elements?`): `NumberVector`

Defined in: [lib/vector.ts:37](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/vector.ts#L37)

#### Parameters

##### positions

`number`[] = `[]`

##### elements?

The flat list of element index and element value pairs.

`number`[] | `never`[]

#### Returns

`NumberVector`

#### Inherited from

[`Vector`](Vector.md).[`constructor`](Vector.md#constructor)

## Accessors

### magnitude

#### Get Signature

> **get** **magnitude**(): `number`

Defined in: [lib/vector.ts:137](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/vector.ts#L137)

Calculates the magnitude of this vector.

##### Returns

`number`

#### Inherited from

[`Vector`](Vector.md).[`magnitude`](Vector.md#magnitude)

***

### magnitudeSquared

#### Get Signature

> **get** **magnitudeSquared**(): `number`

Defined in: [lib/vector.ts:148](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/vector.ts#L148)

Calculates the square of the magnitude of this vector.

##### Returns

`number`

#### Inherited from

[`Vector`](Vector.md).[`magnitudeSquared`](Vector.md#magnitudesquared)

## Methods

### dot()

> **dot**(`otherVector`): `number`

Defined in: [lib/vector.ts:167](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/vector.ts#L167)

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

Defined in: [lib/vector.ts:104](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/vector.ts#L104)

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

Defined in: [lib/vector.ts:54](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/vector.ts#L54)

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

Defined in: [lib/vector.ts:199](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/vector.ts#L199)

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

Defined in: [lib/vector.ts:207](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/vector.ts#L207)

Converts the vector to an array of the elements within the vector.

#### Returns

`number`[]

#### Inherited from

[`Vector`](Vector.md).[`toArray`](Vector.md#toarray)

***

### toJSON()

> **toJSON**(): `object`

Defined in: [lib/vector.ts:214](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/vector.ts#L214)

A JSON serializable representation of the vector.

#### Returns

`object`

##### elements

> **elements**: `number`[]

##### positions

> **positions**: `number`[]

#### Inherited from

[`Vector`](Vector.md).[`toJSON`](Vector.md#tojson)

***

### upsert()

> **upsert**(`insertIdx`, `val`, `fn?`): `void`

Defined in: [lib/vector.ts:118](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/vector.ts#L118)

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
