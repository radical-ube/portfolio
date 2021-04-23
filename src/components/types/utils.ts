import p5 from 'p5'
import Matter from 'matter-js'

import { 
  TextSettings,
  PhysicalObject,
  Horizontal,
  Vertical,
  Alignment
} from './types'

import {
  parseColor
} from './utilities'

const { World, Mouse, MouseConstraint } = Matter

// export const defaultAlignment = {
//   horizontal: Horizontal.Center,
//   vertical: Vertical.Center
// }

// const parseAlignment = (alignment: Alignment | undefined): Alignment => {
//   if (alignment) return alignment
//   else return defaultAlignment
// }


export const createMouseConstraint = (canvas: HTMLCanvasElement, engine: Matter.Engine, world: Matter.World, sketch: p5) => {
  const mouse = Mouse.create(canvas)
  mouse.pixelRatio = sketch.pixelDensity()
  const mouseOptions = {
    mouse
  }
  const mouseConstraint = MouseConstraint.create(engine, mouseOptions)
  World.add(world, mouseConstraint)
}

export const transformBody = (sketch: p5, body: Matter.Body) => {
  const position = body.position
  const angle = body.angle

  sketch.translate(position.x, position.y)
  sketch.rotate(angle)
}

export const setTextDimensions = (sketch: p5, textSettings: TextSettings) => {
  const { text, textSize, boxWidth, boxHeight, padding } = textSettings
  sketch.textSize(textSize || 18)
  return {
    w: boxWidth || sketch.textWidth(text),
    h: boxHeight || sketch.textAscent(),
    padding: padding || 10
  }
}

export const renderText = (sketch: p5, textSettings: TextSettings) => {
  const { textSize, text, color, alignment, boxWidth, boxHeight } = textSettings
  const { hue, saturation, lightness } = parseColor(color)
  const { horizontal, vertical } = alignment

  sketch.rectMode('center')
  sketch.textAlign(horizontal, vertical)
  sketch.textSize(textSize)
  sketch.colorMode('hsl')
  sketch.fill(hue, saturation, lightness)
  if (boxWidth && boxHeight) {
    sketch.text(text, 0, 0, boxWidth, boxHeight)
  }
  else {
    sketch.text(text, 0, 0)
  }
}

export function addToWorld (world: Matter.World, object: PhysicalObject, container: any[]): void {
  World.add(world, object.body)
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

// export const desaturateColor = (environment: Environment, color: Color): Color => {
//   const { sketch } = environment
//   return {
//     hue: color.hue,
//     saturation: sketch.lerp(color.saturation, defaultColor.saturation, 0.4),
//     lightness: sketch.lerp(color.lightness, defaultColor.lightness, 0.2)
//   }
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



// export const renderImage = (config: ImageConfig) => {
//   const { sketch, image, dimensions } = config

//   sketch.imageMode('center')
//   sketch.image(image, 0, 0, dimensions.w, dimensions.h)
// }

// export const renderOutline = (config: ColorRenderConfig) => {
//   const { sketch, color, dimensions, shape } = config
//   const { hue, saturation, lightness } = color
//   sketch.colorMode('hsl')
//   sketch.noFill()
//   sketch.stroke(hue, saturation, lightness)
//   switch (shape) {
//     case 'rect':
//       sketch.rect(0, 0, dimensions.w + dimensions.padding, dimensions.h + dimensions.padding)
//       break
//     case 'circle':
//       sketch.ellipse(0, 0, dimensions.w + dimensions.padding)
//       break
//   }
// }

// export const renderHighlight = (config: ColorRenderConfig) => {
//   const { sketch, dimensions, shape } = config
//   sketch.colorMode('hsl')
//   sketch.noStroke()
//   sketch.fill(0, 0, 100, 0.1)
//   switch (shape) {
//     case 'rect':
//       sketch.rectMode('center')
//       sketch.rect(0, 0, dimensions.w + (dimensions.padding || 0), dimensions.h + (dimensions.padding || 0))
//       break
//     case 'circle':
//       sketch.ellipse(0, 0, dimensions.w + dimensions.padding)
//       break
//   }
// }

// export const renderLowlight = (config: ColorRenderConfig) => {
//   const { sketch, dimensions, shape } = config
//   sketch.colorMode('hsl')
//   sketch.noStroke()
//   sketch.fill(0, 0, 0, 0.8)
//   switch (shape) {
//     case 'rect':
//       sketch.rectMode('center')
//       sketch.rect(0, 0, dimensions.w + (dimensions.padding || 0), dimensions.h + (dimensions.padding || 0))
//       break
//     case 'circle':
//       sketch.ellipse(0, 0, dimensions.w + dimensions.padding)
//       break
//   }
// }

// export const checkMouseInBounds = (body: Matter.Body, mousePosition: Position, config: ColorRenderConfig) => {
//   const { sketch, shape, dimensions } = config
//   // const { body } = instance
  
//   switch (shape) {
//     case 'rect':
//       const vertices = body.vertices
//       const mouseArea = areaFromPoints(mousePosition, vertices, sketch)
//       return (mouseArea < body.area + 1)
//     case 'circle':
//       const distance = sketch.dist(body.position.x, body.position.y, mousePosition.x, mousePosition.y)
//       return (distance < dimensions.w / 2)
//   }
// }

// export const manageParticleRender = (array: any[]) => {
//   for (let i = 0; i < array.length; i++) {
//     let particle = array[i]
//     particle.show()
//     if (particle.isBelowLine()) {
//       particle.remove()
//       array.splice(i, 1)
//       i--
//     }
//   }
// }

// export const manageBubbleRender = (array: any[], mousePosition: Position) => {
//   for (let i = 0; i < array.length; i++) {
//     let bubble = array[i]
//     bubble.show()
//     bubble.checkMouseInBounds(mousePosition)
//     bubble.checkBubblePop()
//     if (bubble.bubbleShouldPop) {
//       bubble.remove()
//       array.splice(i, 1)
//       i--
//     }
//   }
// }




