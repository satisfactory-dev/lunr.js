[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / default

# Function: default()

## Call Signature

> **default**(`config`): [`Index`](../classes/Index.md)

Defined in: [lib/lunr.ts:114](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/lunr.ts#L114)

A convenience function for configuring and constructing
a new lunr Index.

A Builder instance is created and the pipeline setup
with a trimmer, stop word filter and stemmer.

This builder object is yielded to the configuration function
that is passed as a parameter, allowing the list of fields
and other builder parameters to be customised.

All documents _must_ be added within the passed config function.

### Parameters

#### config

[`LunrConfig`](../type-aliases/LunrConfig.md)

### Returns

[`Index`](../classes/Index.md)

### Example

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

### See

 - [Builder](../classes/Builder.md)
 - [Pipeline](../classes/Pipeline.md)
 - [trimmer](../variables/trimmer.md)
 - [stopWordFilter](../variables/stopWordFilter.md)
 - [stemmer](stemmer.md)

## Call Signature

> **default**(`config`): `Promise`\<[`Index`](../classes/Index.md)\>

Defined in: [lib/lunr.ts:115](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/lunr.ts#L115)

A convenience function for configuring and constructing
a new lunr Index.

A Builder instance is created and the pipeline setup
with a trimmer, stop word filter and stemmer.

This builder object is yielded to the configuration function
that is passed as a parameter, allowing the list of fields
and other builder parameters to be customised.

All documents _must_ be added within the passed config function.

### Parameters

#### config

[`AsyncLunrConfig`](../type-aliases/AsyncLunrConfig.md)

### Returns

`Promise`\<[`Index`](../classes/Index.md)\>

### Example

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

### See

 - [Builder](../classes/Builder.md)
 - [Pipeline](../classes/Pipeline.md)
 - [trimmer](../variables/trimmer.md)
 - [stopWordFilter](../variables/stopWordFilter.md)
 - [stemmer](stemmer.md)
