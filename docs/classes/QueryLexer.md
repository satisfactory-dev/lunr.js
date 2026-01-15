[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / QueryLexer

# Class: QueryLexer

Defined in: [lib/query\_lexer.ts:51](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L51)

## Constructors

### Constructor

> **new QueryLexer**(`str`): `QueryLexer`

Defined in: [lib/query\_lexer.ts:75](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L75)

#### Parameters

##### str

`string`

#### Returns

`QueryLexer`

## Properties

### escapeCharPositions

> **escapeCharPositions**: `number`[] = `[]`

Defined in: [lib/query\_lexer.ts:70](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L70)

***

### lexemes

> **lexemes**: [`QueryLexeme`](QueryLexeme.md)[] = `[]`

Defined in: [lib/query\_lexer.ts:58](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L58)

***

### pos

> **pos**: `number` = `0`

Defined in: [lib/query\_lexer.ts:66](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L66)

***

### start

> **start**: `number` = `0`

Defined in: [lib/query\_lexer.ts:68](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L68)

***

### str

> **str**: `string`

Defined in: [lib/query\_lexer.ts:60](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L60)

## Accessors

### length

#### Get Signature

> **get** **length**(): `number`

Defined in: [lib/query\_lexer.ts:62](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L62)

##### Returns

`number`

***

### termSeparator

#### Get Signature

> **get** **termSeparator**(): `RegExp`

Defined in: [lib/query\_lexer.ts:251](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L251)

##### Returns

`RegExp`

#### Set Signature

> **set** **termSeparator**(`separator`): `void`

Defined in: [lib/query\_lexer.ts:260](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L260)

Overrides the default term separator **for this instance**, or sets it to default if undefined is specified

##### Parameters

###### separator

`RegExp` | `undefined`

##### Returns

`void`

***

### BOOST

#### Get Signature

> **get** `static` **BOOST**(): `"BOOST"`

Defined in: [lib/query\_lexer.ts:197](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L197)

##### Returns

`"BOOST"`

***

### EDIT\_DISTANCE

#### Get Signature

> **get** `static` **EDIT\_DISTANCE**(): `"EDIT_DISTANCE"`

Defined in: [lib/query\_lexer.ts:190](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L190)

##### Returns

`"EDIT_DISTANCE"`

***

### EOS

#### Get Signature

> **get** `static` **EOS**(): `"EOS"`

Defined in: [lib/query\_lexer.ts:169](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L169)

##### Returns

`"EOS"`

***

### FIELD

#### Get Signature

> **get** `static` **FIELD**(): `"FIELD"`

Defined in: [lib/query\_lexer.ts:176](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L176)

##### Returns

`"FIELD"`

***

### PRESENCE

#### Get Signature

> **get** `static` **PRESENCE**(): `"PRESENCE"`

Defined in: [lib/query\_lexer.ts:204](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L204)

##### Returns

`"PRESENCE"`

***

### TERM

#### Get Signature

> **get** `static` **TERM**(): `"TERM"`

Defined in: [lib/query\_lexer.ts:183](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L183)

##### Returns

`"TERM"`

***

### termSeparator

#### Get Signature

> **get** `static` **termSeparator**(): `RegExp`

Defined in: [lib/query\_lexer.ts:267](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L267)

##### Returns

`RegExp`

#### Set Signature

> **set** `static` **termSeparator**(`separator`): `void`

Defined in: [lib/query\_lexer.ts:291](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L291)

Overrides the default term separator, or sets it to default if undefined is specified

##### Parameters

###### separator

`RegExp` | `undefined`

##### Returns

`void`

## Methods

### acceptDigitRun()

> **acceptDigitRun**(): `void`

Defined in: [lib/query\_lexer.ts:149](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L149)

#### Returns

`void`

***

### backup()

> **backup**(): `void`

Defined in: [lib/query\_lexer.ts:145](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L145)

#### Returns

`void`

***

### emit()

> **emit**(`type`): `void`

Defined in: [lib/query\_lexer.ts:107](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L107)

#### Parameters

##### type

`"EOS"` | `"FIELD"` | `"TERM"` | `"EDIT_DISTANCE"` | `"BOOST"` | `"PRESENCE"`

#### Returns

`void`

***

### escapeCharacter()

> **escapeCharacter**(): `void`

Defined in: [lib/query\_lexer.ts:118](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L118)

#### Returns

`void`

***

### ignore()

> **ignore**(): `void`

Defined in: [lib/query\_lexer.ts:137](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L137)

#### Returns

`void`

***

### more()

> **more**(): `boolean`

Defined in: [lib/query\_lexer.ts:162](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L162)

#### Returns

`boolean`

***

### next()

> **next**(): `string`

Defined in: [lib/query\_lexer.ts:123](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L123)

#### Returns

`string`

***

### run()

> **run**(): `void`

Defined in: [lib/query\_lexer.ts:82](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L82)

#### Returns

`void`

void

***

### sliceString()

> **sliceString**(): `string`

Defined in: [lib/query\_lexer.ts:90](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L90)

#### Returns

`string`

***

### width()

> **width**(): `number`

Defined in: [lib/query\_lexer.ts:133](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L133)

#### Returns

`number`

***

### lexBoost()

> `static` **lexBoost**(`this`, `lexer`): (`this`, `lexer`) => (this: void, lexer: QueryLexer) =\> typeof lexText

Defined in: [lib/query\_lexer.ts:235](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L235)

#### Parameters

##### this

`void`

##### lexer

`QueryLexer`

#### Returns

> (`this`, `lexer`): (this: void, lexer: QueryLexer) =\> typeof lexText

##### Parameters

###### this

`void`

###### lexer

`QueryLexer`

##### Returns

(this: void, lexer: QueryLexer) =\> typeof lexText

***

### lexEditDistance()

> `static` **lexEditDistance**(`this`, `lexer`): (`this`, `lexer`) => (this: void, lexer: QueryLexer) =\> typeof lexText

Defined in: [lib/query\_lexer.ts:228](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L228)

#### Parameters

##### this

`void`

##### lexer

`QueryLexer`

#### Returns

> (`this`, `lexer`): (this: void, lexer: QueryLexer) =\> typeof lexText

##### Parameters

###### this

`void`

###### lexer

`QueryLexer`

##### Returns

(this: void, lexer: QueryLexer) =\> typeof lexText

***

### lexEOS()

> `static` **lexEOS**(`this`, `lexer`): `void`

Defined in: [lib/query\_lexer.ts:242](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L242)

#### Parameters

##### this

`void`

##### lexer

`QueryLexer`

#### Returns

`void`

***

### lexField()

> `static` **lexField**(`this`, `lexer`): (`this`, `lexer`) => (this: void, lexer: QueryLexer) =\> typeof lexText

Defined in: [lib/query\_lexer.ts:208](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L208)

#### Parameters

##### this

`void`

##### lexer

`QueryLexer`

#### Returns

> (`this`, `lexer`): (this: void, lexer: QueryLexer) =\> typeof lexText

##### Parameters

###### this

`void`

###### lexer

`QueryLexer`

##### Returns

(this: void, lexer: QueryLexer) =\> typeof lexText

***

### lexTerm()

> `static` **lexTerm**(`this`, `lexer`): (`this`, `lexer`) => (this: void, lexer: QueryLexer) =\> typeof lexText \| `undefined`

Defined in: [lib/query\_lexer.ts:215](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L215)

#### Parameters

##### this

`void`

##### lexer

`QueryLexer`

#### Returns

(`this`, `lexer`) => (this: void, lexer: QueryLexer) =\> typeof lexText \| `undefined`

***

### lexText()

> `static` **lexText**(`this`, `lexer`): (`this`, `lexer`) => (this: void, lexer: QueryLexer) =\> typeof lexText

Defined in: [lib/query\_lexer.ts:295](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query_lexer.ts#L295)

#### Parameters

##### this

`void`

##### lexer

`QueryLexer`

#### Returns

> (`this`, `lexer`): (this: void, lexer: QueryLexer) =\> typeof lexText

##### Parameters

###### this

`void`

###### lexer

`QueryLexer`

##### Returns

(this: void, lexer: QueryLexer) =\> typeof lexText
