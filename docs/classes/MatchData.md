[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / MatchData

# Class: MatchData

Defined in: [lib/match\_data.mts:17](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/match_data.mts#L17)

Contains and collects metadata about a matching document.
A single instance of MatchData is returned as part of every
IndexResult.

## Constructors

### Constructor

> **new MatchData**(`term?`, `field?`, `metadata?`): `MatchData`

Defined in: [lib/match\_data.mts:29](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/match_data.mts#L29)

#### Parameters

##### term?

`string`

The term this match data is associated with

##### field?

`string`

The field in which the term was found

##### metadata?

The metadata recorded about this term in this field

#### Returns

`MatchData`

#### See

[IndexResult](../type-aliases/IndexResult.md)

## Properties

### metadata

> **metadata**: `object`

Defined in: [lib/match\_data.mts:21](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/match_data.mts#L21)

A cloned collection of metadata associated with this document.

#### Index Signature

\[`key`: `string`\]: `object`

## Methods

### add()

> **add**(`term`, `field`, `metadata`): `void`

Defined in: [lib/match\_data.mts:102](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/match_data.mts#L102)

Add metadata for a term/field pair to this instance of match data.

#### Parameters

##### term

`string`

The term this match data is associated with

##### field

`string`

The field in which the term was found

##### metadata

The metadata recorded about this term in this field

#### Returns

`void`

***

### combine()

> **combine**(`otherMatchData`): `void`

Defined in: [lib/match\_data.mts:62](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/match_data.mts#L62)

An instance of MatchData will be created for every term that matches a
document. However only one instance is required in a IndexResult. This
method combines metadata from another instance of MatchData with this
objects metadata.

#### Parameters

##### otherMatchData

`MatchData`

Another instance of match data to merge with this one.

#### Returns

`void`

#### See

[IndexResult](../type-aliases/IndexResult.md)
