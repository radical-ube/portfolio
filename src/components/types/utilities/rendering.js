import Matter from 'matter-js'

import {
  distanceBetweenTwoPoints,
  rectAreaFromVertices
} from '.'
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