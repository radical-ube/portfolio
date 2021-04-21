import { Boundary, TextBox, ParagraphBox, ImageBox, Spring, Button, Project } from './constructors'
import { randomColor } from './utils'


export const setupFrame = environment => {
  const { width, height } = environment

  new Boundary(width / 2, height * 2, width * 2, height * 2, 'ground', environment)
  new Boundary(width / 2, height * -1, width * 2, height * 2, 'ceiling', environment)
  new Boundary(width * -1, height / 2, width * 2, height, 'leftwall', environment)
  new Boundary(width * 2, height / 2, width * 2, height, 'rightwall', environment)
}

export const resetPageFrame = environment => {
  const {sketch} = environment
  environment.width = window.innerWidth
  environment.height = window.innerHeight * 0.85
  sketch.resizeCanvas(environment.width, environment.height)
  environment.boundaries.forEach(boundary => {
    boundary.remove()
  })
  environment.boundaries.splice(0, 1)
}

export const resetNavFrame = environment => {
  const {sketch} = environment
  environment.width = window.innerWidth
  environment.height = window.innerHeight * 0.15
  sketch.resizeCanvas(environment.width, environment.height)
  environment.boundaries.forEach(boundary => {
    boundary.remove()
  })
  environment.boundaries.splice(0, 1)
}

export const setupNav = (environment) => {
  const { width, height, tabs, buttons } = environment
  let textSize = width * 0.035
  let x = width / (tabs.length + 1)
  let y = height * 0.5
  let stiffness = 0.6

  let end1 = new TextBox(environment, {
    x: -15,
    y,
    options: {
      isStatic: true
    },
    textSettings: {}
  })
  let prevElement = end1

  for (let i = 0; i < tabs.length; i++) {
    let buttonSettings = {
      x: x + (40 * i),
      y,
      options: {
        friction: 0.4,
        restitution: 0.8,
        isStatic: false
      },
      textSettings: {
        textSize,
        text: tabs[i]
      },
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
    },
    textSettings: {}
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
        x,
        y,
        options: {
          friction: 0.4,
          restitution: 0.8,
          isStatic: false
        },
        textSettings: {
          textSize,
          text: word
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
        x,
        y,
        options: {
          friction: 0.4,
          restitution: 0.8,
          isStatic: false
        },
        textSettings: {
          textSize,
          text: word
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
      textSettings: {
        textSize,
        text,
        boxWidth,
        boxHeight
      }
    })
  })

}

export const setupProjects = (environment) => {
  const { width, height, images } = environment
  const { rainbow, ekopique } = images

  const imageWidth = width * 0.8
  const imageHeight = imageWidth * (9 / 16)
  const textSize = width * 0.015

  let rainbowText = 'Rainbow On Me was a 2-day hack-a-thon style project using p5.js to render Matter.js physics into rainbow colored blocks. It is a dedication to the Pride that can never be cancelled.'
  let rainbowAddress = 'https://rainbow-on-me.herokuapp.com/rainbow'
  let rainbowGithub = 'https://github.com/radical-ube/stackathon'

  const rainbowProject = new Project(environment, {
    x: width * 0.5,
    y: height * 0.25,
    width: imageWidth,
    height: imageHeight,
    image: rainbow,
    description: rainbowText,
    textSize,
    website: rainbowAddress,
    github: rainbowGithub,
    options: {isStatic: true}
  })


  let ekopiqueText = 'ekoPique is a web app that visualizes Spotify data, created in collaboration with teammates Lyle Aigbedion and Ousainu Jabbi. We used d3.js for calculation of data pulled using Spotify\'s API. Find out how "danceable" your favorite songs are!'
  let ekopiqueAddress = 'https://ekopique.herokuapp.com'
  let ekopiqueGithub = 'https://github.com/2004-wdf-capstone-d/capstone-spotify'

  const ekopiqueProject = new Project(environment, {
    x: width * 0.5,
    y: height * 0.75,
    width: imageWidth,
    height: imageHeight,
    image: ekopique,
    description: ekopiqueText,
    textSize,
    website: ekopiqueAddress,
    github: ekopiqueGithub,
    options: {isStatic: true}
  })
  
}

export const setupExperience = (environment) => {
  const { width, height } = environment

  const credentials = [
    {
      type: 'languages',
      text: ['JavaScript', 'Python', 'C#']
    },
    {
      type: 'front end',
      text: ['React', 'Redux', 'HTML5', 'CSS', 'p5.js', 'Matter.js', 'd3.js']
    },
    {
      type: 'back end',
      text: ['Node.js', 'Express', 'PostgreSQL', 'Sequelize', 'MongoDB', 'Mongoose']
    },
    {
      type: 'platforms',
      text: ['Github', 'Heroku', 'Netlify']
    },
    // {
    //   type: 'testing',
    //   text: ['Mocha', 'Chai', 'Jasmine']
    // }
    {
      type: 'artistry',
      text: ['improvise freely', 'share vulnerably', 'bold composition', 'play']
    },
    {
      type: 'communication',
      text: ['clarity', 'active listening', 'make space', 'don\'t assume']
    },
    {
      type: 'learning',
      text: ['honest curiosity', 'diversity of thought', 'non-binary paradigm']
    },
  ]

  let xCreds = width / (credentials.length + 1)
  let bubbleSize = width * 0.015

  credentials.forEach((credential, index) => {
    const button = new Button(environment, {
      x: xCreds + (xCreds * index),
      y: height * 0.8,
      options: {
        isStatic: true
      },
      textSettings: {
        text: credential.type,
        textSize: bubbleSize,
      },
    })
    button.text = credential.text
  })


  let headerSize1 =  width * 0.06
  new TextBox(environment, {
    x: width * 0.5,
    y: height * 0.9,
    options: {
      isStatic: true
    },
    textSettings: {
      textSize: headerSize1,
      text: 'technologies, values, and skills'
    }
  })


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
      options: {
        friction: 0.4,
        restitution: 0.8,
        isStatic: false
      },
      textSettings: {
        text: word,
        textSize: contactTextSize
      },
      color: randomColor()
    }

    new TextBox(environment, settings)
  })

  let invisibleBox = new TextBox(environment, {
    x: (width * 0.7),
    y: 0,
    options: {
      isStatic: true
    },
    textSettings: {}
  })

  let socials = ['github: radical-ube', 'instagram: @radical_ube', 'linkedIn: in/ube-halaya', 'email: eli.tamondong@gmail.com']
  let socialAddresses = ['https://github.com/radical-ube', 'https://instagram.com/radical_ube', 'https://linkedin.com/in/ube-halaya', 'mailto:eli.tamondong@gmail.com']

  let prevBody = invisibleBox
  let buttonTextSize = width * 0.025
  socials.forEach((social, i) => {
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
      textSettings: {
        text: social,
        address: socialAddresses[i],
        textSize: buttonTextSize,
      },
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