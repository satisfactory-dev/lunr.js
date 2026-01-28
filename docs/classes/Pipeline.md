[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / Pipeline

# Class: Pipeline

Defined in: [lib/pipeline.ts:92](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/pipeline.ts#L92)

Instances of Pipeline maintain an ordered list of functions to be applied to all
tokens in documents entering the search index and queries being ran against
the index.

An instance of Index created with the lunr shortcut will contain a
pipeline with a stop word filter and an English language stemmer. Extra
functions can be added before or after either of these functions or these
default functions can be removed.

When run the pipeline will call each function in turn, passing a token, the
index of that token in the original list of all tokens and finally a list of
all the original tokens.

The output of functions in the pipeline will be passed to the next function
in the pipeline. To exclude a token from entering the index the function
should return undefined, the rest of the pipeline will not be called with
this token.

For serialisation of pipelines to work, all functions used in an instance of
a pipeline should be registered with Pipeline. Registered functions can
then be loaded. If trying to load a serialised pipeline that uses functions
that are not registered an error will be thrown.

If not planning on serialising the pipeline then registering pipeline functions
is not necessary.

## Constructors

### Constructor

> **new Pipeline**(): `Pipeline`

#### Returns

`Pipeline`

## Properties

### functionNotRegisteredHandler

> `static` **functionNotRegisteredHandler**: [`FunctionNotRegisteredHandler`](../type-aliases/FunctionNotRegisteredHandler.md)

Defined in: [lib/pipeline.ts:138](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/pipeline.ts#L138)

***

### registeredFunctions

> `static` **registeredFunctions**: `object` = `{}`

Defined in: [lib/pipeline.ts:99](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/pipeline.ts#L99)

#### Index Signature

\[`s`: `string`\]: [`LabeledPipelineFunction`](../type-aliases/LabeledPipelineFunction.md)\<[`UnlabelledPipelineFunction`](../type-aliases/UnlabelledPipelineFunction.md), `string`\>

## Accessors

### stackLength

#### Get Signature

> **get** **stackLength**(): `number`

Defined in: [lib/pipeline.ts:95](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/pipeline.ts#L95)

##### Returns

`number`

## Methods

### add()

> **add**(...`fns`): `void`

Defined in: [lib/pipeline.ts:184](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/pipeline.ts#L184)

Adds new functions to the end of the pipeline.

Logs a warning if the function has not been registered.

#### Parameters

##### fns

...[`LabeledPipelineFunction`](../type-aliases/LabeledPipelineFunction.md)\<[`UnlabelledPipelineFunction`](../type-aliases/UnlabelledPipelineFunction.md), `string`\>[]

Any number of functions to add to the pipeline.

#### Returns

`void`

***

### after()

> **after**(`existingFn`, `newFn`): `void`

Defined in: [lib/pipeline.ts:200](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/pipeline.ts#L200)

Adds a single function after a function that already exists in the
pipeline.

Logs a warning if the function has not been registered.

#### Parameters

##### existingFn

[`LabeledPipelineFunction`](../type-aliases/LabeledPipelineFunction.md)

A function that already exists in the pipeline.

##### newFn

[`LabeledPipelineFunction`](../type-aliases/LabeledPipelineFunction.md)

The new function to add to the pipeline.

#### Returns

`void`

***

### atIndex()

> **atIndex**(`index`): [`LabeledPipelineFunction`](../type-aliases/LabeledPipelineFunction.md)\<[`UnlabelledPipelineFunction`](../type-aliases/UnlabelledPipelineFunction.md), `string`\> \| `undefined`

Defined in: [lib/pipeline.ts:173](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/pipeline.ts#L173)

#### Parameters

##### index

`number`

#### Returns

[`LabeledPipelineFunction`](../type-aliases/LabeledPipelineFunction.md)\<[`UnlabelledPipelineFunction`](../type-aliases/UnlabelledPipelineFunction.md), `string`\> \| `undefined`

***

### before()

> **before**(`existingFn`, `newFn`): `void`

Defined in: [lib/pipeline.ts:221](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/pipeline.ts#L221)

Adds a single function before a function that already exists in the
pipeline.

Logs a warning if the function has not been registered.

#### Parameters

##### existingFn

[`LabeledPipelineFunction`](../type-aliases/LabeledPipelineFunction.md)

A function that already exists in the pipeline.

##### newFn

[`LabeledPipelineFunction`](../type-aliases/LabeledPipelineFunction.md)

The new function to add to the pipeline.

#### Returns

`void`

***

### remove()

> **remove**(`fn`): `void`

Defined in: [lib/pipeline.ts:237](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/pipeline.ts#L237)

Removes a function from the pipeline.

#### Parameters

##### fn

[`LabeledPipelineFunction`](../type-aliases/LabeledPipelineFunction.md)

The function to remove from the pipeline.

#### Returns

`void`

***

### reset()

> **reset**(): `void`

Defined in: [lib/pipeline.ts:304](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/pipeline.ts#L304)

Resets the pipeline by removing any existing processors.

#### Returns

`void`

***

### run()

> **run**\<`T`\>(`tokens`): `T`[]

Defined in: [lib/pipeline.ts:253](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/pipeline.ts#L253)

Runs the current list of functions that make up the pipeline against the
passed tokens.

#### Type Parameters

##### T

`T` *extends* `object`

#### Parameters

##### tokens

`T`[]

The tokens to run through the pipeline.

#### Returns

`T`[]

***

### runString()

> **runString**(`str?`, `metadata?`): `string`[]

Defined in: [lib/pipeline.ts:292](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/pipeline.ts#L292)

Convenience method for passing a string through a pipeline and getting
strings out. This method takes care of wrapping the passed string in a
token and mapping the resulting tokens back to strings.

#### Parameters

##### str?

`string`

The string to pass through the pipeline.

##### metadata?

Optional metadata to associate with the token
passed to the pipeline.

#### Returns

`string`[]

***

### toArray()

> **toArray**(): [`LabeledPipelineFunction`](../type-aliases/LabeledPipelineFunction.md)\<[`UnlabelledPipelineFunction`](../type-aliases/UnlabelledPipelineFunction.md), `string`\>[]

Defined in: [lib/pipeline.ts:311](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/pipeline.ts#L311)

Returns a light copy of Pipeline.#stack

#### Returns

[`LabeledPipelineFunction`](../type-aliases/LabeledPipelineFunction.md)\<[`UnlabelledPipelineFunction`](../type-aliases/UnlabelledPipelineFunction.md), `string`\>[]

***

### toJSON()

> **toJSON**(): `string`[]

Defined in: [lib/pipeline.ts:320](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/pipeline.ts#L320)

Returns a representation of the pipeline ready for serialisation.

Logs a warning if the function has not been registered.

#### Returns

`string`[]

***

### labelFunction()

> `static` **labelFunction**\<`T`\>(`fn`, `label`): [`LabeledPipelineFunction`](../type-aliases/LabeledPipelineFunction.md)\<`T`\>

Defined in: [lib/pipeline.ts:328](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/pipeline.ts#L328)

#### Type Parameters

##### T

`T` *extends* [`UnlabelledPipelineFunction`](../type-aliases/UnlabelledPipelineFunction.md) = [`UnlabelledPipelineFunction`](../type-aliases/UnlabelledPipelineFunction.md)

#### Parameters

##### fn

`T`

##### label

`string`

#### Returns

[`LabeledPipelineFunction`](../type-aliases/LabeledPipelineFunction.md)\<`T`\>

***

### load()

> `static` **load**(`serialised`): `Pipeline`

Defined in: [lib/pipeline.ts:152](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/pipeline.ts#L152)

Loads a previously serialised pipeline.

All functions to be loaded must already be registered with Pipeline.
If any function from the serialised data has not been registered then an
error will be thrown.

#### Parameters

##### serialised

`string`[]

The serialised pipeline to load.

#### Returns

`Pipeline`

***

### registerFunction()

> `static` **registerFunction**(`fn`, `label`): [`LabeledPipelineFunction`](../type-aliases/LabeledPipelineFunction.md)\<[`UnlabelledPipelineFunction`](../type-aliases/UnlabelledPipelineFunction.md), `string`\>

Defined in: [lib/pipeline.ts:113](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/pipeline.ts#L113)

Register a function with the pipeline.

Functions that are used in the pipeline should be registered if the pipeline
needs to be serialised, or a serialised pipeline needs to be loaded.

Registering a function does not add it to a pipeline, functions must still be
added to instances of the pipeline for them to be used when running a pipeline.

#### Parameters

##### fn

[`UnlabelledPipelineFunction`](../type-aliases/UnlabelledPipelineFunction.md)

The function to check for.

##### label

`string`

The label to register this function with

#### Returns

[`LabeledPipelineFunction`](../type-aliases/LabeledPipelineFunction.md)\<[`UnlabelledPipelineFunction`](../type-aliases/UnlabelledPipelineFunction.md), `string`\>
