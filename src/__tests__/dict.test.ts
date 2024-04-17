import { createDict } from '@/dict'

describe('createDict function', () => {
  describe('check word', () => {
    test('correct check word with all lists', () => {
      const dict = createDict({
        dict: {
          foo: ['qwerty', 'azerty'],
          bar: ['baz'],
        },
      })

      expect(dict.checkWord('abc')).toBe(false)
      expect(dict.checkWord('baz')).toBe(true)
    })

    test('correct check word with specified lists', () => {
      const dict = createDict({
        dict: {
          foo: ['qwerty', 'azerty'],
          bar: ['baz'],
        },
      })

      expect(dict.checkWordWithList('baz', 'foo')).toBe(false)
      expect(dict.checkWordWithList('baz', 'bar')).toBe(true)
    })
  })

  describe('correct guess word', () => {
    test('correct guess word', () => {
      const dict = createDict({
        dict: {
          foo: ['qwerty', 'azerty'],
          bar: ['baz', 'abc'],
        },
      })

      expect(['qwerty', 'azerty', 'baz', 'abc']).includes(dict.guessWord())
    })

    test('correct guess word from specified list', () => {
      const dict = createDict({
        dict: {
          foo: ['qwerty', 'azerty'],
          bar: ['baz', 'abc'],
        },
      })

      expect(['baz', 'abc']).includes(dict.guessWordFromList('bar'))
    })
  })
})
