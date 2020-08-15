import Matter from 'matter-js'
import { Boundary, TextBox, ImageBox, Spring } from './constructors'
import { randomColor } from './utils'

const { World } = Matter

export const setupFrame = environment => {
  const { world, width, height } = environment

  const ground = new Boundary(width / 2, height * 2, width * 2, height * 2, 'ground')
  const ceiling = new Boundary(width / 2, height * -1, width * 2, height * 2, 'ceiling')
  const leftWall = new Boundary(width * -1, height / 2, width * 2, height, 'leftwall')
  const rightWall = new Boundary(width * 2, height / 2, width * 2, height, 'rightwall')

  World.add(world, [ground.body, ceiling.body, leftWall.body, rightWall.body])
}

export const setupNav = (environment, bodies, tabs) => {
  const { world, width, height } = environment

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
    World.add(world, word.body)
    bodies.push(word)

    if (i > 0) {
      let constraint = new Spring(word.body, previousWord.body, width * 0.135, 0.65)
      World.add(world, constraint.body)
    }
    previousWord = word
  }
}

export const setupHome = (environment, bodies) => {
  const { world, width, height } = environment

  let titleText = 'hello world, my name is ube'
  const words = titleText.split(' ')
  words.forEach((word, index, array) => {
    const settings = {
      inputText: word,
      options: {
        friction: 0.4,
        restitution: 0.8,
        isStatic: false
      },
      textSize: height / array.length,
      color: randomColor()
    }

    settings.x = width / 2
    settings.y = height * 0.2 + (index * settings.textSize)

    let textBox = new TextBox(environment, settings)
    World.add(world, textBox.body)
    bodies.push(textBox)
  })
}

export const setupAbout = (environment, bodies) => {
  const { world, width, height } = environment

  let titleText = 'this is the about page and it will have an insanely long number of words to parse through. have fun trying to figure out how to organize this mess!'
  const words = titleText.split(' ')
  words.forEach((word, index, array) => {
    const settings = {
      inputText: word,
      options: {
        friction: 0.4,
        restitution: 0.8,
        isStatic: false
      },
      textSize: height / array.length,
      color: randomColor()
    }

    settings.x = width / 2
    settings.y = height * 0.2 + (index * (settings.textSize / 2))

    let textBox = new TextBox(environment, settings)
    World.add(world, textBox.body)
    bodies.push(textBox)
  })
}

export const setupProjects = (environment, bodies, images) => {
  const { world, width, height } = environment
  const { rainbow, ekopique } = images

  const imageWidth = width * 0.4
  const imageHeight = imageWidth * (9 / 16)
  const rainbowImage = new ImageBox(environment, {
    x: width * 0.25,
    y: height * 0.1,
    image: rainbow,
    width: imageWidth,
    height: imageHeight,
    options: {
      friction: 0.4,
      restitution: 0.7,
      isStatic: false
    },
    address: 'https://rainbow-on-me.herokuapp.com'
  })
  const ekopiqueImage = new ImageBox(environment, {
    x: width * 0.75,
    y: height * 0.1,
    image: ekopique,
    width: imageWidth,
    height: imageHeight,
    options: {
      friction: 0.4,
      restitution: 0.7,
      isStatic: false
    },
    address: 'https://ekopique.herokuapp.com'
  })

  // const testMesh = new Mesh(environment)
  
  World.add(world, [rainbowImage.body, ekopiqueImage.body])
  bodies.push(rainbowImage, ekopiqueImage)
  // console.log('testMesh', testMesh)
}

export const setupResume = (environment, bodies) => {
  const { world, width, height } = environment

  let titleText = 'resume will be a PDF cloth-like object'
  const words = titleText.split(' ')
  words.forEach((word, index, array) => {

    const settings = {
      inputText: word,
      options: {
        friction: 0.4,
        restitution: 0.8,
        isStatic: false
      },
      textSize: height / array.length,
      color: randomColor()
    }

    settings.x = width / 2
    settings.y = height * 0.2 + (index * 100)

    let textBox = new TextBox(environment, settings)
    World.add(world, textBox.body)
    bodies.push(textBox)
  })
}

export const setupContact = (environment, bodies) => {
  const { world, width, height } = environment

  let titleText = 'contact me you awesomes'
  const words = titleText.split(' ')
  words.forEach((word, index, array) => {
    const settings = {
      inputText: word,
      options: {
        friction: 0.4,
        restitution: 0.8,
        isStatic: false
      },
      textSize: height / array.length,
      color: randomColor()
    }

    settings.x = width / 2
    settings.y = height * 0.2 + (index * 100)

    let textBox = new TextBox(environment, settings)
    World.add(world, textBox.body)
    bodies.push(textBox)
  })
}