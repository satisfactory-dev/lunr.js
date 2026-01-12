VERSION = $(shell cat VERSION)

NODE ?= $(shell which node)
NPM ?= $(shell which npm)
UGLIFYJS ?= ./node_modules/.bin/uglifyjs
MOCHA ?= ./node_modules/.bin/mocha
MUSTACHE ?= ./node_modules/.bin/mustache
ESLINT ?= ./node_modules/.bin/eslint
JSDOC ?= ./node_modules/.bin/jsdoc
NODE_STATIC ?= ./node_modules/.bin/static

all: test lint docs
release: lunr.js docs

lunr.js:
	./node_modules/.bin/rolldown -c ./rolldown.config.mjs

size: lunr.js
	@echo 'lunr.js'
	@gzip -c lunr.js | wc -c
	@echo 'lunr.min.js'
	@gzip -c lunr.min.js | wc -c
	@echo 'lunr.min.mjs'
	@gzip -c lunr.min.mjs | wc -c

lint:
	${ESLINT} './lib/*.mjs'

perf/*_perf.js: lunr.js
	${NODE} -r ./perf/perf_helper.js $@

benchmark: perf/*_perf.js

test: node_modules lunr.js
	${MOCHA} test/*.js -u tdd -r test/test_helper.js -R dot -C

test/inspect: node_modules lunr.js
	${MOCHA} test/*.js -u tdd -r test/test_helper.js -R dot -C --inspect-brk=0.0.0.0:9292

test/env/file_list.json: $(wildcard test/*test.js)
	${NODE} -p 'JSON.stringify({test_files: process.argv.slice(1)})' $^ > $@

test/index.html: test/env/file_list.json test/env/index.mustache
	${MUSTACHE} $^ > $@

docs:
	${JSDOC} lib -r -R README.md -d docs -c build/jsdoc.conf.json

coverage:
	./node_modules/.bin/c8 make test

clean:
	rm -f lunr{.min,}.js
	git clean -fxd docs

reset:
	git checkout lunr.* *.json

.PHONY: test clean docs reset perf/*_perf.js test/inspect lunr.js test/index.html coverage
