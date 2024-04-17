import { WordleEngine, createEngine } from '@/engine'
import { splitStringOnGroups } from '@/utils'
import { stubStringProcessor, type StringProcessor } from '@/stringProcessor'

type SerializationConfig = {
  processor: StringProcessor
  saveHiddenWord?: boolean
}

const defaultConfig: Required<SerializationConfig> = {
  processor: stubStringProcessor,
  saveHiddenWord: true,
}

export function engineStateToString(
  engine: WordleEngine,
  config?: SerializationConfig
) {
  const configWithDefaults: Required<SerializationConfig> = {
    ...defaultConfig,
    ...(config ?? {}),
  }

  const words: string[] = []

  for (let i = 0; i <= engine.cursorPosition.y; i++) {
    if (i === engine.boardHeight) break

    const word = engine.getWord(i)

    // Empty or not entered string
    if (word.length !== engine.boardWidth) break

    words.push(word)
  }

  if (configWithDefaults.saveHiddenWord) {
    words.push(engine.hiddenWord)
  }

  const result = words.join('')

  return configWithDefaults.processor.postprocessing(result)
}

type ParseOptions = {
  processor?: StringProcessor
  engineOptions: {
    width: number
    height: number
    hiddenWord?: string
  }
}

export function stringToEngineState(
  stringifiedState: string,
  options: ParseOptions
): WordleEngine {
  const preparedStringState =
    options.processor?.preprocessing?.(stringifiedState) ?? stringifiedState

  const boardWidth = options.engineOptions.width
  const words: string[] = splitStringOnGroups(preparedStringState, boardWidth)

  if (words.length === 0) {
    throw new Error('Invalid state.')
  }

  const hiddenWord = options.engineOptions.hiddenWord ?? (words.pop() as string)

  const engine = createEngine({
    width: boardWidth,
    height: options.engineOptions.height,
    hiddenWord,
  })

  words.forEach((word) => {
    engine.pushWord(word)
    engine.enterWord()
  })

  return engine
}
