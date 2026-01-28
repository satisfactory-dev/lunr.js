[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / QueryPresence

# Enumeration: QueryPresence

Defined in: [lib/query.ts:250](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/query.ts#L250)

Constants for indicating what kind of presence a term must have in matching documents.

## See

 - QueryClause
 - Query#clause
 - Query#term

## Example

```ts
query.term('foo', { presence: QueryPresence.REQUIRED })
```

## Enumeration Members

### OPTIONAL

> **OPTIONAL**: `1`

Defined in: [lib/query.ts:251](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/query.ts#L251)

***

### PROHIBITED

> **PROHIBITED**: `3`

Defined in: [lib/query.ts:253](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/query.ts#L253)

***

### REQUIRED

> **REQUIRED**: `2`

Defined in: [lib/query.ts:252](https://github.com/satisfactory-dev/lunr.js/blob/bcf37e1c4ac8bbdd8e47233952de7f825c704852/lib/query.ts#L252)
