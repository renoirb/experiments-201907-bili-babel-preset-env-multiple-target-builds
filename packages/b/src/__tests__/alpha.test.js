import { createAlpha } from '@frontend-bindings/b'
import { Alpha } from '@frontend-bindings/a'

describe('alpha', () => {
  test('accessibility', () => {
    expect(createAlpha).toBeDefined()
  })

  test.skip('constructor', () => {
    // This is just an attempt at importing from more than one
    // module.
    expect(() => {
      new Alpha()
    }).toThrowError()
  })

  test('Snapshot', () => {
    const expectedName = 'Renoir Boulanger'
    const subject = createAlpha(expectedName)
    expect(subject).toMatchSnapshot()
    expect(subject).toHaveProperty('age', 0)
  })
})
