import { defineIdentity } from '@/utils'

export type ProcessorFunction = (value: string) => string

export type StringProcessor = {
  postprocessing: ProcessorFunction
  preprocessing: ProcessorFunction
}

export const defineStringProcessor = defineIdentity<StringProcessor>()

export const stubStringProcessor = defineStringProcessor({
  postprocessing: (value) => value,
  preprocessing: (value) => value,
})
