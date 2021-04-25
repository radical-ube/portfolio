import p5 from 'p5'

import {
  TextBox,
  Boundary,
  Button,
  Spring,
  ParagraphBox,
  Project,
  ButtonSettings,
  FramedEnv,
  PhysicalEnv,
  NavEnv,
} from '../types'
import { 
  setTextDimensions,
} from './utils'
import {
  randomColor,
  addToWorld,
  defaultAlignment,
  defaultColor
} from '.'


export const setupFrame = (environment: FramedEnv) => {
  const { width, height, world, boundaries } = environment

  const options = {
    friction: 0.3,
    restitution: 1,
    isStatic: true,
    label: 'boundary'
  }

  const ground = new Boundary({
    x: width / 2, 
    y: height * 2, 
    w: width * 2, 
    h: height * 2,
    options
  })
  addToWorld(world, ground, boundaries)
  
  const ceiling = new Boundary({
    x: width / 2, 
    y: height * -1, 
    w: width * 2, 
    h: height * 2,
    options
  })
  addToWorld(world, ceiling, boundaries)
  
  const leftWall = new Boundary({
    x: width * -1, 
    y: height / 2, 
    w: width * 2, 
    h: height,
    options
  })
  addToWorld(world, leftWall, boundaries)

  const rightWall = new Boundary({
    x: width * 2, 
    y: height / 2, 
    w: width * 2, 
    h: height,
    options
  })
  addToWorld(world, rightWall, boundaries)
}

export const resetPageFrame = (sketch: p5, environment: FramedEnv) => {
  const {world} = environment
  environment.width = window.innerWidth
  environment.height = window.innerHeight * 0.85
  sketch.resizeCanvas(environment.width, environment.height)
  environment.boundaries.forEach((boundary: Boundary) => {
    boundary.remove(world)
  })
  environment.boundaries.splice(0, 1)
}

export const resetNavFrame = (sketch: p5, environment: FramedEnv) => {
  const {world} = environment
  environment.width = window.innerWidth
  environment.height = window.innerHeight * 0.15
  sketch.resizeCanvas(environment.width, environment.height)
  environment.boundaries.forEach((boundary: Boundary) => {
    boundary.remove(world)
  })
  environment.boundaries.splice(0, 1)
}

export const setupNav = (sketch: p5, environment: NavEnv) => {
  const { width, height, tabs, buttons, world, constraints, boundaries } = environment
  let textSize = width * 0.035
  let x = width / (tabs.length + 1)
  let y = height * 0.5
  let stiffness = 0.6

  const boundaryOptions = {
    friction: 0.3,
    restitution: 1,
    isStatic: true,
    label: 'boundary'
  }

  let end1 = new Boundary({
    x: -15,
    y,
    w: 1,
    h: 1,
    options: boundaryOptions
  })
  addToWorld(world, end1, boundaries)
  let prevElement = end1

  for (let i = 0; i < tabs.length; i++) {
    const word = tabs[i]
    const dimensions = setTextDimensions(sketch, {
      textSize,
      text: word,
      alignment: defaultAlignment
    })
    const buttonSettings: ButtonSettings = {
      bodySettings: {
        x: x + (40 * i),
        y,
        w: dimensions.w,
        h: dimensions.h,
        options: {
          friction: 0.4,
          restitution: 0.8,
          isStatic: false
        },
        padding: dimensions.padding,
        shape: 'rect',
      },
      textSettings: {
        textSize,
        text: word,
        color: randomColor(),
        alignment: defaultAlignment
      },
    }
    const button = new Button(sketch, buttonSettings)
    addToWorld(world, button, buttons)

    const constraintSettings = {
      bodyA: prevElement.body,
      bodyB: button.body,
      length: x,
      stiffness
    }
    const spring = new Spring(sketch, constraintSettings)
    addToWorld(world, spring, constraints)
    prevElement = button
  }

  let end2 = new Boundary({
    x: width + 15,
    y,
    w: 1,
    h: 1,
    options: boundaryOptions
  })
  addToWorld(world, end2, boundaries)

  const lastSpring = new Spring(sketch, {
    bodyA: buttons[buttons.length - 1].body,
    bodyB: end2.body,
    length: x,
    stiffness
  })
  addToWorld(world, lastSpring, constraints)
}

export const setupHome = (sketch: p5, environment: PhysicalEnv) => {
  const { width, height, world, bodies } = environment

  let homeText1 = 'hello world, my name is ube'
  homeText1.split(' ')
    .forEach((word, index, array) => {
      const textSize = height / array.length
      let x = width * 0.35
      let y = height * 0.2 + (index * textSize)

      if (index === 1) {
        x = width * 0.41
      }

      const dimensions = setTextDimensions(sketch, {
        textSize,
        text: word,
        alignment: defaultAlignment
      })

      const options = {
        friction: 0.4,
        restitution: 0.8,
        isStatic: false
      }
      const settings = {
        bodySettings: {
          x,
          y,
          w: dimensions.w,
          h: dimensions.h,
          options,
          index: bodies.length - 1
        },
        textSettings: {
          textSize,
          text: word,
          color: randomColor(),
          alignment: defaultAlignment
        }
      }

      const wordBox = new TextBox(sketch, settings)
      addToWorld(world, wordBox, bodies)
    })

  let homeText2 = 'i am a work in progress'
  homeText2.split(' ')
    .forEach((word, index, array) => {
      const textSize = height / array.length
      let x = width * 0.65
      let y = height * 0.2 + (index * textSize)

      const dimensions = setTextDimensions(sketch, {
        textSize,
        text: word,
        alignment: defaultAlignment
      })

      const options = {
        friction: 0.4,
        restitution: 0.8,
        isStatic: false
      }

      const settings = {
        bodySettings: {
          x,
          y,
          w: dimensions.w,
          h: dimensions.h,
          options,
          index: bodies.length - 1
        },
        textSettings: {
          textSize,
          text: word,
          color: randomColor(),
          alignment: defaultAlignment
        },
      }

      const wordBox = new TextBox(sketch, settings)
      addToWorld(world, wordBox, bodies)
    })
}

export const setupAbout = (sketch: p5, environment: any) => {
  const { world, width, height, bodies } = environment

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

    const dimensions = setTextDimensions(sketch, {
      textSize,
      text,
      boxWidth,
      boxHeight
    })

    const options = {
      friction: 0,
      restitution: 0.7,
      isStatic: true,
      angle
    }

    const bodySettings = {
      x,
      y,
      w: dimensions.w,
      h: dimensions.h,
      options,
      padding: 10
    }

    const para = new ParagraphBox(sketch, {
      bodySettings,
      textSettings: {
        textSize,
        text,
        boxWidth,
        boxHeight,
        color: defaultColor,
        alignment: {
          horizontal: 'left',
          vertical: 'top'
        }
      }
    })
    addToWorld(world, para, bodies)
  })

}

export const setupProjects = (sketch: p5, environment: any) => {
  const { width, height, images, descriptions, buttons, world, projects } = environment
  const { rainbow, ekopique } = images

  const imageWidth = width * 0.8
  const imageHeight = imageWidth * (9 / 16)
  const textSize = width * 0.015

  let rainbowText = 'Rainbow On Me was a 2-day hack-a-thon style project using p5.js to render Matter.js physics into rainbow colored blocks. It is a dedication to the Pride that can never be cancelled.'
  let rainbowAddress = 'https://rainbow-on-me.herokuapp.com/rainbow'
  let rainbowGithub = 'https://github.com/radical-ube/stackathon'

  const rainbowProject = new Project(sketch, {
    x: width * 0.5,
    y: height * 0.25,
    w: imageWidth,
    h: imageHeight,
    options: {isStatic: true},
    image: rainbow,
    description: rainbowText,
    textSize,
    website: rainbowAddress,
    github: rainbowGithub,
  })
  addToWorld(world, rainbowProject, projects)
  addToWorld(world, rainbowProject.description, descriptions)
  addToWorld(world, rainbowProject.webButton, buttons)
  addToWorld(world, rainbowProject.githubButton, buttons)


  let ekopiqueText = 'ekoPique is a web app that visualizes Spotify data, created in collaboration with teammates Lyle Aigbedion and Ousainu Jabbi. We used d3.js for calculation of data pulled using Spotify\'s API. Find out how "danceable" your favorite songs are!'
  let ekopiqueAddress = 'https://ekopique.herokuapp.com'
  let ekopiqueGithub = 'https://github.com/2004-wdf-capstone-d/capstone-spotify'

  const ekopiqueProject = new Project(sketch, {
    x: width * 0.5,
    y: height * 0.75,
    w: imageWidth,
    h: imageHeight,
    options: {isStatic: true},
    image: ekopique,
    description: ekopiqueText,
    textSize,
    website: ekopiqueAddress,
    github: ekopiqueGithub,
  })
  addToWorld(world, ekopiqueProject, projects)
  addToWorld(world, ekopiqueProject.description, descriptions)
  addToWorld(world, ekopiqueProject.webButton, buttons)
  addToWorld(world, ekopiqueProject.githubButton, buttons)
  
}

// export const setupExperience = (environment) => {
//   const { width, height } = environment

//   const credentials = [
//     {
//       type: 'languages',
//       text: ['JavaScript', 'Python', 'C#']
//     },
//     {
//       type: 'front end',
//       text: ['React', 'Redux', 'HTML5', 'CSS', 'p5.js', 'Matter.js', 'd3.js']
//     },
//     {
//       type: 'back end',
//       text: ['Node.js', 'Express', 'PostgreSQL', 'Sequelize', 'MongoDB', 'Mongoose']
//     },
//     {
//       type: 'platforms',
//       text: ['Github', 'Heroku', 'Netlify']
//     },
//     // {
//     //   type: 'testing',
//     //   text: ['Mocha', 'Chai', 'Jasmine']
//     // }
//     {
//       type: 'artistry',
//       text: ['improvise freely', 'share vulnerably', 'bold composition', 'play']
//     },
//     {
//       type: 'communication',
//       text: ['clarity', 'active listening', 'make space', 'don\'t assume']
//     },
//     {
//       type: 'learning',
//       text: ['honest curiosity', 'diversity of thought', 'non-binary paradigm']
//     },
//   ]

//   let xCreds = width / (credentials.length + 1)
//   let bubbleSize = width * 0.015

//   credentials.forEach((credential, index) => {
//     const button = new Button(environment, {
//       x: xCreds + (xCreds * index),
//       y: height * 0.8,
//       options: {
//         isStatic: true
//       },
//       textSettings: {
//         text: credential.type,
//         textSize: bubbleSize,
//       },
//     })
//     button.text = credential.text
//   })


//   let headerSize1 =  width * 0.06
//   new TextBox(environment, {
//     x: width * 0.5,
//     y: height * 0.9,
//     options: {
//       isStatic: true
//     },
//     textSettings: {
//       textSize: headerSize1,
//       text: 'technologies, values, and skills'
//     }
//   })


// }

// export const setupContact = (environment) => {
//   const { width, height } = environment
//   let titleText = 'drop me a line'
//   const words = titleText.split(' ')
//   words.forEach((word, index, array) => {
//     let contactTextSize = height / array.length
//     const settings = {
//       x: width * 0.3,
//       y: height * 0.2 + (index * 100),
//       options: {
//         friction: 0.4,
//         restitution: 0.8,
//         isStatic: false
//       },
//       textSettings: {
//         text: word,
//         textSize: contactTextSize
//       },
//       color: randomColor()
//     }

//     new TextBox(environment, settings)
//   })

//   let invisibleBox = new TextBox(environment, {
//     x: (width * 0.7),
//     y: 0,
//     options: {
//       isStatic: true
//     },
//     textSettings: {}
//   })

//   let socials = ['github: radical-ube', 'instagram: @radical_ube', 'linkedIn: in/ube-halaya', 'email: eli.tamondong@gmail.com']
//   let socialAddresses = ['https://github.com/radical-ube', 'https://instagram.com/radical_ube', 'https://linkedin.com/in/ube-halaya', 'mailto:eli.tamondong@gmail.com']

//   let prevBody = invisibleBox
//   let buttonTextSize = width * 0.025
//   socials.forEach((social, i) => {
//     let x = width * 0.7
//     if (i % 2 === 0) {
//       x += 2
//     } else {
//       x -= 2
//     }
//     const buttonSettings = {
//       x,
//       y: (height * 0.1) + (i * 50),
//       options: {
//         friction: 0.4,
//         restitution: 0.7,
//         isStatic: false
//       },
//       textSettings: {
//         text: social,
//         address: socialAddresses[i],
//         textSize: buttonTextSize,
//       },
//       color: randomColor()
//     }
//     let button = new Button(environment, buttonSettings)

//     new Spring(environment, {
//       bodyA: prevBody.body,
//       bodyB: button.body,
//       length: height * 0.2,
//       stiffness: 0.2
//     })
//     prevBody = button

//   })

// }