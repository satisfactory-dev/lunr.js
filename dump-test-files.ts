import { glob, writeFile } from "node:fs/promises"
import { basename } from "node:path"

const results: `${Exclude<string, ''>}_test.js`[] = []

for await (const filepath of glob([
  `${import.meta.dirname}/test/*_test.ts`,
])) {
  const filename = basename(filepath) as `${Exclude<string, ''>}_test.ts`

  results.push(filename.replace(/\.ts$/, '.js') as `${Exclude<string, ''>}_test.js`)
}

await writeFile(
  `${import.meta.dirname}/test/env/file_list.json`,
  JSON.stringify(results, null, '\t'),
)
