all: test lint docs
release: lunr.js docs

lunr.js:
	node ./dump-version.mts
	./node_modules/.bin/rolldown -c ./rolldown.config.mjs
	./node_modules/.bin/tsc --project ./tsconfig.app.json

size: lunr.js
	@echo 'lunr.js'
	@gzip -c lunr.js | wc -c
	@echo 'lunr.min.js'
	@gzip -c lunr.min.js | wc -c
	@echo 'lunr.min.mjs'
	@gzip -c lunr.min.mjs | wc -c
	@echo 'lunr.cjs'
	@gzip -c lunr.cjs | wc -c

lint: lint--tsc lint--eslint--ts lint--eslint--js

lint--tsc:
	@echo 'running syntax check'
	./node_modules/.bin/tsc --project ./tsconfig.app-check.json

lint--eslint--ts:
	@echo 'running eslint on typescript'
	./node_modules/.bin/eslint --cache --cache-location './.cache/eslint/typescript.eslintcache' -c ./eslint-typescript.config.mjs './*.mts' './lib/*.mts' --ignore-pattern './**/*.d.mts'

lint--eslint--js:
	@echo 'running eslint on javascript'
	./node_modules/.bin/eslint --cache --cache-location './.cache/eslint/javascript.eslintcache' './test/*.js' './*.mjs' --ignore-pattern './lunr.mjs'

perf/*_perf.js: lunr.js
	node -r ./perf/perf_helper.js $@

benchmark: perf/*_perf.js

test: node_modules lunr.js test--sync-files
	./node_modules/.bin/mocha test/*.js -u tdd -r test/test_helper.js -R dot -C

test--sync-files: test/env/file_list.json
	@echo 'copying libs to env'
	@mkdir -p ./test/env/mocha/
	@mkdir -p ./test/env/chai/
	@mkdir -p ./test/env/lunr/
	@rsync ./node_modules/mocha/mocha.js ./test/env/mocha/
	@rsync ./node_modules/mocha/mocha.css ./test/env/mocha/
	@rsync ./node_modules/chai/chai.js ./test/env/chai/
	@rsync ./node_modules/lunr/lunr.js ./test/env/lunr/

test/env/file_list.json: $(wildcard test/*test.js)
	node -p 'JSON.stringify({test_files: process.argv.slice(1)}).replace(/test\//g, "")' $^ > $@

docs:
	./node_modules/.bin/typedoc --readme README.md --options build/typedoc.conf.json --plugin typedoc-plugin-markdown
	@touch ./.cache/docs/html/.gitkeep
	find docs -name '*.md' -exec sed -i -e 's/README.md/..\/README.md/g' {} \;
	rm ./docs/README.md ./docs/_media/CONTRIBUTING.md

coverage:
	./node_modules/.bin/c8 make test

clean:
	rm -f lunr{.min,}.js
	git clean -fxd docs

reset:
	git checkout lunr.* *.json

.PHONY: test clean docs reset perf/*_perf.js test/inspect lunr.js test/index.html coverage test/env/file_list.json
