import Matter from 'matter-js'

const { World } = Matter

export const renderGroup = array => {
  array.forEach(body => {
    body.show()
  })
}

export const renderProjectDescription = projects => {
  projects.forEach(project => {
    if (project.mouseInBounds) {
      project.description.show()
      project.webButton.show()
      project.githubButton.show()
    }
  })
}

const distanceBetweenTwoPoints = (pointOne, pointTwo) => {
  let sideOne = pointOne.x - pointTwo.x
  let sideTwo = pointOne.y - pointTwo.y

  return Math.sqrt( sideOne*sideOne + sideTwo*sideTwo )
}

const triangleFromVertices = (vertexOne, vertexTwo, vertexThree) => {
  const sideOne = distanceBetweenTwoPoints(vertexOne, vertexTwo)
  const sideTwo = distanceBetweenTwoPoints(vertexOne, vertexThree)
  const sideThree = distanceBetweenTwoPoints(vertexTwo, vertexThree)

  return {
    sideOne,
    sideTwo,
    sideThree
  }
}

const areaOfTriangle = triangle => {
  const { sideOne, sideTwo, sideThree } = triangle
  const semiPerimeter = (sideOne + sideTwo + sideThree) / 2

  return Math.sqrt(semiPerimeter * (semiPerimeter - sideOne) * (semiPerimeter - sideTwo) * (semiPerimeter - sideThree))
}

const rectAreaFromVertices = (position, vertices) => {
  // find and sum the triangles created from position and vertices
  return vertices
    // find sides of triangles
    .map((vertex, index, array) => {
      let nextPointIdx = index + 1
      if (index === array.length - 1) nextPointIdx = 0
      return triangleFromVertices(position, vertex, array[nextPointIdx])
    })
    // find areas of triangles
    .map(triangle => {
      return areaOfTriangle(triangle)
    })
    // sum all the triangles
    .reduce((sum, curVal) => {
      return sum + curVal
    }, 0)
}

export const checkMouseInBounds = (instance) => {
  const { config, body } = instance
  const { p5, shape } = config
  const mousePosition = {
    x: p5.mouseX,
    y: p5.mouseY
  }
  if (shape === 'rect') {
    const vertices = body.vertices
    const mouseArea = rectAreaFromVertices(mousePosition, vertices)
    instance.mouseInBounds = (mouseArea < body.area + 1)
  }
  else if (shape === 'circle') {
    const distance = distanceBetweenTwoPoints(body.position, mousePosition)
    instance.mouseInBounds = (distance < instance.config.dimensions.w / 2)
  }
}

export const checkGroupForMouse = (group) => {
  group.forEach(instance => {
    checkMouseInBounds(instance)
  })
}

export const checkGroupForRemoval = (world, group) => {
  if (group.length) {
    for (let i = 0; i < group.length; i++) {
      const instance = group[i]
      if (instance.shouldBeRemoved()) {
        World.remove(world, instance.body)
        group.splice(i, 1)
        i--
      }
    }
  }
}