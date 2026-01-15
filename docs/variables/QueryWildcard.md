[**@satisfactory-dev/lunr**](../../README.md)

***

[@satisfactory-dev/lunr](../globals.md) / QueryWildcard

# Variable: QueryWildcard

> `const` **QueryWildcard**: `Readonly`\<\{ `LEADING`: `1`; `NONE`: `0`; `TRAILING`: `2`; \}\>

Defined in: [lib/query.ts:236](https://github.com/satisfactory-dev/lunr.js/blob/7868f4489cc4ceaaad590a2e9a8913370ad26fef/lib/query.ts#L236)

Constants for indicating what kind of automatic wildcard insertion will be used when constructing a query clause.

This allows wildcards to be added to the beginning and end of a term without having to manually do any string
concatenation.

The wildcard constants can be bitwise combined to select both leading and trailing wildcards.

## See

 - QueryClause
 - Query#clause
 - Query#term

## Examples

```ts
query.term('foo', { wildcard: QueryWildcard.TRAILING })
```

```ts
query.term('foo', {
  wildcard: QueryWildcard.LEADING | QueryWildcard.TRAILING
})
```
