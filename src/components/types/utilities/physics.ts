import p5 from 'p5'
import Matter from 'matter-js'

import {
  PhysicalObject
} from '../types'

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

export function addToWorld (world: Matter.World, object: PhysicalObject, container: any[]): void {
  Matter.World.add(world, object.body)
  container.push(object)
}

// export const createColorParticles = (environment: Environment) => {
//   const { width } = environment
//   const particleSettings = {
//     x: width * 0.3,
//     y: 10,
//     r: getRandomInt(4, 9),
//     options: {
//       friction: 0,
//       restitution: 0.4,
//       isStatic: false
//     },
//     color: randomColor()
//   }

//   new ColorBallConstructor(environment, particleSettings)
// }

// export const createBubbles = (environment: Environment, button: Button) => {
//   const position = button.body.position
//   const textSize = button.config.textSettings.textSize

//   button.text.forEach(text => {
//     let x = getRandomInt(position.x - 10, position.x + 10)
//     let y = getRandomInt(position.y - 30, position.y - 50)

//     new BubbleConstructor(environment, {
//       x,
//       y,
//       options: {
//         frictionAir: 0.25,
//         restitution: 0.8,
//         isStatic: false
//       },
//       textSettings: {
//         text: text,
//         textSize
//       },
//       color: desaturateColor(environment, randomColor())
//     })
//   })
// }