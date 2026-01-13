import {
  readFile,
} from 'node:fs/promises'

import {
  defineConfig,
} from 'rolldown'

import replace from '@rollup/plugin-replace'

const version = await readFile(`${import.meta.dirname}/VERSION`)

const plugins = [
  replace({
    preventAssignment: true,
    values: {
      '@YEAR': (new Date()).getUTCFullYear(),
      '@VERSION': version,
    },
  }),
]

export default defineConfig([
  {
    input: 'lunr.mts',
    output: {
      format: 'esm',
      file: 'lunr.min.mjs',
      minify: true,
      sourcemap: true,
    },
    plugins,
  },
  // test copy
  {
    input: 'lunr.mts',
    output: {
      format: 'esm',
      file: 'test/lunr.mjs',
      minify: true,
      sourcemap: true,
    },
    plugins,
  },
  {
    input: 'lunr.mts',
    output: {
      format: 'umd',
      exports: 'named',
      file: 'lunr.js',
      name: 'lunr',
      minify: false,
      sourcemap: true,
      banner: '/* eslint-disable */',
    },
    plugins,
  },
  {
    input: 'lunr.mts',
    output: {
      format: 'umd',
      exports: 'named',
      file: 'lunr.min.js',
      name: 'lunr',
      minify: true,
      sourcemap: true,
      banner: '/* eslint-disable */',
    },
    plugins,
  },
])
