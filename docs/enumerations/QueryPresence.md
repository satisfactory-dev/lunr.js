[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / QueryPresence

# Enumeration: QueryPresence

Defined in: [lib/query.mts:251](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query.mts#L251)

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

Defined in: [lib/query.mts:252](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query.mts#L252)

***

### PROHIBITED

> **PROHIBITED**: `3`

Defined in: [lib/query.mts:254](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query.mts#L254)

***

### REQUIRED

> **REQUIRED**: `2`

Defined in: [lib/query.mts:253](https://github.com/satisfactory-dev/lunr.js/blob/7e9541564cd6681fb1017e23f782f6cc63cfdde1/lib/query.mts#L253)
