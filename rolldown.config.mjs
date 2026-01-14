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
    input: 'lunr.mts',
    output: {
      format: 'esm',
      file: 'lunr.mjs',
      minify: true,
      sourcemap: true,
    },
    plugins,
  },
  {
    input: 'lunr.cjs.mts',
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
  {
    input: './node_modules/lunr/lunr.js',
    output: {
      format: 'esm',
      file: './test/env/lunr/lunr.js',
      minify: false,
      sourcemap: false,
      banner: '/* eslint-disable */',
    },
  },
])
