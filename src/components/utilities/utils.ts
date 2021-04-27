import p5 from 'p5'
import Matter from 'matter-js'

import { 
  TextSettings,
  Button,
  Alignment,
  CircleBodySettings,
  Bubble,
  ProjectEnv,
  ImageSettings,
  ImageBox,
  RectBodySettings,
  TextBox,
  LinkButton,
  ProjectData,
  LoadedImageData
} from '../types'

import {
  distanceBetweenTwoPoints,
  rectAreaFromVertices,
  addToWorld,
  defaultColor
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

export const createProjectGroup = (sketch: p5, environment: ProjectEnv, data: ProjectData, images: LoadedImageData[]) => {
  const { width, height, world, bodies, buttons } = environment
  const { imageKey, titleText, descriptionText, websiteAddress, githubAddress } = data

  const imageWidth = width * 0.45
  const imageHeight = imageWidth * (9 / 16)
  const textSize = width * 0.03

  const image = images.filter(image => image.key === imageKey)

  const imgSettings: ImageSettings = {
    bodySettings: {
      x: width * 0.25,
      y: height * 0.35,
      w: imageWidth,
      h: imageHeight,
      options: {
        isStatic: true
      },
      shape: 'rect'
    },
    image: image[0].object
  }

  const projectImg = new ImageBox(sketch, imgSettings)
  addToWorld(world, projectImg, bodies)
  
  const titleDimensions = setTextDimensions(sketch, {
    textSize,
    text: titleText
  })
  const titleBodySettings: RectBodySettings = {
    x: width * 0.25,
    y: height * 0.725,
    w: titleDimensions.w,
    h: titleDimensions.h,
    options: {isStatic: true},
    padding: 10,
    shape: 'rect'
  }
  const title = new TextBox(sketch, {
    bodySettings: titleBodySettings,
    textSettings: {
      textSize,
      text: titleText,
      color: defaultColor,
      alignment: defaultAlignment
    }
  })
  addToWorld(world, title, bodies)

  const descriptionDimensions = setTextDimensions(sketch, {
    textSize: textSize * 0.55,
    text: descriptionText,
    boxWidth: imageWidth,
    boxHeight: imageHeight
  })
  const descriptionBodySettings: RectBodySettings = {
    x: width * 0.75,
    y: height * 0.35,
    w: descriptionDimensions.w,
    h: descriptionDimensions.h,
    options: {isStatic: true},
    padding: 10,
    shape: 'rect'
  }
  const description = new TextBox(sketch, {
    bodySettings: descriptionBodySettings,
    textSettings: {
      textSize: textSize * 0.55,
      text: descriptionText,
      boxWidth: imageWidth,
      boxHeight: imageHeight,
      color: defaultColor,
      alignment: {
        horizontal: 'left',
        vertical: 'top'
      }
    }
  })
  addToWorld(world, description, bodies)

  if (websiteAddress) {
    const websiteButtonDimensions = setTextDimensions(sketch, {
      textSize: textSize * 0.55,
      text: 'website'
    })
    const websiteButtonBodySettings: RectBodySettings = {
      x: titleBodySettings.x - 50,
      y: titleBodySettings.y + 50,
      w: websiteButtonDimensions.w,
      h: websiteButtonDimensions.h,
      options: {isStatic: true},
      shape: 'rect',
      padding: 10
    }
    const websiteButton = new LinkButton(sketch, {
      bodySettings: websiteButtonBodySettings,
      textSettings: {
        text: 'website',
        textSize: textSize * 0.55
      },
      address: websiteAddress
    })
    addToWorld(world, websiteButton, buttons)
  }

  const githubButtonDimensions = setTextDimensions(sketch, {
    textSize: textSize * 0.55,
    text: 'github'
  })
  const githubButtonBodySettings: RectBodySettings = {
    x: titleBodySettings.x + 50,
    y: titleBodySettings.y + 50,
    w: githubButtonDimensions.w,
    h: githubButtonDimensions.h,
    options: {isStatic: true},
    shape: 'rect',
    padding: 10
  }
  const githubButton = new LinkButton(sketch, {
    bodySettings: githubButtonBodySettings,
    textSettings: {
      text: 'github',
      textSize: textSize * 0.55
    },
    address: githubAddress
  })
  addToWorld(world, githubButton, buttons)

}

export const preloadImages = (sketch: p5, images: any[]) => {
  return images.map(image => {
    image.object = sketch.loadImage(image.object)
    return image
  })
}