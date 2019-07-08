import { convert } from '@bindings/helpers'

describe('convert', () => {
  test('accessibility', () => {
    expect(convert).toBeDefined()
  })
})

describe('stringMaybeContainingNumberToNumber', () => {
  test('Typical use', () => {
    // Because we are never sure if an API will a Number embedded inside a String
    expect(convert.stringMaybeContainingNumberToNumber('1')).toBe(1)
  })
})

describe('stringMaybeEmptyToNull', () => {
  test('Typical use', () => {
    // Because we are never sure if an API will return an empty string or not.
    expect(convert.stringMaybeEmptyToNull('')).toBe(null)
    expect(convert.stringMaybeEmptyToNull(' ')).toBe(null)
    expect(convert.stringMaybeEmptyToNull('1')).toBe('1')
  })
})

describe('stringToBoolean', () => {
  test('Typical use', () => {
    // Because we are never sure if an API will return an empty string or not.
    expect(convert.stringToBoolean('true')).toBe(true)
    expect(convert.stringToBoolean('True')).toBe(true)
    expect(convert.stringToBoolean('false ')).toBe(false)
  })
})
