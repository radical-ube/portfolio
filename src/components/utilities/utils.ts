import p5 from 'p5'
import Matter from 'matter-js'

import { 
  TextSettings,
  Button,
  Alignment,
  CircleBodySettings,
  Bubble
} from '../types'

import {
  distanceBetweenTwoPoints,
  rectAreaFromVertices,
} from './'

export const defaultAlignment: Alignment = {
  horizontal: 'center',
  vertical: 'center'
}

export const setTextDimensions = (sketch: p5, textSettings: TextSettings) => {
  const { text, textSize, boxWidth, boxHeight, padding = 10 } = textSettings
  sketch.textSize(textSize || 18)
  return {
    w: boxWidth || sketch.textWidth(text),
    h: boxHeight || sketch.textAscent(),
    padding: padding
  }
}

export const checkMouseInBounds = (obj: Button | Bubble) => {
  const { bodySettings, body, sketch } = obj
  const { shape } = bodySettings
  const mousePosition = {
    x: sketch.mouseX,
    y: sketch.mouseY
  }

  switch (shape) {
    case 'rect':
      const vertices = body.vertices
      const mouseArea = rectAreaFromVertices(mousePosition, vertices)
      obj.mouseInBounds = (mouseArea < body.area + 1)
      break
    case 'circle':
      const { r } = bodySettings as CircleBodySettings
      const distance = distanceBetweenTwoPoints(body.position, mousePosition)
      obj.mouseInBounds = (distance < r)
      break
  }
}

export const checkGroupForMouse = (group: any[]) => {
  group.forEach(instance => {
    checkMouseInBounds(instance)
  })
}

export const checkGroupForRemoval = (world: Matter.World, group: any[]) => {
  if (group.length) {
    for (let i = 0; i < group.length; i++) {
      const instance = group[i]
      if (instance.shouldBeRemoved()) {
        Matter.World.remove(world, instance.body)
        group.splice(i, 1)
        i--
      }
    }
  }
}

export const clearGroup = (group: any[]) => {
  while (group.length) group.shift()
}

export const preloadImages = (sketch: p5, images: any[]) => {
  return images.map(image => {
    image.object = sketch.loadImage(image.object)
    return image
  })
}