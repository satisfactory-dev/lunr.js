[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / tokenizer

# Function: tokenizer()

> **tokenizer**(`obj?`, `metadata?`, `usingSeparator?`): [`Token`](../classes/Token.md)[]

Defined in: [lib/tokenizer.mts:38](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/tokenizer.mts#L38)

A function for splitting a string into tokens ready to be inserted into
the search index. Uses `separator` to split strings, change
the value of this property to change how strings are split into tokens.

This tokenizer will convert its parameter to a string by calling `toString` and
then will split this string on the character in `separator`.
Arrays will have their elements converted to strings and wrapped in a Token.

Optional metadata can be passed to the tokenizer, this metadata will be cloned and
added as metadata to every token that is created from the object to be tokenized.

## Parameters

### obj?

The object to convert into tokens

`string` | `number` | `boolean` | `object` | `object`[] | `null`

### metadata?

Optional metadata to associate with every token

### usingSeparator?

`RegExp`

separator to use

## Returns

[`Token`](../classes/Token.md)[]

## See

[Pipeline](../classes/Pipeline.md)
