[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / generateStopWordFilter

# Function: generateStopWordFilter()

> **generateStopWordFilter**(`stopWords`): [`PipelineFunction`](../type-aliases/PipelineFunction.md)\<\{ `toString`: `string`; \}\>

Defined in: [lib/stop\_word\_filter.ts:25](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/stop_word_filter.ts#L25)

generateStopWordFilter builds a stopWordFilter function from the provided
list of stop words.

The built in stopWordFilter is built using this generator and can be used
to generate custom stopWordFilters for applications or non English languages.

## Parameters

### stopWords

`string`[]

The token to pass through the filter

## Returns

[`PipelineFunction`](../type-aliases/PipelineFunction.md)\<\{ `toString`: `string`; \}\>

## See

 - Pipeline
 - stopWordFilter
