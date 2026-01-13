[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / stemmer

# Function: stemmer()

> **stemmer**(`token`, `i`, `tokens`): [`Token`](../classes/Token.md) \| [`Token`](../classes/Token.md)[] \| `undefined`

Defined in: [lib/stemmer.mts:26](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/stemmer.mts#L26)

stemmer is an english language stemmer, this is a JavaScript
implementation of the PorterStemmer taken from http://tartarus.org/~martin

## Parameters

### token

[`Token`](../classes/Token.md)

The string to stem

### i

`number`

### tokens

[`Token`](../classes/Token.md)[]

## Returns

[`Token`](../classes/Token.md) \| [`Token`](../classes/Token.md)[] \| `undefined`

## See

[Pipeline](../classes/Pipeline.md)
