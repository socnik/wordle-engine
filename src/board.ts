import { defineTile, type BoardTileState } from '@/boardTile'
import type { Position } from '@/position'
import { createArrayAndFill } from '@/utils'

export type BoardState = BoardTileState[][]

export function defineBoard(width: number, height: number): BoardState {
  return createArrayAndFill(height).map((_) =>
    createArrayAndFill(width).map((_) => {
      return defineTile()
    })
  )
}

export function getBoardTile(
  position: Position,
  board: BoardState
): BoardTileState {
  return board[position.y][position.x]
}
