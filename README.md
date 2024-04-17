# Wordle Engine

Implementation of Wordle game engine with JavaScript.

## Docs

### Tiles state

Core type of this library - `LetterGuessingState`. It represents color of tile in Wordle game.

- none - white
- almost - yellow
- right - green
- wrong - gray

#### Type definition:

```typescript
type LetterGuessingState = 'none' | 'almost' | 'right' | 'wrong'
```

### `diffWords`

Compare words with Wordle game rules and return array with result every array item has one of this values:
`'almost' | 'right' | 'wrong'`.

#### Example:

```typescript
diffWords('abcd', 'dbcf')
// Result: ['wrong', 'right', 'right', 'almost']
```

_More docs come soon..._
