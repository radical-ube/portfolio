import p5 from 'p5'

import { 
  TextSettings,
} from './types'

import {
  distanceBetweenTwoPoints,
  rectAreaFromVertices
} from './utilities'

// export const defaultAlignment = {
//   horizontal: Horizontal.Center,
//   vertical: Vertical.Center
// }

// const parseAlignment = (alignment: Alignment | undefined): Alignment => {
//   if (alignment) return alignment
//   else return defaultAlignment
// }


export const setTextDimensions = (sketch: p5, textSettings: TextSettings) => {
  const { text, textSize, boxWidth, boxHeight, padding } = textSettings
  sketch.textSize(textSize || 18)
  return {
    w: boxWidth || sketch.textWidth(text),
    h: boxHeight || sketch.textAscent(),
    padding: padding || 10
  }
}


// export const createColorParticles = (environment: Environment) => {
//   const { width } = environment
//   const particleSettings = {
//     x: width * 0.3,
//     y: 10,
//     r: getRandomInt(4, 9),
//     options: {
//       friction: 0,
//       restitution: 0.4,
//       isStatic: false
//     },
//     color: randomColor()
//   }

//   new ColorBallConstructor(environment, particleSettings)
// }

// export const desaturateColor = (environment: Environment, color: Color): Color => {
//   const { sketch } = environment
//   return {
//     hue: color.hue,
//     saturation: sketch.lerp(color.saturation, defaultColor.saturation, 0.4),
//     lightness: sketch.lerp(color.lightness, defaultColor.lightness, 0.2)
//   }
// }

// export const createBubbles = (environment: Environment, button: Button) => {
//   const position = button.body.position
//   const textSize = button.config.textSettings.textSize

//   button.text.forEach(text => {
//     let x = getRandomInt(position.x - 10, position.x + 10)
//     let y = getRandomInt(position.y - 30, position.y - 50)

//     new BubbleConstructor(environment, {
//       x,
//       y,
//       options: {
//         frictionAir: 0.25,
//         restitution: 0.8,
//         isStatic: false
//       },
//       textSettings: {
//         text: text,
//         textSize
//       },
//       color: desaturateColor(environment, randomColor())
//     })
//   })
// }



// export const renderImage = (config: ImageConfig) => {
//   const { sketch, image, dimensions } = config

//   sketch.imageMode('center')
//   sketch.image(image, 0, 0, dimensions.w, dimensions.h)
// }



// export const renderLowlight = (config: ColorRenderConfig) => {
//   const { sketch, dimensions, shape } = config
//   sketch.colorMode('hsl')
//   sketch.noStroke()
//   sketch.fill(0, 0, 0, 0.8)
//   switch (shape) {
//     case 'rect':
//       sketch.rectMode('center')
//       sketch.rect(0, 0, dimensions.w + (dimensions.padding || 0), dimensions.h + (dimensions.padding || 0))
//       break
//     case 'circle':
//       sketch.ellipse(0, 0, dimensions.w + dimensions.padding)
//       break
//   }
// }

export const checkMouseInBounds = (mousePosition: any, obj: any) => {
  const { bodySettings, body } = obj
  const { shape, w } = bodySettings

  switch (shape) {
    case 'rect':
      const vertices = body.vertices
      const mouseArea = rectAreaFromVertices(mousePosition, vertices)
      obj.mouseInBounds = (mouseArea < body.area + 1)
    case 'circle':
      const distance = distanceBetweenTwoPoints(body.position, mousePosition)
      obj.mouseInBounds = (distance < w / 2)
  }
}

export const checkGroupForMouse = (mousePosition: any, group: any[]) => {
  group.forEach(instance => {
    checkMouseInBounds(mousePosition, instance)
  })
}

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




