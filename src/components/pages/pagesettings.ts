import p5 from 'p5'
import Matter from 'matter-js'

import {
  createMouseConstraint,
  setupFrame,
  setupHome,
  renderGroup,
  resetPageFrame
} from '../utilities'

const engine = Matter.Engine.create()
const world = engine.world

export const environment = {
  engine,
  world,
  bgColor: '#282c34',
  width: window.innerWidth,
  height: window.innerHeight * 0.85,
  bodies: [],
  boundaries: []
}

export const sketchSetup = (sketch: p5, environment: any) => {
  Matter.World.clear(world, false)
  Matter.Engine.clear(engine)
  const canvas = sketch.createCanvas(environment.width, environment.height)
  createMouseConstraint(canvas.elt, engine, world, sketch)
  setupFrame(environment)
  setupHome(sketch, environment)
}

export const sketchDraw = (sketch: p5, environment: any) => {
  sketch.background(environment.bgColor)
  Matter.Engine.update(engine)
  renderGroup(environment.bodies)
}

export const sketchWindowResized = (environment: any) => {
  resetPageFrame(environment)
  setupFrame(environment)
}

export const sketchFns = {
  sketchSetup,
  sketchDraw,
  sketchWindowResized
}