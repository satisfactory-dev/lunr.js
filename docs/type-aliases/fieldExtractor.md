[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / fieldExtractor

# Type Alias: fieldExtractor()\<T\>

> **fieldExtractor**\<`T`\> = (`doc`) => `null` \| `string` \| `object` \| `object`[]

Defined in: [lib/builder.ts:44](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/builder.ts#L44)

A function that is used to extract a field from a document.

Lunr expects a field to be at the top level of a document, if however the field
is deeply nested within a document an extractor function can be used to extract
the right field for indexing.

## Type Parameters

### T

`T` *extends* `object` = `object`

## Parameters

### doc

`T`

The document being added to the index.

## Returns

`null` \| `string` \| `object` \| `object`[]

obj - The object that will be indexed for this field.

## Example

```ts
function (doc) { return doc.nested.field }
```
