import p5 from 'p5'
import Matter from 'matter-js'

import {
  ContactEnv,
  Boundary,
  LinkButtonSettings,
  LinkButton,
  Spring
} from '../types'

import {
  createWordColumn,
  addToWorld,
  setTextDimensions,
  randomColor,
  renderGroup,
  checkGroupForMouse
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

const setupContact = (sketch: p5, environment: ContactEnv) => {
  const { width, height, world, boundaries, buttons, constraints } = environment
  
  let titleText = 'drop me a line'
  createWordColumn(titleText, sketch, environment, {
    xMod: 0.3
  })

  let invisibleBox = new Boundary({
    x: (width * 0.7),
    y: 0,
    w: 1,
    h: 1,
    options: {
      isStatic: true
    },
    shape: 'rect'
  })
  addToWorld(world, invisibleBox, boundaries)

  let socials = ['github: radical-ube', 'instagram: @radical_ube', 'linkedIn: in/ube-halaya', 'email: eli.tamondong@gmail.com']
  let socialAddresses = ['https://github.com/radical-ube', 'https://instagram.com/radical_ube', 'https://linkedin.com/in/ube-halaya', 'mailto:eli.tamondong@gmail.com']

  let prevBody = invisibleBox
  let buttonTextSize = width * 0.025
  socials.forEach((social, i) => {
    let x = width * 0.7
    if (i % 2 === 0) {
      x += 2
    } else {
      x -= 2
    }

    const dimensions = setTextDimensions(sketch, {
      textSize: buttonTextSize,
      text: social
    })

    const color = randomColor()

    const buttonSettings: LinkButtonSettings = {
      bodySettings: {
        x,
        y: (height * 0.1) + (i * 50),
        w: dimensions.w,
        h: dimensions.h,
        options: {
          friction: 0.4,
          restitution: 0.7,
          isStatic: false
        },
        padding: dimensions.padding,
        shape: 'rect',
        color
      },
      textSettings: {
        text: social,
        textSize: buttonTextSize,
        color
      },
      address: socialAddresses[i]
    }
    const button = new LinkButton(sketch, buttonSettings)
    addToWorld(world, button, buttons)

    const spring = new Spring(sketch, {
      bodyA: prevBody.body,
      bodyB: button.body,
      length: height * 0.2,
      stiffness: 0.2
    })
    addToWorld(world, spring, constraints)
    prevBody = button
  })
}

export const contactEnv = {
  engine,
  world,
  bgColor,
  width,
  height,
  bodies: [],
  boundaries: [],
  constraints: [],
  buttons: []
}

const contactSetup = (sketch: p5, environment: ContactEnv) => {
  const { world } = environment
  world.gravity.y = 1
  setupFrame(environment)
  setupContact(sketch, environment)
}

const contactDraw = (sketch: p5, environment: ContactEnv) => {
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