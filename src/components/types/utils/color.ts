import {
  Color
} from '../types'

import {
  getRandomInt
} from './math'

const getRedColor = (): Color => {
  return {
    hue: getRandomInt(347, 353),
    saturation: getRandomInt(150, 201),
    lightness: getRandomInt(47, 51),
  }
}

const getOrangeColor = (): Color => {
  return {
    hue: getRandomInt(20, 28),
    saturation: getRandomInt(200, 256),
    lightness: getRandomInt(50, 61),
  }
}

const getYellowColor = (): Color => {
  return {
    hue: getRandomInt(47, 58),
    saturation: getRandomInt(200, 256),
    lightness: getRandomInt(52, 60),
  }
}

const getGreenColor = (): Color => {
  return {
    hue: getRandomInt(112, 128),
    saturation: getRandomInt(210, 251),
    lightness: getRandomInt(35, 38),
  }
}

const getBlueColor = (): Color => {
  return {
    hue: getRandomInt(223, 240),
    saturation: getRandomInt(210, 241),
    lightness: getRandomInt(58, 61),
  }
}

const getPurpleColor = (): Color => {
  return {
    hue: getRandomInt(277, 286),
    saturation: getRandomInt(210, 246),
    lightness: getRandomInt(52, 58),
  }
}

export const defaultColor: Color = {
  hue: 0,
  saturation: 0,
  lightness: 94
}

export const randomColor = (): Color => {
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
    default:
      return defaultColor
  }
}