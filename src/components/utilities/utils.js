import Matter from 'matter-js'
import {ImageBox, ParagraphBox, Button, ColorBall, Bubble} from './constructors'

const {World, Mouse, MouseConstraint} = Matter

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min)) + min 
}

export const getRedColor = () => {
  return {
    hue: getRandomInt(344, 352),
    saturation: getRandomInt(85, 101),
    lightness: getRandomInt(48, 55),
  }
}

export const getOrangeColor = () => {
  return {
    hue: getRandomInt(20, 28),
    saturation: getRandomInt(90, 101),
    lightness: getRandomInt(45, 52),
  }
}

export const getYellowColor = () => {
  return {
    hue: getRandomInt(47, 58),
    saturation: getRandomInt(85, 101),
    lightness: getRandomInt(52, 60),
  }
}

export const getGreenColor = () => {
  return {
    hue: getRandomInt(112, 128),
    saturation: getRandomInt(47, 55),
    lightness: getRandomInt(38, 42),
  }
}

export const getBlueColor = () => {
  return {
    hue: getRandomInt(223, 240),
    saturation: getRandomInt(75, 90),
    lightness: getRandomInt(56, 58),
  }
}

export const getPurpleColor = () => {
  return {
    hue: getRandomInt(268, 288),
    saturation: getRandomInt(80, 95),
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

// export const createProjectDescription = (environment, assets) => {
//   const { width, height } = environment
//   const {imageWidth, imageHeight, image, text, address} = assets
//   const imageSettings = {
    
//   }
//   new ImageBox(environment)
// }

export const createBubbles = (environment, button) => {
  const {width, height} = environment
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
      inputText: value,
      textSize
    })
  })
}