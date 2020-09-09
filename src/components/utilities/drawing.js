export const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min)) + min
}

const getRedColor = () => {
  return {
    hue: getRandomInt(347, 353),
    saturation: getRandomInt(150, 201),
    lightness: getRandomInt(47, 51),
  }
}

const getOrangeColor = () => {
  return {
    hue: getRandomInt(20, 28),
    saturation: getRandomInt(200, 256),
    lightness: getRandomInt(50, 61),
  }
}

const getYellowColor = () => {
  return {
    hue: getRandomInt(47, 58),
    saturation: getRandomInt(200, 256),
    lightness: getRandomInt(52, 60),
  }
}

const getGreenColor = () => {
  return {
    hue: getRandomInt(112, 128),
    saturation: getRandomInt(210, 251),
    lightness: getRandomInt(35, 38),
  }
}

const getBlueColor = () => {
  return {
    hue: getRandomInt(223, 240),
    saturation: getRandomInt(210, 241),
    lightness: getRandomInt(58, 61),
  }
}

const getPurpleColor = () => {
  return {
    hue: getRandomInt(277, 286),
    saturation: getRandomInt(210, 246),
    lightness: getRandomInt(52, 58),
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

export const defaultColor = {
  hue: 0,
  saturation: 0,
  lightness: 94
}

export const desaturateColor = (environment, color) => {
  const { p5 } = environment
  return {
    hue: color.hue,
    saturation: p5.lerp(color.saturation, defaultColor.saturation, 0.4),
    lightness: p5.lerp(color.lightness, defaultColor.lightness, 0.2)
  }
}

export const setTextDimensions = config => {
  const { p5, textSettings } = config
  const { text, textSize, boxWidth, boxHeight, padding } = textSettings
  p5.textSize(textSize || 18)
  return {
    textSize: textSize,
    w: boxWidth || p5.textWidth(text),
    h: boxHeight || p5.textAscent(text),
    padding: padding || 10
  }
}

export const transformBody = (p5, body) => {
  const position = body.position
  const angle = body.angle

  p5.translate(position.x, position.y)
  p5.rotate(angle)
}

export const drawText = config => {
  const { p5, textSettings, color, alignment } = config
  const { CENTER, HSL } = p5
  const { textSize, text, boxWidth, boxHeight } = textSettings
  const { hue, saturation, lightness } = color

  p5.rectMode(CENTER)
  p5.textAlign(alignment.horizontal, alignment.vertical)
  p5.textSize(textSize)
  p5.colorMode(HSL)
  p5.fill(hue, saturation, lightness)
  if (boxWidth && boxHeight) {
    p5.text(text, 0, 0, boxWidth, boxHeight)
  }
  else {
    p5.text(text, 0, 0)
  }
}

export const drawImage = config => {
  const { p5, image, dimensions } = config
  const { CENTER } = p5

  p5.imageMode(CENTER)
  p5.image(image, 0, 0, dimensions.w, dimensions.h)
}

export const drawOutline = config => {
  const { p5, color, dimensions, shape } = config
  const { hue, saturation, lightness } = color
  p5.colorMode(p5.HSL)
  p5.noFill()
  p5.stroke(hue, saturation, lightness)
  if (shape === 'rect') {
    p5.rect(0, 0, dimensions.w + dimensions.padding, dimensions.h + dimensions.padding)
  }
  else if (shape === 'circle') {
    p5.ellipse(0, 0, dimensions.w + dimensions.padding)
  }
}

export const drawHighlight = config => {
  const { p5, dimensions, shape } = config
  p5.colorMode(p5.HSL)
  p5.noStroke()
  p5.fill(0, 0, 100, 0.1)
  if (shape === 'rect') {
    p5.rectMode(p5.CENTER)
    p5.rect(0, 0, dimensions.w + (dimensions.padding || 0), dimensions.h + (dimensions.padding || 0))
  }
  else if (shape === 'circle') {
    p5.ellipse(0, 0, dimensions.w + dimensions.padding)
  }
}

export const drawLowlight = config => {
  const { p5, dimensions, shape } = config
  p5.colorMode(p5.HSL)
  p5.noStroke()
  p5.fill(0, 0, 0, 0.8)
  if (shape === 'rect') {
    p5.rectMode(p5.CENTER)
    p5.rect(0, 0, dimensions.w + (dimensions.padding || 0), dimensions.h + (dimensions.padding || 0))
  }
  else if (shape === 'circle') {
    p5.ellipse(0, 0, dimensions.w + dimensions.padding)
  }
}