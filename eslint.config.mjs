import {
  defineConfig,
  globalIgnores
} from "eslint/config"
import globals from "globals"
import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"
import cspell from '@cspell/eslint-plugin'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default defineConfig([
  {
    extends: compat.extends("eslint:recommended"),

    plugins: {
      '@cspell': cspell
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
      "dot-location": ["error", "property"],
      "no-alert": "error",
      "no-caller": "error",
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-extend-native": "error",
      "no-implicit-globals": "error",
      "no-multi-spaces": "error",
      "array-bracket-spacing": "error",
      "block-spacing": "error",

      "brace-style": ["error", "1tbs", {
        allowSingleLine: true
      }],

      camelcase: "error",
      "comma-dangle": "error",
      "comma-spacing": "error",
      "comma-style": "error",
      "computed-property-spacing": "error",
      "func-style": "error",

      indent: ["error", 2, {
        VariableDeclarator: 2,
        SwitchCase: 1
      }],

      "key-spacing": "error",
      "keyword-spacing": "error",
      "linebreak-style": "error",
      "new-cap": "error",
      "no-trailing-spaces": "error",
      "no-whitespace-before-property": "error",
      semi: ["error", "never"],
      "space-before-function-paren": ["error", "always"],
      "space-in-parens": "error",
      "space-infix-ops": "error"
    }
  },
  globalIgnores([
    './lunr.js',
    './lunr.min.js',
    './lunr.min.mjs'
  ])
])
