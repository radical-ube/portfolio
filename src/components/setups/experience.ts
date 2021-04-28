import p5 from 'p5'
import Matter from 'matter-js'

import {
  ExperienceEnv,
  BubbleButton,
  TextBox
} from '../types'

import {
  setTextDimensions,
  addToWorld,
  renderGroup,
  checkGroupForMouse,
  checkGroupForRemoval
} from '../utilities'

import {
  setupFrame,
  sketchWindowResized,
  engine,
  world,
  bgColor,
  width,
  height
} from './defaults'

const setupExperience = (sketch: p5, environment: ExperienceEnv) => {
  const { width, height, world, buttons, bodies } = environment

  const credentials = [
    {
      type: 'languages',
      text: ['JavaScript', 'TypeScript', 'Python', 'C#']
    },
    {
      type: 'front end',
      text: ['React', 'Redux', 'HTML5', 'CSS', 'p5.js', 'Matter.js', 'd3.js']
    },
    {
      type: 'back end',
      text: ['Node.js', 'Express', 'PostgreSQL', 'Sequelize', 'MongoDB', 'Mongoose']
    },
    {
      type: 'platforms',
      text: ['Github', 'Heroku', 'Netlify']
    },
    {
      type: 'artistry',
      text: ['improvise freely', 'share vulnerably', 'bold composition', 'play']
    },
    {
      type: 'communication',
      text: ['clarity', 'active listening', 'make space', 'don\'t assume']
    },
    {
      type: 'learning',
      text: ['honest curiosity', 'diversity of thought', 'non-binary paradigm']
    },
  ]

  let xCreds = width / (credentials.length + 1)
  let bubbleSize = width * 0.015

  credentials.forEach((credential, index) => {
    const dimensions = setTextDimensions(sketch, {
      textSize: bubbleSize,
      text: credential.type
    })
    const button = new BubbleButton(sketch, {
      bodySettings: {
        x: xCreds + (xCreds * index),
        y: height * 0.8,
        w: dimensions.w,
        h: dimensions.h,
        padding: 10,
        options: {
          isStatic: true
        },
        shape: 'rect'
      },
      textSettings: {
        text: credential.type,
        textSize: bubbleSize,
      },
      bubbleText: credential.text
    })
    addToWorld(world, button, buttons)
  })


  let headerSize1 =  width * 0.06

  const headerDimensions = setTextDimensions(sketch, {
    textSize: headerSize1,
    text: 'technologies, values, and skills'
  })
  const header = new TextBox(sketch, {
    bodySettings: {
      x: width * 0.5,
      y: height * 0.9,
      w: headerDimensions.w,
      h: headerDimensions.h,
      options: {
        isStatic: true
      },
      shape: 'rect'
    },
    textSettings: {
      textSize: headerSize1,
      text: 'technologies, values, and skills'
    }
  })
  addToWorld(world, header, bodies)

}

// const engine = Matter.Engine.create()
// const world = engine.world

export const experienceEnv = {
  engine,
  world,
  bgColor,
  width,
  height,
  bodies: [],
  boundaries: [],
  buttons: [],
  bubbles: []
}

const experienceSetup = (sketch: p5, environment: ExperienceEnv) => {
  const { world } = environment
  world.gravity.y = -1
  setupFrame(environment)
  setupExperience(sketch, environment)
}

const experienceDraw = (sketch: p5, environment: ExperienceEnv) => {
  const { bgColor, engine, bodies, buttons, bubbles } = environment
  sketch.background(bgColor)
  Matter.Engine.update(engine)
  renderGroup(bodies)
  renderGroup(buttons)
  checkGroupForMouse(buttons)
  renderGroup(bubbles)
  checkGroupForMouse(bubbles)
  checkGroupForRemoval(world, bubbles)
}

export const experienceFns = {
  sketchSetup: experienceSetup,
  sketchDraw: experienceDraw,
  sketchWindowResized
}