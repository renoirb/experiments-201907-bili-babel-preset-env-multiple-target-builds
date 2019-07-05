# Create Multiple target build steps

**IMAGINARY** `@bindings/helpers` monorepo package.

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

If you don't have GNU Make available, try running the commands listed in [Makefile](./Makefile)
Notice this example relies on an UNIX(ish) filesystem with symbolic links, sorry.

### Dependencies

```terminal
# Notice the ln commands for symbolic links
make deps
```

Or

```terminal
# But you will have to delete node_modules/, and re-run every time you change somehing __elsewhere__
yarn
```

### Building and testing

```terminal
# Build with debug
make build

# Testing with debug
make test

# Cleanup, for rinse-repeat.
make clean
```

Or manually

- Find a way to set a `DEBUG` Node.js environment variable manually
- Cleanup, you'll have to delete `node_modules/` and `dist/` manually, rinse-repeat

```terminal
yarn build
yarn test
```
