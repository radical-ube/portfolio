import Matter from 'matter-js'
// import p5 from 'p5'
const {Bodies, World} = Matter

const textBoxConstructor = settings => {
  const {p5, world} = settings
  // const {push, translate, rotate, rectMode, textAlign, text, CENTER, fill, pop} = p5
  return function TextBox(x, y, w, h, inputText) {
    const options = {
      friction: 0.4,
      restitution: 0.8,
    }
    this.body = Bodies.rectangle(x, y, w, h, options)
    this.w = w
    this.h = h
    // this.id = this.body.id

    this.show = () => {
      this.pos = this.body.position
      this.angle = this.body.angle
      p5.push()
      p5.translate(this.pos.x, this.pos.y)
      p5.rotate(this.angle)

      p5.rectMode(p5.CENTER)
      p5.textAlign(p5.CENTER, p5.CENTER)
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

export const setupWorld = (settings, viewScreen, bodies) => {
  const {p5, world} = settings
  const {width, height} = viewScreen
  const TextBox = textBoxConstructor(settings)
  const Boundary = boundaryConstructor(settings)
  // const bodies = bodies

  let ground = new Boundary(width / 2, height + 25, width, 50)
  let titleText = 'hello world'
  // const letters = []
  for (let i = 0; i < titleText.length; i++) {
    let letter = new TextBox(width / 2, height / 5, 50, 50, titleText[i])
    World.add(world, letter.body)
    bodies.push(letter)
  }
  // let title = new TextBox(width / 2, height / 5, 50, 50, 'hello world')
  World.add(world, ground.body)
  // bodies.push(title)
}