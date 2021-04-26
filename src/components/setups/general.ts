import p5 from 'p5'

import {
  FramedEnv,
  Boundary,
  PhysicalEnv
} from '../types'

import {
  addToWorld
} from '../utilities'

export const setupFrame = (environment: FramedEnv) => {
  const { width, height, world, boundaries } = environment

  const options = {
    friction: 0.3,
    restitution: 1,
    isStatic: true,
    label: 'boundary'
  }

  const ground = new Boundary({
    x: width / 2, 
    y: height * 2, 
    w: width * 2, 
    h: height * 2,
    options,
    shape: 'rect'
  })
  addToWorld(world, ground, boundaries)
  
  const ceiling = new Boundary({
    x: width / 2, 
    y: height * -1, 
    w: width * 2, 
    h: height * 2,
    options,
    shape: 'rect'
  })
  addToWorld(world, ceiling, boundaries)
  
  const leftWall = new Boundary({
    x: width * -1, 
    y: height / 2, 
    w: width * 2, 
    h: height,
    options,
    shape: 'rect'
  })
  addToWorld(world, leftWall, boundaries)

  const rightWall = new Boundary({
    x: width * 2, 
    y: height / 2, 
    w: width * 2, 
    h: height,
    options,
    shape: 'rect'
  })
  addToWorld(world, rightWall, boundaries)
}

export const resetPageFrame = (sketch: p5, environment: FramedEnv) => {
  const {world} = environment
  environment.width = window.innerWidth
  environment.height = window.innerHeight * 0.85
  sketch.resizeCanvas(environment.width, environment.height)
  environment.boundaries.forEach((boundary: Boundary) => {
    boundary.remove(world)
  })
  environment.boundaries.splice(0, 1)
}


export const sketchWindowResized = (sketch: p5, environment: PhysicalEnv) => {
  resetPageFrame(sketch, environment)
  setupFrame(environment)
}