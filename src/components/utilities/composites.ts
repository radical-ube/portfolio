import p5 from 'p5'

import {
  PhysicalEnv,
  AboutEnv,
  ProjectEnv,
  ExperienceEnv,
  RectBodySettings,
  CircleBodySettings,
  ImageSettings,
  TextBox,
  ImageBox,
  ColorBall,
  LinkButton,
  BubbleButton,
  Bubble,
  SetupModifiers
} from '../types'

import {
  setTextDimensions,
  randomColor,
  addToWorld,
  getRandomInt,
  desaturateColor
} from './'

import {
  defaultAlignment,
  defaultColor
} from '../setups'

type Modifiers = {
  xMod: number
  offsetMod?: number
}


export const createWordColumn = (sentence: string, sketch: p5, environment: PhysicalEnv, modifiers: Modifiers) => {
  const { width, height, world, bodies } = environment
  const { xMod, offsetMod } = modifiers
  
  sentence.split(' ')
    .forEach((text, index, array) => {
      const textSize = height / array.length
      let mod

      if (offsetMod && index === 1) mod = offsetMod
      else mod = xMod

      const x = width * mod
      const y = height * 0.2 + (index * textSize)

      const dimensions = setTextDimensions(sketch, {
        textSize,
        text
      })

      const options = {
        friction: 0.4,
        restitution: 0.8,
        isStatic: false
      }

      const bodySettings: RectBodySettings = {
        x,
        y,
        w: dimensions.w,
        h: dimensions.h,
        options,
        shape: 'rect'
      }

      const textSettings = {
        textSize,
        text,
        color: randomColor(),
        alignment: defaultAlignment
      }

      const settings = {
        bodySettings,
        textSettings
      }

      const word = new TextBox(sketch, settings)
      addToWorld(world, word, bodies)
    })
}

export const createColorParticles = (sketch: p5, environment: AboutEnv) => {
  const { width, particles, world } = environment

  const particleSettings: CircleBodySettings = {
    x: width * 0.3,
    y: 10,
    r: getRandomInt(4, 9),
    options: {
      friction: 0,
      restitution: 0.4,
      isStatic: false
    },
    color: randomColor(),
    shape: 'circle'
  }

  const colorBall = new ColorBall(sketch, particleSettings)
  if (particles.length < 200) {
    addToWorld(world, colorBall, particles)
  }
}

export const createBubbles = (sketch: p5, environment: ExperienceEnv, bubbleButton: BubbleButton) => {
  const position = bubbleButton.body.position
  const textSize = bubbleButton.textSettings.textSize

  bubbleButton.text.forEach((text: string) => {
    let x = getRandomInt(position.x - 10, position.x + 10)
    let y = getRandomInt(position.y - 30, position.y - 50)

    const dimensions = setTextDimensions(sketch, {
      textSize,
      text
    })

    const color = desaturateColor(sketch, randomColor())
    const bubble = new Bubble(sketch, {
      bodySettings: {
        x,
        y,
        r: dimensions.w / 2,
        padding: dimensions.padding,
        options: {
          frictionAir: 0.25,
          restitution: 0.8,
          isStatic: false
        },
        shape: 'circle',
        color
      },
      textSettings: {
        text: text,
        textSize,
        color
      },
    })
    addToWorld(environment.world, bubble, environment.bubbles)
  })
}

export const createProjectGroup = (sketch: p5, environment: ProjectEnv, modifiers: SetupModifiers) => {
  const { width, height, world, bodies, buttons } = environment
  const { projectData, images } = modifiers
  const { imageKey, titleText, descriptionText, websiteAddress, githubAddress } = projectData

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