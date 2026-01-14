[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / SetComplete

# Class: SetComplete

Defined in: [lib/set.ts:103](https://github.com/satisfactory-dev/lunr.js/blob/a6f1f9f7bf834bcdd5a90dadeebd8a5011d7ce3e/lib/set.ts#L103)

A complete set that contains all elements.

## Extends

- [`Set`](Set.md)

## Constructors

### Constructor

> **new SetComplete**(`elements?`): `SetComplete`

Defined in: [lib/set.ts:15](https://github.com/satisfactory-dev/lunr.js/blob/a6f1f9f7bf834bcdd5a90dadeebd8a5011d7ce3e/lib/set.ts#L15)

#### Parameters

##### elements?

`string`[]

#### Returns

`SetComplete`

#### Inherited from

[`Set`](Set.md).[`constructor`](Set.md#constructor)

## Properties

### elements

> **elements**: `object`

Defined in: [lib/set.ts:11](https://github.com/satisfactory-dev/lunr.js/blob/a6f1f9f7bf834bcdd5a90dadeebd8a5011d7ce3e/lib/set.ts#L11)

#### Index Signature

\[`s`: `string`\]: `boolean`

#### Inherited from

[`Set`](Set.md).[`elements`](Set.md#elements)

***

### length

> `readonly` **length**: `number`

Defined in: [lib/set.ts:13](https://github.com/satisfactory-dev/lunr.js/blob/a6f1f9f7bf834bcdd5a90dadeebd8a5011d7ce3e/lib/set.ts#L13)

#### Inherited from

[`Set`](Set.md).[`length`](Set.md#length)

## Methods

### contains()

> **contains**(`object`): `boolean`

Defined in: [lib/set.ts:114](https://github.com/satisfactory-dev/lunr.js/blob/a6f1f9f7bf834bcdd5a90dadeebd8a5011d7ce3e/lib/set.ts#L114)

Returns true if this set contains the specified object.

#### Parameters

##### object

Object whose presence in this set is to be tested.

`string` | `object`

#### Returns

`boolean`

- True if this set contains the specified object.

#### Overrides

[`Set`](Set.md).[`contains`](Set.md#contains)

***

### intersect()

> **intersect**(`other`): [`Set`](Set.md)

Defined in: [lib/set.ts:104](https://github.com/satisfactory-dev/lunr.js/blob/a6f1f9f7bf834bcdd5a90dadeebd8a5011d7ce3e/lib/set.ts#L104)

Returns a new set containing only the elements that are present in both
this set and the specified set.

#### Parameters

##### other

[`Set`](Set.md)

set to intersect with this set.

#### Returns

[`Set`](Set.md)

a new set that is the intersection of this and the specified set.

#### Overrides

[`Set`](Set.md).[`intersect`](Set.md#intersect)

***

### union()

> **union**(`other`): `this`

Defined in: [lib/set.ts:109](https://github.com/satisfactory-dev/lunr.js/blob/a6f1f9f7bf834bcdd5a90dadeebd8a5011d7ce3e/lib/set.ts#L109)

Returns a new set combining the elements of this and the specified set.

#### Parameters

##### other

[`Set`](Set.md)

set to union with this set.

#### Returns

`this`

a new set that is the union of this and the specified set.

#### Overrides

[`Set`](Set.md).[`union`](Set.md#union)
