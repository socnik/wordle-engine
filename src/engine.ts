import {
  defineBoard,
  getBoardTile,
  type BoardState,
  type BoardTileState,
} from '@/board'
import { position, type Position } from '@/position'
import { diffWords, type LetterGuessingState } from '@/diffWords'

export class WordleEngine {
  cursorPosition: Position

  constructor(
    public boardState: BoardState,
    public hiddenWord: string
  ) {
    this.cursorPosition = position(0, 0)
  }

  get boardWidth() {
    return this.boardState[0].length
  }

  get boardHeight() {
    return this.boardState.length
  }

  getBoardTile(position: Position): BoardTileState {
    return getBoardTile(position, this.boardState)
  }

  pushLetter(letter: string) {
    if (letter.length > 1) {
      throw new Error('Letter should have length equal 1')
    }

    if (this.cursorPosition.y === this.boardHeight) return
    if (this.cursorPosition.x === this.boardWidth) return

    this.getBoardTile(this.cursorPosition).letter = letter

    this.cursorPosition.x++
  }

  removeLetter() {
    if (this.cursorPosition.y === this.boardHeight) return
    if (this.cursorPosition.x === 0) return

    this.cursorPosition.x--

    this.getBoardTile(this.cursorPosition).letter = ''
  }

  pushWord(word: string) {
    if (this.cursorPosition.y === this.boardHeight) return

    if (word.length > this.boardWidth) {
      throw new Error('Word length greater than board width')
    }

    for (const [index, letter] of Object.entries(word)) {
      this.getBoardTile({
        x: Number(index),
        y: this.cursorPosition.y,
      }).letter = letter
    }

    this.cursorPosition.x = this.boardWidth
  }

  getWord(line?: number): string {
    const row = this.boardState[line ?? this.cursorPosition.y]

    return row.map((state) => state.letter).join('')
  }

  getDiffState(line: number): LetterGuessingState[] {
    if (line >= this.cursorPosition.y) {
      throw new Error(
        'Cannot get diff, if line index equal or greater than cursor y'
      )
    }

    const row = this.boardState[line]

    return row.map((state) => state.guessingState)
  }

  enterWord() {
    const word = this.getWord()

    if (this.cursorPosition.y === this.boardHeight) return

    if (word.length !== this.boardWidth) return

    const diffResult = this.diffWithHiddenWord(word)

    for (const [index, state] of Object.entries(
      this.boardState[this.cursorPosition.y]
    )) {
      state.guessingState = diffResult[Number(index)]
    }

    this.cursorPosition.y++
  }

  diffWithHiddenWord(word: string): LetterGuessingState[] {
    return diffWords(word, this.hiddenWord)
  }
}

export type EngineConfig = {
  width: number
  height: number
  hiddenWord: string
}

export function createEngine(config: EngineConfig): WordleEngine {
  return new WordleEngine(
    defineBoard(config.width, config.height),
    config.hiddenWord
  )
}
