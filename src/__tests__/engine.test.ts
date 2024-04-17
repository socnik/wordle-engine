import { createEngine } from '@/engine'

describe('createEngine function', () => {
  describe('create new engine', () => {
    test('should create correct board with right empty state', () => {
      const engine = createEngine({
        height: 2,
        width: 1,
        hiddenWord: 'a',
      })

      expect(engine.boardState).toMatchInlineSnapshot(`
        [
          [
            {
              "guessingState": "none",
              "letter": "",
            },
          ],
          [
            {
              "guessingState": "none",
              "letter": "",
            },
          ],
        ]
      `)
    })

    test('should have correct width and height', () => {
      const engine = createEngine({
        height: 2,
        width: 1,
        hiddenWord: 'a',
      })

      expect(engine.boardWidth).toBe(1)
      expect(engine.boardHeight).toBe(2)
    })

    test('cursor should point on 0, 0', () => {
      const engine = createEngine({
        height: 2,
        width: 1,
        hiddenWord: 'a',
      })

      expect(engine.cursorPosition).toMatchObject({
        x: 0,
        y: 0,
      })
    })
  })

  describe('push letters and words', () => {
    test('should correct update board state when push letters', () => {
      const engine = createEngine({
        height: 4,
        width: 3,
        hiddenWord: 'aaa',
      })

      engine.pushLetter('a')
      engine.pushLetter('b')
      engine.pushLetter('c')
      engine.pushLetter('d')

      expect(engine.boardState[0][0].letter).toBe('a')
      expect(engine.boardState[0][1].letter).toBe('b')
      expect(engine.boardState[0][2].letter).toBe('c')

      expect(engine.cursorPosition.x).toBe(3)
    })

    test('should correct update board state when push words', () => {
      const engine = createEngine({
        height: 4,
        width: 4,
        hiddenWord: 'aaaa',
      })

      engine.pushWord('abcd')

      expect(engine.boardState[0][0].letter).toBe('a')
      expect(engine.boardState[0][1].letter).toBe('b')
      expect(engine.boardState[0][2].letter).toBe('c')
      expect(engine.boardState[0][3].letter).toBe('d')

      expect(engine.cursorPosition.x).equal(4)
    })

    test('should throw error when letter length greater than 1', () => {
      const engine = createEngine({
        height: 4,
        width: 4,
        hiddenWord: 'aaaaa',
      })

      expect(() => engine.pushLetter('aa')).toThrowError()
    })

    test('should throw error when word length greater than board width', () => {
      const engine = createEngine({
        height: 4,
        width: 4,
        hiddenWord: 'abcd',
      })

      expect(() => engine.pushWord('abcde')).toThrowError()
    })
  })

  describe('remove letters', () => {
    test('should correct update board state when remove letters', () => {
      const engine = createEngine({
        height: 4,
        width: 3,
        hiddenWord: 'aaaaa',
      })

      engine.pushLetter('a')
      engine.pushLetter('b')
      engine.removeLetter()

      expect(engine.boardState[0][1].letter).toBe('')
      expect(engine.boardState[0][0].letter).toBe('a')
    })
  })

  describe('enter word', () => {
    test('should correct update board state when enter word', () => {
      const engine = createEngine({
        height: 4,
        width: 4,
        hiddenWord: 'abcd',
      })

      engine.pushWord('acbe')
      engine.enterWord()

      expect(engine.boardState[0][0]).toMatchObject({
        letter: 'a',
        guessingState: 'right',
      })

      expect(engine.boardState[0][1]).toMatchObject({
        letter: 'c',
        guessingState: 'almost',
      })

      expect(engine.boardState[0][2]).toMatchObject({
        letter: 'b',
        guessingState: 'almost',
      })

      expect(engine.boardState[0][3]).toMatchObject({
        letter: 'e',
        guessingState: 'wrong',
      })
    })

    test('should correct move cursor when enter word', () => {
      const engine = createEngine({
        height: 4,
        width: 6,
        hiddenWord: 'foobar',
      })

      engine.pushWord('qwerty')
      engine.enterWord()
      engine.pushWord('azerty')
      engine.enterWord()

      expect(engine.cursorPosition.y).toBe(2)
    })
  })
})
