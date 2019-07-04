export const timeout = (ms = 1000) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function latency(fn, ...args) {
  await timeout(3000)
  return fn(...args)
}
