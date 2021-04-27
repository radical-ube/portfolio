import p5 from 'p5'
import {
  TextSettings,
  RectBodySettings,
  CircleBodySettings,
  RenderedObject,
  ImageSettings
} from '../types'
import {
  defaultColor,
  defaultAlignment
} from '.'

export const renderText = (sketch: p5, textSettings: TextSettings) => {
  const { textSize, text, color = defaultColor, alignment = defaultAlignment, boxWidth, boxHeight } = textSettings
  const { hue, saturation, lightness } = color
  const { horizontal, vertical } = alignment

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

export const renderOutline = (sketch: p5, bodySettings: RectBodySettings | CircleBodySettings) => {
  const { color = defaultColor, shape, padding = 0 } = bodySettings
  const { hue, saturation, lightness } = color
  sketch.colorMode('hsl')
  sketch.noFill()
  sketch.stroke(hue, saturation, lightness)
  switch (shape) {
    case 'rect':
      const { w, h } = bodySettings as RectBodySettings
      sketch.rect(0, 0, w + padding, h + padding)
      break
    case 'circle':
      const { r } = bodySettings as CircleBodySettings
      sketch.ellipse(0, 0, (r * 2) + padding)
      break
  }
}

export const renderHighlight = (sketch: p5, bodySettings: RectBodySettings | CircleBodySettings) => {
  const { padding = 0, shape } = bodySettings
  sketch.colorMode('hsl')
  sketch.noStroke()
  sketch.fill(0, 0, 100, 0.1)
  switch (shape) {
    case 'rect':
      const { w, h } = bodySettings as RectBodySettings
      sketch.rectMode('center')
      sketch.rect(0, 0, w + padding, h + padding)
      break
    case 'circle':
      const { r } = bodySettings as CircleBodySettings
      sketch.ellipse(0, 0, (r * 2) + padding)
      break
  }
}

export const renderGroup = (array: RenderedObject[]): void => {
  array.forEach(obj => {
    obj.show()
  })
}

export const renderImage = (sketch: p5, imageSettings: ImageSettings) => {
  const { image, bodySettings } = imageSettings
  const { w, h } = bodySettings

  sketch.imageMode('center')
  sketch.image(image, 0, 0, w, h)
}

export const renderProjectDescription = (projects: any[]) => {
  projects.forEach(project => {
    if (project.mouseInBounds) {
      project.description.show()
      project.webButton.show()
      project.githubButton.show()
    }
  })
}

export const renderLowlight = (sketch: p5, bodySettings: RectBodySettings | CircleBodySettings) => {
  const { padding = 0, shape } = bodySettings
  sketch.colorMode('hsl')
  sketch.noStroke()
  sketch.fill(0, 0, 0, 0.8)
  switch (shape) {
    case 'rect':
      const { w, h } = bodySettings as RectBodySettings
      sketch.rectMode('center')
      sketch.rect(0, 0, w + padding, h + padding)
      break
    case 'circle':
      const { r } = bodySettings as CircleBodySettings
      sketch.ellipse(0, 0, r + padding)
      break
  }
}



