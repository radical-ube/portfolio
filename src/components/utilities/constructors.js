import Matter from 'matter-js'
import { areaFromPoints } from './utils'

const { Body, Bodies, Composite, Composites, Constraint } = Matter

export function Boundary(x, y, w, h, label) {
  const options = {
    friction: 0.3,
    restitution: 1,
    isStatic: true,
    label: label || 'boundary'
  }
  this.body = Bodies.rectangle(x, y, w, h, options)
  this.w = w
  this.h = h
}

export function TextBox(environment, settings) {
  const { p5 } = environment
  const { LEFT, CENTER, HSL } = p5
  const { x, y, options, inputText, textSize, color } = settings
  p5.textSize(textSize || 18)

  // class properties
  this.text = inputText || ''
  this.w = p5.textWidth(this.text)
  this.h = p5.textAscent(this.text)
  this.options = options
  this.body = Bodies.rectangle(x, y, this.w, this.h, this.options)
  this.color = color || {
    hue: 0,
    saturation: 0,
    lightness: 100,
    alpha: 0.2
  }

  // class methods
  this.show = () => {
    const { hue, saturation, lightness, alpha } = this.color
    this.position = this.body.position
    this.angle = this.body.angle

    p5.push()
    p5.translate(this.position.x, this.position.y)
    p5.rotate(this.angle)
    p5.rectMode(CENTER)
    p5.textAlign(CENTER, CENTER)
    p5.colorMode(HSL)
    p5.fill(hue, saturation, lightness, alpha)
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
  const { p5 } = environment
  const { CENTER, LEFT, TOP, HSL } = p5
  const { x, y, options, inputText, textSize, boxWidth, boxHeight, color } = settings
  p5.textSize(textSize)

  // class properties
  this.text = inputText
  this.w = boxWidth
  this.h = boxHeight
  this.options = options
  this.body = Bodies.rectangle(x, y, this.w, this.h, this.options)
  this.color = color || {
    hue: 0,
    saturation: 0,
    lightness: 100
  }

  // class methods
  this.show = () => {
    const { hue, saturation, lightness, alpha } = this.color
    this.position = this.body.position
    this.angle = this.body.angle

    p5.push()
    p5.translate(this.position.x, this.position.y)
    p5.rotate(this.angle)
    p5.rectMode(CENTER)
    p5.textAlign(LEFT, TOP)
    p5.colorMode(HSL)
    p5.fill(hue, saturation, lightness, alpha)
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
  const { p5 } = environment
  const { CENTER } = p5
  const { x, y, image, width, height, options, address } = settings

  // class properties
  this.image = image
  this.w = width
  this.h = height
  this.options = options
  this.body = Bodies.rectangle(x, y, this.w, this.h, this.options)
  this.address = address

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
  const {p5} = environment
  const {bodyA, bodyB, length, stiffness} = settings
  
  this.body = Constraint.create({
    bodyA,
    bodyB,
    length,
    stiffness
  })

  this.show = () => {
    let a = this.body.bodyA.position
    let b = this.body.bodyB.position
    p5.push()
    p5.stroke('white')
    p5.line(a.x, a.y, b.x, b.y)
    p5.pop()
  }
}



