[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / trimmer

# Variable: trimmer

> **trimmer**: [`LabeledPipelineFunction`](../type-aliases/LabeledPipelineFunction.md)\<(`token`) => [`Token`](../classes/Token.md), `string`\>

Defined in: [lib/trimmer.ts:28](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/trimmer.ts#L28)

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
