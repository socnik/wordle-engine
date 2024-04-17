import { choice } from '@socnik/randifyjs'

export type Dict = Record<string, string[]>

export type DictConfig = {
  dict: Dict
}

class WordsDict {
  constructor(readonly config: DictConfig) {}

  checkWord(word: string): boolean {
    for (const list of Object.keys(this.config.dict)) {
      if (!this.config.dict[list].includes(word)) continue

      return true
    }

    return false
  }

  checkWordWithList(word: string, list: string): boolean {
    return this.config.dict[list]?.includes(word) ?? false
  }

  guessWord(): string {
    const selectedList = choice(Object.keys(this.config.dict)) as string

    return choice(this.config.dict[selectedList]) as string
  }

  guessWordFromList(listName: string): string {
    return choice(this.config.dict[listName]) as string
  }
}

export function createDict(config: DictConfig): WordsDict {
  return new WordsDict(config)
}
