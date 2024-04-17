# Wordle Engine

Implementation of Wordle game engine with JavaScript.

## Installation

```bash
pnpm add @socnik/wordle-engine # Pnpm
npm install @socnik/wordle-engine # Npm
```

## Docs

### Tile state

Core type of this library - `LetterGuessingState`. It represents color of tile in Wordle game.

- none - white
- almost - yellow
- right - green
- wrong - gray

#### Type definition:

```typescript
type LetterGuessingState = 'none' | 'almost' | 'right' | 'wrong'
```

### Board API

Allows create Wordle game board state.

#### `defineBoard`

Create new board with specified size. Board state - 2D matrix with tile state objects. Tile state have two properties:

- `letter` - tile letter
- `guessingState` - one value from `LetterGuessingState` type.

##### Tile state type definition:

```typescript
type BoardTileState = {
  letter: string
  guessingState: LetterGuessingState
}
```

### `diffWords`

Compare words with Wordle game rules and return array with result. Every array item has one of this values:
`'almost' | 'right' | 'wrong'`.

#### Example:

```typescript
diffWords('abcd', 'dbcf')
// Result: ['wrong', 'right', 'right', 'almost']
```

_More docs come soon..._
