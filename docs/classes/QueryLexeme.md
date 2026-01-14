[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / QueryLexeme

# Class: QueryLexeme

Defined in: [lib/query\_lexer.ts:25](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/query_lexer.ts#L25)

## Implements

- [`QueryLexemeType`](../interfaces/QueryLexemeType.md)

## Constructors

### Constructor

> **new QueryLexeme**(`options`): `QueryLexeme`

Defined in: [lib/query\_lexer.ts:38](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/query_lexer.ts#L38)

#### Parameters

##### options

[`QueryLexemeType`](../interfaces/QueryLexemeType.md)

#### Returns

`QueryLexeme`

## Properties

### end

> **end**: `number`

Defined in: [lib/query\_lexer.ts:32](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/query_lexer.ts#L32)

#### Implementation of

[`QueryLexemeType`](../interfaces/QueryLexemeType.md).[`end`](../interfaces/QueryLexemeType.md#end)

***

### start

> **start**: `number`

Defined in: [lib/query\_lexer.ts:30](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/query_lexer.ts#L30)

#### Implementation of

[`QueryLexemeType`](../interfaces/QueryLexemeType.md).[`start`](../interfaces/QueryLexemeType.md#start)

***

### str

> **str**: `string`

Defined in: [lib/query\_lexer.ts:28](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/query_lexer.ts#L28)

#### Implementation of

[`QueryLexemeType`](../interfaces/QueryLexemeType.md).[`str`](../interfaces/QueryLexemeType.md#str)

***

### type

> **type**: `"EOS"` \| `"FIELD"` \| `"TERM"` \| `"EDIT_DISTANCE"` \| `"BOOST"` \| `"PRESENCE"`

Defined in: [lib/query\_lexer.ts:26](https://github.com/satisfactory-dev/lunr.js/blob/35435b0a01ef8cca7502d711eaaee5ea43154f5d/lib/query_lexer.ts#L26)

#### Implementation of

[`QueryLexemeType`](../interfaces/QueryLexemeType.md).[`type`](../interfaces/QueryLexemeType.md#type)
