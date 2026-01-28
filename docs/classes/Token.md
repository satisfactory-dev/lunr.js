[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / Token

# Class: Token

Defined in: [lib/token.ts:21](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/token.ts#L21)

A token wraps a string representation of a token
as it is passed through the text processing pipeline.

## Constructors

### Constructor

> **new Token**(`str?`, `metadata?`): `Token`

Defined in: [lib/token.ts:29](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/token.ts#L29)

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

Defined in: [lib/token.ts:23](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/token.ts#L23)

#### Index Signature

\[`key`: `string`\]: `unknown`

***

### str

> **str**: `string`

Defined in: [lib/token.ts:22](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/token.ts#L22)

## Methods

### clone()

> **clone**(`fn?`): `Token`

Defined in: [lib/token.ts:66](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/token.ts#L66)

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

Defined in: [lib/token.ts:39](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/token.ts#L39)

Returns the token string that is being wrapped by this object.

#### Returns

`string`

***

### update()

> **update**(`fn`): `this`

Defined in: [lib/token.ts:54](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/token.ts#L54)

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
