import p5 from 'p5'
import Matter from 'matter-js'

import {
  AboutEnv,
  RectBodySettings,
  TextBox
} from '../types'

import {
  setTextDimensions,
  addToWorld,
  defaultColor,
  clearGroup,
  createColorParticles,
  renderGroup,
  checkGroupForRemoval
} from '../utilities'

import {
  setupFrame,
  sketchWindowResized
} from './general'


const setupAbout = (sketch: p5, environment: AboutEnv) => {
  const { world, width, height, bodies } = environment

  const texts = [
    'i am a colorful, non-binary, queer performing artist turned software engineer. i dance, i write, i do drag, and i code.',
    'i think about illusion and reality and how to confuse the two. i believe in making fantasy come to life.',
    'as an engineer, coding feels like magic and i want to always remember the joy that technology can bring.',
    'as an artist, i think stories can be told with stillness as much as movement, and with color as much as grayscale.',
    'have you tried moving around the words on the home page?'
  ]

  texts.forEach((text, index) => {
    let textSize = width * 0.015
    let x = width * 0.35
    let y = (height * 0.15) + (index * 110)
    let angle = 0.1
    let boxWidth = width * 0.45
    let boxHeight = height * 0.08

    if (index % 2 === 1) {
      x = width * 0.65
      angle *= -1
    }

    const dimensions = setTextDimensions(sketch, {
      textSize,
      text,
      boxWidth,
      boxHeight
    })

    const options = {
      friction: 0,
      restitution: 0.7,
      isStatic: true,
      angle
    }

    const bodySettings: RectBodySettings = {
      x,
      y,
      w: dimensions.w,
      h: dimensions.h,
      options,
      padding: 10,
      shape: 'rect'
    }

    const para = new TextBox(sketch, {
      bodySettings,
      textSettings: {
        textSize,
        text,
        boxWidth,
        boxHeight,
        color: defaultColor,
        alignment: {
          horizontal: 'left',
          vertical: 'top'
        }
      }
    })
    addToWorld(world, para, bodies)
  })
}

const engine = Matter.Engine.create()
const world = engine.world

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

const aboutSetup = (sketch: p5, environment: AboutEnv) => {
  const { width, height, world, particles } = environment
  world.gravity.y = 1
  clearGroup(particles)
  sketch.createCanvas(width, height)
  setupFrame(environment)
  setupAbout(sketch, environment)
}

const aboutDraw = (sketch: p5, environment: AboutEnv) => {
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