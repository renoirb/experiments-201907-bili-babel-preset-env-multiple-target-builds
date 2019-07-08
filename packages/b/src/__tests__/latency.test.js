import { latency } from '@bindings/helpers'

const grettingMessageMockingHandler = name => `Hi, ${name}`

describe('latency using Promises', () => {
  test('accessibility', () => {
    expect(latency).toBeDefined()
  })

  test('Typical use', () => {
    const subject = grettingMessageMockingHandler('Renoir')
    return latency(10)
      .then(() => {
        expect(subject).toBe('Hi, Renoir')
      })
      .catch(e => console.error(e))
  })
})

describe('latency using async/await', () => {
  test('Typical use', async () => {
    const subject = grettingMessageMockingHandler('Renoir')
    await latency(10)
    expect(subject).toBe('Hi, Renoir')
  })

  function* createHouses() {
    yield 'Gryffindor'
    yield 'Hufflepuff'
    yield 'Ravenclaw'
    yield 'Slytherin'
  }
  for (const name of createHouses()) {
    test(`Iterating for house of ${name}`, async () => {
      const subject = grettingMessageMockingHandler(name)
      await latency(10)
      expect(subject).toBe(`Hi, ${name}`)
    })
  }
})
