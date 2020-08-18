import { Boundary, TextBox, ParagraphBox, ImageBox, Spring, Button, Bubble } from './constructors'
import { randomColor } from './utils'


export const setupFrame = environment => {
  const { world, width, height } = environment

  new Boundary(width / 2, height * 2, width * 2, height * 2, 'ground', world)
  new Boundary(width / 2, height * -1, width * 2, height * 2, 'ceiling', world)
  new Boundary(width * -1, height / 2, width * 2, height, 'leftwall', world)
  new Boundary(width * 2, height / 2, width * 2, height, 'rightwall', world)
}

export const setupNav = (environment) => {
  const { width, height, tabs, buttons } = environment
  let textSize = height / 3
  let x = width / (tabs.length + 1)
  let y = height * 0.5
  let stiffness = 0.6

  let end1 = new TextBox(environment, {
    x: -15,
    y,
    options: {
      isStatic: true
    }
  })
  let prevElement = end1

  for (let i = 0; i < tabs.length; i++) {
    let buttonSettings = {
      x: x + (40 * i),
      y,
      inputText: tabs[i],
      options: {
        friction: 0.4,
        restitution: 0.8,
        isStatic: false
      },
      textSize,
      color: randomColor()
    }
    let button = new Button(environment, buttonSettings)

    let constraintSettings = {
      bodyA: prevElement.body,
      bodyB: button.body,
      length: x,
      stiffness
    }
    new Spring(environment, constraintSettings)
    prevElement = button
  }

  let end2 = new TextBox(environment, {
    x: width + 15,
    y,
    options: {
      isStatic: true
    }
  })
  new Spring(environment, {
    bodyA: buttons[buttons.length - 1].body,
    bodyB: end2.body,
    length: x,
    stiffness
  })
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

export const setupAbout = (environment) => {
  const { width, height } = environment

  const texts = [
    'i am a colorful, non-binary, queer performing artist turned software engineer. i dance, i write, i do drag, and i code.',
    'i think about illusion and reality and how to confuse the two. i believe in making fantasy come to life.',
    'as an engineer, coding feels like magic and i want to always remember the joy that technology can bring.',
    'as an artist, i think stories can be told with stillness as much as movement, and with color as much as grayscale.',
    'have you tried moving around the words on the home page?'
  ]

  texts.forEach((text, index) => {
    let textSize = width * 0.015
    let x = width * 0.35
    let y = (height * 0.15) + (index * 110)
    let angle = 0.1
    let boxWidth = width * 0.45
    let boxHeight = height * 0.08

    if (index % 2 === 1) {
      x = width * 0.65
      angle *= -1
    }

    new ParagraphBox(environment, {
      x,
      y,
      options: {
        friction: 0,
        restitution: 0.7,
        isStatic: true,
        angle
      },
      inputText: text,
      textSize,
      boxWidth,
      boxHeight
    })
  })

}

export const setupProjects = (environment) => {
  const { width, height, images } = environment
  const { rainbow, ekopique } = images

  const imageWidth = width * 0.375
  const imageHeight = imageWidth * (9 / 16)
  const textSize = width * 0.015

  const rainbowImage = new ImageBox(environment, {
    x: width * 0.3,
    y: (height * 0.25),
    image: rainbow,
    width: imageWidth,
    height: imageHeight,
    options: {
      isStatic: true
    }
  })

  let rainbowText = 'Rainbow On Me was a 2-day hack-a-thon style project using p5.js to render Matter.js physics into rainbow colored blocks. It is a dedication to the Pride that can never be cancelled.'

  const rainbowDescription = new ParagraphBox(environment, {
    x: width * 0.7,
    y: (height * 0.2),
    options: {
      isStatic: true
    },
    inputText: rainbowText,
    textSize,
    boxWidth: imageWidth,
    boxHeight: imageHeight / 2,
  })

  const rainbowWebButton = new Button(environment, {
    x: (width * 0.65),
    y: (height * 0.35),
    options: {
      isStatic: true
    },
    inputText: 'website',
    address: 'https://rainbow-on-me.herokuapp.com/rainbow',
    textSize
  })

  const rainbowGithubButton = new Button(environment, {
    x: (width * 0.75),
    y: (height * 0.35),
    options: {
      isStatic: true
    },
    inputText: 'github',
    address: 'https://github.com/radical-ube/stackathon',
    textSize
  })

  const ekopiqueImage = new ImageBox(environment, {
    x: width * 0.3,
    y: (height * 0.25) + (imageHeight * 1.05),
    image: ekopique,
    width: imageWidth,
    height: imageHeight,
    options: {
      isStatic: true
    }
  })

  let ekopiqueText = 'ekoPique is a web app that visualizes Spotify data, created in collaboration with teammates Lyle Aigbedion and Ousainu Jabbi. We used d3.js for calculation of data pulled using Spotify\'s API. Find out how \"danceable\" your favorite songs are!'

  const ekopiqueDescription = new ParagraphBox(environment, {
    x: width * 0.7,
    y: (height * 0.2) + (imageHeight * 1.05),
    options: {
      isStatic: true
    },
    inputText: ekopiqueText,
    textSize,
    boxWidth: imageWidth,
    boxHeight: imageHeight / 2,
  })

  const ekopiqueWebButton = new Button(environment, {
    x: (width * 0.65),
    y: (height * 0.35) + (imageHeight * 1.05),
    options: {
      isStatic: true
    },
    inputText: 'website',
    address: 'https://ekopique.herokuapp.com',
    textSize
  })

  const ekopiqueGithubButton = new Button(environment, {
    x: (width * 0.75),
    y: (height * 0.35) + (imageHeight * 1.05),
    options: {
      isStatic: true
    },
    inputText: 'github',
    address: 'https://github.com/2004-wdf-capstone-d/capstone-spotify',
    textSize
  })
}

export const setupExperience = (environment) => {
  const { width, height } = environment

  let titleText = 'technologies'
  const credentials = [
    {
      type: 'proficient',
      technologies: ['JavaScript', 'Git', 'Node.js', 'Express', 'PostgreSQL', 'Sequelize', 'React', 'Redux', 'HTML5']
    },
    {
      type: 'comfortable',
      technologies: ['CSS', 'p5.js', 'Matter.js']
    },
    {
      type: 'fundamentals',
      technologies: ['C#', 'MongoDB', 'Mongoose', 'Mocha', 'Chai', 'Jasmine', 'd3.js']
    }
   
  ]

  let x = width / (credentials.length + 1)
  let textSize = width * 0.0125

  credentials.forEach((credential, index) => {
    const button = new Button(environment, {
      x: x + (x * index),
      y: height * 0.9,
      options: {
        isStatic: true
      },
      inputText: credential.type,
      textSize,
    })
    button.technologies = credential.technologies
  })
  // new Bubble(environment, {
  //   x: 200,
  //   y: 200,
  //   options: {
  //     friction: 0.4,
  //     frictionAir: 0.3,
  //     restitution: 0.8,
  //     isStatic: false
  //   },
  //   inputText: titleText,
  //   textSize: width * 0.0125
  // })

}

export const setupContact = (environment) => {
  const { width, height } = environment
  let titleText = 'drop me a line'
  const words = titleText.split(' ')
  words.forEach((word, index, array) => {
    let contactTextSize = height / array.length
    const settings = {
      x: width * 0.3,
      y: height * 0.2 + (index * 100),
      inputText: word,
      options: {
        friction: 0.4,
        restitution: 0.8,
        isStatic: false
      },
      textSize: contactTextSize,
      color: randomColor()
    }

    new TextBox(environment, settings)
  })

  let invisibleBox = new TextBox(environment, {
    x: (width * 0.7),
    y: 0,
    options: {
      isStatic: true
    }
  })

  let socials = ['github: radical-ube', 'instagram: @radical_ube', 'linkedIn: in/ube-halaya', 'email: eli.tamondong@gmail.com']
  let socialAddresses = ['https://github.com/radical-ube', 'https://instagram.com/radical_ube', 'https://linkedin.com/in/ube-halaya', 'mailto:eli.tamondong@gmail.com']

  let prevBody = invisibleBox
  socials.forEach((social, i) => {
    let buttonTextSize = width * 0.025
    let x = width * 0.7
    if (i % 2 === 0) {
      x += 2
    } else {
      x -= 2
    }
    const buttonSettings = {
      x,
      y: (height * 0.1) + (i * 50),
      options: {
        friction: 0.4,
        restitution: 0.7,
        isStatic: false
      },
      inputText: social,
      address: socialAddresses[i],
      textSize: buttonTextSize,
      color: randomColor()
    }
    let button = new Button(environment, buttonSettings)

    new Spring(environment, {
      bodyA: prevBody.body,
      bodyB: button.body,
      length: height * 0.2,
      stiffness: 0.2
    })
    prevBody = button

  })
}