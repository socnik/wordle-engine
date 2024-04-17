import { engineStateToString, stringToEngineState } from '@/serialization'
import { defineStringProcessor } from '@/stringProcessor'
import { createEngine } from '@/engine'

describe('serialization/deserialization of engine state', () => {
  describe('stringify and restore ', () => {
    test('should correct restore board state', () => {
      const engine = createEngine({
        height: 2,
        width: 5,
        hiddenWord: 'aaaaa',
      })

      engine.pushWord('abcde')
      engine.enterWord()

      const state = engineStateToString(engine)
      const restoredEngine = stringToEngineState(state, {
        engineOptions: {
          height: 2,
          width: 5,
        },
      })

      expect(restoredEngine.getWord(0)).toBe('abcde')
      expect(restoredEngine.getDiffState(0)).toMatchObject([
        'right',
        'wrong',
        'wrong',
        'wrong',
        'wrong',
      ])
    })

    test('should correct restore hidden word', () => {
      const engine = createEngine({
        height: 2,
        width: 5,
        hiddenWord: 'qwert',
      })

      engine.pushWord('abcde')
      engine.enterWord()

      const state = engineStateToString(engine)
      const restoredEngine = stringToEngineState(state, {
        engineOptions: {
          height: 2,
          width: 5,
        },
      })

      expect(restoredEngine.hiddenWord).toBe('qwert')
    })

    test('should use specified hidden word when restore', () => {
      const engine = createEngine({
        height: 2,
        width: 5,
        hiddenWord: 'qwert',
      })

      engine.pushWord('abcde')
      engine.enterWord()

      const state = engineStateToString(engine)
      const restoredEngine = stringToEngineState(state, {
        engineOptions: {
          height: 2,
          width: 5,
          hiddenWord: 'azert',
        },
      })

      expect(restoredEngine.hiddenWord).toBe('azert')
    })
  })

  describe('postprocessing / preprocessing', () => {
    test('should correct apply postprocessing to serialized state', () => {
      const engine = createEngine({
        height: 2,
        width: 5,
        hiddenWord: 'aaaaa',
      })

      engine.pushWord('abcde')
      engine.enterWord()

      const state = engineStateToString(engine, {
        processor: {
          postprocessing: (_) => 'custom-string',
          preprocessing: (_) => '',
        },
      })

      expect(state).toBe('custom-string')
    })

    test('should correct apply preprocessing when parse state', () => {
      const engine = createEngine({
        height: 2,
        width: 5,
        hiddenWord: 'aaaaa',
      })

      engine.pushWord('abcde')
      engine.enterWord()

      const mockProcessor = defineStringProcessor({
        preprocessing: (state) => state.split(',').join(''),
        postprocessing: (state) => state.split('').join(','),
      })

      const state = engineStateToString(engine, {
        processor: mockProcessor,
      })
      const restoredEngine = stringToEngineState(state, {
        processor: mockProcessor,
        engineOptions: {
          height: 2,
          width: 5,
        },
      })

      expect(restoredEngine.getWord(0)).toBe('abcde')
      expect(restoredEngine.getDiffState(0)).toMatchObject([
        'right',
        'wrong',
        'wrong',
        'wrong',
        'wrong',
      ])
    })
  })
})
