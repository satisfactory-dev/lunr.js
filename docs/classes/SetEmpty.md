[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / SetEmpty

# Class: SetEmpty

Defined in: [lib/set.mts:122](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/set.mts#L122)

An empty set that contains no elements.

## Extends

- [`Set`](Set.md)

## Constructors

### Constructor

> **new SetEmpty**(`elements?`): `SetEmpty`

Defined in: [lib/set.mts:15](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/set.mts#L15)

#### Parameters

##### elements?

`string`[]

#### Returns

`SetEmpty`

#### Inherited from

[`Set`](Set.md).[`constructor`](Set.md#constructor)

## Properties

### elements

> **elements**: `object`

Defined in: [lib/set.mts:11](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/set.mts#L11)

#### Index Signature

\[`s`: `string`\]: `boolean`

#### Inherited from

[`Set`](Set.md).[`elements`](Set.md#elements)

***

### length

> `readonly` **length**: `number`

Defined in: [lib/set.mts:13](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/set.mts#L13)

#### Inherited from

[`Set`](Set.md).[`length`](Set.md#length)

## Methods

### contains()

> **contains**(`object`): `boolean`

Defined in: [lib/set.mts:132](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/set.mts#L132)

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

> **intersect**(): `this`

Defined in: [lib/set.mts:123](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/set.mts#L123)

Returns a new set containing only the elements that are present in both
this set and the specified set.

#### Returns

`this`

a new set that is the intersection of this and the specified set.

#### Overrides

[`Set`](Set.md).[`intersect`](Set.md#intersect)

***

### union()

> **union**(`other`): [`Set`](Set.md)

Defined in: [lib/set.mts:127](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/set.mts#L127)

Returns a new set combining the elements of this and the specified set.

#### Parameters

##### other

[`Set`](Set.md)

set to union with this set.

#### Returns

[`Set`](Set.md)

a new set that is the union of this and the specified set.

#### Overrides

[`Set`](Set.md).[`union`](Set.md#union)
