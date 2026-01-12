/* eslint @stylistic/migrate/migrate-js: "error" */

import {
  defineConfig,
  globalIgnores
} from "eslint/config"
import globals from "globals"
import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"
import cspell from '@cspell/eslint-plugin'
import stylistic from '@stylistic/eslint-plugin'
import stylisticMigrate from '@stylistic/eslint-plugin-migrate'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default defineConfig([
  {
    extends: compat.extends("eslint:recommended"),

    plugins: {
      '@cspell': cspell,
      '@stylistic': stylistic,
      '@stylistic/migrate': stylisticMigrate
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha,
        assert: true,
        withFixture: true,
        lunr: true
      }
    },

    rules: {
      '@cspell/spellchecker': ['warn', {
        cspell: {
          language: 'en-GB',
          words: [
            'SignpostMarv',
            'vars',
            'vocab',
            'stemmer'
          ]
        }
      }],

      "no-constant-condition": ["error", {
        checkLoops: false
      }],

      "no-redeclare": "off",
      "@stylistic/dot-location": ["error", "property"],
      "no-alert": "error",
      "no-caller": "error",
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-extend-native": "error",
      "no-implicit-globals": "error",
      "@stylistic/no-multi-spaces": "error",
      "@stylistic/array-bracket-spacing": "error",
      "@stylistic/block-spacing": "error",

      "@stylistic/brace-style": ["error", "1tbs", {
        allowSingleLine: true
      }],

      camelcase: "error",
      "@stylistic/comma-dangle": "error",
      "@stylistic/comma-spacing": "error",
      "@stylistic/comma-style": "error",
      "@stylistic/computed-property-spacing": "error",
      "func-style": "error",

      '@stylistic/indent': ["error", 2, {
        VariableDeclarator: 2,
        SwitchCase: 1
      }],

      "@stylistic/key-spacing": "error",
      "@stylistic/keyword-spacing": "error",
      "@stylistic/linebreak-style": "error",
      "new-cap": "error",
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/no-whitespace-before-property": "error",
      '@stylistic/semi': ["error", "never"],
      "@stylistic/space-before-function-paren": ["error", "always"],
      "@stylistic/space-in-parens": "error",
      "@stylistic/space-infix-ops": "error"
    }
  },
  globalIgnores([
    './lunr.js',
    './lunr.min.js',
    './lunr.min.mjs'
  ])
])
