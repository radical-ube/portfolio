import Matter from 'matter-js'
// import { ColorBall, Bubble } from './constructors'
// import { getRandomInt, randomColor, desaturateColor } from './'

const { World, Mouse, MouseConstraint } = Matter

export const createMouseConstraint = (canvas, engine, world, p5) => {
  const mouse = Mouse.create(canvas.elt)
  mouse.pixelRatio = p5.pixelDensity()
  const mouseOptions = {
    mouse
  }
  const mouseConstraint = MouseConstraint.create(engine, mouseOptions)
  World.add(world, mouseConstraint)
}

// export const createColorParticles = (environment) => {
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

//   new ColorBall(environment, particleSettings)
// }

// export const createBubbles = (environment, button) => {
//   const position = button.body.position
//   const textSize = button.config.textSettings.textSize

//   button.values.forEach(value => {
//     let x = getRandomInt(position.x - 10, position.x + 10)
//     let y = getRandomInt(position.y - 30, position.y - 50)

//     new Bubble(environment, {
//       x,
//       y,
//       options: {
//         frictionAir: 0.25,
//         restitution: 0.8,
//         isStatic: false
//       },
//       textSettings: {
//         text: value,
//         textSize
//       },
//       color: desaturateColor(environment, randomColor())
//     })
//   })
// }