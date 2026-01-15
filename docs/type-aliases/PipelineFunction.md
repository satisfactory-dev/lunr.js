[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / PipelineFunction

# Type Alias: PipelineFunction\<T\>

> **PipelineFunction**\<`T`\> = (`token`, `i`, `tokens`) => `void` \| `null` \| `undefined` \| `T` \| `T`[]

Defined in: [lib/pipeline.ts:30](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/pipeline.ts#L30)

A pipeline function maps Token to Token. A Token contains the token
string as well as all known metadata. A pipeline function can mutate the token string
or mutate (or add) metadata for a given token.

A pipeline function can indicate that the passed token should be discarded by returning
null, undefined or an empty string. This token will not be passed to any downstream pipeline
functions and will not be added to the index.

Multiple tokens can be returned by returning an array of tokens. Each token will be passed
to any downstream pipeline functions and all will returned tokens will be added to the index.

Any number of pipeline functions may be chained together using a Pipeline.

## Type Parameters

### T

`T` *extends* `object`

## Param

A token from the document being processed.

## Param

The index of this token in the complete list of tokens for this document/field.

## Param

All tokens for this document/field.

## Returns
