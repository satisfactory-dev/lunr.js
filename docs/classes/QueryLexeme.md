[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / QueryLexeme

# Class: QueryLexeme

Defined in: [lib/query\_lexer.mts:25](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query_lexer.mts#L25)

## Implements

- [`QueryLexemeType`](../interfaces/QueryLexemeType.md)

## Constructors

### Constructor

> **new QueryLexeme**(`options`): `QueryLexeme`

Defined in: [lib/query\_lexer.mts:38](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query_lexer.mts#L38)

#### Parameters

##### options

[`QueryLexemeType`](../interfaces/QueryLexemeType.md)

#### Returns

`QueryLexeme`

## Properties

### end

> **end**: `number`

Defined in: [lib/query\_lexer.mts:32](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query_lexer.mts#L32)

#### Implementation of

[`QueryLexemeType`](../interfaces/QueryLexemeType.md).[`end`](../interfaces/QueryLexemeType.md#end)

***

### start

> **start**: `number`

Defined in: [lib/query\_lexer.mts:30](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query_lexer.mts#L30)

#### Implementation of

[`QueryLexemeType`](../interfaces/QueryLexemeType.md).[`start`](../interfaces/QueryLexemeType.md#start)

***

### str

> **str**: `string`

Defined in: [lib/query\_lexer.mts:28](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query_lexer.mts#L28)

#### Implementation of

[`QueryLexemeType`](../interfaces/QueryLexemeType.md).[`str`](../interfaces/QueryLexemeType.md#str)

***

### type

> **type**: `"EOS"` \| `"FIELD"` \| `"TERM"` \| `"EDIT_DISTANCE"` \| `"BOOST"` \| `"PRESENCE"`

Defined in: [lib/query\_lexer.mts:26](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query_lexer.mts#L26)

#### Implementation of

[`QueryLexemeType`](../interfaces/QueryLexemeType.md).[`type`](../interfaces/QueryLexemeType.md#type)
