# Create Multiple target build steps

**IMAGINARY** `@bindings/helpers` monorepo package.

This is a "reproduction repo", related to [egoist/bili#219](https://github.com/egoist/bili/issues/219)

Use-Case that is meant to illustrate:

- One package as part of a Monorepo (e.g. yarn workspaces, lerna, etc.)
- The present package is in vanilla ECMAScript, but other sibling packages aren't necessarily
- That package would be imported from both a browser and node runtimes

In the context of this example, this package would store be the source of a few bits of code we want to re-use in different runtime contexts. For example, we could import this into modules destined to run in MongoDB filter functions, ElasticSearch, Node.js runtimes, but also in Browser, etc.
