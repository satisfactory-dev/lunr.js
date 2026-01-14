[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / AsyncLunr

# Class: AsyncLunr

Defined in: [lib/lunr.ts:177](https://github.com/satisfactory-dev/lunr.js/blob/a6f1f9f7bf834bcdd5a90dadeebd8a5011d7ce3e/lib/lunr.ts#L177)

## Extends

- `AbstractLunr`

## Constructors

### Constructor

> **new AsyncLunr**(`config`): `AsyncLunr`

Defined in: [lib/lunr.ts:180](https://github.com/satisfactory-dev/lunr.js/blob/a6f1f9f7bf834bcdd5a90dadeebd8a5011d7ce3e/lib/lunr.ts#L180)

#### Parameters

##### config

[`AsyncLunrConfig`](../type-aliases/AsyncLunrConfig.md)

#### Returns

`AsyncLunr`

#### Overrides

`AbstractLunr.constructor`

## Properties

### builder

> `protected` **builder**: [`Builder`](Builder.md)

Defined in: [lib/lunr.ts:134](https://github.com/satisfactory-dev/lunr.js/blob/a6f1f9f7bf834bcdd5a90dadeebd8a5011d7ce3e/lib/lunr.ts#L134)

#### Inherited from

`AbstractLunr.builder`

## Accessors

### compatibleVersions

#### Get Signature

> **get** `static` **compatibleVersions**(): `string`[]

Defined in: [lib/lunr.ts:160](https://github.com/satisfactory-dev/lunr.js/blob/a6f1f9f7bf834bcdd5a90dadeebd8a5011d7ce3e/lib/lunr.ts#L160)

Versions for which the current library is compatible with

##### Returns

`string`[]

#### Inherited from

`AbstractLunr.compatibleVersions`

***

### version

#### Get Signature

> **get** `static` **version**(): `string`

Defined in: [lib/lunr.ts:153](https://github.com/satisfactory-dev/lunr.js/blob/a6f1f9f7bf834bcdd5a90dadeebd8a5011d7ce3e/lib/lunr.ts#L153)

The current version of the library

##### Returns

`string`

#### Inherited from

`AbstractLunr.version`

## Methods

### build()

> **build**(): `Promise`\<[`Index`](Index.md)\>

Defined in: [lib/lunr.ts:186](https://github.com/satisfactory-dev/lunr.js/blob/a6f1f9f7bf834bcdd5a90dadeebd8a5011d7ce3e/lib/lunr.ts#L186)

#### Returns

`Promise`\<[`Index`](Index.md)\>
