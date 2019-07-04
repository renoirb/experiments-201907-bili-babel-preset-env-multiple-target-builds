import { latency } from '@bindings/helpers'

const grettingMessageMockingHandler = name => `Hi, ${name}`

describe('latency', async () => {
  test('accessibility', () => {
    expect(latency).toBeDefined()
  })

  test('Typical use', async () => {
    const subject = await latency(grettingMessageMockingHandler('Renoir'))
    expect(subject).toBe('Hi, Renoir')
  })
})
