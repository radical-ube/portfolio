import p5 from 'p5'
import Matter from 'matter-js'

import {
  HasBody,
  ColorBall,
  Bubble,
  CircleBodySettings
} from '../types'
import {
  getRandomInt,
  randomColor,
  desaturateColor
} from './'
import { setTextDimensions } from './utils'

export const createMouseConstraint = (canvas: HTMLCanvasElement, engine: Matter.Engine, world: Matter.World, sketch: p5) => {
  const mouse = Matter.Mouse.create(canvas)
  mouse.pixelRatio = sketch.pixelDensity()
  const mouseOptions = {
    mouse
  }
  const mouseConstraint = Matter.MouseConstraint.create(engine, mouseOptions)
  Matter.World.add(world, mouseConstraint)
}

export const transformBody = (sketch: p5, body: Matter.Body) => {
  const position = body.position
  const angle = body.angle

  sketch.translate(position.x, position.y)
  sketch.rotate(angle)
}

export function addToWorld (world: Matter.World, object: HasBody, container: any[]): void {
  Matter.World.add(world, object.body)
  container.push(object)
}

export const createColorParticles = (sketch: p5, environment: any) => {
  const { width, particles, world } = environment

  const particleSettings: CircleBodySettings = {
    x: width * 0.3,
    y: 10,
    r: getRandomInt(4, 9),
    options: {
      friction: 0,
      restitution: 0.4,
      isStatic: false
    },
    color: randomColor(),
    shape: 'circle'
  }

  const colorBall = new ColorBall(sketch, particleSettings)
  if (particles.length < 200) {
    addToWorld(world, colorBall, particles)
  }
}

export const createBubbles = (sketch: p5, environment: any, bubbleButton: any) => {
  const position = bubbleButton.body.position
  const textSize = bubbleButton.textSettings.textSize

  bubbleButton.text.forEach((text: string) => {
    let x = getRandomInt(position.x - 10, position.x + 10)
    let y = getRandomInt(position.y - 30, position.y - 50)

    const dimensions = setTextDimensions(sketch, {
      textSize,
      text
    })

    const bubble = new Bubble(sketch, {
      bodySettings: {
        x,
        y,
        r: dimensions.w / 2,
        padding: dimensions.padding,
        options: {
          frictionAir: 0.25,
          restitution: 0.8,
          isStatic: false
        },
        shape: 'circle'
      },
      textSettings: {
        text: text,
        textSize,
        color: desaturateColor(sketch, randomColor())
      },
    })
    addToWorld(environment.world, bubble, environment.bubbles)
  })
}