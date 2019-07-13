# Create Multiple target build steps

**IMAGINARY** `@frontend-bindings/*` monorepo package. Using [egoist/bili](https://github.com/egoist/bili).

This is a "reproduction repo", related to [egoist/bili#219](https://github.com/egoist/bili/issues/219)

## Use-Case

A package that we want to be able to import in very different runtimes (a.k.a. [Output "target"](https://bili.egoist.sh/api/interfaces/configoutput.html#target)).
e.g. Web Browser, Node.js, etc.

But also;

- A package as part of a monorepo (here, we're just using symbolic links though)
- Written in "vanilla" ECMAScript 2017, (i.e. including async/await)
- Only import dependency for local package
- Delegate to another package for build dependencies and maintenance
- Other sibling packages could be written in different syntaxes (e.g. TypeScript, ...)

In the context of this example, this package would store be the source of a few bits of code we want to re-use in different runtime contexts.
For example, we could import this into modules destined to run different runtimes (e.g. ES3, "target") so we could re-use code in [**MongoDB**´s "server-side JavaScript"](https://docs.mongodb.com/manual/core/server-side-javascript/) filter functions, [NGINX’s `ngx_http_js_module`](https://nginx.org/en/docs/http/ngx_http_js_module.html), or another Node.js service, but also in Browser, etc.

## Usage

The following assumes an UNIX(ish) environment, at least with a filesystem that supports sybolic links, and a few typical commands: `ln`, `rm`, `test`.
If not, you'll have to see in the [Makefile](./Makefile) and do the equivalent manually.

### Dependencies

Since this example is NOT a monorepo, installing dependencies will emulate as if it was.

The following `make` command basically do;

- Install with `yarn`
- Create a "[yarn link](https://yarnpkg.com/lang/en/docs/cli/link/)" for each package
- Tell the top level to use _yarn links_ created above

```terminal
make deps
```

Or manually

```terminal
yarn bootstrap
```

### Add a package

Let's say we want to add '@babel/plugin-proposal-optional-chaining'

Since it's a packageable (i.e. re-usable for other monorepos), we add it as a dependency only in `@frontend-bindings/bundling-config` package.

```terminal
yarn lerna add @babel/plugin-proposal-optional-chaining packages/bundling-config
```

### Building and testing

The following `make` command basically do:

- `yarn test`
- `yarn build` (have a look at [package.json scripts for "build"](./package.json))

With `DEBUG` set to give more debugging output while running commands.

```terminal
make test
make build

# Cleanup, for rinse-repeat.
make clean
```

Or manually

- Find a way to set a `DEBUG` Node.js environment variable manually
- Cleanup, you'll have to delete `node_modules/` and `dist/` manually, rinse-repeat

```terminal
yarn test
yarn build
```

### Methods

#### Using BROWSERSLIST

```terminal
set -gx BROWSERSLIST "ie >= 10, > 1%"
node_modules/.bin/bili --stack-trace --verbose --format cjs --target browser --file-name index.browser.cjs.js
node_modules/.bin/bili --stack-trace --verbose --format system --target browser --file-name index.system.cjs.js

set -gx BROWSERSLIST "node 10"
node_modules/.bin/bili --stack-trace --verbose --format esm --target node --file-name index.mjs
node_modules/.bin/bili --stack-trace --verbose --format cjs --target node --file-name index.cjs.js
```
