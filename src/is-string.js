/**
 * Take an API response value that can be a String, with maybe a Number in it, make it a Number.
 *
 * @preserve
 *
 * @param {String} value Returns true ONLY when is a String, even when string contains number
 */
export const isString = value => {
  const isNotString = typeof value !== 'string'
  if (isNotString) {
    return false
  }
  const isNumber = Number.isNaN(Number(value))
  if (isNumber) {
    return false
  }

  return typeof value === 'string'
}
