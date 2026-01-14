[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / stopWordFilter

# Variable: stopWordFilter

> `const` **stopWordFilter**: [`LabeledPipelineFunction`](../type-aliases/LabeledPipelineFunction.md)

Defined in: [lib/stop\_word\_filter.mts:49](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/stop_word_filter.mts#L49)

stopWordFilter is an English language stop word list filter, any words
contained in the list will not be passed through the filter.

This is intended to be used in the Pipeline. If the token does not pass the
filter then undefined will be returned.

## Param

A token to check for being a stop word.

## Returns

## See

[Pipeline](../classes/Pipeline.md)
