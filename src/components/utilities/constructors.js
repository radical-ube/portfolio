import Matter from 'matter-js'
const { Bodies, World, Constraint } = Matter

const textBoxConstructor = environment => {
  const { p5 } = environment
  const { CENTER, HSL } = p5
  return function TextBox(x, y, settings) {
    const { inputText, isStatic } = settings
    const options = {
      friction: 0.4,
      restitution: 0.8,
      isStatic
    }

    p5.textSize(64)
    this.w = p5.textWidth(inputText)
    this.h = p5.textAscent(inputText)
    this.body = Bodies.rectangle(x, y, this.w, this.h, options)

    this.show = () => {
      this.pos = this.body.position
      this.angle = this.body.angle
      p5.push()
      p5.translate(this.pos.x, this.pos.y)
      p5.rotate(this.angle)
      p5.rectMode(CENTER)
      p5.textAlign(CENTER, CENTER)
      p5.colorMode(HSL)
      p5.fill(0, 0, 100, 0.2)
      p5.stroke(0, 100, 100, 0.8)
      p5.textSize(64)
      p5.text(inputText, 0, 0)
      // p5.fill(0, 0, 0, 0.2)
      // p5.rect(0, 0, this.w, this.h)
      p5.pop()
    }
  }
}

const boundaryConstructor = environment => {
  return function Boundary(x, y, w, h, label = 'boundary') {
    const options = {
      friction: 0.3,
      restitution: 1,
      isStatic: true,
      label
    }
    this.body = Bodies.rectangle(x, y, w, h, options)
    this.w = w
    this.h = h
  }
}

const constraintConstructor = environment => {
  // const { p5, world } = environment
  return function Spring(bodyA, bodyB, length, stiffness) {
    this.body = Constraint.create({
      bodyA,
      bodyB,
      length,
      stiffness
    })
  }
}

export const setupFrame = environment => {
  const { world, width, height } = environment
  const Boundary = boundaryConstructor(environment)

  const ground = new Boundary(width / 2, height + 100, width * 2, 200)
  const ceiling = new Boundary(width / 2, -100, width * 2, 200)
  const leftWall = new Boundary(-50, height / 2, 50, height)
  const rightWall = new Boundary(50, height / 2, 50, height)

  World.add(world, [ground.body, ceiling.body, leftWall.body, rightWall.body])
}


export const setupWorld = (environment, bodies) => {
  const { world, width, height } = environment
  const TextBox = textBoxConstructor(environment)
  const Spring = constraintConstructor(environment)

  let titleText = '- hello world, i am radical ube -'
  const words = titleText.split(' ')
  let previousWord = null
  for (let i = 0; i < words.length; i++) {
    let settings = {
      inputText: words[i],
      isStatic: false
    }
    if (!previousWord || i === words.length - 1) settings.isStatic = true
    let x = -15 + (i * 20),
      y = height * 0.5
    if (i === words.length - 1) {
      x = width + 15
      // y = height + 10
    }
    let word = new TextBox(x, y, settings)
    World.add(world, word.body)
    bodies.push(word)

    if (i > 0) {
      let constraint = new Spring(word.body, previousWord.body, width * 0.135, 0.65)
      World.add(world, constraint.body)
    }
    previousWord = word
  }

}