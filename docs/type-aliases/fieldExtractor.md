[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / fieldExtractor

# Type Alias: fieldExtractor()

> **fieldExtractor** = (`doc`) => `null` \| `string` \| `object` \| `object`[]

Defined in: [lib/builder.mts:44](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/builder.mts#L44)

A function that is used to extract a field from a document.

Lunr expects a field to be at the top level of a document, if however the field
is deeply nested within a document an extractor function can be used to extract
the right field for indexing.

## Parameters

### doc

`object`

The document being added to the index.

## Returns

`null` \| `string` \| `object` \| `object`[]

obj - The object that will be indexed for this field.

## Example

```ts
function (doc) { return doc.nested.field }
```
