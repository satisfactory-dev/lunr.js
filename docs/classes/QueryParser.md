[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / QueryParser

# Class: QueryParser

Defined in: [lib/query\_parser.ts:28](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/query_parser.ts#L28)

## Constructors

### Constructor

> **new QueryParser**(`str`, `query`): `QueryParser`

Defined in: [lib/query\_parser.ts:52](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/query_parser.ts#L52)

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

Defined in: [lib/query\_parser.ts:39](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/query_parser.ts#L39)

***

### lexemeIdx

> **lexemeIdx**: `number`

Defined in: [lib/query\_parser.ts:44](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/query_parser.ts#L44)

***

### lexemes

> **lexemes**: [`QueryLexeme`](QueryLexeme.md)[] \| `undefined`

Defined in: [lib/query\_parser.ts:46](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/query_parser.ts#L46)

***

### lexer

> **lexer**: [`QueryLexer`](QueryLexer.md)

Defined in: [lib/query\_parser.ts:32](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/query_parser.ts#L32)

***

### query

> **query**: [`Query`](Query.md)

Defined in: [lib/query\_parser.ts:37](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/query_parser.ts#L37)

## Methods

### consumeLexeme()

> **consumeLexeme**(): [`QueryLexeme`](QueryLexeme.md) \| `undefined`

Defined in: [lib/query\_parser.ts:84](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/query_parser.ts#L84)

#### Returns

[`QueryLexeme`](QueryLexeme.md) \| `undefined`

***

### nextClause()

> **nextClause**(): `void`

Defined in: [lib/query\_parser.ts:90](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/query_parser.ts#L90)

#### Returns

`void`

***

### parse()

> **parse**(): [`Query`](Query.md)

Defined in: [lib/query\_parser.ts:62](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/query_parser.ts#L62)

#### Returns

[`Query`](Query.md)

***

### peekLexeme()

> **peekLexeme**(): [`QueryLexeme`](QueryLexeme.md) \| `undefined`

Defined in: [lib/query\_parser.ts:76](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/query_parser.ts#L76)

#### Returns

[`QueryLexeme`](QueryLexeme.md) \| `undefined`
