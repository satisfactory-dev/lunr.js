[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / TokenSetBuilder

# Class: TokenSetBuilder

Defined in: [lib/token\_set\_builder.ts:20](https://github.com/satisfactory-dev/lunr.js/blob/a784e792ded62f9529ed9cad4ce843741d12ef24/lib/token_set_builder.ts#L20)

## Constructors

### Constructor

> **new TokenSetBuilder**(): `TokenSetBuilder`

Defined in: [lib/token\_set\_builder.ts:29](https://github.com/satisfactory-dev/lunr.js/blob/a784e792ded62f9529ed9cad4ce843741d12ef24/lib/token_set_builder.ts#L29)

#### Returns

`TokenSetBuilder`

## Properties

### minimizedNodes

> **minimizedNodes**: `object`

Defined in: [lib/token\_set\_builder.ts:27](https://github.com/satisfactory-dev/lunr.js/blob/a784e792ded62f9529ed9cad4ce843741d12ef24/lib/token_set_builder.ts#L27)

#### Index Signature

\[`s`: `string`\]: [`TokenSet`](TokenSet.md) \| [`TokenSetBuilderNode`](../type-aliases/TokenSetBuilderNode.md)

***

### previousWord

> **previousWord**: `string`

Defined in: [lib/token\_set\_builder.ts:21](https://github.com/satisfactory-dev/lunr.js/blob/a784e792ded62f9529ed9cad4ce843741d12ef24/lib/token_set_builder.ts#L21)

***

### root

> **root**: [`TokenSet`](TokenSet.md)

Defined in: [lib/token\_set\_builder.ts:23](https://github.com/satisfactory-dev/lunr.js/blob/a784e792ded62f9529ed9cad4ce843741d12ef24/lib/token_set_builder.ts#L23)

***

### uncheckedNodes

> **uncheckedNodes**: [`TokenSetBuilderNode`](../type-aliases/TokenSetBuilderNode.md)[]

Defined in: [lib/token\_set\_builder.ts:25](https://github.com/satisfactory-dev/lunr.js/blob/a784e792ded62f9529ed9cad4ce843741d12ef24/lib/token_set_builder.ts#L25)

## Methods

### finish()

> **finish**(): `void`

Defined in: [lib/token\_set\_builder.ts:85](https://github.com/satisfactory-dev/lunr.js/blob/a784e792ded62f9529ed9cad4ce843741d12ef24/lib/token_set_builder.ts#L85)

#### Returns

`void`

***

### insert()

> **insert**(`word`): `void`

Defined in: [lib/token\_set\_builder.ts:41](https://github.com/satisfactory-dev/lunr.js/blob/a784e792ded62f9529ed9cad4ce843741d12ef24/lib/token_set_builder.ts#L41)

#### Parameters

##### word

`string`

#### Returns

`void`

***

### minimize()

> **minimize**(`downTo`): `void`

Defined in: [lib/token\_set\_builder.ts:94](https://github.com/satisfactory-dev/lunr.js/blob/a784e792ded62f9529ed9cad4ce843741d12ef24/lib/token_set_builder.ts#L94)

#### Parameters

##### downTo

`number`

#### Returns

`void`
