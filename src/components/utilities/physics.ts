import p5 from 'p5'
import Matter from 'matter-js'

import {
  HasBody,
  ColorBall,
  Bubble,
  BubbleButton,
  CircleBodySettings,
  AboutEnv,
  ExperienceEnv,
  PhysicalEnv,
  RectBodySettings,
  TextBox
} from '../types'
import {
  getRandomInt,
  randomColor,
  desaturateColor,
  setTextDimensions, 
  defaultAlignment 
} from './'


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

export const createColorParticles = (sketch: p5, environment: AboutEnv) => {
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

export const createBubbles = (sketch: p5, environment: ExperienceEnv, bubbleButton: BubbleButton) => {
  const position = bubbleButton.body.position
  const textSize = bubbleButton.textSettings.textSize

  bubbleButton.text.forEach((text: string) => {
    let x = getRandomInt(position.x - 10, position.x + 10)
    let y = getRandomInt(position.y - 30, position.y - 50)

    const dimensions = setTextDimensions(sketch, {
      textSize,
      text
    })

    const color = desaturateColor(sketch, randomColor())
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
        shape: 'circle',
        color
      },
      textSettings: {
        text: text,
        textSize,
        color
      },
    })
    addToWorld(environment.world, bubble, environment.bubbles)
  })
}

type Modifiers = {
  xMod: number
  offsetMod?: number
}

export const createWordColumn = (sentence: string, sketch: p5, environment: PhysicalEnv, modifiers: Modifiers) => {
  const { width, height, world, bodies } = environment
  const { xMod, offsetMod } = modifiers
  
  sentence.split(' ')
    .forEach((text, index, array) => {
      const textSize = height / array.length
      let mod

      if (offsetMod && index === 1) mod = offsetMod
      else mod = xMod

      const x = width * mod
      const y = height * 0.2 + (index * textSize)

      const dimensions = setTextDimensions(sketch, {
        textSize,
        text
      })

      const options = {
        friction: 0.4,
        restitution: 0.8,
        isStatic: false
      }

      const bodySettings: RectBodySettings = {
        x,
        y,
        w: dimensions.w,
        h: dimensions.h,
        options,
        shape: 'rect'
      }

      const textSettings = {
        textSize,
        text,
        color: randomColor(),
        alignment: defaultAlignment
      }

      const settings = {
        bodySettings,
        textSettings
      }

      const word = new TextBox(sketch, settings)
      addToWorld(world, word, bodies)
    })
}