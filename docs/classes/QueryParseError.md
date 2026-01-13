[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / QueryParseError

# Class: QueryParseError

Defined in: [lib/query\_parse\_error.mts:7](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query_parse_error.mts#L7)

## Extends

- `Error`

## Constructors

### Constructor

> **new QueryParseError**(`message`, `start`, `end`): `QueryParseError`

Defined in: [lib/query\_parse\_error.mts:18](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query_parse_error.mts#L18)

#### Parameters

##### message

`string`

##### start

`number`

##### end

`number`

#### Returns

`QueryParseError`

#### Overrides

`Error.constructor`

## Properties

### cause?

> `optional` **cause**: `unknown`

Defined in: node\_modules/typescript/lib/lib.es2022.error.d.ts:26

#### Inherited from

`Error.cause`

***

### end

> **end**: `number`

Defined in: [lib/query\_parse\_error.mts:16](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query_parse_error.mts#L16)

***

### message

> **message**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1077

#### Inherited from

`Error.message`

***

### name

> **name**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

`Error.name`

***

### stack?

> `optional` **stack**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

`Error.stack`

***

### start

> **start**: `number`

Defined in: [lib/query\_parse\_error.mts:11](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query_parse_error.mts#L11)

## Methods

### isError()

> `static` **isError**(`error`): `error is Error`

Defined in: node\_modules/typescript/lib/lib.esnext.error.d.ts:23

Indicates whether the argument provided is a built-in Error instance or not.

#### Parameters

##### error

`unknown`

#### Returns

`error is Error`

#### Inherited from

`Error.isError`
