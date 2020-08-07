import Matter from 'matter-js'
const {Bodies, World, Constraint} = Matter

const textBoxConstructor = settings => {
  const {p5, world} = settings
  const {CENTER} = p5
  return function TextBox(x, y, w, h, inputs) {
    const {inputText, isStatic} = inputs
    const options = {
      friction: 0.4,
      restitution: 0.8,
      isStatic
    }
    this.body = Bodies.rectangle(x, y, w, h, options)
    this.w = w
    this.h = h

    this.show = () => {
      this.pos = this.body.position
      this.angle = this.body.angle
      p5.push()
      p5.translate(this.pos.x, this.pos.y)
      p5.rotate(this.angle)

      p5.ellipseMode(CENTER)
      p5.textAlign(CENTER, CENTER)
      p5.fill(255)
      p5.textSize(64)
      p5.text(inputText, 0, 0)
      // p5.colorMode(p5.HSL)
      // p5.fill(0, 50, 100, 0.2)
      // // p5.fill(this.hue, this.saturation, this.lightness, this.alpha)
      // p5.strokeWeight(1)
      // p5.stroke(150, 100, 65, 50)
      // p5.rect(0, 0, this.w, this.h)
      p5.pop()
    }
  }
}

const boundaryConstructor = settings => {
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

const chainConstructor = settings => {
  const {p5, world} = settings
  return function Chain(bodyA, bodyB, length, stiffness) {
    const options = {
      bodyA,
      bodyB,
      length,
      stiffness
    }
    this.body = Constraint.create(options)
  }
}

export const setupWorld = (settings, bodies) => {
  const {p5, world, width, height} = settings
  // const {width, height} = viewScreen
  const TextBox = textBoxConstructor(settings)
  const Boundary = boundaryConstructor(settings)
  const Chain = chainConstructor(settings)

  let ground = new Boundary(width / 2, height + 100, width * 2, 190)
  let ceiling = new Boundary(width / 2, -100, width * 2, 190)
  World.add(world, [ground.body, ceiling.body])

  let titleText = '- hello world, i am radical ube -'
  const words = titleText.split(' ')
  let previousWord = null
  for (let i = 0; i < words.length; i++) {
    let inputs = {
      inputText: words[i],
      isStatic: false
    }
    if (!previousWord || i === words.length - 1) inputs.isStatic = true
    let x = -10 + (i * 20), 
    y = height * 0.5
    if (i === words.length - 1) {
      x = width + 10
      // y = height + 10
    }
    let word = new TextBox(x, y, 100, 50, inputs)
    World.add(world, word.body)
    bodies.push(word)

    if (i > 0) {
      let constraint = new Chain(word.body, previousWord.body, width * 0.1, 1)
      World.add(world, constraint.body)
    }
    previousWord = word
  }
  
}