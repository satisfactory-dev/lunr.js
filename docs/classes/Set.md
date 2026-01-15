[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / Set

# Class: Set

Defined in: [lib/set.ts:10](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/set.ts#L10)

A lunr set.

## Extended by

- [`SetComplete`](SetComplete.md)
- [`SetEmpty`](SetEmpty.md)

## Constructors

### Constructor

> **new Set**(`elements?`): `Set`

Defined in: [lib/set.ts:15](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/set.ts#L15)

#### Parameters

##### elements?

`string`[]

#### Returns

`Set`

## Properties

### elements

> **elements**: `object`

Defined in: [lib/set.ts:11](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/set.ts#L11)

#### Index Signature

\[`s`: `string`\]: `boolean`

***

### length

> `readonly` **length**: `number`

Defined in: [lib/set.ts:13](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/set.ts#L13)

## Methods

### contains()

> **contains**(`object`): `boolean`

Defined in: [lib/set.ts:35](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/set.ts#L35)

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

Defined in: [lib/set.ts:46](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/set.ts#L46)

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

Defined in: [lib/set.ts:87](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/set.ts#L87)

Returns a new set combining the elements of this and the specified set.

#### Parameters

##### other

`Set`

set to union with this set.

#### Returns

`Set`

a new set that is the union of this and the specified set.
