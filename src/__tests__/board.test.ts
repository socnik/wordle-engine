import { defineBoard } from '@/board'

describe('defineBoard function', () => {
  describe('create new board', () => {
    test('board with correct width and height', () => {
      const board = defineBoard(6, 8)

      expect(board.length).toBe(8)

      board.forEach((row) => expect(row.length).toBe(6))
    })

    test('board with correct empty state', () => {
      const board = defineBoard(6, 8)

      board.forEach((row) =>
        row.forEach((element) =>
          expect(element).toMatchObject({
            letter: '',
            guessingState: 'none',
          })
        )
      )
    })
  })
})
