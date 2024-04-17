import { diffWords } from '../index'

describe('diffWords function', () => {
  describe('diff two words', () => {
    test('correct output with two identical words', () => {
      expect(diffWords('aaa', 'aaa')).toMatchObject(['right', 'right', 'right'])
    })

    test('correct output with almost right word', () => {
      expect(diffWords('abc', 'acb')).toMatchObject([
        'right',
        'almost',
        'almost',
      ])
    })

    test('correct output with two almost right letters', () => {
      expect(diffWords('abab', 'baaa')).toMatchObject([
        'almost',
        'almost',
        'right',
        'wrong',
      ])
    })

    test('throw error when words have different lengths', () => {
      expect(() => diffWords('aaaaa', 'abc')).toThrow()
    })
  })
})
