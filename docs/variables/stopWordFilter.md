[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / stopWordFilter

# Variable: stopWordFilter

> `const` **stopWordFilter**: [`LabeledPipelineFunction`](../type-aliases/LabeledPipelineFunction.md)\<[`PipelineFunction`](../type-aliases/PipelineFunction.md)\<\{ `toString`: `string`; \}\>, `string`\>

Defined in: [lib/stop\_word\_filter.ts:47](https://github.com/satisfactory-dev/lunr.js/blob/a6f1f9f7bf834bcdd5a90dadeebd8a5011d7ce3e/lib/stop_word_filter.ts#L47)

stopWordFilter is an English language stop word list filter, any words
contained in the list will not be passed through the filter.

This is intended to be used in the Pipeline. If the token does not pass the
filter then undefined will be returned.

## Param

A token to check for being a stop word.

## Returns

## See

[Pipeline](../classes/Pipeline.md)
