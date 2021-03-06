import p5 from 'p5'
import Matter from 'matter-js'

import {
  NavEnv,
  Boundary,
  TextBoxSettings,
  Button,
  Spring,
  FramedEnv,
  RectBodySettings
} from '../types'

import {
  addToWorld,
  setTextDimensions,
  randomColor
} from '../utilities'

import {
  defaultAlignment
} from '../setups'

import {
  bgColor,
  width
} from './'

const engine = Matter.Engine.create()
const world = engine.world

export const navEnv: NavEnv = {
  engine,
  world,
  bgColor,
  width,
  height: window.innerHeight * 0.15,
  bodies: [],
  boundaries: [],
  constraints: [],
  tabs: [
    'home', 
    'about', 
    'projects', 
    'experience', 
    'contact'
  ],
  buttons: []
}

export const setupNav = (sketch: p5, environment: NavEnv) => {
  const { width, height, tabs, buttons, world, constraints, boundaries } = environment
  let textSize = width * 0.035
  let x = width / (tabs.length + 1)
  let y = height * 0.5
  let stiffness = 0.6


  let end1 = new Boundary({
    x: -15,
    y,
    w: 1,
    h: 1,
    options: {
      isStatic: true
    },
    shape: 'rect'
  })
  addToWorld(world, end1, boundaries)
  let prevElement = end1

  for (let i = 0; i < tabs.length; i++) {
    const word = tabs[i]
    const color = randomColor()
    const textSettings = {
      textSize,
      text: word,
      color,
      alignment: defaultAlignment
    }
    const dimensions = setTextDimensions(sketch, textSettings)
    const bodySettings: RectBodySettings = {
      x: x + (40 * i),
      y,
      w: dimensions.w,
      h: dimensions.h,
      options: {
        friction: 0.4,
        restitution: 0.8,
        isStatic: false
      },
      padding: dimensions.padding,
      shape: 'rect',
      color
    }
    const buttonSettings: TextBoxSettings = {
      bodySettings,
      textSettings,
    }
    const button = new Button(sketch, buttonSettings)
    addToWorld(world, button, buttons)

    const constraintSettings = {
      bodyA: prevElement.body,
      bodyB: button.body,
      length: x,
      stiffness
    }
    const spring = new Spring(sketch, constraintSettings)
    addToWorld(world, spring, constraints)
    prevElement = button
  }

  let end2 = new Boundary({
    x: width + 15,
    y,
    w: 1,
    h: 1,
    options: {
      isStatic: true
    },
    shape: 'rect'
  })
  addToWorld(world, end2, boundaries)

  const lastSpring = new Spring(sketch, {
    bodyA: buttons[buttons.length - 1].body,
    bodyB: end2.body,
    length: x,
    stiffness
  })
  addToWorld(world, lastSpring, constraints)
}

export const resetNavFrame = (sketch: p5, environment: FramedEnv) => {
  const {world} = environment
  environment.width = window.innerWidth
  environment.height = window.innerHeight * 0.15
  sketch.resizeCanvas(environment.width, environment.height)
  environment.boundaries.forEach((boundary: Boundary) => {
    boundary.remove(world)
  })
  environment.boundaries.splice(0, 1)
}