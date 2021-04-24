import p5 from 'p5'

import { 
  TextSettings,
  PhysicalObject,
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

// export const checkGroupForRemoval = (world, group) => {
//   if (group.length) {
//     for (let i = 0; i < group.length; i++) {
//       const instance = group[i]
//       if (instance.shouldBeRemoved()) {
//         World.remove(world, instance.body)
//         group.splice(i, 1)
//         i--
//       }
//     }
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




