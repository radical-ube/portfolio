import Matter from 'matter-js'

const {World, Mouse, MouseConstraint} = Matter

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min)) + min 
}

export const getRedColor = () => {
  return {
    hue: getRandomInt(346, 357),
    saturation: getRandomInt(85, 101),
    lightness: getRandomInt(48, 55),
    alpha: getRandomInt(85, 101)
  }
}

export const getOrangeColor = () => {
  return {
    hue: getRandomInt(10, 24),
    saturation: getRandomInt(88, 101),
    lightness: getRandomInt(58, 61),
    alpha: getRandomInt(85, 101)
  }
}

export const getYellowColor = () => {
  return {
    hue: getRandomInt(47, 58),
    saturation: getRandomInt(85, 101),
    lightness: getRandomInt(58, 66),
    alpha: getRandomInt(85, 101)
  }
}

export const getGreenColor = () => {
  return {
    hue: getRandomInt(82, 115),
    saturation: getRandomInt(70, 85),
    lightness: getRandomInt(42, 50),
    alpha: getRandomInt(85, 101)
  }
}

export const getBlueColor = () => {
  return {
    hue: getRandomInt(215, 240),
    saturation: getRandomInt(75, 90),
    lightness: getRandomInt(56, 58),
    alpha: getRandomInt(85, 101)
  }
}

export const getPurpleColor = () => {
  return {
    hue: getRandomInt(268, 288),
    saturation: getRandomInt(80, 95),
    lightness: getRandomInt(52, 58),
    alpha: getRandomInt(85, 101)
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

// export const repositionBoundaries = (boundary, newWidth, newHeight) => {
//   // boundaries.forEach(boundary => {
//     if (boundary.label === 'ground') {
//       boundary.position.x = newWidth / 2
//       boundary.position.y = newHeight * 2
//     }
//     else if (boundary.label === 'ceiling') {
//       boundary.position.x = newWidth / 2
//       boundary.position.y = newHeight * -1
//     }
//     else if (boundary.label === 'leftwall') {
//       boundary.position.x = newWidth * -1
//       boundary.position.y = newHeight / 2
//     }
//     else if (boundary.label === 'rightwall') {
//       boundary.position.x = newWidth * 2
//       boundary.position.y = newHeight / 2
//     }
//     boundary.velocity.x = 0
//     boundary.velocity.y = 0
//   // })
// }