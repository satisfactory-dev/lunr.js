[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / Lunr

# Class: Lunr

Defined in: [lib/lunr.ts:165](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/lunr.ts#L165)

## Extends

- `AbstractLunr`

## Constructors

### Constructor

> **new Lunr**(`config`): `Lunr`

Defined in: [lib/lunr.ts:166](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/lunr.ts#L166)

#### Parameters

##### config

[`LunrConfig`](../type-aliases/LunrConfig.md)

#### Returns

`Lunr`

#### Overrides

`AbstractLunr.constructor`

## Properties

### builder

> `protected` **builder**: [`Builder`](Builder.md)

Defined in: [lib/lunr.ts:134](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/lunr.ts#L134)

#### Inherited from

`AbstractLunr.builder`

## Accessors

### compatibleVersions

#### Get Signature

> **get** `static` **compatibleVersions**(): `string`[]

Defined in: [lib/lunr.ts:160](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/lunr.ts#L160)

Versions for which the current library is compatible with

##### Returns

`string`[]

#### Inherited from

`AbstractLunr.compatibleVersions`

***

### version

#### Get Signature

> **get** `static` **version**(): `string`

Defined in: [lib/lunr.ts:153](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/lunr.ts#L153)

The current version of the library

##### Returns

`string`

#### Inherited from

`AbstractLunr.version`

## Methods

### build()

> **build**(): [`Index`](Index.md)

Defined in: [lib/lunr.ts:172](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/lunr.ts#L172)

#### Returns

[`Index`](Index.md)
