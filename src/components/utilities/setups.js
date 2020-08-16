import { Boundary, TextBox, ParagraphBox, TextPlatform, ImageBox, Spring, Chain } from './constructors'
import { randomColor } from './utils'


export const setupFrame = environment => {
  const { world, width, height } = environment

  new Boundary(width / 2, height * 2, width * 2, height * 2, 'ground', world)
  new Boundary(width / 2, height * -1, width * 2, height * 2, 'ceiling', world)
  new Boundary(width * -1, height / 2, width * 2, height, 'leftwall', world)
  new Boundary(width * 2, height / 2, width * 2, height, 'rightwall', world)
}

export const setupNav = (environment) => {
  const { width, height, bodies, tabs } = environment

  let previousWord = null
  for (let i = 0; i < tabs.length; i++) {
    let settings = {
      x: 0,
      y: 0,
      inputText: tabs[i],
      options: {
        friction: 0.4,
        restitution: 0.8,
        isStatic: false
      },
      textSize: height / 3,
      color: randomColor()
    }
    if (!previousWord || i === tabs.length - 1) settings.options.isStatic = true
    settings.x = -15 + (i * 20)
    settings.y = height * 0.5
    if (i === tabs.length - 1) {
      settings.x = width + 15
    }
    let word = new TextBox(environment, settings)
    bodies.push(word)

    if (i > 0) {
      let constraintSettings = {
        bodyA: word.body,
        bodyB: previousWord.body,
        length: width * 0.135,
        stiffness: 0.65
      }
      new Spring(environment, constraintSettings)
      
    }
    previousWord = word
  }
}

export const setupHome = (environment) => {
  const { width, height } = environment

  let homeText1 = 'hello world, my name is ube'
  homeText1.split(' ')
    .forEach((word, index, array) => {
      const textSize = height / array.length
      let x = width * 0.35
      let y = height * 0.2 + (index * textSize)

      if (index === 1) {
        x = width * 0.41
      }

      const settings = {
        textSize,
        x,
        y,
        inputText: word,
        options: {
          friction: 0.4,
          restitution: 0.8,
          isStatic: false
        },
        color: randomColor()
      }

      new TextBox(environment, settings)
    })

  let homeText2 = 'i am a work in progress'
  homeText2.split(' ')
    .forEach((word, index, array) => {
      const textSize = height / array.length
      let x = width * 0.65
      let y = height * 0.2 + (index * textSize)

      const settings = {
        textSize,
        x,
        y,
        inputText: word,
        options: {
          friction: 0.4,
          restitution: 0.8,
          isStatic: false
        },
        color: randomColor()
      }

      new TextBox(environment, settings)
    })
}

export const setupAbout = (environment, bodies) => {
  const { width, height } = environment

  let platform1 = 'i am a colorful non-binary queer performing artist turned software engineer.'
  let platform2 = 'i '
  let platform3 = 'as an engineer, coding feels like magic and i want to keep the spirit of that magic alive.'
  let platform4 = 'as a performer, i take inspiration from post-modernist values, where bodies have agency'
  // const words = titleText.split(' ')
//   words.forEach((word, index, array) => {
//     const settings = {
//       inputText: word,
//       options: {
//         friction: 0.4,
//         restitution: 0.8,
//         isStatic: false
//       },
//       textSize: height / array.length,
//       color: randomColor()
//     }

//     settings.x = width / 2
//     settings.y = height * 0.2 + (index * (settings.textSize / 2))

//     let textBox = new TextBox(environment, settings)
//     World.add(world, textBox.body)
//     bodies.push(textBox)
//   })
}

export const setupProjects = (environment) => {
  const { width, height, images } = environment
  const { rainbow, ekopique } = images

  const imageWidth = width * 0.4
  const imageHeight = imageWidth * (9 / 16)

  const rainbowImage = new ImageBox(environment, {
    x: width * 0.25,
    y: (height * 0.35),
    image: rainbow,
    width: imageWidth,
    height: imageHeight,
    options: {
      friction: 0.4,
      restitution: 0.7,
      isStatic: true
    },
    address: 'https://rainbow-on-me.herokuapp.com'
  })

  let rainbowText = 'Rainbow On Me was a 2-day Hack-a-thon project using p5.js to render Matter.js physics into rainbow colored blocks. It is a dedication to the Pride that can never be cancelled.'

  const rainbowDescription = new ParagraphBox(environment, {
    x: width * 0.25,
    y: (height * 0.35) + imageHeight,
    options: {
      friction: 0.4,
      restitution: 0.7,
      isStatic: true
    },
    inputText: rainbowText,
    textSize: 24,
    boxWidth: imageWidth,
    boxHeight: imageHeight / 2,
  })

  const ekopiqueImage = new ImageBox(environment, {
    x: width * 0.75,
    y: height * 0.35,
    image: ekopique,
    width: imageWidth,
    height: imageHeight,
    options: {
      friction: 0.4,
      restitution: 0.7,
      isStatic: true
    },
    address: 'https://ekopique.herokuapp.com'
  })

  let ekopiqueText = 'ekoPique is a web app that visualizes Spotify data. Find out how \"danceable\" your favorite songs are!'

  const ekopiqueDescription = new ParagraphBox(environment, {
    x: width * 0.75,
    y: (height * 0.35) + imageHeight,
    options: {
      friction: 0.4,
      restitution: 0.7,
      isStatic: true
    },
    inputText: ekopiqueText,
    textSize: 24,
    boxWidth: imageWidth,
    boxHeight: imageHeight / 2,
  })
}

export const setupResume = (environment) => {
  const { width, height } = environment

  let titleText = 'resume will be a PDF cloth-like object'
  const words = titleText.split(' ')
  words.forEach((word, index, array) => {

    const settings = {
      x: width / 2,
      y: height * 0.2 + (index * 100),
      inputText: word,
      options: {
        friction: 0.4,
        restitution: 0.8,
        isStatic: false
      },
      textSize: height / array.length,
      color: randomColor()
    }

    new TextBox(environment, settings)
  })
}

export const setupContact = (environment) => {
  const { width, height } = environment

  let titleText = 'contact me you awesomes'
  const words = titleText.split(' ')
  words.forEach((word, index, array) => {
    const settings = {
      x: width / 2,
      y: height * 0.2 + (index * 100),
      inputText: word,
      options: {
        friction: 0.4,
        restitution: 0.8,
        isStatic: false
      },
      textSize: height / array.length,
      color: randomColor()
    }

    new TextBox(environment, settings)
  })
}