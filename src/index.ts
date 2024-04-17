import { createArrayAndFill } from '@/utils'

export type LetterGuessingState = 'none' | 'almost' | 'right' | 'wrong'

export function diffWords(
  word: string,
  hiddenWord: string
): LetterGuessingState[] {
  if (word.length !== hiddenWord.length) {
    throw new Error(
      `Words "${word}" and "${hiddenWord}" have different lengths.`
    )
  }

  const letterGuessingState: LetterGuessingState[] =
    createArrayAndFill<LetterGuessingState>(word.length).map((_) => 'none')

  //#region Find right letters

  for (let i = 0; i < word.length; i++) {
    letterGuessingState[i] = word[i] === hiddenWord[i] ? 'right' : 'none'
  }

  //#endregion

  //#region Find "almost" and "wrong" letters

  const usedAlmostLetters: number[] = []

  for (let i = 0; i < word.length; i++) {
    if (letterGuessingState[i] === 'right') continue

    const almostLetterIndex = new Array(...hiddenWord).findIndex(
      (letter, index) => {
        return (
          letter === word[i] &&
          !usedAlmostLetters.includes(index) &&
          letterGuessingState[i] !== 'right'
        )
      }
    )

    if (almostLetterIndex === -1) {
      letterGuessingState[i] = 'wrong'
      continue
    }

    usedAlmostLetters.push(almostLetterIndex)

    letterGuessingState[i] = 'almost'
  }

  //#endregion

  return letterGuessingState
}
