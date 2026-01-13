import {
  defineConfig,
} from "eslint/config"
import globals from "globals"
import parser from '@typescript-eslint/parser'
import typescriptEslint from 'typescript-eslint'

import config from './eslint.config.mjs'

export default defineConfig([
  ...config,
  ...typescriptEslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parser,
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha,
        assert: true,
        withFixture: true,
        lunr: true,
      },
    },

    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', {
        fixStyle: 'separate-type-imports',
        prefer: 'type-imports',
      }],

      "no-var": "off",
    },
  },
])
