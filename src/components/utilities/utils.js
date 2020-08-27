import Matter from 'matter-js'
import {ColorBall, Bubble} from './constructors'

const {World, Mouse, MouseConstraint} = Matter

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min)) + min 
}

export const getRedColor = () => {
  return {
    hue: getRandomInt(347, 353),
    saturation: getRandomInt(150, 201),
    lightness: getRandomInt(47, 51),
  }
}

export const getOrangeColor = () => {
  return {
    hue: getRandomInt(20, 28),
    saturation: getRandomInt(200, 256),
    lightness: getRandomInt(50, 61),
  }
}

export const getYellowColor = () => {
  return {
    hue: getRandomInt(47, 58),
    saturation: getRandomInt(200, 256),
    lightness: getRandomInt(52, 60),
  }
}

export const getGreenColor = () => {
  return {
    hue: getRandomInt(112, 128),
    saturation: getRandomInt(210, 251),
    lightness: getRandomInt(35, 38),
  }
}

export const getBlueColor = () => {
  return {
    hue: getRandomInt(223, 240),
    saturation: getRandomInt(210, 241),
    lightness: getRandomInt(58, 61),
  }
}

export const getPurpleColor = () => {
  return {
    hue: getRandomInt(277, 286),
    saturation: getRandomInt(210, 246),
    lightness: getRandomInt(52, 58),
  }
}

export const randomColor = () => {
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
  }
}

export const defaultColor = {
  hue: 0,
  saturation: 0,
  lightness: 94
}

export const areaFromPoints = (position, vertices, p5) => {
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
    .map((edges, index, array) => {
      const { edgeOne, edgeTwo, edgeThree } = edges
      const semiPerimeter = (edgeOne + edgeTwo + edgeThree) / 2

      return p5.sqrt(semiPerimeter * (semiPerimeter - edgeOne) * (semiPerimeter - edgeTwo) * (semiPerimeter - edgeThree))
    })
    // sum all the triangles
    .reduce((sum, curVal) => {
      return sum + curVal
    }, 0)
}

export const createMouseConstraint = (canvas, engine, world, p5) => {
  const mouse = Mouse.create(canvas.elt)
  mouse.pixelRatio = p5.pixelDensity()
  const mouseOptions = {
    mouse
  }
  const mouseConstraint = MouseConstraint.create(engine, mouseOptions)
  World.add(world, mouseConstraint)
}

export const createColorParticles = (environment) => {
  const {width} = environment
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

export const createBubbles = (environment, button) => {
  const {width} = environment
  const position = button.body.position
  const textSize = width * 0.0125

  button.values.forEach(value => {
    let x = getRandomInt(position.x - 10, position.x + 10)
    let y = getRandomInt(position.y - 30, position.y -50)
    new Bubble(environment, {
      x,
      y,
      options: {
        frictionAir: 0.25,
        restitution: 0.8,
        isStatic: false
      },
      textSettings: {
        text: value,
        textSize
      }
    })
  })
}

export const transformBody = (p5, body) => {
  const position = body.position
  const angle = body.angle

  p5.translate(position.x, position.y)
  p5.rotate(angle)
}

export const setTextDimensions = config => {
  const {p5, textSettings} = config
  const { text, textSize, boxWidth, boxHeight, padding } = textSettings
  p5.textSize(textSize || 18)
  return {
    textSize: textSize,
    w: boxWidth || p5.textWidth(text),
    h: boxHeight || p5.textAscent(text),
    padding: padding || 10
  }
}

export const addToWorld = (world, instance, container) => {
  World.add(world, instance.body)
  container.push(instance)
  instance.index = container.length - 1
}

export const renderText = config => {
  const {p5, textSettings, color, alignment} = config
  const {CENTER, HSL} = p5
  const {textSize, text, boxWidth, boxHeight} = textSettings
  const {hue, saturation, lightness} = color

  p5.rectMode(CENTER)
  p5.textAlign(alignment.horizontal, alignment.vertical)
  p5.textSize(textSize)
  p5.colorMode(HSL)
  p5.fill(hue, saturation, lightness)
  if (boxWidth && boxHeight) {
    p5.text(text, 0, 0, boxWidth, boxHeight)
  }
  else {
    p5.text(text, 0, 0)
  }
}

export const renderImage = config => {
  const {p5, image, dimensions} = config
  const {CENTER} = p5

  p5.imageMode(CENTER)
  p5.image(image, 0, 0, dimensions.w, dimensions.h)
}

export const renderOutline = config => {
  const {p5, color, dimensions, shape} = config
  const { hue, saturation, lightness } = color
  p5.noFill()
  p5.stroke(hue, saturation, lightness)
  if (shape === 'rect') {
    p5.rect(0, 0, dimensions.w + dimensions.padding, dimensions.h + dimensions.padding)
  }
  else if (shape === 'circle') {
    p5.ellipse(0, 0, dimensions.w + dimensions.padding)
  }
}

export const renderHighlight = config => {
  const {p5, dimensions, shape} = config
  p5.fill(0, 0, 100, 0.05)
  if (shape === 'rect') {
    p5.rect(0, 0, dimensions.w + dimensions.padding, dimensions.h + dimensions.padding)
  }
  else if (shape === 'circle') {
    p5.ellipse(0, 0, dimensions.w + dimensions.padding)
  }
}

export const checkMouseInBounds = (instance, mousePosition, config) => {
  const {p5, shape} = config
  const {body} = instance
  if (shape === 'rect') {
    const vertices = body.vertices
    const mouseArea = areaFromPoints(mousePosition, vertices, p5)
    return (mouseArea < body.area + 1)
  }
  else if (shape === 'circle') {
    const distance = p5.dist(body.position.x, body.position.y, mousePosition.x, mousePosition.y)
    return (distance < instance.config.dimensions.w / 2)
  }
}

export const manageParticleRender = array => {
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

export const manageBubbleRender = (array, mousePosition) => {
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




