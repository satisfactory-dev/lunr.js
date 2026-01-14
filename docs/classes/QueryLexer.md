[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / QueryLexer

# Class: QueryLexer

Defined in: [lib/query\_lexer.mts:51](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L51)

## Constructors

### Constructor

> **new QueryLexer**(`str`): `QueryLexer`

Defined in: [lib/query\_lexer.mts:75](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L75)

#### Parameters

##### str

`string`

#### Returns

`QueryLexer`

## Properties

### escapeCharPositions

> **escapeCharPositions**: `number`[] = `[]`

Defined in: [lib/query\_lexer.mts:70](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L70)

***

### lexemes

> **lexemes**: [`QueryLexeme`](QueryLexeme.md)[] = `[]`

Defined in: [lib/query\_lexer.mts:58](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L58)

***

### pos

> **pos**: `number` = `0`

Defined in: [lib/query\_lexer.mts:66](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L66)

***

### start

> **start**: `number` = `0`

Defined in: [lib/query\_lexer.mts:68](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L68)

***

### str

> **str**: `string`

Defined in: [lib/query\_lexer.mts:60](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L60)

## Accessors

### length

#### Get Signature

> **get** **length**(): `number`

Defined in: [lib/query\_lexer.mts:62](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L62)

##### Returns

`number`

***

### termSeparator

#### Get Signature

> **get** **termSeparator**(): `RegExp`

Defined in: [lib/query\_lexer.mts:251](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L251)

##### Returns

`RegExp`

#### Set Signature

> **set** **termSeparator**(`separator`): `void`

Defined in: [lib/query\_lexer.mts:260](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L260)

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

Defined in: [lib/query\_lexer.mts:197](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L197)

##### Returns

`"BOOST"`

***

### EDIT\_DISTANCE

#### Get Signature

> **get** `static` **EDIT\_DISTANCE**(): `"EDIT_DISTANCE"`

Defined in: [lib/query\_lexer.mts:190](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L190)

##### Returns

`"EDIT_DISTANCE"`

***

### EOS

#### Get Signature

> **get** `static` **EOS**(): `"EOS"`

Defined in: [lib/query\_lexer.mts:169](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L169)

##### Returns

`"EOS"`

***

### FIELD

#### Get Signature

> **get** `static` **FIELD**(): `"FIELD"`

Defined in: [lib/query\_lexer.mts:176](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L176)

##### Returns

`"FIELD"`

***

### PRESENCE

#### Get Signature

> **get** `static` **PRESENCE**(): `"PRESENCE"`

Defined in: [lib/query\_lexer.mts:204](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L204)

##### Returns

`"PRESENCE"`

***

### TERM

#### Get Signature

> **get** `static` **TERM**(): `"TERM"`

Defined in: [lib/query\_lexer.mts:183](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L183)

##### Returns

`"TERM"`

***

### termSeparator

#### Get Signature

> **get** `static` **termSeparator**(): `RegExp`

Defined in: [lib/query\_lexer.mts:267](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L267)

##### Returns

`RegExp`

#### Set Signature

> **set** `static` **termSeparator**(`separator`): `void`

Defined in: [lib/query\_lexer.mts:291](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L291)

Overrides the default term separator, or sets it to default if undefined is specified

##### Parameters

###### separator

`RegExp` | `undefined`

##### Returns

`void`

## Methods

### acceptDigitRun()

> **acceptDigitRun**(): `void`

Defined in: [lib/query\_lexer.mts:149](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L149)

#### Returns

`void`

***

### backup()

> **backup**(): `void`

Defined in: [lib/query\_lexer.mts:145](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L145)

#### Returns

`void`

***

### emit()

> **emit**(`type`): `void`

Defined in: [lib/query\_lexer.mts:107](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L107)

#### Parameters

##### type

`"EOS"` | `"FIELD"` | `"TERM"` | `"EDIT_DISTANCE"` | `"BOOST"` | `"PRESENCE"`

#### Returns

`void`

***

### escapeCharacter()

> **escapeCharacter**(): `void`

Defined in: [lib/query\_lexer.mts:118](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L118)

#### Returns

`void`

***

### ignore()

> **ignore**(): `void`

Defined in: [lib/query\_lexer.mts:137](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L137)

#### Returns

`void`

***

### more()

> **more**(): `boolean`

Defined in: [lib/query\_lexer.mts:162](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L162)

#### Returns

`boolean`

***

### next()

> **next**(): `string`

Defined in: [lib/query\_lexer.mts:123](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L123)

#### Returns

`string`

***

### run()

> **run**(): `void`

Defined in: [lib/query\_lexer.mts:82](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L82)

#### Returns

`void`

void

***

### sliceString()

> **sliceString**(): `string`

Defined in: [lib/query\_lexer.mts:90](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L90)

#### Returns

`string`

***

### width()

> **width**(): `number`

Defined in: [lib/query\_lexer.mts:133](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L133)

#### Returns

`number`

***

### lexBoost()

> `static` **lexBoost**(`this`, `lexer`): (`this`, `lexer`) => (this: void, lexer: QueryLexer) =\> typeof lexText

Defined in: [lib/query\_lexer.mts:235](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L235)

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

Defined in: [lib/query\_lexer.mts:228](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L228)

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

Defined in: [lib/query\_lexer.mts:242](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L242)

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

Defined in: [lib/query\_lexer.mts:208](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L208)

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

Defined in: [lib/query\_lexer.mts:215](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L215)

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

Defined in: [lib/query\_lexer.mts:295](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query_lexer.mts#L295)

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
