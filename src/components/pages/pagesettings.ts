import p5 from 'p5'
import Matter from 'matter-js'

import {
  createMouseConstraint,
  setupFrame,
  setupHome,
  setupAbout,
  renderGroup,
  resetPageFrame,
  createColorParticles,
  checkGroupForRemoval
} from '../utilities'

import {
  PhysicalEnv
} from '../types'

const engine = Matter.Engine.create()
const world = engine.world

export const environment: PhysicalEnv = {
  engine,
  world,
  bgColor: '#282c34',
  width: window.innerWidth,
  height: window.innerHeight * 0.85,
  bodies: [],
  boundaries: [],
}

const sketchSetup = (sketch: p5, environment: PhysicalEnv) => {
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

const sketchWindowResized = (sketch: p5, environment: any) => {
  resetPageFrame(sketch, environment)
  setupFrame(environment)
}

export const sketchFns = {
  sketchSetup,
  sketchDraw,
  sketchWindowResized
}


export const aboutEnv = {
  engine,
  world,
  bgColor: '#282c34',
  width: window.innerWidth,
  height: window.innerHeight * 0.85,
  bodies: [],
  boundaries: [],
  particles: []
}

const aboutSetup = (sketch: p5, environment: any) => {
  Matter.World.clear(world, false)
  Matter.Engine.clear(engine)
  sketch.createCanvas(environment.width, environment.height)
  setupFrame(environment)
  setupAbout(sketch, environment)
}

const aboutDraw = (sketch: p5, environment: any) => {
  sketch.background(environment.bgColor)
  Matter.Engine.update(engine)
  if (sketch.frameCount % 4 === 0) {
    createColorParticles(sketch, environment)
  }
  renderGroup(environment.bodies)
  renderGroup(environment.particles)
  checkGroupForRemoval(world, environment.particles)
}

export const aboutFns = {
  sketchSetup: aboutSetup,
  sketchDraw: aboutDraw,
  sketchWindowResized
}