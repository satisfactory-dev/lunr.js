[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / QueryPresence

# Enumeration: QueryPresence

Defined in: [lib/query.ts:254](https://github.com/satisfactory-dev/lunr.js/blob/a784e792ded62f9529ed9cad4ce843741d12ef24/lib/query.ts#L254)

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

Defined in: [lib/query.ts:255](https://github.com/satisfactory-dev/lunr.js/blob/a784e792ded62f9529ed9cad4ce843741d12ef24/lib/query.ts#L255)

***

### PROHIBITED

> **PROHIBITED**: `3`

Defined in: [lib/query.ts:257](https://github.com/satisfactory-dev/lunr.js/blob/a784e792ded62f9529ed9cad4ce843741d12ef24/lib/query.ts#L257)

***

### REQUIRED

> **REQUIRED**: `2`

Defined in: [lib/query.ts:256](https://github.com/satisfactory-dev/lunr.js/blob/a784e792ded62f9529ed9cad4ce843741d12ef24/lib/query.ts#L256)
