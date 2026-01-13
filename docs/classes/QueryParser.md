[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / QueryParser

# Class: QueryParser

Defined in: [lib/query\_parser.mts:28](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query_parser.mts#L28)

## Constructors

### Constructor

> **new QueryParser**(`str`, `query`): `QueryParser`

Defined in: [lib/query\_parser.mts:52](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query_parser.mts#L52)

#### Parameters

##### str

`string`

##### query

[`Query`](Query.md)

#### Returns

`QueryParser`

## Properties

### currentClause

> **currentClause**: `Partial`\<[`QueryClause`](QueryClause.md)\>

Defined in: [lib/query\_parser.mts:39](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query_parser.mts#L39)

***

### lexemeIdx

> **lexemeIdx**: `number`

Defined in: [lib/query\_parser.mts:44](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query_parser.mts#L44)

***

### lexemes

> **lexemes**: [`QueryLexeme`](QueryLexeme.md)[] \| `undefined`

Defined in: [lib/query\_parser.mts:46](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query_parser.mts#L46)

***

### lexer

> **lexer**: [`QueryLexer`](QueryLexer.md)

Defined in: [lib/query\_parser.mts:32](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query_parser.mts#L32)

***

### query

> **query**: [`Query`](Query.md)

Defined in: [lib/query\_parser.mts:37](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query_parser.mts#L37)

## Methods

### consumeLexeme()

> **consumeLexeme**(): [`QueryLexeme`](QueryLexeme.md) \| `undefined`

Defined in: [lib/query\_parser.mts:84](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query_parser.mts#L84)

#### Returns

[`QueryLexeme`](QueryLexeme.md) \| `undefined`

***

### nextClause()

> **nextClause**(): `void`

Defined in: [lib/query\_parser.mts:90](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query_parser.mts#L90)

#### Returns

`void`

***

### parse()

> **parse**(): [`Query`](Query.md)

Defined in: [lib/query\_parser.mts:62](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query_parser.mts#L62)

#### Returns

[`Query`](Query.md)

***

### peekLexeme()

> **peekLexeme**(): [`QueryLexeme`](QueryLexeme.md) \| `undefined`

Defined in: [lib/query\_parser.mts:76](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query_parser.mts#L76)

#### Returns

[`QueryLexeme`](QueryLexeme.md) \| `undefined`
