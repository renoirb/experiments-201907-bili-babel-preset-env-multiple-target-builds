import { camelCase, isEqual, debounce } from 'lodash'

export { isEqual, debounce, camelCase }

/**
 * Just an example of composition.
 *
 * Notice this one does not have an AT preserve notation.
 *
 * ------ SHOULD NOT BE SEEN IN COMPILED RESULT COMMENT ------
 *
 * @param {string} input Text to make UPPER CASE
 */
export const camelCaseAndCapitalize = input =>
  camelCase(String(input).toLocaleLowerCase())
