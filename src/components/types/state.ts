import p5 from 'p5'

import {
  StateEnv
} from './'

interface SketchFunctions {
  sketchSetup: (sketch: p5, environment: StateEnv) => void
  sketchDraw: (sketch: p5, environment: StateEnv) => void
  sketchWindowResized: (sketch: p5, environment: StateEnv) => void
}

export interface CurrentPage {
  tab: string
  env: StateEnv
  sketch: SketchFunctions
}

export interface LoadedImageData {
  key: string
  object: HTMLImageElement
}

export type State = {
  currentPage: CurrentPage,
  loadedImages?: LoadedImageData[]
}