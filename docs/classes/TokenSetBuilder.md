[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / TokenSetBuilder

# Class: TokenSetBuilder

Defined in: [lib/token\_set\_builder.mts:20](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/token_set_builder.mts#L20)

## Constructors

### Constructor

> **new TokenSetBuilder**(): `TokenSetBuilder`

Defined in: [lib/token\_set\_builder.mts:29](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/token_set_builder.mts#L29)

#### Returns

`TokenSetBuilder`

## Properties

### minimizedNodes

> **minimizedNodes**: `object`

Defined in: [lib/token\_set\_builder.mts:27](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/token_set_builder.mts#L27)

#### Index Signature

\[`s`: `string`\]: [`TokenSet`](TokenSet.md) \| [`TokenSetBuilderNode`](../type-aliases/TokenSetBuilderNode.md)

***

### previousWord

> **previousWord**: `string`

Defined in: [lib/token\_set\_builder.mts:21](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/token_set_builder.mts#L21)

***

### root

> **root**: [`TokenSet`](TokenSet.md)

Defined in: [lib/token\_set\_builder.mts:23](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/token_set_builder.mts#L23)

***

### uncheckedNodes

> **uncheckedNodes**: [`TokenSetBuilderNode`](../type-aliases/TokenSetBuilderNode.md)[]

Defined in: [lib/token\_set\_builder.mts:25](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/token_set_builder.mts#L25)

## Methods

### finish()

> **finish**(): `void`

Defined in: [lib/token\_set\_builder.mts:85](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/token_set_builder.mts#L85)

#### Returns

`void`

***

### insert()

> **insert**(`word`): `void`

Defined in: [lib/token\_set\_builder.mts:41](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/token_set_builder.mts#L41)

#### Parameters

##### word

`string`

#### Returns

`void`

***

### minimize()

> **minimize**(`downTo`): `void`

Defined in: [lib/token\_set\_builder.mts:94](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/token_set_builder.mts#L94)

#### Parameters

##### downTo

`number`

#### Returns

`void`
