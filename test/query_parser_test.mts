import lunr, { Query, QueryParser, QueryParseError, QueryLexeme } from '@satisfactory-dev/lunr'

import assert from 'assert/strict'

import {
  suite,
  test,
} from './shim.mts'

void suite('lunr.QueryParser', function () {
  var parse = function (q: string) {
    var query = new Query (['title', 'body']),
        parser = new QueryParser(q, query)

    parser.parse()

    return query.clauses
  }

  void suite('#parse', function () {
    void suite('single term', function () {
      const setup = () => {
        return parse('foo')
      }

      void test('has 1 clause', function () {
        assert.equal(setup().length, 1)
      })

      void suite('clauses', function () {
        const data = () => {
          return setup()[0]
        }

        void test('term', function () {
          assert.equal('foo', data().term)
        })

        void test('fields', function () {
          assert.deepEqual(['title', 'body'], data().fields)
        })

        void test('presence', function () {
          assert.equal(lunr.QueryPresence.OPTIONAL, data().presence)
        })

        void test('usePipeline', function () {
          assert.ok(data().usePipeline)
        })
      })
    })

    void suite('single term, uppercase', function () {
      const setup = () => {
        return parse('FOO')
      }

      void test('has 1 clause', function () {
        assert.equal(setup().length, 1)
      })

      void suite('clauses', function () {
        const data = () => {
          return setup()[0]
        }

        void test('term', function () {
          assert.equal('foo', data().term)
        })

        void test('fields', function () {
          assert.deepEqual(['title', 'body'], data().fields)
        })

        void test('usePipeline', function () {
          assert.ok(data().usePipeline)
        })
      })
    })

    void suite('single term with wildcard', function () {
      const setup = () => {
        return parse('fo*')
      }

      void test('has 1 clause', function () {
        assert.equal(setup().length, 1)
      })

      void suite('clauses', function () {
        const data = () => {
          return setup()[0]
        }

        void test('#term', function () {
          assert.equal('fo*', data().term)
        })

        void test('#usePipeline', function () {
          assert.ok(!data().usePipeline)
        })
      })
    })

    void suite('multiple terms', function () {
      const setup = () => {
        return parse('foo bar')
      }

      void test('has 2 clause', function () {
        assert.equal(setup().length, 2)
      })

      void suite('clauses', function () {
        void test('#term', function () {
          const clauses = setup()
          assert.equal('foo', clauses[0].term)
          assert.equal('bar', clauses[1].term)
        })
      })
    })

    void suite('multiple terms with presence', function () {
      const setup = () => {
        return parse('+foo +bar')
      }

      void test('has 2 clause', function () {
        assert.equal(setup().length, 2)
      })
    })

    void suite('edit distance followed by presence', function () {
      const setup = () => {
        return parse('foo~10 +bar')
      }

      void test('has 2 clause', function () {
        assert.equal(setup().length, 2)
      })

      void suite('clauses', function () {
        void test('#term', function () {
          const clauses = setup()
          assert.equal('foo', clauses[0].term)
          assert.equal('bar', clauses[1].term)
        })

        void test('#presence', function () {
          const clauses = setup()
          assert.equal(lunr.QueryPresence.OPTIONAL, clauses[0].presence)
          assert.equal(lunr.QueryPresence.REQUIRED, clauses[1].presence)
        })

        void test('#editDistance', function () {
          const clauses = setup()
          assert.equal(10, clauses[0].editDistance)
          // It feels dirty asserting that something is undefined
          // but there is no Optional so this is what we are reduced to
          assert.equal(clauses[1].editDistance, undefined)
        })
      })
    })

    void suite('boost followed by presence', function () {
      const setup = () => {
        return parse('foo^10 +bar')
      }

      void test('has 2 clause', function () {
        assert.equal(setup().length, 2)
      })

      void suite('clauses', function () {
        void test('#term', function () {
          const clauses = setup()
          assert.equal('foo', clauses[0].term)
          assert.equal('bar', clauses[1].term)
        })

        void test('#presence', function () {
          const clauses = setup()
          assert.equal(lunr.QueryPresence.OPTIONAL, clauses[0].presence)
          assert.equal(lunr.QueryPresence.REQUIRED, clauses[1].presence)
        })

        void test('#boost', function () {
          const clauses = setup()
          assert.equal(10, clauses[0].boost)
          assert.equal(1, clauses[1].boost)
        })
      })
    })

    void suite('field without a term', function () {
      void test('fails with QueryParseError', function () {
        assert.throws(function () { parse('title:') }, QueryParseError)
      })
    })

    void suite('unknown field', function () {
      void test('fails with QueryParseError', function () {
        assert.throws(function () { parse('unknown:foo') }, QueryParseError)
      })
    })

    void suite('term with field', function () {
      const setup = () => {
        return parse('title:foo')
      }

      void test('has 1 clause', function () {
        assert.equal(setup().length, 1)
      })

      void test('clause contains only scoped field', function () {
        assert.deepEqual(setup()[0].fields, ['title'])
      })
    })

    void suite('uppercase field with uppercase term', function () {
      const setup = () => {
        // Using a different query to the rest of the tests
        // so that only this test has to worry about an upcase field name
        var query = new lunr.Query (['TITLE']),
            parser = new lunr.QueryParser("TITLE:FOO", query)

        parser.parse()

        return query.clauses
      }

      void test('has 1 clause', function () {
        assert.equal(setup().length, 1)
      })

      void test('clause contains downcased term', function () {
        assert.equal(setup()[0].term, 'foo')
      })

      void test('clause contains only scoped field', function () {
        assert.deepEqual(setup()[0].fields, ['TITLE'])
      })
    })

    void suite('multiple terms scoped to different fields', function () {
      const setup = () => {
        return parse('title:foo body:bar')
      }

      void test('has 2 clauses', function () {
        assert.equal(setup().length, 2)
      })

      void test('fields', function () {
        const clauses = setup()
        assert.deepEqual(['title'], clauses[0].fields)
        assert.deepEqual(['body'], clauses[1].fields)
      })

      void test('terms', function () {
        const clauses = setup()
        assert.equal('foo', clauses[0].term)
        assert.equal('bar', clauses[1].term)
      })
    })

    void suite('single term with edit distance', function () {
      const setup = () => {
        return parse('foo~2')
      }

      void test('has 1 clause', function () {
        assert.equal(setup().length, 1)
      })

      void test('term', function () {
        assert.equal('foo', setup()[0].term)
      })

      void test('editDistance', function () {
        assert.equal(2, setup()[0].editDistance)
      })

      void test('fields', function () {
        assert.deepEqual(['title', 'body'], setup()[0].fields)
      })
    })

    void suite('multiple terms with edit distance', function () {
      const setup = () => {
        return parse('foo~2 bar~3')
      }

      void test('has 2 clauses', function () {
        assert.equal(setup().length, 2)
      })

      void test('term', function () {
        const clauses = setup()
        assert.equal('foo', clauses[0].term)
        assert.equal('bar', clauses[1].term)
      })

      void test('editDistance', function () {
        const clauses = setup()
        assert.equal(2, clauses[0].editDistance)
        assert.equal(3, clauses[1].editDistance)
      })

      void test('fields', function () {
        const clauses = setup()
        assert.deepEqual(['title', 'body'], clauses[0].fields)
        assert.deepEqual(['title', 'body'], clauses[1].fields)
      })
    })

    void suite('single term scoped to field with edit distance', function () {
      const setup = () => {
        return parse('title:foo~2')
      }

      void test('has 1 clause', function () {
        assert.equal(setup().length, 1)
      })

      void test('term', function () {
        assert.equal('foo', setup()[0].term)
      })

      void test('editDistance', function () {
        assert.equal(2, setup()[0].editDistance)
      })

      void test('fields', function () {
        assert.deepEqual(['title'], setup()[0].fields)
      })
    })

    void suite('non-numeric edit distance', function () {
      void test('throws QueryParseError', function () {
        assert.throws(function () { parse('foo~a') }, QueryParseError)
      })
    })

    void suite('edit distance without a term', function () {
      void test('throws QueryParseError', function () {
        assert.throws(function () { parse('~2') }, QueryParseError)
      })
    })

    void suite('single term with boost', function () {
      const setup = () => {
        return parse('foo^2')
      }

      void test('has 1 clause', function () {
        assert.equal(setup().length, 1)
      })

      void test('term', function () {
        assert.equal('foo', setup()[0].term)
      })

      void test('boost', function () {
        assert.equal(2, setup()[0].boost)
      })

      void test('fields', function () {
        assert.deepEqual(['title', 'body'], setup()[0].fields)
      })
    })

    void suite('non-numeric boost', function () {
      void test('throws QueryParseError', function () {
        assert.throws(function () { parse('foo^a') }, QueryParseError)
      })
    })

    void suite('boost without a term', function () {
      void test('throws QueryParseError', function () {
        assert.throws(function () { parse('^2') }, QueryParseError)
      })
    })

    void suite('multiple terms with boost', function () {
      const setup = () => {
        return parse('foo^2 bar^3')
      }

      void test('has 2 clauses', function () {
        assert.equal(setup().length, 2)
      })

      void test('term', function () {
        const clauses = setup()
        assert.equal('foo', clauses[0].term)
        assert.equal('bar', clauses[1].term)
      })

      void test('boost', function () {
        const clauses = setup()
        assert.equal(2, clauses[0].boost)
        assert.equal(3, clauses[1].boost)
      })

      void test('fields', function () {
        const clauses = setup()
        assert.deepEqual(['title', 'body'], clauses[0].fields)
        assert.deepEqual(['title', 'body'], clauses[1].fields)
      })
    })

    void suite('term scoped by field with boost', function () {
      const setup = () => {
        return parse('title:foo^2')
      }

      void test('has 1 clause', function () {
        assert.equal(setup().length, 1)
      })

      void test('term', function () {
        assert.equal('foo', setup()[0].term)
      })

      void test('boost', function () {
        assert.equal(2, setup()[0].boost)
      })

      void test('fields', function () {
        assert.deepEqual(['title'], setup()[0].fields)
      })
    })

    void suite('term with presence required', function () {
      const setup = () => {
        return parse('+foo')
      }

      void test('has 1 clauses', function () {
        assert.equal(setup().length, 1)
      })

      void test('term', function () {
        assert.equal('foo', setup()[0].term)
      })

      void test('boost', function () {
        assert.equal(1, setup()[0].boost)
      })

      void test('fields', function () {
        assert.deepEqual(['title', 'body'], setup()[0].fields)
      })

      void test('presence', function () {
        assert.equal(lunr.QueryPresence.REQUIRED, setup()[0].presence)
      })
    })

    void suite('term with presence prohibited', function () {
      const setup = () => {
        return parse('-foo')
      }

      void test('has 1 clauses', function () {
        assert.equal(setup().length, 1)
      })

      void test('term', function () {
        assert.equal('foo', setup()[0].term)
      })

      void test('boost', function () {
        assert.equal(1, setup()[0].boost)
      })

      void test('fields', function () {
        assert.deepEqual(['title', 'body'], setup()[0].fields)
      })

      void test('presence', function () {
        assert.equal(lunr.QueryPresence.PROHIBITED, setup()[0].presence)
      })
    })

    void suite('term scoped by field with presence required', function () {
      const setup = () => {
        return parse('+title:foo')
      }

      void test('has 1 clauses', function () {
        assert.equal(setup().length, 1)
      })

      void test('term', function () {
        assert.equal('foo', setup()[0].term)
      })

      void test('boost', function () {
        assert.equal(1, setup()[0].boost)
      })

      void test('fields', function () {
        assert.deepEqual(['title'], setup()[0].fields)
      })

      void test('presence', function () {
        assert.equal(lunr.QueryPresence.REQUIRED, setup()[0].presence)
      })
    })

    void suite('term scoped by field with presence prohibited', function () {
      const setup = () => {
        return parse('-title:foo')
      }

      void test('has 1 clauses', function () {
        assert.equal(setup().length, 1)
      })

      void test('term', function () {
        assert.equal('foo', setup()[0].term)
      })

      void test('boost', function () {
        assert.equal(1, setup()[0].boost)
      })

      void test('fields', function () {
        assert.deepEqual(['title'], setup()[0].fields)
      })

      void test('presence', function () {
        assert.equal(lunr.QueryPresence.PROHIBITED, setup()[0].presence)
      })
    })
  })

  void suite('term with boost and edit distance', function () {
    const setup = () => {
      return parse('foo^2~3')
    }

    void test('has 1 clause', function () {
      assert.equal(setup().length, 1)
    })

    void test('term', function () {
      assert.equal('foo', setup()[0].term)
    })

    void test('editDistance', function () {
      assert.equal(3, setup()[0].editDistance)
    })

    void test('boost', function () {
      assert.equal(2, setup()[0].boost)
    })

    void test('fields', function () {
      assert.deepEqual(['title', 'body'], setup()[0].fields)
    })
  })

  void suite('empty term', () => {
    void test('unmodified', () => {
      assert.deepEqual(
        parse(''),
        [],
      )
    })
  })

  void suite('artificial states', () => {
    /** @type {Object<string, [ErrorConstructor, string, string[], lunr.QueryLexeme[]]>} */
    const datasetThrows = {
      'unrecognised presence operator': [
        QueryParseError,
        `unrecognised presence operator''`,
        [],
        [
          new QueryLexeme({
            type: 'PRESENCE',
            str: '',
            start: 0,
            end: 0,
          }),
        ],
      ] as const,
      'expecting term or field, found nothing': [
        QueryParseError,
        `expecting term or field, found nothing`,
        [],
        [
          new QueryLexeme({
            type: 'PRESENCE',
            str: '+',
            start: 0,
            end: 0,
          }),
        ],
      ] as const,
      'expecting term or field, found PRESENCE': [
        QueryParseError,
        `expecting term or field, found 'PRESENCE'`,
        [],
        [
          new QueryLexeme({
            type: 'PRESENCE',
            str: '+',
            start: 0,
            end: 0,
          }),
          new QueryLexeme({
            type: 'PRESENCE',
            str: '-',
            start: 0,
            end: 0,
          }),
        ],
      ] as const,
      'unrecognised field': [
        QueryParseError,
        `unrecognised field '', possible fields:`,
        [],
        [
          new QueryLexeme({
            type: 'FIELD',
            str: '',
            start: 0,
            end: 0,
          }),
        ],
      ] as const,
      'expecting term': [
        QueryParseError,
        `expecting term, found 'FIELD'`,
        [''],
        [
          new QueryLexeme({
            type: 'FIELD',
            str: '',
            start: 0,
            end: 0,
          }),
          new QueryLexeme({
            type: 'FIELD',
            str: '',
            start: 0,
            end: 0,
          }),
        ],
      ] as const,
      'unexpected lexeme (#parseTerm)': [
        QueryParseError,
        `Unexpected lexeme type 'EOS'`,
        [],
        [
          new QueryLexeme({
            type: 'TERM',
            str: '',
            start: 0,
            end: 0,
          }),
          new QueryLexeme({
            type: 'EOS',
            str: '',
            start: 0,
            end: 0,
          }),
        ],
      ] as const,
      'unexpected lexeme (#parseEditDistance)': [
        QueryParseError,
        `Unexpected lexeme type 'EOS'`,
        ['title'],
        [
          new QueryLexeme({
            type: 'TERM',
            str: '',
            start: 0,
            end: 0,
          }),
          new QueryLexeme({
            type: 'EDIT_DISTANCE',
            str: '1',
            start: 0,
            end: 0,
          }),
          new QueryLexeme({
            type: 'EDIT_DISTANCE',
            str: '1',
            start: 0,
            end: 0,
          }),
          new QueryLexeme({
            type: 'FIELD',
            str: 'title',
            start: 0,
            end: 0,
          }),
          new QueryLexeme({
            type: 'TERM',
            str: '',
            start: 0,
            end: 0,
          }),
          new QueryLexeme({
            type: 'EDIT_DISTANCE',
            str: '1',
            start: 0,
            end: 0,
          }),
          new QueryLexeme({
            type: 'BOOST',
            str: '1',
            start: 0,
            end: 0,
          }),
          new QueryLexeme({
            type: 'BOOST',
            str: '1',
            start: 0,
            end: 0,
          }),
          new QueryLexeme({
            type: 'FIELD',
            str: 'title',
            start: 0,
            end: 0,
          }),
          new QueryLexeme({
            type: 'TERM',
            str: '',
            start: 0,
            end: 0,
          }),
          new QueryLexeme({
            type: 'EDIT_DISTANCE',
            str: '1',
            start: 0,
            end: 0,
          }),
          new QueryLexeme({
            type: 'EDIT_DISTANCE',
            str: '1',
            start: 0,
            end: 0,
          }),
          new QueryLexeme({
            type: 'EOS',
            str: '',
            start: 0,
            end: 0,
          }),
        ],
      ] as const,
      'unexpected lexeme (#parseBoost)': [
        QueryParseError,
        `Unexpected lexeme type 'EOS'`,
        [],
        [
          new QueryLexeme({
            type: 'TERM',
            str: '',
            start: 0,
            end: 0,
          }),
          new QueryLexeme({
            type: 'BOOST',
            str: '1',
            start: 0,
            end: 0,
          }),
          new QueryLexeme({
            type: 'EOS',
            str: '',
            start: 0,
            end: 0,
          }),
        ],
      ],
    }

    for (const [
      testName,
      [
        expectException,
        expectMessage,
        fields,
        lexemes,
      ],
    ] of Object.entries(datasetThrows) as [
        string,
        [
          Error,
          string,
          string[],
          QueryLexeme[],
        ],
      ][]
    ) {
      void test(testName, () => {
        const instance = new lunr.QueryParser('', new Query(fields))
        instance.lexer.run = () => {
          instance.lexer.lexemes = lexemes
        }

        assert.throws(() => instance.parse(), expectException, expectMessage)
      })
    }
  })
})
