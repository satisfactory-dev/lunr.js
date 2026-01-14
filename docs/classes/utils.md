[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / utils

# Class: utils

Defined in: [lib/utils.ts:14](https://github.com/satisfactory-dev/lunr.js/blob/a6f1f9f7bf834bcdd5a90dadeebd8a5011d7ce3e/lib/utils.ts#L14)

A class containing utility functions for the rest of the lunr library

## Constructors

### Constructor

> **new utils**(): `utils`

#### Returns

`utils`

## Methods

### asString()

> `static` **asString**(`obj`): `string`

Defined in: [lib/utils.ts:25](https://github.com/satisfactory-dev/lunr.js/blob/a6f1f9f7bf834bcdd5a90dadeebd8a5011d7ce3e/lib/utils.ts#L25)

Convert an object to a string.

In the case of `null` and `undefined` the function returns
the empty string, in all other cases the result of calling
`toString` on the passed object is returned.

#### Parameters

##### obj

`unknown`

The object to convert to a string.

#### Returns

`string`

string representation of the passed object.

***

### clone()

> `static` **clone**\<`T`\>(`obj?`): `T` \| `null` \| `undefined` *extends* `null` ? `null` : `T` \| `null` \| `undefined` *extends* `undefined` ? `undefined` : `T`

Defined in: [lib/utils.ts:49](https://github.com/satisfactory-dev/lunr.js/blob/a6f1f9f7bf834bcdd5a90dadeebd8a5011d7ce3e/lib/utils.ts#L49)

Clones an object.

Will create a copy of an existing object such that any mutations
on the copy cannot affect the original.

Only shallow objects are supported, passing a nested object to this
function will cause a TypeError.

Objects with primitives, and arrays of primitives are supported.

#### Type Parameters

##### T

`T` *extends* `object` \| [`QueryClause`](QueryClause.md)

#### Parameters

##### obj?

The object to clone.

`T` | `null`

#### Returns

`T` \| `null` \| `undefined` *extends* `null` ? `null` : `T` \| `null` \| `undefined` *extends* `undefined` ? `undefined` : `T`

a clone of the passed object.

#### Throws

when a nested object is passed.
