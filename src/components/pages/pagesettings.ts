import p5 from 'p5'
import Matter from 'matter-js'

import {
  createMouseConstraint,
  setupFrame,
  setupHome,
  renderGroup,
  resetPageFrame
} from '../utilities'

import {
  Environment
} from '../types'

const engine = Matter.Engine.create()
const world = engine.world

export const environment: Environment = {
  engine,
  world,
  bgColor: '#282c34',
  width: window.innerWidth,
  height: window.innerHeight * 0.85,
  bodies: [],
  boundaries: [],
  buttons: []
}

const sketchSetup = (sketch: p5, environment: any) => {
  const { width, height, engine, world } = environment
  Matter.World.clear(world, false)
  Matter.Engine.clear(engine)
  const canvas = sketch.createCanvas(width, height)
  createMouseConstraint(canvas.elt, engine, world, sketch)
  setupFrame(environment)
  setupHome(sketch, environment)
}

const sketchDraw = (sketch: p5, environment: any) => {
  sketch.background(environment.bgColor)
  Matter.Engine.update(engine)
  renderGroup(environment.bodies)
}

const sketchWindowResized = (environment: any) => {
  resetPageFrame(environment)
  setupFrame(environment)
}

export const sketchFns = {
  sketchSetup,
  sketchDraw,
  sketchWindowResized
}