function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}

export const getRedColor = () => {
  return {
    hue: getRandomInt(346, 357),
    saturation: getRandomInt(85, 100),
    lightness: getRandomInt(48, 55),
    alpha: getRandomInt(85, 100)
  }
}

export const getOrangeColor = () => {
  return {
    hue: getRandomInt(10, 24),
    saturation: getRandomInt(88, 100),
    lightness: getRandomInt(58, 61),
    alpha: getRandomInt(85, 100)
  }
}

export const getYellowColor = () => {
  return {
    hue: getRandomInt(47, 58),
    saturation: getRandomInt(85, 100),
    lightness: getRandomInt(58, 66),
    alpha: getRandomInt(85, 100)
  }
}

export const getGreenColor = () => {
  return {
    hue: getRandomInt(82, 120),
    saturation: getRandomInt(70, 85),
    lightness: getRandomInt(42, 50),
    alpha: getRandomInt(85, 100)
  }
}

export const getBlueColor = () => {
  return {
    hue: getRandomInt(215, 240),
    saturation: getRandomInt(75, 95),
    lightness: getRandomInt(56, 58),
    alpha: getRandomInt(85, 100)
  }
}

export const getPurpleColor = () => {
  return {
    hue: getRandomInt(268, 288),
    saturation: getRandomInt(80, 95),
    lightness: getRandomInt(47, 55),
    alpha: getRandomInt(85, 100)
  }
}

export const getRandomColor = () => {
  let choice = getRandomInt(1, 6)
  switch (choice) {
    case 1:
      return getRedColor
    case 2:
      return getOrangeColor
    case 3:
      return getYellowColor
    case 4:
      return getGreenColor
    case 5:
      return getBlueColor
    case 6:
      return getPurpleColor
  }
}