import Matter from 'matter-js'
import { textBoxConstructor, boundaryConstructor, constraintConstructor, getRandomColor } from './'


const {World} = Matter

export const setupFrame = environment => {
  const { world, width, height } = environment
  const Boundary = boundaryConstructor(environment)

  const ground = new Boundary(width / 2, height * 2, width * 2, height * 2)
  const ceiling = new Boundary(width / 2, height * -1, width * 2, height * 2)
  const leftWall = new Boundary(width * -1, height / 2, width * 2, height)
  const rightWall = new Boundary(width * 2, height / 2, width * 2, height)

  World.add(world, [ground.body, ceiling.body, leftWall.body, rightWall.body])
}

export const setupNav = (environment, bodies, tabs) => {
  const { world, width, height } = environment
  const TextBox = textBoxConstructor(environment)
  const Spring = constraintConstructor(environment)

  let previousWord = null
  for (let i = 0; i < tabs.length; i++) {
    const randomColor = getRandomColor()
    let settings = {
      x: 0,
      y: 0,
      inputText: tabs[i],
      isStatic: false,
      textSize: height / 3,
      color: randomColor()
    }
    if (!previousWord || i === tabs.length - 1) settings.isStatic = true
    settings.x = -15 + (i * 20)
    settings.y = height * 0.5
    if (i === tabs.length - 1) {
      settings.x = width + 15
    }
    let word = new TextBox(settings)
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
  const TextBox = textBoxConstructor(environment)

  let titleText = 'hello world, my name is ube'
  const words = titleText.split(' ')
  for (let i = 0; i < words.length; i++) {
    const randomColor = getRandomColor()
    let settings = {
      x: 0,
      y: 0,
      inputText: words[i],
      isStatic: false,
      textSize: height / 6,
      color: randomColor()
    }

    settings.x = width / 2
    settings.y = height * 0.2 + (i * 100)
   
    let word = new TextBox(settings)
    World.add(world, word.body)
    bodies.push(word)
  }
}

export const setupAbout = (environment, bodies) => {
  const { world, width, height } = environment
  const TextBox = textBoxConstructor(environment)

  let titleText = 'this is the about page'
  const words = titleText.split(' ')
  for (let i = 0; i < words.length; i++) {
    const randomColor = getRandomColor()
    let settings = {
      x: 0,
      y: 0,
      inputText: words[i],
      isStatic: false,
      textSize: height / 6,
      color: randomColor()
    }

    settings.x = width / 2
    settings.y = height * 0.2 + (i * 100)
   
    let word = new TextBox(settings)
    World.add(world, word.body)
    bodies.push(word)
  }
}

export const setupProjects = (environment, bodies) => {
  const { world, width, height } = environment
  const TextBox = textBoxConstructor(environment)

  let titleText = 'hello world projects page'
  const words = titleText.split(' ')
  for (let i = 0; i < words.length; i++) {
    const randomColor = getRandomColor()
    let settings = {
      x: 0,
      y: 0,
      inputText: words[i],
      isStatic: false,
      textSize: height / 6,
      color: randomColor()
    }

    settings.x = width / 2
    settings.y = height * 0.2 + (i * 100)
   
    let word = new TextBox(settings)
    World.add(world, word.body)
    bodies.push(word)
  }
}

export const setupResume = (environment, bodies) => {
  const { world, width, height } = environment
  const TextBox = textBoxConstructor(environment)

  let titleText = 'read my resume here if'
  const words = titleText.split(' ')
  for (let i = 0; i < words.length; i++) {
    const randomColor = getRandomColor()
    let settings = {
      x: 0,
      y: 0,
      inputText: words[i],
      isStatic: false,
      textSize: height / 6,
      color: randomColor()
    }

    settings.x = width / 2
    settings.y = height * 0.2 + (i * 100)
   
    let word = new TextBox(settings)
    World.add(world, word.body)
    bodies.push(word)
  }
}

export const setupContact = (environment, bodies) => {
  const { world, width, height } = environment
  const TextBox = textBoxConstructor(environment)

  let titleText = 'contact me you awesomes'
  const words = titleText.split(' ')
  for (let i = 0; i < words.length; i++) {
    const randomColor = getRandomColor()
    let settings = {
      x: 0,
      y: 0,
      inputText: words[i],
      isStatic: false,
      textSize: height / 6,
      color: randomColor()
    }

    settings.x = width / 2
    settings.y = height * 0.2 + (i * 100)
   
    let word = new TextBox(settings)
    World.add(world, word.body)
    bodies.push(word)
  }
}