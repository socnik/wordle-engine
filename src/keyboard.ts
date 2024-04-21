import type { LetterGuessingState } from '@/diffWords'

type InternalKeyboardState = Map<string, LetterGuessingState>

export class GameKeyboard {
  _keys: Set<string>
  _state: InternalKeyboardState

  constructor(keys: Set<string>) {
    this._keys = keys
    this._state = this._createStateFromKeys(keys)
  }

  getKeyGuessingState(key: string): LetterGuessingState {
    if (!this._keys.has(key)) {
      throw new Error(`Key "${key}" not exists`)
    }

    // @ts-expect-error If key exists in _keys set,
    // it exists in _state Map. Additional check don`t have sense.
    return this._state.get(key)
  }

  setKeyGuessingState(key: string, guessingState: LetterGuessingState) {
    if (!this._keys.has(key)) {
      throw new Error(`Key "${key}" not exists`)
    }

    this._state.set(key, guessingState)
  }

  isKeyExists(key: string): boolean {
    return this._keys.has(key.toLowerCase())
  }

  getKeys(): string[] {
    return Array.from(this._keys)
  }

  _createStateFromKeys(keys: Set<string>): InternalKeyboardState {
    const state: InternalKeyboardState = new Map()

    keys.forEach((key) => {
      state.set(key, 'none')
    })

    return state
  }
}

export function createKeyboard(keys: string[]): GameKeyboard {
  const keysInLowerCase = keys.map((key) => key.toLowerCase())
  return new GameKeyboard(new Set(keysInLowerCase))
}
