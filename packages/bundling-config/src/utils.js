const log = (...args) => {
  if ('DEBUG' in process.env && process.env.DEBUG.length > 0) {
    console.log(...args)
  }
}

module.exports = {
  log,
}
