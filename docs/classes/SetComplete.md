[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / SetComplete

# Class: SetComplete

Defined in: [lib/set.mts:103](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/set.mts#L103)

A complete set that contains all elements.

## Extends

- [`Set`](Set.md)

## Constructors

### Constructor

> **new SetComplete**(`elements?`): `SetComplete`

Defined in: [lib/set.mts:15](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/set.mts#L15)

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

Defined in: [lib/set.mts:11](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/set.mts#L11)

#### Index Signature

\[`s`: `string`\]: `boolean`

#### Inherited from

[`Set`](Set.md).[`elements`](Set.md#elements)

***

### length

> `readonly` **length**: `number`

Defined in: [lib/set.mts:13](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/set.mts#L13)

#### Inherited from

[`Set`](Set.md).[`length`](Set.md#length)

## Methods

### contains()

> **contains**(`object`): `boolean`

Defined in: [lib/set.mts:114](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/set.mts#L114)

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

Defined in: [lib/set.mts:104](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/set.mts#L104)

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

Defined in: [lib/set.mts:109](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/set.mts#L109)

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
