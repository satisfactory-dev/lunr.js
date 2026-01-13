[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / default

# Function: default()

> **default**(`config`): [`Index`](../classes/Index.md)

Defined in: [lib/lunr.mts:111](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/lunr.mts#L111)

A convenience function for configuring and constructing
a new lunr Index.

A Builder instance is created and the pipeline setup
with a trimmer, stop word filter and stemmer.

This builder object is yielded to the configuration function
that is passed as a parameter, allowing the list of fields
and other builder parameters to be customised.

All documents _must_ be added within the passed config function.

## Parameters

### config

[`LunrConfig`](../type-aliases/LunrConfig.md)

## Returns

[`Index`](../classes/Index.md)

## Example

```ts
var idx = lunr(function () {
  this.field('title')
  this.field('body')
  this.ref = 'id'

  documents.forEach(function (doc) {
    this.add(doc)
  }, this)
})
```

## See

 - [Builder](../classes/Builder.md)
 - [Pipeline](../classes/Pipeline.md)
 - [trimmer](../variables/trimmer.md)
 - [stopWordFilter](../variables/stopWordFilter.md)
 - [stemmer](stemmer.md)
