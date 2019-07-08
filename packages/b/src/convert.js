import { isString } from './is-string'

/**!
 * Handle string representation of a boolean (e.g. "true") and make it a boolean.
 *
 * @preserve
 *
 * Useful for when we deal with APIs who aren't disciplined enough.
 *
 * Should return boolean true equivalent for any of the following:
 * - "true"
 * - "True"
 * - "TRUE"
 * - " true   "
 *
 * If word "false" in the same way as "true", boolean false will be returned.
 *
 * Throws an error if recieved ANYTHING ELSE.
 *
 * That can be used when we want to parse Shell Environment variables and there are no boolean types.
 *
 * @param {string} maybeString String with one or more words, if it contains word true or false
 *
 * @returns {boolean} ONLY when word true or false is passed as parameter
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

/**
 * Take an API response that can contain an empty string, make it null.
 *
 * @preserve
 *
 * @param {string} subject to convert to Null if empty
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

/**
 * Take an API response value that can be a String, with maybe a Number in it, make it a Number.
 *
 * @preserve
 *
 * @param {string} subject Converts a String into a Number, it might become a Float too.
 * @returns {string|number}
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
