import type { LetterGuessingState } from '@/diffWords'
import { createArrayAndFill } from '@/utils'
import type { Position } from './position'

export type BoardTileState = {
  letter: string
  guessingState: LetterGuessingState
}

export type BoardState = BoardTileState[][]

export function defineBoard(width: number, height: number): BoardState {
  return createArrayAndFill(height).map((_) =>
    createArrayAndFill(width).map((_) => {
      return {
        letter: '',
        guessingState: 'none',
      }
    })
  )
}

export function getBoardTile(
  position: Position,
  board: BoardState
): BoardTileState {
  return board[position.y][position.x]
}
