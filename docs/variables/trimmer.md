[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / trimmer

# Variable: trimmer

> **trimmer**: [`LabeledPipelineFunction`](../type-aliases/LabeledPipelineFunction.md)\<(`token`) => [`Token`](../classes/Token.md), `string`\>

Defined in: [lib/trimmer.ts:28](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/trimmer.ts#L28)

trimmer is a pipeline function for trimming non word
characters from the beginning and end of tokens before they
enter the index.

This implementation may not work correctly for non latin
characters and should either be removed or adapted for use
with languages with non-latin characters.

## Param

The token to pass through the filter

## Returns

## See

Pipeline
