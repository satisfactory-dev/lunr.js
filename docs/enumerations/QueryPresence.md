[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / QueryPresence

# Enumeration: QueryPresence

Defined in: [lib/query.mts:254](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query.mts#L254)

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

Defined in: [lib/query.mts:255](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query.mts#L255)

***

### PROHIBITED

> **PROHIBITED**: `3`

Defined in: [lib/query.mts:257](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query.mts#L257)

***

### REQUIRED

> **REQUIRED**: `2`

Defined in: [lib/query.mts:256](https://github.com/satisfactory-dev/lunr.js/blob/d322aa5d0edb5601c32fc96137ceadad465a6136/lib/query.mts#L256)
