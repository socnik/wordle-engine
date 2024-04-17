export type ProcessorFunction = (value: string) => string

export type StringProcessor = {
  postprocessing: ProcessorFunction
  preprocessing: ProcessorFunction
}

export function defineStringProcessor(
  processor: StringProcessor
): StringProcessor {
  return processor
}

export const stubStringProcessor = defineStringProcessor({
  postprocessing: (value) => value,
  preprocessing: (value) => value,
})
