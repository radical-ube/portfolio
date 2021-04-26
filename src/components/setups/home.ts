import p5 from 'p5'
import Matter from 'matter-js'

import {
  PhysicalEnv
} from '../types'

import {
  createWordColumn,
  createMouseConstraint,
  renderGroup
} from '../utilities'

import {
  sketchWindowResized,
  setupFrame
} from './general'

const setupHome = (sketch: p5, environment: PhysicalEnv) => {
  let homeText1 = 'hello world, my name is ube'
  createWordColumn(homeText1, sketch, environment, {
    xMod: 0.35,
    offsetMod: 0.41
  })

  let homeText2 = 'i am a work in progress'
  createWordColumn(homeText2, sketch, environment, {
    xMod: 0.65
  })
}

const engine = Matter.Engine.create()
const world = engine.world

export const homeEnv: PhysicalEnv = {
  engine,
  world,
  bgColor: '#282c34',
  width: window.innerWidth,
  height: window.innerHeight * 0.85,
  bodies: [],
  boundaries: [],
}

const homeSetup = (sketch: p5, environment: PhysicalEnv) => {
  const { width, height, engine, world } = environment
  world.gravity.y = 1
  const canvas = sketch.createCanvas(width, height)
  createMouseConstraint(canvas.elt, engine, world, sketch)
  setupFrame(environment)
  setupHome(sketch, environment)
}

const homeDraw = (sketch: p5, environment: PhysicalEnv) => {
  sketch.background(environment.bgColor)
  Matter.Engine.update(engine)
  renderGroup(environment.bodies)
}



export const sketchFns = {
  sketchSetup: homeSetup,
  sketchDraw: homeDraw,
  sketchWindowResized
}