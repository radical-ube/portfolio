import p5 from 'p5'
import {
  TextSettings,
  BodySettings,
  Color
} from '../types'
import {
  parseColor,
  parseAlignment
} from '.'

export const renderText = (sketch: p5, textSettings: TextSettings) => {
  const { textSize, text, color, alignment, boxWidth, boxHeight } = textSettings
  const { hue, saturation, lightness } = parseColor(color)
  const { horizontal, vertical } = parseAlignment(alignment)

  sketch.rectMode('center')
  sketch.textAlign(horizontal, vertical)
  sketch.textSize(textSize)
  sketch.colorMode('hsl')
  sketch.fill(hue, saturation, lightness)
  if (boxWidth && boxHeight) {
    sketch.text(text, 0, 0, boxWidth, boxHeight)
  }
  else {
    sketch.text(text, 0, 0)
  }
}

export const renderOutline = (sketch: p5, bodySettings: BodySettings, color: Color) => {
  const { w, h, shape, padding = 0 } = bodySettings
  const { hue, saturation, lightness } = color
  sketch.colorMode('hsl')
  sketch.noFill()
  sketch.stroke(hue, saturation, lightness)
  switch (shape) {
    case 'rect':
      sketch.rect(0, 0, w + padding, h + padding)
      break
    case 'circle':
      sketch.ellipse(0, 0, w + padding)
      break
  }
}

export const renderHighlight = (sketch: p5, bodySettings: BodySettings) => {
  const { w, h, padding = 0, shape } = bodySettings
  sketch.colorMode('hsl')
  sketch.noStroke()
  sketch.fill(0, 0, 100, 0.1)
  switch (shape) {
    case 'rect':
      sketch.rectMode('center')
      sketch.rect(0, 0, w + (padding || 0), h + (padding || 0))
      break
    case 'circle':
      sketch.ellipse(0, 0, w + padding)
      break
  }
}

export const renderGroup = (array: any[]): void => {
  array.forEach(obj => {
    obj.show()
  })
}

// export const renderImage = (config: ImageConfig) => {
//   const { sketch, image, dimensions } = config

//   sketch.imageMode('center')
//   sketch.image(image, 0, 0, dimensions.w, dimensions.h)
// }

// export const renderProjectDescription = projects => {
//   projects.forEach(project => {
//     if (project.mouseInBounds) {
//       project.description.show()
//       project.webButton.show()
//       project.githubButton.show()
//     }
//   })
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



