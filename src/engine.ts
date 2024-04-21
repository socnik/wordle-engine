import { defineBoard, getBoardTile, type BoardState } from '@/board'
import type { BoardTileState } from '@/boardTile'
import { position, type Position } from '@/position'
import { diffWords, type LetterGuessingState } from '@/diffWords'

export class WordleEngine {
  _cursorPosition: Position

  constructor(
    public boardState: BoardState,
    public hiddenWord: string
  ) {
    this._cursorPosition = position(0, 0)
  }

  get boardWidth() {
    return this.boardState[0].length
  }

  get boardHeight() {
    return this.boardState.length
  }

  get cursorPosition(): Position {
    return position(this._cursorPosition)
  }

  getBoardTile(position: Position): BoardTileState {
    return getBoardTile(position, this.boardState)
  }

  pushLetter(letter: string) {
    if (letter.length > 1) {
      throw new Error('Letter should have length equal 1')
    }

    if (this._cursorPosition.y === this.boardHeight) return
    if (this._cursorPosition.x === this.boardWidth) return

    this.getBoardTile(this._cursorPosition).letter = letter

    this._cursorPosition.x++
  }

  removeLetter() {
    if (this._cursorPosition.y === this.boardHeight) return
    if (this._cursorPosition.x === 0) return

    this._cursorPosition.x--

    this.getBoardTile(this._cursorPosition).letter = ''
  }

  pushWord(word: string) {
    if (this._cursorPosition.y === this.boardHeight) return

    if (word.length > this.boardWidth) {
      throw new Error('Word length greater than board width')
    }

    for (const [index, letter] of Object.entries(word)) {
      this.getBoardTile({
        x: Number(index),
        y: this._cursorPosition.y,
      }).letter = letter
    }

    this._cursorPosition.x = this.boardWidth
  }

  getWord(line?: number): string {
    const row = this.boardState[line ?? this._cursorPosition.y]

    return row.map((state) => state.letter).join('')
  }

  isWordEntered(line: number): boolean {
    return !(line >= this._cursorPosition.y)
  }

  getDiffState(line: number): LetterGuessingState[] {
    if (line >= this._cursorPosition.y) {
      throw new Error(
        'Cannot get diff, if line index equal or greater than cursor y'
      )
    }

    const row = this.boardState[line]

    return row.map((state) => state.guessingState)
  }

  enterWord() {
    const word = this.getWord()

    if (this._cursorPosition.y === this.boardHeight) return

    if (word.length !== this.boardWidth) return

    const diffResult = this.diffWithHiddenWord(word)

    for (const [index, state] of Object.entries(
      this.boardState[this._cursorPosition.y]
    )) {
      state.guessingState = diffResult[Number(index)]
    }

    this._cursorPosition.y++
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
