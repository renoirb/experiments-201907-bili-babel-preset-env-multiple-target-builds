yarn.lock:
	yarn

node_modules: yarn.lock

.PHONY: lint
lint: node_modules
	node_modules/.bin/prettier '**/*.{js,md}' --write
	npx sort-package-json

.PHONY: test
test: node_modules
	yarn test
