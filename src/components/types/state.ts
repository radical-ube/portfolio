import p5 from 'p5'

import {
  StateEnv
} from './'

interface SketchFunctions {
  sketchSetup: (sketch: p5, environment: StateEnv) => void
  sketchDraw: (sketch: p5, environment: StateEnv) => void
  sketchWindowResized: (sketch: p5, environment: StateEnv) => void
}

export type State = {
  currentPage: {
    tab: string,
    env: StateEnv,
    sketch: SketchFunctions
  }
}