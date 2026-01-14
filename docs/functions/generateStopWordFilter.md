[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / generateStopWordFilter

# Function: generateStopWordFilter()

> **generateStopWordFilter**(`stopWords`): (`token`) => [`Token`](../classes/Token.md) \| `undefined`

Defined in: [lib/stop\_word\_filter.mts:27](https://github.com/satisfactory-dev/lunr.js/blob/a6ab1d4d6bba235f453a60981dedfc934bea2021/lib/stop_word_filter.mts#L27)

generateStopWordFilter builds a stopWordFilter function from the provided
list of stop words.

The built in stopWordFilter is built using this generator and can be used
to generate custom stopWordFilters for applications or non English languages.

## Parameters

### stopWords

`string`[]

The token to pass through the filter

## Returns

> (`token`): [`Token`](../classes/Token.md) \| `undefined`

### Parameters

#### token

[`Token`](../classes/Token.md)

### Returns

[`Token`](../classes/Token.md) \| `undefined`

## See

 - Pipeline
 - stopWordFilter
