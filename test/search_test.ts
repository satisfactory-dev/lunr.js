import type {
  Index,
  IndexResult,
} from '../lunr.ts'

import lunr, { QueryParseError } from '../lunr.ts'

import assert from 'assert/strict'

import {
  suite,
  test,
} from './shim.ts'

void suite('search', function () {
  const documents = [
    {
      id: 'a',
      title: 'Mr. Green kills Colonel Mustard',
      body: 'Mr. Green killed Colonel Mustard in the study with the candlestick. Mr. Green is not a very nice fellow.',
      wordCount: 19,
    },
    {
      id: 'b',
      title: 'Plumb waters plant',
      body: 'Professor Plumb has a green plant in his study',
      wordCount: 9,
    },
    {
      id: 'c',
      title: 'Scarlett helps Professor',
      body: 'Miss Scarlett watered Professor Plumbs green plant while he was away from his office last week.',
      wordCount: 16,
    },
  ].map((e) => Object.freeze(e))

  void suite('with build-time field boosts', function () {
    const setup = () => {
      return lunr(function () {
        this.ref = 'id'
        this.field('title')
        this.field('body', { boost: 10 })

        documents.forEach((document) => {
          this.add(document)
        })
      })
    }

    void suite('no query boosts', function () {
      var assertions = function (idx: Index, handleResults: (idx: Index) => IndexResult[]) {
        const results = handleResults(idx)
        void test('document b ranks highest', function () {
          assert.equal('b', results[0].ref)
        })
      }

      void suite('#search', function () {
        assertions(setup(), (idx) => idx.search('professor'))
      })

      void suite('#query', function () {
        assertions(setup(), (idx) => idx.query(function (q) {
          q.term('professor')
        }))
      })
    })
  })

  void suite('with build-time document boost', function () {
    const setup = () => {
      return lunr(function () {
        this.ref = 'id'
        this.field('title')
        this.field('body')

        documents.forEach((document) => {
          var boost = document.id == 'c' ? 10 : 1
          this.add(document, { boost: boost })
        })
      })
    }

    void suite('no query boost', function () {
      var assertions = function (idx: Index, handleResults: (idx: Index) => IndexResult[]) {
        void test('document c ranks highest', function () {
          const results = handleResults(idx)

          assert.equal('c', results[0].ref)
        })
      }

      void suite('#search', function () {
        assertions(setup(), (idx) => idx.search('plumb'))
      })

      void suite('#query', function () {
        assertions(setup(), (idx) => idx.query(function (q) {
          q.term('plumb')
        }))
      })
    })

    void suite('with query boost', function () {
      var assertions = function (idx: Index, handleResults: (idx: Index) => IndexResult[]) {
        void test('document b ranks highest', function () {
          const results = handleResults(idx)
          assert.equal('b', results[0].ref)
        })
      }

      void suite('#search', function () {
        assertions(setup(), (idx) => idx.search('green study^10'))
      })

      void suite('#query', function () {
        assertions(setup(), (idx) => idx.query((q) => {
          q.term('green')
          q.term('study', { boost: 10 })
        }))
      })
    })
  })

  void suite('without build-time boosts', function () {
    const setup = () => {
      return lunr(function () {
        this.ref = 'id'
        this.field('title')
        this.field('body')

        documents.forEach((document) => {
          this.add(document)
        })
      })
    }

    void suite('single term search', function () {
      void suite('one match', function () {
        var assertions = function (idx: Index, handleResults: (idx: Index) => IndexResult[]) {
          void test('one result returned', function () {
            const results = handleResults(idx)
            assert.equal(results.length, 1)
          })

          void test('document c matches', function () {
            const results = handleResults(idx)
            assert.equal('c', results[0].ref)
          })

          void test('matching term', function () {
            const results = handleResults(idx)
            assert.deepEqual(['scarlett'], Object.keys(results[0].matchData.metadata))
          })
        }

        void suite('#search', function () {
          assertions(setup(), (idx) => idx.search('scarlett'))
        })

        void suite('#query', function () {
          assertions(setup(), (idx) => idx.query(function (q) {
            q.term('scarlett')
          }))
        })
      })

      void suite('no match', function () {
        void test('no matches', function () {
          const results = setup().search('foo')
          assert.equal(results.length, 0)
        })
      })

      void suite('multiple matches', function () {
        void test('has two matches', function () {
          assert.equal(setup().search('plant').length, 2)
        })

        void test('sorted by relevance', function () {
          const results = setup().search('plant')
          assert.equal('b', results[0].ref)
          assert.equal('c', results[1].ref)
        })
      })

      void suite('pipeline processing', function () {
        // eslint-disable-next-line @cspell/spellchecker
        // study would be stemmed to studi, tokens
        // are stemmed by default on index and must
        // also be stemmed on search to match
        void suite('enabled (default)', function () {
          const handleResults = (idx: Index) => {
            return idx.query(function (q) {
              q.clause({term: 'study', usePipeline: true})
            })
          }

          void test('has two matches', function () {
            assert.equal(handleResults(setup()).length, 2)
          })

          void test('sorted by relevance', function () {
            const results = handleResults(setup())
            assert.equal('b', results[0].ref)
            assert.equal('a', results[1].ref)
          })
        })

        void suite('disabled', function () {
          void test('no matches', function () {
            assert.equal(setup().query(function (q) {
              q.clause({term: 'study', usePipeline: false})
            }).length, 0)
          })
        })
      })
    })

    void suite('multiple terms', function () {
      void suite('all terms match', function () {
        const handleResults = (idx: Index) => {
          return idx.search('fellow candlestick')
        }

        void test('has one match', function () {
          assert.equal(handleResults(setup()).length, 1)
        })

        void test('correct document returned', function () {
          assert.equal('a', handleResults(setup())[0].ref)
        })

        void test('matched terms returned', function () {
          const results = handleResults(setup())
          assert.deepEqual(['fellow', 'candlestick'], Object.keys(results[0].matchData.metadata))
          assert.deepEqual(['body'], Object.keys(results[0].matchData.metadata['fellow']))
          assert.deepEqual(['body'], Object.keys(results[0].matchData.metadata['candlestick']))
        })
      })

      void suite('one term matches', function () {
        const handleResults = (idx: Index) => {
          return idx.search('week foo')
        }

        void test('has one match', function () {
          assert.equal(handleResults(setup()).length, 1)
        })

        void test('correct document returned', function () {
          assert.equal('c', handleResults(setup())[0].ref)
        })

        void test('only matching terms returned', function () {
          assert.deepEqual(['week'], Object.keys(handleResults(setup())[0].matchData.metadata))
        })
      })

      void suite('duplicate query terms', function () {
        // https://github.com/olivernn/lunr.js/issues/256
        // previously this would throw a duplicate index error
        // because the query vector already contained an entry
        // for the term 'fellow'
        void test('no errors', function () {
          var idx = setup()
          assert.doesNotThrow(function () {
            idx.search('fellow candlestick foo bar green plant fellow')
          })
        })
      })

      void suite('documents with all terms score higher', function () {
        const handleResults = (idx: Index) => {
          return idx.search('candlestick green')
        }

        void test('has three matches', function () {
          assert.equal(handleResults(setup()).length, 3)
        })

        void test('correct documents returned', function () {
          var matchingDocuments = handleResults(setup()).map(function (r) {
            return r.ref
          })
          assert.deepEqual(['a', 'b', 'c'], matchingDocuments)
        })

        void test('documents with all terms score highest', function () {
          assert.equal('a', handleResults(setup())[0].ref)
        })

        void test('matching terms are returned', function () {
          const results = handleResults(setup())
          assert.deepEqual(['candlestick', 'green'], Object.keys(results[0].matchData.metadata))
          assert.deepEqual(['green'], Object.keys(results[1].matchData.metadata))
          assert.deepEqual(['green'], Object.keys(results[2].matchData.metadata))
        })
      })

      void suite('no terms match', function () {
        const handleResults = (idx: Index) => {
          return idx.search('foo bar')
        }

        void test('no matches', function () {
          assert.equal(handleResults(setup()).length, 0)
        })
      })

      void suite('corpus terms are stemmed', function () {
        const handleResults = (idx: Index) => {
          return idx.search('water')
        }

        void test('matches two documents', function () {
          assert.equal(handleResults(setup()).length, 2)
        })

        void test('matches correct documents', function () {
          var matchingDocuments = handleResults(setup()).map(function (r) {
            return r.ref
          })
          assert.deepEqual(['b', 'c'], matchingDocuments)
        })
      })

      void suite('field scoped terms', function () {
        void suite('only matches on scoped field', function () {
          const handleResults = (idx: Index) => {
            return idx.search('title:plant')
          }

          void test('one result returned', function () {
            assert.equal(handleResults(setup()).length, 1)
          })

          void test('returns the correct document', function () {
            assert.equal('b', handleResults(setup())[0].ref)
          })

          void test('match data', function () {
            assert.deepEqual(['plant'], Object.keys(handleResults(setup())[0].matchData.metadata))
          })
        })

        void suite('no matching terms', function () {
          const handleResults = (idx: Index) => {
            return idx.search('title:candlestick')
          }

          void test('no results returned', function () {
            assert.equal(handleResults(setup()).length, 0)
          })
        })
      })

      void suite('wildcard matching', function () {
        void suite('trailing wildcard', function () {
          void suite('no matches', function () {
            const handleResults = (idx: Index) => {
              return idx.search('fo*')
            }

            void test('no results returned', function () {
              assert.equal(handleResults(setup()).length, 0)
            })
          })

          void suite('one match', function () {
            const handleResults = (idx: Index) => {
              return idx.search('candle*')
            }

            void test('one result returned', function () {
              assert.equal(handleResults(setup()).length, 1)
            })

            void test('correct document matched', function () {
              assert.equal('a', handleResults(setup())[0].ref)
            })

            void test('matching terms returned', function () {
              assert.deepEqual(['candlestick'], Object.keys(handleResults(setup())[0].matchData.metadata))
            })
          })

          void suite('multiple terms match', function () {
            const handleResults = (idx: Index) => {
              return idx.search('pl*')
            }

            void test('two results returned', function () {
              assert.equal(handleResults(setup()).length, 2)
            })

            void test('correct documents matched', function () {
              var matchingDocuments = handleResults(setup()).map(function (r) {
                return r.ref
              })
              assert.deepEqual(['b', 'c'], matchingDocuments)
            })

            void test('matching terms returned', function () {
              const results = handleResults(setup())
              assert.deepEqual(['plumb', 'plant'], Object.keys(results[0].matchData.metadata))
              assert.deepEqual(['plumb', 'plant'], Object.keys(results[1].matchData.metadata))
            })
          })
        })
      })
    })

    void suite('wildcard matching', function () {
      void suite('trailing wildcard', function () {
        void suite('no matches found', function () {
          const handleResults = (idx: Index) => {
            return idx.search('fo*')
          }

          void test('no results returned', function () {
            assert.equal(handleResults(setup()).length, 0)
          })
        })

        void suite('results found', function () {
          const handleResults = (idx: Index) => {
            return idx.search('pl*')
          }

          void test('two results returned', function () {
            assert.equal(handleResults(setup()).length, 2)
          })

          void test('matching documents returned', function () {
            const results = handleResults(setup())
            assert.equal('b', results[0].ref)
            assert.equal('c', results[1].ref)
          })

          void test('matching terms returned', function () {
            const results = handleResults(setup())
            const keys0 = Object.keys(results[0].matchData.metadata)
            const keys1 = Object.keys(results[1].matchData.metadata)

            for (const key of ['plant', 'plumb']) {
              assert.equal(keys0.includes(key), true)
              assert.equal(keys1.includes(key), true)
            }
          })
        })
      })

      void suite('leading wildcard', function () {
        void suite('no results found', function () {
          const handleResults = (idx: Index) => {
            return idx.search('*oo')
          }

          void test('no results found', function () {
            assert.equal(handleResults(setup()).length, 0)
          })
        })

        void suite('results found', function () {
          const handleResults = (idx: Index) => {
            return idx.search('*ant')
          }

          void test('two results found', function () {
            assert.equal(handleResults(setup()).length, 2)
          })

          void test('matching documents returned', function () {
            const results = handleResults(setup())
            assert.equal('b', results[0].ref)
            assert.equal('c', results[1].ref)
          })

          void test('matching terms returned', function () {
            const results = handleResults(setup())
            assert.deepEqual(['plant'], Object.keys(results[0].matchData.metadata))
            assert.deepEqual(['plant'], Object.keys(results[1].matchData.metadata))
          })
        })
      })

      void suite('contained wildcard', function () {
        void suite('no results found', function () {
          const handleResults = (idx: Index) => {
            return idx.search('f*o')
          }

          void test('no results found', function () {
            assert.equal(handleResults(setup()).length, 0)
          })
        })

        void suite('results found', function () {
          const handleResults = (idx: Index) => {
            return idx.search('pl*nt')
          }

          void test('two results found', function () {
            assert.equal(handleResults(setup()).length, 2)
          })

          void test('matching documents returned', function () {
            const results = handleResults(setup())
            assert.equal('b', results[0].ref)
            assert.equal('c', results[1].ref)
          })

          void test('matching terms returned', function () {
            const results = handleResults(setup())
            assert.deepEqual(['plant'], Object.keys(results[0].matchData.metadata))
            assert.deepEqual(['plant'], Object.keys(results[1].matchData.metadata))
          })
        })
      })
    })

    void suite('edit distance', function () {
      void suite('no results found', function () {
        const handleResults = (idx: Index) => {
          return idx.search('foo~1')
        }

        void test('no results returned', function () {
          assert.equal(handleResults(setup()).length, 0)
        })
      })

      void suite('results found', function () {
        const handleResults = (idx: Index) => {
          // eslint-disable-next-line @cspell/spellchecker
          return idx.search('plont~1')
        }

        void test('two results found', function () {
          assert.equal(handleResults(setup()).length, 2)
        })

        void test('matching documents returned', function () {
          const results = handleResults(setup())
          assert.equal('b', results[0].ref)
          assert.equal('c', results[1].ref)
        })

        void test('matching terms returned', function () {
          const results = handleResults(setup())
          assert.deepEqual(['plant'], Object.keys(results[0].matchData.metadata))
          assert.deepEqual(['plant'], Object.keys(results[1].matchData.metadata))
        })
      })
    })

    void suite('searching by field', function () {
      void suite('unknown field', function () {
        void test('throws lunr.QueryParseError', function () {
          const idx = setup()
          assert.throws(() => {
            idx.search('unknown-field:plant')
          }, QueryParseError)
        })
      })

      void suite('no results found', function () {
        const handleResults = (idx: Index) => {
          return idx.search('title:candlestick')
        }

        void test('no results found', function () {
          assert.equal(handleResults(setup()).length, 0)
        })
      })

      void suite('results found', function () {
        const handleResults = (idx: Index) => {
          return idx.search('title:plant')
        }

        void test('one results found', function () {
          assert.equal(handleResults(setup()).length, 1)
        })

        void test('matching documents returned', function () {
          assert.equal('b', handleResults(setup())[0].ref)
        })

        void test('matching terms returned', function () {
          assert.deepEqual(['plant'], Object.keys(handleResults(setup())[0].matchData.metadata))
        })
      })
    })

    void suite('term boosts', function () {
      void suite('no results found', function () {
        const handleResults = (idx: Index) => {
          return idx.search('foo^10')
        }

        void test('no results found', function () {
          assert.equal(handleResults(setup()).length, 0)
        })
      })

      void suite('results found', function () {
        const handleResults = (idx: Index) => {
          return idx.search('scarlett candlestick^5')
        }

        void test('two results found', function () {
          assert.equal(handleResults(setup()).length, 2)
        })

        void test('matching documents returned', function () {
          const results = handleResults(setup())
          assert.equal('a', results[0].ref)
          assert.equal('c', results[1].ref)
        })

        void test('matching terms returned', function () {
          const results = handleResults(setup())
          assert.deepEqual(['candlestick'], Object.keys(results[0].matchData.metadata))
          assert.deepEqual(['scarlett'], Object.keys(results[1].matchData.metadata))
        })
      })
    })

    void suite('typeahead style search', function () {
      void suite('no results found', function () {
        const handleResults = (idx: Index) => {
          return idx.query(function (q) {
            q.term("xyz", { boost: 100, usePipeline: true })
            q.term("xyz", { boost: 10, usePipeline: false, wildcard: lunr.QueryWildcard.TRAILING })
            q.term("xyz", { boost: 1, editDistance: 1 })
          })
        }

        void test('no results found', function () {
          assert.equal(handleResults(setup()).length, 0)
        })
      })

      void suite('results found', function () {
        const handleResults = (idx: Index) => {
          return idx.query(function (q) {
            q.term("pl", { boost: 100, usePipeline: true })
            q.term("pl", { boost: 10, usePipeline: false, wildcard: lunr.QueryWildcard.TRAILING })
            q.term("pl", { boost: 1, editDistance: 1 })
          })
        }

        void test('two results found', function () {
          assert.equal(handleResults(setup()).length, 2)
        })

        void test('matching documents returned', function () {
          const results = handleResults(setup())
          assert.equal('b', results[0].ref)
          assert.equal('c', results[1].ref)
        })

        void test('matching terms returned', function () {
          const results = handleResults(setup())
          assert.deepEqual(['plumb', 'plant'], Object.keys(results[0].matchData.metadata))
          assert.deepEqual(['plumb', 'plant'], Object.keys(results[1].matchData.metadata))
        })
      })
    })

    void suite('term presence', function () {
      void suite('prohibited', function () {
        void suite('match', function () {
          var assertions = function (idx: Index, handleResults: (idx: Index) => IndexResult[]) {
            void test('two results found', function () {
              assert.equal(handleResults(idx).length, 2)
            })

            void test('matching documents returned', function () {
              const results = handleResults(idx)
              assert.equal('b', results[0].ref)
              assert.equal('c', results[1].ref)
            })

            void test('matching terms returned', function () {
              const results = handleResults(idx)
              assert.deepEqual(['green'], Object.keys(results[0].matchData.metadata))
              assert.deepEqual(['green'], Object.keys(results[1].matchData.metadata))
            })
          }

          void suite('#query', function () {
            const handleResults = (idx: Index) => {
              return idx.query(function (q) {
                q.term('candlestick', { presence: lunr.QueryPresence.PROHIBITED })
                q.term('green', { presence: lunr.QueryPresence.OPTIONAL })
              })
            }

            assertions(setup(), handleResults)
          })

          void suite('#search', function () {
            const handleResults = (idx: Index) => {
              return idx.search('-candlestick green')
            }

            assertions(setup(), handleResults)
          })
        })

        void suite('no match', function () {
          var assertions = function (idx: Index, handleResults: (idx: Index) => IndexResult[]) {
            void test('no matches', function () {
              assert.equal(handleResults(idx).length, 0)
            })
          }

          void suite('#query', function () {
            const handleResults = (idx: Index) => {
              return idx.query(function (q) {
                q.term('green', { presence: lunr.QueryPresence.PROHIBITED })
              })
            }

            assertions(setup(), handleResults)
          })

          void suite('#search', function () {
            const handleResults = (idx: Index) => {
              return idx.search('-green')
            }

            assertions(setup(), handleResults)
          })
        })

        void suite('negated query no match', function () {
          var assertions = function (idx: Index, handleResults: (idx: Index) => IndexResult[]) {
            void test('all documents returned', function () {
              assert.equal(handleResults(idx).length, 3)
            })

            void test('all results have same score', function () {
              assert.equal(handleResults(idx).every(function (r) { return r.score === 0 }), true)
            })
          }

          void suite('#query', function () {
            const handleResults = (idx: Index) => {
              return idx.query(function (q) {
                // eslint-disable-next-line @cspell/spellchecker
                q.term('qwertyuiop', { presence: lunr.QueryPresence.PROHIBITED })
              })
            }

            assertions(setup(), handleResults)
          })

          void suite('#search', function () {
            const handleResults = (idx: Index) => {
              // eslint-disable-next-line @cspell/spellchecker
              return idx.search("-qwertyuiop")
            }

            assertions(setup(), handleResults)
          })
        })

        void suite('negated query some match', function () {
          var assertions = function (idx: Index, handleResults: (idx: Index) => IndexResult[]) {
            void test('all documents returned', function () {
              assert.equal(handleResults(idx).length, 1)
            })

            void test('all results have same score', function () {
              assert.equal(handleResults(idx).every(function (r) { return r.score === 0 }), true)
            })

            void test('matching documents returned', function () {
              assert.equal('a', handleResults(idx)[0].ref)
            })
          }

          void suite('#query', function () {
            const handleResults = (idx: Index) => {
              return idx.query(function (q) {
                q.term('plant', { presence: lunr.QueryPresence.PROHIBITED })
              })
            }

            assertions(setup(), handleResults)
          })

          void suite('#search', function () {
            const handleResults = (idx: Index) => {
              return idx.search("-plant")
            }

            assertions(setup(), handleResults)
          })
        })

        void suite('field match', function () {
          var assertions = function (idx: Index, handleResults: (idx: Index) => IndexResult[]) {
            void test('one result found', function () {
              assert.equal(handleResults(idx).length, 1)
            })

            void test('matching documents returned', function () {
              assert.equal('c', handleResults(idx)[0].ref)
            })

            void test('matching terms returned', function () {
              assert.deepEqual(['plumb'], Object.keys(handleResults(idx)[0].matchData.metadata))
            })
          }

          void suite('#query', function () {
            const handleResults = (idx: Index) => {
              return idx.query(function (q) {
                q.term('plant', { presence: lunr.QueryPresence.PROHIBITED, fields: ['title'] })
                q.term('plumb', { presence: lunr.QueryPresence.OPTIONAL })
              })
            }

            assertions(setup(), handleResults)
          })

          void suite('#search', function () {
            const handleResults = (idx: Index) => {
              return idx.search('-title:plant plumb')
            }

            assertions(setup(), handleResults)
          })
        })
      })

      void suite('required', function () {
        void suite('match', function () {
          var assertions = function (idx: Index, handleResults: (idx: Index) => IndexResult[]) {
            void test('one result found', function () {
              assert.equal(handleResults(idx).length, 1)
            })

            void test('matching documents returned', function () {
              assert.equal('a', handleResults(idx)[0].ref)
            })

            void test('matching terms returned', function () {
              assert.deepEqual(['candlestick', 'green'], Object.keys(handleResults(idx)[0].matchData.metadata))
            })
          }

          void suite('#search', function () {
            const handleResults = (idx: Index) => {
              return idx.search("+candlestick green")
            }

            assertions(setup(), handleResults)
          })

          void suite('#query', function () {
            const handleResults = (idx: Index) => {
              return idx.query(function (q) {
                q.term('candlestick', { presence: lunr.QueryPresence.REQUIRED })
                q.term('green', { presence: lunr.QueryPresence.OPTIONAL })
              })
            }

            assertions(setup(), handleResults)
          })
        })

        void suite('no match', function () {
          var assertions = function (idx: Index, handleResults: (idx: Index) => IndexResult[]) {
            void test('no matches', function () {
              assert.equal(handleResults(idx).length, 0)
            })
          }

          void suite('#query', function () {
            const handleResults = (idx: Index) => {
              return idx.query(function (q) {
                q.term('mustard', { presence: lunr.QueryPresence.REQUIRED })
                q.term('plant', { presence: lunr.QueryPresence.REQUIRED })
              })
            }

            assertions(setup(), handleResults)
          })

          void suite('#search', function () {
            const handleResults = (idx: Index) => {
              return idx.search('+mustard +plant')
            }

            assertions(setup(), handleResults)
          })
        })

        void suite('no matching term', function () {
          var assertions = function (idx: Index, handleResults: (idx: Index) => IndexResult[]) {
            void test('no matches', function () {
              assert.equal(handleResults(idx).length, 0)
            })
          }

          void suite('#query', function () {
            const handleResults = (idx: Index) => {
              return idx.query(function (q) {
                // eslint-disable-next-line @cspell/spellchecker
                q.term('qwertyuiop', { presence: lunr.QueryPresence.REQUIRED })
                q.term('green', { presence: lunr.QueryPresence.OPTIONAL })
              })
            }

            assertions(setup(), handleResults)
          })

          void suite('#search', function () {
            const handleResults = (idx: Index) => {
              // eslint-disable-next-line @cspell/spellchecker
              return idx.search('+qwertyuiop green')
            }

            assertions(setup(), handleResults)
          })
        })

        void suite('field match', function () {
          var assertions = function (idx: Index, handleResults: (idx: Index) => IndexResult[]) {
            void test('one result found', function () {
              assert.equal(handleResults(idx).length, 1)
            })

            void test('matching documents returned', function () {
              assert.equal('b', handleResults(idx)[0].ref)
            })

            void test('matching terms returned', function () {
              assert.deepEqual(['plant', 'green'], Object.keys(handleResults(idx)[0].matchData.metadata))
            })
          }

          void suite('#query', function () {
            const handleResults = (idx: Index) => {
              return idx.query(function (q) {
                q.term('plant', { presence: lunr.QueryPresence.REQUIRED, fields: ['title'] })
                q.term('green', { presence: lunr.QueryPresence.OPTIONAL })
              })
            }

            assertions(setup(), handleResults)
          })

          void suite('#search', function () {
            const handleResults = (idx: Index) => {
              return idx.search('+title:plant green')
            }

            assertions(setup(), handleResults)
          })
        })

        void suite('field and non field match', function () {
          var assertions = function (idx: Index, handleResults: (idx: Index) => IndexResult[]) {
            void test('one result found', function () {
              assert.equal(handleResults(idx).length, 1)
            })

            void test('matching documents returned', function () {
              assert.equal('b', handleResults(idx)[0].ref)
            })

            void test('matching terms returned', function () {
              assert.deepEqual(['plant', 'green'], Object.keys(handleResults(idx)[0].matchData.metadata))
            })
          }

          void suite('#search', function () {
            const handleResults = (idx: Index) => {
              return idx.search('+title:plant +green')
            }

            assertions(setup(), handleResults)
          })

          void suite('#query', function () {
            const handleResults = (idx: Index) => {
              return idx.query(function (q) {
                q.term('plant', { fields: ['title'], presence: lunr.QueryPresence.REQUIRED })
                q.term('green', { presence: lunr.QueryPresence.REQUIRED })
              })
            }

            assertions(setup(), handleResults)
          })
        })

        void suite('different fields', function () {
          var assertions = function (idx: Index, handleResults: (idx: Index) => IndexResult[]) {
            void test('one result found', function () {
              assert.equal(handleResults(idx).length, 1)
            })

            void test('matching documents returned', function () {
              assert.equal('b', handleResults(idx)[0].ref)
            })

            void test('matching terms returned', function () {
              const keys = Object.keys(handleResults(idx)[0].matchData.metadata)
              // eslint-disable-next-line @cspell/spellchecker
              for (const key of ['studi', 'plant']) {
                assert.equal(keys.includes(key), true)
              }
            })
          }

          void suite('#search', function () {
            const handleResults = (idx: Index) => {
              return idx.search('+title:plant +body:study')
            }

            assertions(setup(), handleResults)
          })

          void suite('#query', function () {
            const handleResults = (idx: Index) => {
              return idx.query(function (q) {
                q.term('plant', { fields: ['title'], presence: lunr.QueryPresence.REQUIRED })
                q.term('study', { fields: ['body'], presence: lunr.QueryPresence.REQUIRED })
              })
            }

            assertions(setup(), handleResults)
          })
        })

        void suite('different fields one without match', function () {
          var assertions = function (idx: Index, handleResults: (idx: Index) => IndexResult[]) {
            void test('no matches', function () {
              assert.equal(handleResults(idx).length, 0)
            })
          }

          void suite('#search', function () {
            const handleResults = (idx: Index) => {
              // eslint-disable-next-line @cspell/spellchecker
              return idx.search('+title:plant +body:qwertyuiop')
            }

            assertions(setup(), handleResults)
          })

          void suite('#query', function () {
            const handleResults = (idx: Index) => {
              return idx.query(function (q) {
                q.term('plant', { fields: ['title'], presence: lunr.QueryPresence.REQUIRED })
                // eslint-disable-next-line @cspell/spellchecker
                q.term('qwertyuiop', { fields: ['body'], presence: lunr.QueryPresence.REQUIRED })
              })
            }

            assertions(setup(), handleResults)
          })
        })
      })

      void suite('combined', function () {
        var assertions = function (idx: Index, handleResults: (idx: Index) => IndexResult[]) {
          void test('one result found', function () {
            const results = handleResults(idx)
            assert.equal(results.length, 1)
          })

          void test('matching documents returned', function () {
            const results = handleResults(idx)
            assert.equal('b', results[0].ref)
          })

          void test('matching terms returned', function () {
            const results = handleResults(idx)
            assert.deepEqual(['plant', 'green'], Object.keys(results[0].matchData.metadata))
          })
        }

        void suite('#query', function () {
          const handleResults = (idx: Index) => {
            return idx.query(function (q) {
              q.term('plant', { presence: lunr.QueryPresence.REQUIRED })
              q.term('green', { presence: lunr.QueryPresence.OPTIONAL })
              q.term('office', { presence: lunr.QueryPresence.PROHIBITED })
            })
          }

          assertions(setup(), handleResults)
        })

        void suite('#search', function () {
          const handleResults = (idx: Index) => {
            return idx.search('+plant green -office')
          }

          assertions(setup(), handleResults)
        })

      })
    })
  })

  void suite('https://github.com/olivernn/lunr.js/issues/527', function () {
    const documents = [
      {
        "id": 3681,
        "name": "TROLLER",
        // eslint-disable-next-line @cspell/spellchecker
        "url": "/tecdoc/engine/list/3681",
      },
      {
        "id": 705,
        "name": "ROLLS-ROYCE",
        // eslint-disable-next-line @cspell/spellchecker
        "url": "/tecdoc/engine/list/705",
      },
    ].map((e) => Object.freeze(e))

    void test('default behaviour', function () {
      const idx = lunr(function () {
        this.ref = 'id'
        this.field('name')
        this.field('url')

        documents.forEach((document) => {
          this.add(document)
        })
      })

      const a = idx.search('*roll*')
      const b = idx.search('*rolls*')

      assert.equal(2, a.length)
      assert.equal(0, b.length)
    })

    void test('overridden separator behaviour', function () {
      const idx = lunr(function () {
        this.ref = 'id'
        this.field('name')
        this.field('url')
        this.tokenizerSeparator = /[\s]+/

        documents.forEach((document) => {
          this.add(document)
        })
      })

      const a = idx.search('*roll*')
      const b = idx.search('*rolls*')

      assert.equal(2, a.length)
      assert.equal(1, b.length)
    })
  })
})
