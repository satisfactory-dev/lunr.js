import {
  defineConfig,
  globalIgnores
} from "eslint/config"
import spellcheck from "eslint-plugin-spellcheck"
import globals from "globals"
import path from "node:path"
import { fileURLToPath } from "node:url"
import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default defineConfig([
  {
  extends: compat.extends("eslint:recommended"),

  plugins: {
    spellcheck
  },

  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
      ...globals.mocha,
      assert: true,
      lunr: true
    }
  },

  rules: {
    "spellcheck/spell-checker": [1, {
      lang: "en_GB",

      skipWords: [
        "Marv",
        "lunr",
        "val",
        "param",
        "idx",
        "utils",
        "namespace",
        "eslint",
        "latin",
        "str",
        "len",
        "sqrt",
        "wildcard",
        "concat",
        "metadata",
        "fn",
        "params",
        "lexeme",
        "lex",
        "pos",
        "typedef",
        "wildcards",
        "lexemes",
        "fns",
        "stemmer",
        "attrs",
        "tf",
        "idf",
        "lookups",
        "whitelist",
        "whitelisted",
        "tokenizer",
        "whitespace",
        "automata",
        "i",
        "obj",
        "anymore",
        "lexer",
        "var",
        "refs",
        "serializable",
        "tis",
        "twas",
        "int",
        "args",
        "unshift",
        "plugins",
        "upsert",
        "upserting",
        "readonly",
        "baz",
        "tokenization",
        "lunrjs",
        "com",
        "olivernn",
        "github",
        "mjs",
        "esm",
        "umd",
        "vars",
        "chai",
        "js"
      ]
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
