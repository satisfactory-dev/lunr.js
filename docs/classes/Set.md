[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / Set

# Class: Set

Defined in: [lib/set.mts:10](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/set.mts#L10)

A lunr set.

## Extended by

- [`SetComplete`](SetComplete.md)
- [`SetEmpty`](SetEmpty.md)

## Constructors

### Constructor

> **new Set**(`elements?`): `Set`

Defined in: [lib/set.mts:15](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/set.mts#L15)

#### Parameters

##### elements?

`string`[]

#### Returns

`Set`

## Properties

### elements

> **elements**: `object`

Defined in: [lib/set.mts:11](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/set.mts#L11)

#### Index Signature

\[`s`: `string`\]: `boolean`

***

### length

> `readonly` **length**: `number`

Defined in: [lib/set.mts:13](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/set.mts#L13)

## Methods

### contains()

> **contains**(`object`): `boolean`

Defined in: [lib/set.mts:35](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/set.mts#L35)

Returns true if this set contains the specified object.

#### Parameters

##### object

`string`

Object whose presence in this set is to be tested.

#### Returns

`boolean`

- True if this set contains the specified object.

***

### intersect()

> **intersect**(`other`): `Set`

Defined in: [lib/set.mts:46](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/set.mts#L46)

Returns a new set containing only the elements that are present in both
this set and the specified set.

#### Parameters

##### other

`Set`

set to intersect with this set.

#### Returns

`Set`

a new set that is the intersection of this and the specified set.

***

### union()

> **union**(`other`): `Set`

Defined in: [lib/set.mts:87](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/set.mts#L87)

Returns a new set combining the elements of this and the specified set.

#### Parameters

##### other

`Set`

set to union with this set.

#### Returns

`Set`

a new set that is the union of this and the specified set.
