import { createKeyboard } from '@/keyboard'

describe('createKeyboard function', () => {
  describe('create new keyboard', () => {
    test('keys have correct empty state', () => {
      const keys = ['a', 'b', 'c']

      const keyboard = createKeyboard(keys)

      keys.forEach((key) => {
        expect(keyboard.getKeyGuessingState(key)).toBe('none')
      })
    })

    test('all keys exists', () => {
      const keys = [...'qwerty']

      const keyboard = createKeyboard(keys)

      expect(keyboard.getKeys()).toMatchObject(keys)

      keys.forEach((key) => {
        expect(keyboard.isKeyExists(key)).toBe(true)
      })
    })
  })

  describe('change keyboard key state', () => {
    test('change key guessing state', () => {
      const keys = [...'abc']

      const keyboard = createKeyboard(keys)

      keyboard.setKeyGuessingState('a', 'almost')
      keyboard.setKeyGuessingState('b', 'right')
      keyboard.setKeyGuessingState('c', 'wrong')

      expect(keyboard.getKeyGuessingState('a')).toBe('almost')
      expect(keyboard.getKeyGuessingState('b')).toBe('right')
      expect(keyboard.getKeyGuessingState('c')).toBe('wrong')
    })
  })
})
