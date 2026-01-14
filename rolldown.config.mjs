import {
  defineConfig,
} from 'rolldown'

import replace from '@rollup/plugin-replace'

const plugins = [
  replace({
    preventAssignment: true,
    values: {
      '@YEAR': (new Date()).getUTCFullYear(),
    },
  }),
]

export default defineConfig([
  {
    input: 'lunr.ts',
    output: {
      format: 'esm',
      file: 'lunr.js',
      minify: true,
      sourcemap: true,
    },
    plugins,
  },
  {
    input: 'lunr.cjs.ts',
    output: {
      format: 'cjs',
      file: 'lunr.cjs',
      exports: 'named',
      minify: true,
      sourcemap: true,
    },
    plugins,
  },
  // test copy
  {
    input: 'lunr.ts',
    output: {
      format: 'esm',
      file: 'test/lunr.js',
      minify: true,
      sourcemap: true,
    },
    plugins,
  },
  {
    input: './node_modules/assert/build/assert.js',
    output: {
      format: 'esm',
      file: './test/env/assert/assert.js',
      minify: false,
      sourcemap: false,
      banner: '/* eslint-disable */',
    },
  },
])
