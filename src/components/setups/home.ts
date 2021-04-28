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
  setupFrame,
  engine,
  world,
  bgColor,
  width,
  height
} from './defaults'

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

export const homeEnv: PhysicalEnv = {
  engine,
  world,
  bgColor,
  width,
  height,
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
  Matter.Engine.update(environment.engine)
  renderGroup(environment.bodies)
}



export const sketchFns = {
  sketchSetup: homeSetup,
  sketchDraw: homeDraw,
  sketchWindowResized
}