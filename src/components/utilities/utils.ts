import Matter from 'matter-js'
import * as p5 from 'p5'
import { ColorBall, Bubble } from './constructors'
import { 
  Environment, 
  Color, 
  Position, 
  Button, 
  Body,
  EngineType, 
  WorldType,
  Canvas,
  Instance,
  Config
} from '../../types'

const { World, Mouse, MouseConstraint } = Matter

const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min)) + min
}

export const getRedColor = (): Color => {
  return {
    hue: getRandomInt(347, 353),
    saturation: getRandomInt(150, 201),
    lightness: getRandomInt(47, 51),
  }
}

export const getOrangeColor = (): Color => {
  return {
    hue: getRandomInt(20, 28),
    saturation: getRandomInt(200, 256),
    lightness: getRandomInt(50, 61),
  }
}

export const getYellowColor = (): Color => {
  return {
    hue: getRandomInt(47, 58),
    saturation: getRandomInt(200, 256),
    lightness: getRandomInt(52, 60),
  }
}

export const getGreenColor = (): Color => {
  return {
    hue: getRandomInt(112, 128),
    saturation: getRandomInt(210, 251),
    lightness: getRandomInt(35, 38),
  }
}

export const getBlueColor = (): Color => {
  return {
    hue: getRandomInt(223, 240),
    saturation: getRandomInt(210, 241),
    lightness: getRandomInt(58, 61),
  }
}

export const getPurpleColor = (): Color => {
  return {
    hue: getRandomInt(277, 286),
    saturation: getRandomInt(210, 246),
    lightness: getRandomInt(52, 58),
  }
}

export const defaultColor: Color = {
  hue: 0,
  saturation: 0,
  lightness: 94
}

export const randomColor = (): Color => {
  let choice = getRandomInt(1, 7)
  switch (choice) {
    case 1:
      return getRedColor()
    case 2:
      return getOrangeColor()
    case 3:
      return getYellowColor()
    case 4:
      return getGreenColor()
    case 5:
      return getBlueColor()
    case 6:
      return getPurpleColor()
    default:
      return defaultColor
  }
}

export const desaturateColor = (environment: Environment, color: Color): Color => {
  const { sketch } = environment
  return {
    hue: color.hue,
    saturation: sketch.lerp(color.saturation, defaultColor.saturation, 0.4),
    lightness: sketch.lerp(color.lightness, defaultColor.lightness, 0.2)
  }
}

export const areaFromPoints = (position: Position, vertices: Position[], p5: p5): number => {
  // find and sum the triangles created from position and vertices
  return vertices
    // find edges of triangles
    .map((vertex, index, array) => {
      let nextPointIdx = index + 1
      if (index === array.length - 1) nextPointIdx = 0

      const edgeOne = p5.dist(position.x, position.y, vertex.x, vertex.y)
      const edgeTwo = p5.dist(position.x, position.y, array[nextPointIdx].x, array[nextPointIdx].y)
      const edgeThree = p5.dist(vertex.x, vertex.y, array[nextPointIdx].x, array[nextPointIdx].y)

      return {
        edgeOne,
        edgeTwo,
        edgeThree
      }
    })
    // find areas of triangles
    .map((edges) => {
      const { edgeOne, edgeTwo, edgeThree } = edges
      const semiPerimeter = (edgeOne + edgeTwo + edgeThree) / 2

      return p5.sqrt(semiPerimeter * (semiPerimeter - edgeOne) * (semiPerimeter - edgeTwo) * (semiPerimeter - edgeThree))
    })
    // sum all the triangles
    .reduce((sum, curVal) => {
      return sum + curVal
    }, 0)
}

export const createMouseConstraint = (canvas: Canvas, engine: EngineType, world: WorldType, sketch: p5) => {
  const mouse = Mouse.create(canvas)
  mouse.pixelRatio = sketch.pixelDensity()
  const mouseOptions = {
    mouse
  }
  const mouseConstraint = MouseConstraint.create(engine, mouseOptions)
  World.add(world, mouseConstraint)
}

export const createColorParticles = (environment: Environment) => {
  const { width } = environment
  const particleSettings = {
    x: width * 0.3,
    y: 10,
    r: getRandomInt(4, 9),
    options: {
      friction: 0,
      restitution: 0.4,
      isStatic: false
    },
    color: randomColor()
  }

  new ColorBall(environment, particleSettings)
}

export const createBubbles = (environment: Environment, button: Button) => {
  const position = button.body.position
  const textSize = button.config.textSettings.textSize

  button.text.forEach(text => {
    let x = getRandomInt(position.x - 10, position.x + 10)
    let y = getRandomInt(position.y - 30, position.y - 50)

    new Bubble(environment, {
      x,
      y,
      options: {
        frictionAir: 0.25,
        restitution: 0.8,
        isStatic: false
      },
      textSettings: {
        text: text,
        textSize
      },
      color: desaturateColor(environment, randomColor())
    })
  })
}

export const transformBody = (sketch: p5, body: Body) => {
  const position = body.position
  const angle = body.angle

  sketch.translate(position.x, position.y)
  sketch.rotate(angle)
}

export const setTextDimensions = (config: Config) => {
  const { sketch, textSettings } = config
  const { text, textSize, boxWidth, boxHeight, padding } = textSettings
  sketch.textSize(textSize || 18)
  return {
    textSize: textSize,
    w: boxWidth || sketch.textWidth(text),
    h: boxHeight || sketch.textAscent(),
    padding: padding || 10
  }
}

export const addToWorld = (world: WorldType, instance: Instance, container: any[]) => {
  World.add(world, instance.body)
  container.push(instance)
  instance.index = container.length - 1
}

export const renderText = (config: Config) => {
  const { sketch, textSettings, color, alignment } = config
  const { textSize, text, boxWidth, boxHeight } = textSettings
  const { hue, saturation, lightness } = color

  sketch.rectMode('center')
  sketch.textAlign(alignment.horizontal, alignment.vertical)
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

export const renderImage = (config: Config) => {
  const { sketch, image, dimensions } = config

  sketch.imageMode('center')
  sketch.image(image, 0, 0, dimensions.w, dimensions.h)
}

export const renderOutline = (config: Config) => {
  const { sketch, color, dimensions, shape } = config
  const { hue, saturation, lightness } = color
  sketch.colorMode('hsl')
  sketch.noFill()
  sketch.stroke(hue, saturation, lightness)
  switch (shape) {
    case 'rect':
      sketch.rect(0, 0, dimensions.w + dimensions.padding, dimensions.h + dimensions.padding)
      break
    case 'circle':
      sketch.ellipse(0, 0, dimensions.w + dimensions.padding)
      break
  }
}

export const renderHighlight = (config: Config) => {
  const { sketch, dimensions, shape } = config
  sketch.colorMode('hsl')
  sketch.noStroke()
  sketch.fill(0, 0, 100, 0.1)
  switch (shape) {
    case 'rect':
      sketch.rectMode('center')
      sketch.rect(0, 0, dimensions.w + (dimensions.padding || 0), dimensions.h + (dimensions.padding || 0))
      break
    case 'circle':
      sketch.ellipse(0, 0, dimensions.w + dimensions.padding)
      break
  }
}

export const renderLowlight = (config: Config) => {
  const { sketch, dimensions, shape } = config
  sketch.colorMode('hsl')
  sketch.noStroke()
  sketch.fill(0, 0, 0, 0.8)
  switch (shape) {
    case 'rect':
      sketch.rectMode('center')
      sketch.rect(0, 0, dimensions.w + (dimensions.padding || 0), dimensions.h + (dimensions.padding || 0))
      break
    case 'circle':
      sketch.ellipse(0, 0, dimensions.w + dimensions.padding)
      break
  }
}

export const checkMouseInBounds = (instance: Instance, mousePosition: Position, config: Config) => {
  const { sketch, shape, dimensions } = config
  const { body } = instance
  switch (shape) {
    case 'rect':
      const vertices = body.vertices
      const mouseArea = areaFromPoints(mousePosition, vertices, sketch)
      return (mouseArea < body.area + 1)
    case 'circle':
      const distance = sketch.dist(body.position.x, body.position.y, mousePosition.x, mousePosition.y)
      return (distance < dimensions.w / 2)
  }
}

export const manageParticleRender = (array: any[]) => {
  for (let i = 0; i < array.length; i++) {
    let particle = array[i]
    particle.show()
    if (particle.isBelowLine()) {
      particle.remove()
      array.splice(i, 1)
      i--
    }
  }
}

export const manageBubbleRender = (array: any[], mousePosition: Position) => {
  for (let i = 0; i < array.length; i++) {
    let bubble = array[i]
    bubble.show()
    bubble.checkMouseInBounds(mousePosition)
    bubble.checkBubblePop()
    if (bubble.bubbleShouldPop) {
      bubble.remove()
      array.splice(i, 1)
      i--
    }
  }
}




