import p5 from 'p5'
import Matter from 'matter-js'

import {
  createMouseConstraint,
  setupFrame,
  setupHome,
  setupAbout,
  setupProjects,
  setupExperience,
  setupContact,
  renderGroup,
  renderProjectDescription,
  resetPageFrame,
  createColorParticles,
  checkGroupForRemoval,
  checkGroupForMouse
} from '../utilities'

import {
  PhysicalEnv,
} from '../types'

const engine = Matter.Engine.create()
const world = engine.world


// Home page
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
  world.gravity.y = 1
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


// About page
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
  const { width, height, engine, world } = environment
  Matter.World.clear(world, false)
  Matter.Engine.clear(engine)
  world.gravity.y = 1
  sketch.createCanvas(width, height)
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


// Project page
export const projectEnv = {
  engine,
  world,
  bgColor: '#282c34',
  width: window.innerWidth,
  height: window.innerHeight * 0.85 * 2,
  bodies: [],
  boundaries: [],
  images: {},
  buttons: [],
  descriptions: [],
  projects: []
}

const projectSetup = (sketch: p5, environment: any) => {
  const { engine, world } = environment
  Matter.World.clear(world, false)
  Matter.Engine.clear(engine)
  world.gravity.y = 1
  // const canvas = sketch.createCanvas(environment.w, environment.h)
  // canvas.mouseClicked(projectHandleClick)
  setupFrame(environment)
  setupProjects(sketch, environment)
}

const projectDraw = (sketch: p5, environment: any) => {
  sketch.background(environment.bgColor)
  Matter.Engine.update(engine)
  renderGroup(environment.projects)
  checkGroupForMouse(environment.projects)
  renderProjectDescription(environment.projects)
  checkGroupForMouse(environment.buttons)
}

export const projectFns = {
  sketchSetup: projectSetup,
  sketchDraw: projectDraw,
  sketchWindowResized
}


// Experience page
export const experienceEnv = {
  engine,
  world,
  bgColor: '#282c34',
  width: window.innerWidth,
  height: window.innerHeight * 0.85,
  bodies: [],
  boundaries: [],
  buttons: [],
  bubbles: []
}

const experienceSetup = (sketch: p5, environment: any) => {
  const { engine, world } = environment
  Matter.World.clear(world, false)
  Matter.Engine.clear(engine)
  world.gravity.y *= -1
  setupFrame(environment)
  setupExperience(sketch, environment)
}

const experienceDraw = (sketch: p5, environment: any) => {
  sketch.background(environment.bgColor)
  Matter.Engine.update(environment.engine)
  renderGroup(environment.bodies)
  renderGroup(environment.buttons)
  checkGroupForMouse(environment.buttons)
  renderGroup(environment.bubbles)
  checkGroupForMouse(environment.bubbles)
  checkGroupForRemoval(world, environment.bubbles)
}

export const experienceFns = {
  sketchSetup: experienceSetup,
  sketchDraw: experienceDraw,
  sketchWindowResized
}


// Contact page
export const contactEnv = {
  engine,
  world,
  bgColor: '#282c34',
  width: window.innerWidth,
  height: window.innerHeight * 0.85,
  bodies: [],
  boundaries: [],
  constraints: [],
  buttons: []
}

const contactSetup = (sketch: p5, environment: any) => {
  const { engine, world } = environment
  Matter.World.clear(world, false)
  Matter.Engine.clear(engine)
  world.gravity.y = 1
  setupFrame(environment)
  setupContact(sketch, environment)
}

const contactDraw = (sketch: p5, environment: any) => {
  sketch.background(environment.bgColor)
  Matter.Engine.update(environment.engine)
  renderGroup(environment.bodies)
  renderGroup(environment.constraints)
  renderGroup(environment.buttons)
  checkGroupForMouse(environment.buttons)
}

export const contactFns = {
  sketchSetup: contactSetup,
  sketchDraw: contactDraw,
  sketchWindowResized
}