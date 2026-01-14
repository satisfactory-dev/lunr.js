import { glob, writeFile } from "node:fs/promises"
import { basename } from "node:path"

const results: `${Exclude<string, ''>}_test.mjs`[] = []

for await (const filepath of glob([
  `${import.meta.dirname}/test/*_test.mts`,
])) {
  const filename = basename(filepath) as `${Exclude<string, ''>}_test.mts`

  results.push(filename.replace(/\.mts$/, '.mjs') as `${Exclude<string, ''>}_test.mjs`)
}

await writeFile(
  `${import.meta.dirname}/test/env/file_list.json`,
  JSON.stringify(results, null, '\t'),
)
