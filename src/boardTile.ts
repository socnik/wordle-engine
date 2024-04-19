import type { LetterGuessingState } from '@/diffWords'

export type BoardTileState = {
  letter: string
  guessingState: LetterGuessingState
}

export function defineTile(): BoardTileState
export function defineTile(tile: BoardTileState): BoardTileState
export function defineTile(
  letter: string,
  guessingState: LetterGuessingState
): BoardTileState
export function defineTile(
  ...args: [] | [BoardTileState] | [string, LetterGuessingState]
): BoardTileState {
  if (args.length === 0) {
    return {
      letter: '',
      guessingState: 'none',
    }
  }

  if (args.length === 1) {
    return {
      letter: args[0].letter,
      guessingState: args[0].guessingState,
    }
  }

  return {
    letter: args[0],
    guessingState: args[1],
  }
}
