import Matter from 'matter-js'
import { areaFromPoints } from './utils'

const { World, Body, Bodies, Composite, Composites, Constraint } = Matter

export function Boundary(x, y, w, h, label, world) {
  const options = {
    friction: 0.3,
    restitution: 1,
    isStatic: true,
    label: label || 'boundary'
  }
  this.body = Bodies.rectangle(x, y, w, h, options)
  this.w = w
  this.h = h

  World.add(world, this.body)
}

export function TextBox(environment, settings) {
  const { p5, world, bodies } = environment
  const { CENTER, HSL } = p5
  const { x, y, options, inputText, textSize, color } = settings
  p5.textSize(textSize || 18)

  // class properties
  this.text = inputText || ''
  this.textSize = textSize
  this.w = p5.textWidth(this.text)
  this.h = p5.textAscent(this.text)
  this.options = options
  this.body = Bodies.rectangle(x, y, this.w, this.h, this.options)
  this.color = color || {
    hue: 0,
    saturation: 0,
    lightness: 94,
  }
  World.add(world, this.body)
  bodies.push(this)

  // class methods
  this.show = () => {
    const { hue, saturation, lightness } = this.color
    this.position = this.body.position
    this.angle = this.body.angle

    p5.push()
    p5.translate(this.position.x, this.position.y)
    p5.rotate(this.angle)
    p5.rectMode(CENTER)
    p5.textAlign(CENTER, CENTER)
    p5.textSize(this.textSize)
    p5.colorMode(HSL)
    p5.fill(hue, saturation, lightness)
    p5.text(this.text, 0, 0)
    p5.pop()
  }

  this.mouseInBounds = (mousePosition) => {
    const vertices = this.body.vertices
    const mouseArea = areaFromPoints(mousePosition, vertices, p5)
    return (mouseArea < this.body.area + 1)
  }
}

export function ParagraphBox(environment, settings) {
  const { p5, world, bodies } = environment
  const { CENTER, LEFT, TOP, HSL } = p5
  const { x, y, options, inputText, textSize, boxWidth, boxHeight, color } = settings
  p5.textSize(textSize)

  // class properties
  this.text = inputText || ''
  this.textSize = textSize
  this.w = boxWidth
  this.h = boxHeight
  this.options = options
  this.body = Bodies.rectangle(x, y, this.w, this.h, this.options)
  this.color = color || {
    hue: 0,
    saturation: 0,
    lightness: 94
  }
  World.add(world, this.body)
  bodies.push(this)

  // class methods
  this.show = () => {
    const { hue, saturation, lightness } = this.color
    this.position = this.body.position
    this.angle = this.body.angle

    p5.push()
    p5.translate(this.position.x, this.position.y)
    p5.rotate(this.angle)
    p5.rectMode(CENTER)
    p5.textAlign(LEFT, TOP)
    p5.textSize(this.textSize)
    p5.colorMode(HSL)
    p5.fill(hue, saturation, lightness)
    p5.text(this.text, 0, 0, boxWidth, boxHeight)
    p5.pop()
  }

  this.mouseInBounds = (mousePosition) => {
    const vertices = this.body.vertices
    const mouseArea = areaFromPoints(mousePosition, vertices, p5)
    return (mouseArea < this.body.area + 1)
  }
}

export function ImageBox(environment, settings) {
  const { p5, world, bodies } = environment
  const { CENTER } = p5
  const { x, y, image, width, height, options, address } = settings

  // class properties
  this.image = image
  this.w = width
  this.h = height
  this.options = options
  this.body = Bodies.rectangle(x, y, this.w, this.h, this.options)
  this.address = address
  World.add(world, this.body)
  bodies.push(this)

  // class methods
  this.show = () => {
    this.position = this.body.position
    this.angle = this.body.angle

    p5.push()
    p5.translate(this.position.x, this.position.y)
    p5.rotate(this.angle)
    p5.rectMode(CENTER)
    p5.imageMode(CENTER)
    p5.image(this.image, 0, 0, this.w, this.h)
    p5.pop()
  }

  this.mouseInBounds = (mousePosition) => {
    const vertices = this.body.vertices
    const mouseArea = areaFromPoints(mousePosition, vertices, p5)
    return (mouseArea < this.body.area + 1)
  }
}

export function Spring(environment, settings) {
  const {p5, world, constraints} = environment
  const {bodyA, bodyB, length, stiffness} = settings
  
  this.body = Constraint.create({
    bodyA,
    bodyB,
    length,
    stiffness
  })
  World.add(world, this.body)
  constraints.push(this)

  this.show = () => {
    let a = this.body.bodyA.position
    let b = this.body.bodyB.position
    p5.push()
    p5.colorMode(p5.HSL)
    p5.stroke(0, 0, 100, 0.1)
    p5.line(a.x, a.y, b.x, b.y)
    p5.pop()
  }
}

export function ColorBall(environment, settings) {
  const {p5, world, particles, height} = environment
  const {HSL} = p5
  const {x, y, r, options, color} = settings

  this.r = r
  this.options = options
  this.color = color || {
    hue: 0,
    saturation: 0,
    lightness: 100
  }
  this.body = Bodies.circle(x, y, this.r, this.options)
  if (particles.length < 150) {
    World.add(world, this.body)
    particles.push(this)
  }

  this.show = () => {
    const { hue, saturation, lightness } = this.color
    this.position = this.body.position
    this.angle = this.body.angle

    p5.push()
    p5.translate(this.position.x, this.position.y)
    p5.rotate(this.angle)
    p5.noStroke()
    p5.colorMode(HSL)
    p5.fill(hue, saturation, lightness)
    p5.ellipse(0, 0, this.r * 2)
    p5.pop()
  }

  this.isBelowLine = () => {
    return (this.position.y > (height * 0.95))
  }
  this.remove = () => {
    World.remove(world, this.body)
  }
}

export function Button(environment, settings) {
  const { p5, world, bodies } = environment
  const { CENTER, HSL } = p5
  const { x, y, options, inputText, address, textSize, color } = settings
  p5.textSize(textSize || 18)

  // class properties
  this.text = inputText || ''
  this.textSize = textSize
  this.address = address
  this.w = p5.textWidth(this.text)
  this.h = p5.textAscent(this.text)
  this.options = options
  this.body = Bodies.rectangle(x, y, this.w, this.h, this.options)
  this.color = color || {
    hue: 0,
    saturation: 0,
    lightness: 94,
  }
  this.overlay = false
  World.add(world, this.body)
  bodies.push(this)

  // class methods
  this.show = () => {
    const { hue, saturation, lightness } = this.color
    this.position = this.body.position
    this.angle = this.body.angle

    p5.push()
    p5.translate(this.position.x, this.position.y)
    p5.rotate(this.angle)
    p5.rectMode(CENTER)
    p5.textAlign(CENTER, CENTER)
    p5.textSize(this.textSize)
    p5.colorMode(HSL)
    p5.fill(hue, saturation, lightness)
    p5.text(this.text, 0, 0)
    p5.noFill()
    p5.stroke(hue, saturation, lightness)
    p5.rect(0, 0, this.w + 10, this.h + 10)
    if (this.overlay) {
      p5.fill(0, 0, 100, 0.05)
      p5.rect(0, 0, this.w + 10, this.h + 10)
    }
    p5.pop()
  }

  this.mouseInBounds = (mousePosition) => {
    const vertices = this.body.vertices
    const mouseArea = areaFromPoints(mousePosition, vertices, p5)
    return (mouseArea < this.body.area + 1)
  }
}

