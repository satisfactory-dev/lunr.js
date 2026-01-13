all: test lint docs
release: lunr.js docs

lunr.js:
	./node_modules/.bin/rolldown -c ./rolldown.config.mjs
	./node_modules/.bin/tsc --project ./tsconfig.app.json

size: lunr.js
	@echo 'lunr.js'
	@gzip -c lunr.js | wc -c
	@echo 'lunr.min.js'
	@gzip -c lunr.min.js | wc -c
	@echo 'lunr.min.mjs'
	@gzip -c lunr.min.mjs | wc -c

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

test: node_modules lunr.js test/env/file_list.json
	./node_modules/.bin/mocha test/*.js -u tdd -r test/test_helper.js -R dot -C

test/inspect: node_modules lunr.js
	./node_modules/.bin/mocha test/*.js -u tdd -r test/test_helper.js -R dot -C --inspect-brk=0.0.0.0:9292

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
