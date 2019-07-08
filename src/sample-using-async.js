/**
 * Helper to leverage async/await with native setTimeout
 *
 * @param {number} [1000] ms Time before resuming
 */
export const latency = async (ms = 1000) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
