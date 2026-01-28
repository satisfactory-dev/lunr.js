[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / SerializedIndex

# Type Alias: SerializedIndex\<Version\>

> **SerializedIndex**\<`Version`\> = `object`

Defined in: [lib/index.ts:136](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/index.ts#L136)

## Type Parameters

### Version

`Version` *extends* `string` = `string`

## Properties

### fields

> **fields**: `string`[]

Defined in: [lib/index.ts:140](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/index.ts#L140)

***

### fieldVectors

> **fieldVectors**: \[`string`, \[`number`, `number` \| `string`, ...((...) \| (...))\[\]\] \| `ReturnType`\<[`Vector`](../classes/Vector.md)\[`"toJSON"`\]\>\][]

Defined in: [lib/index.ts:141](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/index.ts#L141)

***

### invertedIndex

> **invertedIndex**: \[`string`, [`Index`](../classes/Index.md)\[`"invertedIndex"`\]\[keyof [`Index`](../classes/Index.md)\[`"invertedIndex"`\]\]\][]

Defined in: [lib/index.ts:149](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/index.ts#L149)

***

### pipeline

> **pipeline**: `ReturnType`\<[`Pipeline`](../classes/Pipeline.md)\[`"toJSON"`\]\>

Defined in: [lib/index.ts:153](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/index.ts#L153)

***

### version

> **version**: `Version`

Defined in: [lib/index.ts:139](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/index.ts#L139)
