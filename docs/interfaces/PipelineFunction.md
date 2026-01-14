[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / PipelineFunction

# Interface: PipelineFunction()

Defined in: [lib/pipeline.mts:31](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/pipeline.mts#L31)

A pipeline function maps Token to Token. A Token contains the token
string as well as all known metadata. A pipeline function can mutate the token string
or mutate (or add) metadata for a given token.

A pipeline function can indicate that the passed token should be discarded by returning
null, undefined or an empty string. This token will not be passed to any downstream pipeline
functions and will not be added to the index.

Multiple tokens can be returned by returning an array of tokens. Each token will be passed
to any downstream pipeline functions and all will returned tokens will be added to the index.

Any number of pipeline functions may be chained together using a Pipeline.

 PipelineFunction

> **PipelineFunction**(`token`, `i`, `tokens`): [`Token`](../classes/Token.md) \| [`Token`](../classes/Token.md)[] \| `undefined`

Defined in: [lib/pipeline.mts:32](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/pipeline.mts#L32)

## Parameters

### token

[`Token`](../classes/Token.md)

A token from the document being processed.

### i

`number`

The index of this token in the complete list of tokens for this document/field.

### tokens

[`Token`](../classes/Token.md)[]

All tokens for this document/field.

## Returns

[`Token`](../classes/Token.md) \| [`Token`](../classes/Token.md)[] \| `undefined`

## Properties

### label?

> `optional` **label**: `string`

Defined in: [lib/pipeline.mts:42](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/pipeline.mts#L42)
