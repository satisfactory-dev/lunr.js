[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / TokenSet

# Class: TokenSet

Defined in: [lib/token\_set.ts:34](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/token_set.ts#L34)

A token set is used to store the unique list of all tokens
within an index. Token sets are also used to represent an
incoming query to the index, this query token set and index
token set are then intersected to find which tokens to look
up in the inverted index.

A token set can hold multiple tokens, as in the case of the
index token set, or it can hold a single token as in the
case of a simple query token set.

Additionally token sets are used to perform wildcard matching.
Leading, contained and trailing wildcards are supported, and
from this edit distance matching can also be provided.

Token sets are implemented as a minimal finite state automata,
where both common prefixes and suffixes are shared between tokens.
This helps to reduce the space used for storing the token set.

## Constructors

### Constructor

> **new TokenSet**(): `TokenSet`

Defined in: [lib/token\_set.ts:53](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/token_set.ts#L53)

#### Returns

`TokenSet`

## Properties

### edges

> **edges**: `object`

Defined in: [lib/token\_set.ts:40](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/token_set.ts#L40)

#### Index Signature

\[`s`: `string`\]: `TokenSet`

***

### final

> **final**: `boolean`

Defined in: [lib/token\_set.ts:38](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/token_set.ts#L38)

***

### id

> **id**: `number`

Defined in: [lib/token\_set.ts:45](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/token_set.ts#L45)

## Accessors

### \_str

#### Set Signature

> **set** **\_str**(`value`): `void`

Defined in: [lib/token\_set.ts:49](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/token_set.ts#L49)

##### Parameters

###### value

`string` | `number` | `undefined`

##### Returns

`void`

## Methods

### intersect()

> **intersect**(`b`): `TokenSet`

Defined in: [lib/token\_set.ts:397](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/token_set.ts#L397)

Returns a new TokenSet that is the intersection of
this TokenSet and the passed TokenSet.

This intersection will take into account any wildcards
contained within the TokenSet.

#### Parameters

##### b

`TokenSet`

An other TokenSet to intersect with.

#### Returns

`TokenSet`

***

### toArray()

> **toArray**(): `string`[]

Defined in: [lib/token\_set.ts:308](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/token_set.ts#L308)

Converts this TokenSet into an array of strings
contained within the TokenSet.

This is not intended to be used on a TokenSet that
contains wildcards, in these cases the results are
undefined and are likely to cause an infinite loop.

#### Returns

`string`[]

***

### toString()

> **toString**(): `string`

Defined in: [lib/token\_set.ts:360](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/token_set.ts#L360)

Generates a string representation of a TokenSet.

This is intended to allow TokenSets to be used as keys
in objects, largely to aid the construction and minimisation
of a TokenSet. As such it is not designed to be a human
friendly representation of the TokenSet.

#### Returns

`string`

***

### fromArray()

> `static` **fromArray**(`arr`): `TokenSet`

Defined in: [lib/token\_set.ts:81](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/token_set.ts#L81)

Creates a TokenSet instance from the given sorted array of words.

#### Parameters

##### arr

`string`[]

A sorted array of strings to create the set from.

#### Returns

`TokenSet`

#### Throws

Will throw an error if the input array is not sorted.

***

### fromFuzzyString()

> `static` **fromFuzzyString**(`str`, `editDistance`): `TokenSet`

Defined in: [lib/token\_set.ts:124](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/token_set.ts#L124)

Creates a token set representing a single string with a specified
edit distance.

Insertions, deletions, substitutions and transpositions are each
treated as an edit distance of 1.

Increasing the allowed edit distance will have a dramatic impact
on the performance of both creating and intersecting these TokenSets.
It is advised to keep the edit distance less than 3.

#### Parameters

##### str

`string`

The string to create the token set from.

##### editDistance

`number`

The allowed edit distance to match.

#### Returns

`TokenSet`

***

### fromString()

> `static` **fromString**(`str`): `TokenSet`

Defined in: [lib/token\_set.ts:266](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/token_set.ts#L266)

Creates a TokenSet from a string.

The string may contain one or more wildcard characters (*)
that will allow wildcard matching when intersecting with
another TokenSet.

#### Parameters

##### str

`string`

The string to create a TokenSet from.

#### Returns

`TokenSet`

***

### resetNextId()

> `static` **resetNextId**(): `void`

Defined in: [lib/token\_set.ts:70](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/token_set.ts#L70)

#### Returns

`void`
