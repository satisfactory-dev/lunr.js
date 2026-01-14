import type {
  QueryLexeme,
} from '@satisfactory-dev/lunr'

import { QueryLexer } from '@satisfactory-dev/lunr'

import assert from 'assert/strict'

import {
  suite,
  test,
} from './shim.ts'

void suite('QueryLexer', function () {
  void suite('#run', function () {
    var lex = function (str: string, termSeparator?: RegExp): QueryLexer {
      var lexer = new QueryLexer(str)
      lexer.termSeparator = termSeparator
      lexer.run()
      return lexer
    }

    void suite('single term', function () {
      const setup = () => {
        return lex('foo')
      }

      void test('produces 1 lexeme', function () {
        assert.equal(setup().lexemes.length, 1)
      })

      void suite('lexeme', function () {
        const data = () => {
          return setup().lexemes[0]
        }

        void test('#type', function () {
          assert.equal(QueryLexer.TERM, data().type)
        })

        void test('#str', function () {
          assert.equal('foo', data().str)
        })

        void test('#start', function () {
          assert.equal(0, data().start)
        })

        void test('#end', function () {
          assert.equal(3, data().end)
        })
      })
    })

    // embedded hyphens should not be confused with
    // presence operators
    void suite('single term with hyphen', function () {
      const setup = () => {
        return lex('foo-bar')
      }

      void test('produces 2 lexeme', function () {
        assert.equal(setup().lexemes.length, 2)
      })

      void suite('lexeme', function () {
        void test('#type', function () {
          const lexemes = setup().lexemes
          assert.equal(QueryLexer.TERM, lexemes[0].type)
          assert.equal(QueryLexer.TERM, lexemes[1].type)
        })

        void test('#str', function () {
          const lexemes = setup().lexemes
          assert.equal('foo', lexemes[0].str)
          assert.equal('bar', lexemes[1].str)
        })

        void test('#start', function () {
          const lexemes = setup().lexemes
          assert.equal(0, lexemes[0].start)
          assert.equal(4, lexemes[1].start)
        })

        void test('#end', function () {
          const lexemes = setup().lexemes
          assert.equal(3, lexemes[0].end)
          assert.equal(7, lexemes[1].end)
        })
      })
    })

    void suite('term escape char', function () {
      const setup = () => {
        return lex("foo\\:bar")
      }

      void test('produces 1 lexeme', function () {
        assert.equal(setup().lexemes.length, 1)
      })

      void suite('lexeme', function () {
        const data = () => {
          return setup().lexemes[0]
        }

        void test('#type', function () {
          assert.equal(QueryLexer.TERM, data().type)
        })

        void test('#str', function () {
          assert.equal('foo:bar', data().str)
        })

        void test('#start', function () {
          assert.equal(0, data().start)
        })

        void test('#end', function () {
          assert.equal(8, data().end)
        })
      })
    })

    void suite('multiple terms', function () {
      const setup = () => {
        return lex('foo bar')
      }

      void test('produces 2 lexemes', function () {
        assert.equal(setup().lexemes.length, 2)
      })

      void suite('lexemes', function () {
        void test('#type', function () {
          const lexemes = setup().lexemes
          assert.equal(QueryLexer.TERM, lexemes[0].type)
          assert.equal(QueryLexer.TERM, lexemes[1].type)
        })

        void test('#str', function () {
          const lexemes = setup().lexemes
          assert.equal('foo', lexemes[0].str)
          assert.equal('bar', lexemes[1].str)
        })

        void test('#start', function () {
          const lexemes = setup().lexemes
          assert.equal(0, lexemes[0].start)
          assert.equal(4, lexemes[1].start)
        })

        void test('#end', function () {
          const lexemes = setup().lexemes
          assert.equal(3, lexemes[0].end)
          assert.equal(7, lexemes[1].end)
        })
      })
    })

    void suite('multiple terms with presence', function () {
      const setup = () => {
        return lex('+foo +bar')
      }

      void test('produces 2 lexemes', function () {
        assert.equal(setup().lexemes.length, 4)
      })

      void suite('lexemes', function () {
        void test('#type', function () {
          const lexemes = setup().lexemes
          assert.equal(QueryLexer.TERM, lexemes[1].type)
          assert.equal(QueryLexer.TERM, lexemes[3].type)

          assert.equal(QueryLexer.PRESENCE, lexemes[0].type)
          assert.equal(QueryLexer.PRESENCE, lexemes[2].type)
        })

        void test('#str', function () {
          const lexemes = setup().lexemes
          assert.equal('foo', lexemes[1].str)
          assert.equal('bar', lexemes[3].str)

          assert.equal('+', lexemes[0].str)
          assert.equal('+', lexemes[2].str)
        })
      })
    })

    void suite('multiple terms with presence and fuzz', function () {
      const setup = () => {
        return lex('+foo~1 +bar')
      }

      void test('produces n lexemes', function () {
        assert.equal(setup().lexemes.length, 5)
      })

      void suite('lexemes', function () {
        void test('#type', function () {
          const lexemes = setup().lexemes
          assert.equal(QueryLexer.PRESENCE, lexemes[0].type)
          assert.equal(QueryLexer.TERM, lexemes[1].type)
          assert.equal(QueryLexer.EDIT_DISTANCE, lexemes[2].type)
          assert.equal(QueryLexer.PRESENCE, lexemes[3].type)
          assert.equal(QueryLexer.TERM, lexemes[4].type)
        })
      })
    })

    void suite('separator length > 1', function () {
      const setup = () => {
        return lex('foo    bar')
      }

      void test('produces 2 lexemes', function () {
        assert.equal(setup().lexemes.length, 2)
      })

      void suite('lexemes', function () {
        void test('#type', function () {
          const lexemes = setup().lexemes
          assert.equal(QueryLexer.TERM, lexemes[0].type)
          assert.equal(QueryLexer.TERM, lexemes[1].type)
        })

        void test('#str', function () {
          const lexemes = setup().lexemes
          assert.equal('foo', lexemes[0].str)
          assert.equal('bar', lexemes[1].str)
        })

        void test('#start', function () {
          const lexemes = setup().lexemes
          assert.equal(0, lexemes[0].start)
          assert.equal(7, lexemes[1].start)
        })

        void test('#end', function () {
          const lexemes = setup().lexemes
          assert.equal(3, lexemes[0].end)
          assert.equal(10, lexemes[1].end)
        })
      })
    })

    void suite('hyphen (-) considered a separator', function () {
      const setup = () => {
        return lex('foo-bar')
      }

      void test('produces 1 lexeme', function () {
        assert.equal(setup().lexemes.length, 2)
      })
    })

    void suite('term with field', function () {
      const setup = () => {
        return lex('title:foo')
      }

      void test('produces 2 lexemes', function () {
        assert.equal(setup().lexemes.length, 2)
      })

      void suite('lexemes', function () {
        void test('#type', function () {
          const lexemes = setup().lexemes
          assert.equal(QueryLexer.FIELD, lexemes[0].type)
          assert.equal(QueryLexer.TERM, lexemes[1].type)
        })

        void test('#str', function () {
          const lexemes = setup().lexemes
          assert.equal('title', lexemes[0].str)
          assert.equal('foo', lexemes[1].str)
        })

        void test('#start', function () {
          const lexemes = setup().lexemes
          assert.equal(0, lexemes[0].start)
          assert.equal(6, lexemes[1].start)
        })

        void test('#end', function () {
          const lexemes = setup().lexemes
          assert.equal(5, lexemes[0].end)
          assert.equal(9, lexemes[1].end)
        })
      })
    })

    void suite('term with field with escape char', function () {
      const setup = () => {
        return lex("ti\\:tle:foo")
      }

      void test('produces 1 lexeme', function () {
        assert.equal(setup().lexemes.length, 2)
      })

      void suite('lexeme', function () {
        void test('#type', function () {
          const lexemes = setup().lexemes
          assert.equal(QueryLexer.FIELD, lexemes[0].type)
          assert.equal(QueryLexer.TERM, lexemes[1].type)
        })

        void test('#str', function () {
          const lexemes = setup().lexemes
          assert.equal('ti:tle', lexemes[0].str)
          assert.equal('foo', lexemes[1].str)
        })

        void test('#start', function () {
          const lexemes = setup().lexemes
          assert.equal(0, lexemes[0].start)
          assert.equal(8, lexemes[1].start)
        })

        void test('#end', function () {
          const lexemes = setup().lexemes
          assert.equal(7, lexemes[0].end)
          assert.equal(11, lexemes[1].end)
        })
      })
    })

    void suite('term with presence required', function () {
      const setup = () => {
        return lex('+foo')
      }

      void test('produces 2 lexemes', function () {
        assert.equal(setup().lexemes.length, 2)
      })

      void suite('lexemes', function () {
        void test('#type', function () {
          const lexemes = setup().lexemes
          assert.equal(QueryLexer.PRESENCE, lexemes[0].type)
          assert.equal(QueryLexer.TERM, lexemes[1].type)
        })

        void test('#str', function () {
          const lexemes = setup().lexemes
          assert.equal('+', lexemes[0].str)
          assert.equal('foo', lexemes[1].str)
        })

        void test('#start', function () {
          const lexemes = setup().lexemes
          assert.equal(1, lexemes[1].start)
          assert.equal(0, lexemes[0].start)
        })

        void test('#end', function () {
          const lexemes = setup().lexemes
          assert.equal(4, lexemes[1].end)
          assert.equal(1, lexemes[0].end)
        })
      })
    })

    void suite('term with field with presence required', function () {
      const setup = () => {
        return lex('+title:foo')
      }

      void test('produces 3 lexemes', function () {
        assert.equal(setup().lexemes.length, 3)
      })

      void suite('lexemes', function () {
        void test('#type', function () {
          const lexemes = setup().lexemes
          assert.equal(QueryLexer.PRESENCE, lexemes[0].type)
          assert.equal(QueryLexer.FIELD, lexemes[1].type)
          assert.equal(QueryLexer.TERM, lexemes[2].type)
        })

        void test('#str', function () {
          const lexemes = setup().lexemes
          assert.equal('+', lexemes[0].str)
          assert.equal('title', lexemes[1].str)
          assert.equal('foo', lexemes[2].str)
        })

        void test('#start', function () {
          const lexemes = setup().lexemes
          assert.equal(0, lexemes[0].start)
          assert.equal(1, lexemes[1].start)
          assert.equal(7, lexemes[2].start)
        })

        void test('#end', function () {
          const lexemes = setup().lexemes
          assert.equal(1, lexemes[0].end)
          assert.equal(6, lexemes[1].end)
          assert.equal(10, lexemes[2].end)
        })
      })
    })

    void suite('term with presence prohibited', function () {
      const setup = () => {
        return lex('-foo')
      }

      void test('produces 2 lexemes', function () {
        assert.equal(setup().lexemes.length, 2)
      })

      void suite('lexemes', function () {
        void test('#type', function () {
          const lexemes = setup().lexemes
          assert.equal(QueryLexer.PRESENCE, lexemes[0].type)
          assert.equal(QueryLexer.TERM, lexemes[1].type)
        })

        void test('#str', function () {
          const lexemes = setup().lexemes
          assert.equal('-', lexemes[0].str)
          assert.equal('foo', lexemes[1].str)
        })

        void test('#start', function () {
          const lexemes = setup().lexemes
          assert.equal(1, lexemes[1].start)
          assert.equal(0, lexemes[0].start)
        })

        void test('#end', function () {
          const lexemes = setup().lexemes
          assert.equal(4, lexemes[1].end)
          assert.equal(1, lexemes[0].end)
        })
      })
    })

    void suite('term with edit distance', function () {
      const setup = () => {
        return lex('foo~2')
      }

      void test('produces 2 lexemes', function () {
        assert.equal(setup().lexemes.length, 2)
      })

      void suite('lexemes', function () {
        void test('#type', function () {
          const lexemes = setup().lexemes
          assert.equal(QueryLexer.TERM, lexemes[0].type)
          assert.equal(QueryLexer.EDIT_DISTANCE, lexemes[1].type)
        })

        void test('#str', function () {
          const lexemes = setup().lexemes
          assert.equal('foo', lexemes[0].str)
          assert.equal('2', lexemes[1].str)
        })

        void test('#start', function () {
          const lexemes = setup().lexemes
          assert.equal(0, lexemes[0].start)
          assert.equal(4, lexemes[1].start)
        })

        void test('#end', function () {
          const lexemes = setup().lexemes
          assert.equal(3, lexemes[0].end)
          assert.equal(5, lexemes[1].end)
        })
      })
    })

    void suite('term with boost', function () {
      const setup = () => {
        return lex('foo^10')
      }

      void test('produces 2 lexemes', function () {
        assert.equal(setup().lexemes.length, 2)
      })

      void suite('lexemes', function () {
        void test('#type', function () {
          const lexemes = setup().lexemes
          assert.equal(QueryLexer.TERM, lexemes[0].type)
          assert.equal(QueryLexer.BOOST, lexemes[1].type)
        })

        void test('#str', function () {
          const lexemes = setup().lexemes
          assert.equal('foo', lexemes[0].str)
          assert.equal('10', lexemes[1].str)
        })

        void test('#start', function () {
          const lexemes = setup().lexemes
          assert.equal(0, lexemes[0].start)
          assert.equal(4, lexemes[1].start)
        })

        void test('#end', function () {
          const lexemes = setup().lexemes
          assert.equal(3, lexemes[0].end)
          assert.equal(6, lexemes[1].end)
        })
      })
    })

    void suite('term with field, boost and edit distance', function () {
      const setup = () => {
        return lex('title:foo^10~5')
      }

      void test('produces 4 lexemes', function () {
        assert.equal(setup().lexemes.length, 4)
      })

      void suite('lexemes', function () {
        void test('#type', function () {
          const lexemes = setup().lexemes
          assert.equal(QueryLexer.FIELD, lexemes[0].type)
          assert.equal(QueryLexer.TERM, lexemes[1].type)
          assert.equal(QueryLexer.BOOST, lexemes[2].type)
          assert.equal(QueryLexer.EDIT_DISTANCE, lexemes[3].type)
        })

        void test('#str', function () {
          const lexemes = setup().lexemes
          assert.equal('title', lexemes[0].str)
          assert.equal('foo', lexemes[1].str)
          assert.equal('10', lexemes[2].str)
          assert.equal('5', lexemes[3].str)
        })

        void test('#start', function () {
          const lexemes = setup().lexemes
          assert.equal(0, lexemes[0].start)
          assert.equal(6, lexemes[1].start)
          assert.equal(10, lexemes[2].start)
          assert.equal(13, lexemes[3].start)
        })

        void test('#end', function () {
          const lexemes = setup().lexemes
          assert.equal(5, lexemes[0].end)
          assert.equal(9, lexemes[1].end)
          assert.equal(12, lexemes[2].end)
          assert.equal(14, lexemes[3].end)
        })
      })
    })

    void suite('customising the term separator', function () {
      type data_provider = () => (
        | [
          string | RegExp,
          {[key: string]: QueryLexeme[]},
        ]
        | [
          string | RegExp,
          {[key: string]: QueryLexeme[]},
          RegExp,
        ]
      )

      const tests: {[key: string]: data_provider} = {
        'default behaviour': () => [
          '/[\\s-]+/',
          {
            'foo-bar -baz +bat': [
              {type: 'TERM', str: 'foo', start: 0, end: 3},
              {type: 'TERM', str: 'bar', start: 4, end: 7},
              {type: 'PRESENCE', str: '-', start: 8, end: 9},
              {type: 'TERM', str: 'baz', start: 9, end: 12},
              {type: 'PRESENCE', str: '+', start: 13, end: 14},
              {type: 'TERM', str: 'bat', start: 14, end: 17},
            ],
            // https://github.com/olivernn/lunr.js/issues/527
            'ROLLS-ROYCE': [
              {type: 'TERM', str: 'ROLLS', start: 0, end: 5},
              {type: 'TERM', str: 'ROYCE', start: 6, end: 11},
            ],
          },
        ],
        'instance behaviour': () => [
          '/[\\s]+/',
          {
            'foo-bar -baz +bat': [
              {type: 'TERM', str: 'foo-bar', start: 0, end: 7},
              {type: 'PRESENCE', str: '-', start: 8, end: 9},
              {type: 'TERM', str: 'baz', start: 9, end: 12},
              {type: 'PRESENCE', str: '+', start: 13, end: 14},
              {type: 'TERM', str: 'bat', start: 14, end: 17},
            ],
            // https://github.com/olivernn/lunr.js/issues/527
            'ROLLS-ROYCE': [
              {type: 'TERM', str: 'ROLLS-ROYCE', start: 0, end: 11},
            ],
          },
          /[\s]+/,
        ],
        'static behaviour': () => {
          QueryLexer.termSeparator = /[\s]+/

          return [
            '/[\\s]+/',
            {
              'foo-bar -baz +bat': [
                {type: 'TERM', str: 'foo-bar', start: 0, end: 7},
                {type: 'PRESENCE', str: '-', start: 8, end: 9},
                {type: 'TERM', str: 'baz', start: 9, end: 12},
                {type: 'PRESENCE', str: '+', start: 13, end: 14},
                {type: 'TERM', str: 'bat', start: 14, end: 17},
              ],
              // https://github.com/olivernn/lunr.js/issues/527
              'ROLLS-ROYCE': [
                {type: 'TERM', str: 'ROLLS-ROYCE', start: 0, end: 11},
              ],
            },
          ]
        },
      }

      for (const [testName, data] of Object.entries(tests)) {
        void test(testName, () => {
          const [
            expectedTermSeparator,
            expectations,
            separator,
          ] = data()
          for (const [stringToLex, expectedLexemes] of Object.entries(expectations)) {
            const result = lex(stringToLex, separator)
            assert.equal(result.termSeparator.toString(), expectedTermSeparator)
            assert.equal(result.lexemes.length, expectedLexemes.length)
            assert.deepEqual(
              result.lexemes.map((e) => ({...e})),
              expectedLexemes,
            )
          }

          QueryLexer.termSeparator = undefined
        })
      }
    })
  })
})
