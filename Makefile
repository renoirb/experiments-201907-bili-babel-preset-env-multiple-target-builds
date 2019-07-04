BUILD_DIR = $(shell pwd)
DEBUG = *,-babel,-babel:config:loading:files

node_modules:
	yarn --prefer-offline --cache-folder .yarn.cache/
	cd __elsewhere__/packaging-and-testing && \
		yarn link && \
		npx sort-package-json && \
		cd ../../
	cd __elsewhere__/linting && \
		yarn link && \
		npx sort-package-json && \
		cd ../../
	test -d node_modules/@bindings/linting && \
		rm -rf node_modules/@bindings/linting && \
		ln -Fsn $(BUILD_DIR)/__elsewhere__/linting $(BUILD_DIR)/node_modules/@bindings/linting
	test -d node_modules/@bindings/packaging-and-testing && \
		rm -rf node_modules/@bindings/packaging-and-testing && \
		ln -Fsn $(BUILD_DIR)/__elsewhere__/packaging-and-testing $(BUILD_DIR)/node_modules/@bindings/packaging-and-testing
	yarn link @bindings/linting
	yarn link @bindings/packaging-and-testing

.PHONY: deps
deps: node_modules

.PHONY: clean
clean:
	-test -d node_modules/@bindings && \
		rm -rf node_modules/ && \
		rm -rf dist/

.PHONY: lint
lint: deps
	yarn run lint
	npx sort-package-json

.PHONY: test
test: deps
	yarn test

.PHONY: dist
dist: deps
	yarn build

.PHONY: build
build: dist

.PHONY: browserslist
	npx browserslist
