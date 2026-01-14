[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / Token

# Class: Token

Defined in: [lib/token.mts:21](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/token.mts#L21)

A token wraps a string representation of a token
as it is passed through the text processing pipeline.

## Constructors

### Constructor

> **new Token**(`str?`, `metadata?`): `Token`

Defined in: [lib/token.mts:29](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/token.mts#L29)

#### Parameters

##### str?

`string`

The string token being wrapped.

##### metadata?

Metadata associated with this token.

#### Returns

`Token`

## Properties

### metadata

> **metadata**: `object`

Defined in: [lib/token.mts:23](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/token.mts#L23)

#### Index Signature

\[`key`: `string`\]: `unknown`

***

### str

> **str**: `string`

Defined in: [lib/token.mts:22](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/token.mts#L22)

## Methods

### clone()

> **clone**(`fn?`): `Token`

Defined in: [lib/token.mts:66](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/token.mts#L66)

Creates a clone of this token. Optionally a function can be
applied to the cloned token.

#### Parameters

##### fn?

[`TokenUpdateFunction`](../type-aliases/TokenUpdateFunction.md)

An optional function to apply to the cloned token.

#### Returns

`Token`

***

### toString()

> **toString**(): `string`

Defined in: [lib/token.mts:39](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/token.mts#L39)

Returns the token string that is being wrapped by this object.

#### Returns

`string`

***

### update()

> **update**(`fn`): `this`

Defined in: [lib/token.mts:54](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/token.mts#L54)

Applies the given function to the wrapped string token.

#### Parameters

##### fn

[`TokenUpdateFunction`](../type-aliases/TokenUpdateFunction.md)

A function to apply to the token string.
  *

#### Returns

`this`

#### Example

```ts
token.update(function (str, metadata) {
  return str.toUpperCase()
})
```
