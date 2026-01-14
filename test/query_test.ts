import { LEADING_OR_TRAILING, Query, QueryPresence, QueryWildcard, Token, tokenizer } from '@satisfactory-dev/lunr'

import assert from 'assert/strict'

import {
  suite,
  test,
} from './shim.ts'

void suite('lunr.Query', function () {
  var allFields = ['title', 'body']

  void suite('#term', function () {
    const setup = () => {
      return new Query(allFields)
    }

    void suite('single string term', function () {
      const data = () => {
        const query = setup()
        query.term('foo')

        return query
      }

      void test('adds a single clause', function () {
        assert.equal(data().clauses.length, 1)
      })

      void test('clause has the correct term', function () {
        assert.equal(data().clauses[0].term, 'foo')
      })
    })

    void suite('single token term', function () {
      const data = () => {
        const query = setup()
        query.term(new Token('foo'))

        return query
      }

      void test('adds a single clause', function () {
        assert.equal(data().clauses.length, 1)
      })

      void test('clause has the correct term', function () {
        assert.equal(data().clauses[0].term, 'foo')
      })
    })

    void suite('multiple string terms', function () {
      const data = () => {
        const query = setup()
        query.term(['foo', 'bar'])

        return query
      }

      void test('adds a single clause', function () {
        assert.equal(data().clauses.length, 2)
      })

      void test('clause has the correct term', function () {
        var terms = data().clauses.map(function (c) { return c.term })
        assert.deepEqual(terms, ['foo', 'bar'])
      })
    })

    void suite('multiple string terms with options', function () {
      const data = () => {
        const query = setup()
        query.term(['foo', 'bar'], { usePipeline: false })

        return query
      }

      void test('clause has the correct term', function () {
        var terms = data().clauses.map(function (c) { return c.term })
        assert.deepEqual(terms, ['foo', 'bar'])
      })
    })

    void suite('multiple token terms', function () {
      const data = () => {
        const query = setup()
        query.term(tokenizer('foo bar'))

        return query
      }

      void test('adds a single clause', function () {
        assert.equal(data().clauses.length, 2)
      })

      void test('clause has the correct term', function () {
        var terms = data().clauses.map(function (c) { return c.term })
        assert.deepEqual(terms, ['foo', 'bar'])
      })
    })
  })

  void suite('#clause', function () {
    const setup = () => {
      return new Query (allFields)
    }

    void suite('defaults', function () {
      const data = () => {
        const query = setup()
        query.clause({term: 'foo'})

        return query.clauses[0]
      }

      void test('fields', function () {
        assert.deepEqual(data().fields, allFields)
      })

      void test('boost', function () {
        assert.equal(data().boost, 1)
      })

      void test('usePipeline', function () {
        assert.equal(data().usePipeline, true)
      })
    })

    void suite('specified', function () {
      const data = () => {
        const query = setup()
        query.clause({
          term: 'foo',
          boost: 10,
          fields: ['title'],
          usePipeline: false,
        })


        return query.clauses[0]
      }

      void test('fields', function () {
        assert.deepEqual(data().fields, ['title'])
      })

      void test('boost', function () {
        assert.equal(data().boost, 10)
      })

      void test('usePipeline', function () {
        assert.equal(data().usePipeline, false)
      })
    })

    void suite('wildcards', function () {
      void suite('none', function () {
        const data = () => {
          const query = setup()

          query.clause({
            term: 'foo',
            wildcard: QueryWildcard.NONE,
          })


          return query.clauses[0]
        }

        void test('no wildcard', function () {
          assert.equal(data().term, 'foo')
        })
      })

      void suite('leading', function () {
        const data = () => {
          const query = setup()
          query.clause({
            term: 'foo',
            wildcard: QueryWildcard.LEADING,
          })


          return query.clauses[0]
        }

        void test('adds wildcard', function () {
          assert.equal(data().term, '*foo')
        })
      })

      void suite('trailing', function () {
        const data = () => {
          const query = setup()
          query.clause({
            term: 'foo',
            wildcard: QueryWildcard.TRAILING,
          })


          return query.clauses[0]
        }

        void test('adds wildcard', function () {
          assert.equal(data().term, 'foo*')
        })
      })

      void suite('leading and trailing', function () {
        const data = () => {
          const query = setup()
          query.clause({
            term: 'foo',
            wildcard: LEADING_OR_TRAILING,
          })


          return query.clauses[0]
        }

        void test('adds wildcards', function () {
          assert.equal(data().term, '*foo*')
        })
      })

      void suite('existing', function () {
        const data = () => {
          const query = setup()
          query.clause({
            term: '*foo*',
            wildcard: LEADING_OR_TRAILING,
          })


          return query.clauses[0]
        }

        void test('no additional wildcards', function () {
          assert.equal(data().term, '*foo*')
        })
      })
    })
  })

  void suite('#isNegated', function () {
    const setup = () => {
      return new Query (allFields)
    }

    void suite('all prohibited', function () {
      const data = () => {
        const query = setup()
        query.term('foo', { presence: QueryPresence.PROHIBITED })
        query.term('bar', { presence: QueryPresence.PROHIBITED })

        return query
      }

      void test('is negated', function () {
        assert.equal(data().isNegated(), true)
      })
    })

    void suite('some prohibited', function () {
      const data = () => {
        const query = setup()
        query.term('foo', { presence: QueryPresence.PROHIBITED })
        query.term('bar', { presence: QueryPresence.REQUIRED })

        return query
      }

      void test('is negated', function () {
        assert.equal(data().isNegated(), false)
      })
    })

    void suite('none prohibited', function () {
      const data = () => {
        const query = setup()
        query.term('foo', { presence: QueryPresence.OPTIONAL })
        query.term('bar', { presence: QueryPresence.REQUIRED })

        return query
      }

      void test('is negated', function () {
        assert.equal(data().isNegated(), false)
      })
    })
  })
})
