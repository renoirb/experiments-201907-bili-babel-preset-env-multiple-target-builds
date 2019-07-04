# Create Multiple target build steps

**IMAGINARY** `@bindings/helpers` monorepo package.

This is a "reproduction repo", related to [egoist/bili#219](https://github.com/egoist/bili/issues/219)

## Use-Case

A package that we want to be able to import in very different runtimes.
e.g. Web Browser, Node.js, etc.

But also;

- A package as part of a monorepo (here, we're just using symbolic links though)
- Written in "vanilla" ECMASCript (circa 2015, a.k.a. ES6, because that's enough)
- Only import dependency for local package
- Delegate to another package for build dependencies and maintenance
- Other sibling packages could be written in different syntaxes (e.g. TypeScript, ...)

In the context of this example, this package would store be the source of a few bits of code we want to re-use in different runtime contexts.
For example, we could import this into modules destined to run in MongoDB filter functions, ElasticSearch, Node.js runtimes, but also in Browser, etc.

## Usage

If you don't have GNU Make available, try running the commands listed in [Makefile](./Makefile)
Notice this example relies on an UNIX(ish) filesystem with symbolic links, sorry.

### Dependencies

```terminal
# Notice the ln commands for symbolic links
make deps
```

### Building and testing

```terminal
# Build with debug
make build

# Cleanup, for rinse-repeat.
make clean
```
