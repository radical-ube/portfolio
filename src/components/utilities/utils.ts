import p5 from 'p5'
import Matter from 'matter-js'

import { 
  TextSettings,
  Button,
  Alignment
} from '../types'

import {
  distanceBetweenTwoPoints,
  rectAreaFromVertices
} from '.'

export const defaultAlignment: Alignment = {
  horizontal: 'center',
  vertical: 'center'
}

export const parseAlignment = (alignment: Alignment | undefined): Alignment => {
  if (alignment) return alignment
  else return defaultAlignment
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


export const checkMouseInBounds = (obj: Button) => {
  const { bodySettings, body, sketch } = obj
  const { shape, w } = bodySettings
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
      const distance = distanceBetweenTwoPoints(body.position, mousePosition)
      obj.mouseInBounds = (distance < w / 2)
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


