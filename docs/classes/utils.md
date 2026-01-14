[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / utils

# Class: utils

Defined in: [lib/utils.mts:14](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/utils.mts#L14)

A class containing utility functions for the rest of the lunr library

## Constructors

### Constructor

> **new utils**(): `utils`

#### Returns

`utils`

## Properties

### clone()

> `static` **clone**: (`obj?`) => \{\[`s`: `string`\]: `unknown`; \} \| `null` \| `undefined`

Defined in: [lib/utils.mts:49](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/utils.mts#L49)

Clones an object.

Will create a copy of an existing object such that any mutations
on the copy cannot affect the original.

Only shallow objects are supported, passing a nested object to this
function will cause a TypeError.

Objects with primitives, and arrays of primitives are supported.

#### Parameters

##### obj?

The object to clone.

`object` | [`QueryClause`](QueryClause.md)

#### Returns

\{\[`s`: `string`\]: `unknown`; \} \| `null` \| `undefined`

a clone of the passed object.

#### Throws

when a nested object is passed.

## Methods

### asString()

> `static` **asString**(`obj`): `string`

Defined in: [lib/utils.mts:25](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/utils.mts#L25)

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
