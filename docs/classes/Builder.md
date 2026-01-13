[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / Builder

# Class: Builder

Defined in: [lib/builder.mts:96](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/builder.mts#L96)

Builder performs indexing on a set of documents and
returns instances of Index ready for querying.

All configuration of the index is done via the builder, the
fields to index, the document reference, the text processing
pipeline and document scoring parameters are all set on the
builder before indexing.

## Constructors

### Constructor

> **new Builder**(`__namedParameters`): `Builder`

Defined in: [lib/builder.mts:197](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/builder.mts#L197)

#### Parameters

##### \_\_namedParameters

###### tokenizer

\{ `separator?`: `RegExp`; \}

###### tokenizer.separator?

`RegExp`

#### Returns

`Builder`

## Properties

### documentCount

> **documentCount**: `number`

Defined in: [lib/builder.mts:154](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/builder.mts#L154)

Keeps track of the total number of documents indexed.

***

### fieldLengths

> **fieldLengths**: `object`

Defined in: [lib/builder.mts:134](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/builder.mts#L134)

Keeps track of the length of documents added to the index.

#### Index Signature

\[`key`: `string`\]: `number`

***

### fieldTermFrequencies

> **fieldTermFrequencies**: `object`

Defined in: [lib/builder.mts:129](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/builder.mts#L129)

Keeps track of document term frequencies.

#### Index Signature

\[`key`: `string`\]: `object`

***

### invertedIndex

> **invertedIndex**: `object`

Defined in: [lib/builder.mts:122](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/builder.mts#L122)

The inverted index maps terms to document fields.

#### Index Signature

\[`key`: `string`\]: [`invertedIndexEntry`](../type-aliases/invertedIndexEntry.md)

***

### metadataWhitelist

> **metadataWhitelist**: `string`[]

Defined in: [lib/builder.mts:164](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/builder.mts#L164)

A list of metadata keys that have been whitelisted for entry in the index.

***

### pipeline

> **pipeline**: [`Pipeline`](Pipeline.md)

Defined in: [lib/builder.mts:144](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/builder.mts#L144)

The pipeline performs text processing on tokens before indexing.

***

### searchPipeline

> **searchPipeline**: [`Pipeline`](Pipeline.md)

Defined in: [lib/builder.mts:149](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/builder.mts#L149)

A pipeline for processing search terms before querying the index.

***

### termIndex

> **termIndex**: `number`

Defined in: [lib/builder.mts:159](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/builder.mts#L159)

A counter incremented for each unique term, used to identify a terms position in the vector space.

***

### tokenizer()

> **tokenizer**: (`obj?`, `metadata?`, `usingSeparator?`) => [`Token`](Token.md)[]

Defined in: [lib/builder.mts:139](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/builder.mts#L139)

Function for splitting strings into tokens for indexing.

A function for splitting a string into tokens ready to be inserted into
the search index. Uses `separator` to split strings, change
the value of this property to change how strings are split into tokens.

This tokenizer will convert its parameter to a string by calling `toString` and
then will split this string on the character in `separator`.
Arrays will have their elements converted to strings and wrapped in a Token.

Optional metadata can be passed to the tokenizer, this metadata will be cloned and
added as metadata to every token that is created from the object to be tokenized.

#### Parameters

##### obj?

The object to convert into tokens

`string` | `object` | `object`[]

##### metadata?

Optional metadata to associate with every token

##### usingSeparator?

`RegExp`

separator to use

#### Returns

[`Token`](Token.md)[]

#### See

[Pipeline](Pipeline.md)

## Accessors

### averageFieldLength

#### Get Signature

> **get** **averageFieldLength**(): `object`

Defined in: [lib/builder.mts:177](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/builder.mts#L177)

##### Returns

`object`

***

### b

#### Get Signature

> **get** **b**(): `number`

Defined in: [lib/builder.mts:285](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/builder.mts#L285)

##### Returns

`number`

#### Set Signature

> **set** **b**(`number`): `void`

Defined in: [lib/builder.mts:297](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/builder.mts#L297)

A parameter to tune the amount of field length normalisation that is applied when
calculating relevance scores. A value of 0 will completely disable any normalisation
and a value of 1 will fully normalise field lengths. The default is 0.75. Values of b
will be clamped to the range 0 - 1.

##### Parameters

###### number

`number`

The value to set for this tuning parameter.

##### Returns

`void`

***

### fields

#### Get Signature

> **get** **fields**(): `object`

Defined in: [lib/builder.mts:225](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/builder.mts#L225)

##### Returns

`object`

***

### fieldVectors

#### Get Signature

> **get** **fieldVectors**(): `object`

Defined in: [lib/builder.mts:183](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/builder.mts#L183)

##### Returns

`object`

***

### k1

#### Get Signature

> **get** **k1**(): `number`

Defined in: [lib/builder.mts:310](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/builder.mts#L310)

##### Returns

`number`

#### Set Signature

> **set** **k1**(`number`): `void`

Defined in: [lib/builder.mts:321](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/builder.mts#L321)

A parameter that controls the speed at which a rise in term frequency results in term
frequency saturation. The default value is 1.2. Setting this to a higher value will give
slower saturation levels, a lower value will result in quicker saturation.

##### Parameters

###### number

`number`

The value to set for this tuning parameter.

##### Returns

`void`

***

### ref

#### Get Signature

> **get** **ref**(): `string`

Defined in: [lib/builder.mts:229](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/builder.mts#L229)

##### Returns

`string`

#### Set Signature

> **set** **ref**(`ref`): `void`

Defined in: [lib/builder.mts:245](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/builder.mts#L245)

Sets the document field used as the document reference. Every document must have this field.
The type of this field in the document should be a string, if it is not a string it will be
coerced into a string by calling toString.

The default ref is 'id'.

The ref should _not_ be changed during indexing, it should be set before any documents are
added to the index. Changing it during indexing can lead to inconsistent results.

##### Parameters

###### ref

`string`

The name of the reference field in the document.

##### Returns

`void`

***

### tokenizerSeparator

#### Set Signature

> **set** **tokenizerSeparator**(`value`): `void`

Defined in: [lib/builder.mts:171](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/builder.mts#L171)

##### Parameters

###### value

`RegExp` | `undefined`

##### Returns

`void`

***

### tokenSet

#### Get Signature

> **get** **tokenSet**(): [`TokenSet`](TokenSet.md)

Defined in: [lib/builder.mts:189](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/builder.mts#L189)

##### Returns

[`TokenSet`](TokenSet.md)

## Methods

### add()

> **add**(`doc`, `attributes`): `void`

Defined in: [lib/builder.mts:342](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/builder.mts#L342)

Adds a document to the index.

Before adding fields to the index the index should have been fully setup, with the document
ref and all fields to index already having been specified.

The document must have a field name as specified by the ref (by default this is 'id') and
it should have all fields defined for indexing, though null or undefined values will not
cause errors.

Entire documents can be boosted at build time. Applying a boost to a document indicates that
this document should rank higher in search results than other documents.

#### Parameters

##### doc

The document to add to the index.

##### attributes

Optional attributes associated with this document.

###### boost?

`number`

Boost applied to all terms within this document.

#### Returns

`void`

***

### build()

> **build**(): [`Index`](Index.md)

Defined in: [lib/builder.mts:564](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/builder.mts#L564)

Builds the index, creating an instance of Index.

This completes the indexing process and should only be called
once all documents have been added to the index.

#### Returns

[`Index`](Index.md)

***

### field()

> **field**(`fieldName`, `attributes?`): `void`

Defined in: [lib/builder.mts:268](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/builder.mts#L268)

Adds a field to the list of document fields that will be indexed. Every document being
indexed should have this field. Null values for this field in indexed documents will
not cause errors but will limit the chance of that document being retrieved by searches.

All fields should be added before adding documents to the index. Adding fields after
a document has been indexed will have no effect on already indexed documents.

Fields can be boosted at build time. This allows terms within that field to have more
importance when ranking search results. Use a field boost to specify that matches within
one field are more important than other fields.

#### Parameters

##### fieldName

`string`

The name of a field to index in all documents.

##### attributes?

Optional attributes associated with this field.

###### boost?

`number`

Boost applied to all terms within this field.

###### extractor?

[`fieldExtractor`](../type-aliases/fieldExtractor.md)

Function to extract a field from a document.

#### Returns

`void`

#### Throws

fieldName cannot contain unsupported characters '/'

***

### use()

> **use**(`fn`, ...`args`): `void`

Defined in: [lib/builder.mts:592](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/builder.mts#L592)

Applies a plugin to the index builder.

A plugin is a function that is called with the index builder as its context.
Plugins can be used to customise or extend the behaviour of the index
in some way. A plugin is just a function, that encapsulated the custom
behaviour that should be applied when building the index.

The plugin function will be called with the index builder as its argument, additional
arguments can also be passed when calling use. The function will be called
with the index builder as its context.

#### Parameters

##### fn

[`plugin`](../type-aliases/plugin.md)\<`Builder`\>

The plugin to apply.

##### args

...`unknown`[]

#### Returns

`void`
