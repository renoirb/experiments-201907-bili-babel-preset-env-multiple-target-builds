BUILD_DIR = $(shell pwd)
DEBUG="*,-babel,-babel:config:loading:files"

node_modules:
	cd packages/bundling-config && \
		yarn link && \
		cd ../bundling-config-typescript && \
		yarn link && \
		cd ../../
	yarn link @frontend-bindings/bundling-config
	yarn link @frontend-bindings/bundling-config-typescript

.PHONY: bootstrap
bootstrap: node_modules
	yarn bootstrap

.PHONY: deps
deps: node_modules

.PHONY: clean
clean:
	-test -d node_modules && \
		yarn lerna clean && \
		rm -rf node_modules/

.PHONY: lint
lint: deps
	yarn run lint
	npx sort-package-json {packages/*/,}package.json

.PHONY: test
test: deps
	export DEBUG=$(DEBUG) && \
		yarn test

.PHONY: dist
dist: deps
	export DEBUG=$(DEBUG) && \
		yarn build

.PHONY: build
build: dist

.PHONY: browserslist
	npx browserslist
