import { isString } from './is-string'

/**!
 * Handle string "true" so it becomes boolean.
 * Useful for this case, because we're importing from Shell Environment variables and there are no boolean types.
 */
export const stringToBoolean = maybeString => {
  const trimmed = String(maybeString).trim()
  const isStringAndEitherTrueOrFalse =
    typeof trimmed === 'string' && /^(true|false)$/gi.test(trimmed)
  if (isStringAndEitherTrueOrFalse === false) {
    const message = `Unexpected input, we expected to receive a String containing only the word true or false`
    throw new Error(message)
  }

  // Should now be certain we have a string containing one word
  return trimmed.toLowerCase() === 'true'
}

/**!
 * Take an API response that can contain an empty string, make it null.
 *
 * @param {String} subject to convert to Null if empty
 */
export const stringMaybeEmptyToNull = subject => {
  const isNotString = typeof subject !== 'string'
  if (isNotString) {
    // Not a String, do nothing with it
    return subject
  }
  const trimmed = subject.trim()
  const isNotEmptyString = trimmed !== ''
  if (isNotEmptyString) {
    return trimmed
  }

  return null
}

/**!
 * Take an API response value that can be a String, with maybe a Number in it, make it a Number.
 *
 * @param {String} subject Converts a String into a Number, it might become a Float too.
 */
export const stringMaybeContainingNumberToNumber = subject => {
  const doesNotContainNumber = isString(subject) === false
  if (doesNotContainNumber) {
    return subject
  }
  const trimmed = subject.trim()

  /**
   * We could have used new `Number(trimmed)`.
   * Then we could use one of Number's prototype chain methods
   * - valueOf()
   * - toFixed()
   * - toSource()
   * - ...
   * But for now we are just copy-pasting code from multiple places together.
   * Besides, using `Number(trimmed)`, as a function call ensures we get a Number.
   * It might be a floating point, but at least it is not a String anymore.
   */

  return Number(trimmed)
}
