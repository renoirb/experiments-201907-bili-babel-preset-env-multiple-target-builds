const log = (...args) => {
  if ('DEBUG' in process.env && process.env.DEBUG.length > 0) {
    console.log(...args)
  }
}

/**
 * Create cached version of a pure function
 *
 * https://github.com/vuejs/vue/blob/2.6/dist/vue.runtime.esm.js#L150
 *
 * @param {Function} fn
 */
function cached(fn) {
  var cache = Object.create(null)
  return function cachedFn(str) {
    var hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

module.exports = {
  log,
  cached,
}
