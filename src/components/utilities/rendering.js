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

export const checkMouseInBounds = (instance) => {
  const { config, body } = instance
  const { p5, shape } = config
  const mousePosition = {
    x: p5.mouseX,
    y: p5.mouseY
  }
  if (shape === 'rect') {
    const vertices = body.vertices
    const mouseArea = areaFromPoints(mousePosition, vertices, p5)
    instance.mouseInBounds = (mouseArea < body.area + 1)
  }
  else if (shape === 'circle') {
    const distance = p5.dist(body.position.x, body.position.y, mousePosition.x, mousePosition.y)
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