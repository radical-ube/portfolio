import Matter from 'matter-js'
import { areaFromPoints, setTextDimensions, transformBody, addToWorld } from './utils'

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
  const { x, y, options, textSettings, color } = settings

  // class properties
  this.text = textSettings.text || ''
  this.dimensions = setTextDimensions(p5, textSettings)
  this.options = options
  this.body = Bodies.rectangle(x, y, this.dimensions.w, this.dimensions.h, this.options)
  this.color = color || {
    hue: 0,
    saturation: 0,
    lightness: 94,
  }
  addToWorld(world, this, bodies)

  // class methods
  this.show = () => {
    const { hue, saturation, lightness } = this.color
   
    p5.push()
    transformBody(p5, this.body)
    p5.rectMode(CENTER)
    p5.textAlign(CENTER, CENTER)
    p5.textSize(this.dimensions.textSize)
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
  const { x, y, options, textSettings, color } = settings

  // class properties
  this.text = textSettings.text || ''
  this.dimensions = setTextDimensions(p5, textSettings)
  this.options = options
  this.body = Bodies.rectangle(x, y, this.dimensions.w, this.dimensions.h, this.options)
  this.color = color || {
    hue: 0,
    saturation: 0,
    lightness: 94
  }
  addToWorld(world, this, bodies)

  // class methods
  this.show = () => {
    const { hue, saturation, lightness } = this.color
  
    p5.push()
    transformBody(p5, this.body)
    p5.rectMode(CENTER)
    p5.textAlign(LEFT, TOP)
    p5.textSize(this.dimensions.textSize)
    p5.colorMode(HSL)
    p5.fill(hue, saturation, lightness)
    p5.text(this.text, 0, 0, this.dimensions.w, this.dimensions.h)
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
  addToWorld(world, this, bodies)

  // class methods
  this.show = () => {
    p5.push()
    transformBody(p5, this.body)
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
  addToWorld(world, this, constraints)

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
  if (particles.length < 200) {
    addToWorld(world, this, particles)
  }

  this.show = () => {
    const { hue, saturation, lightness } = this.color

    p5.push()
    transformBody(p5, this.body)
    p5.noStroke()
    p5.colorMode(HSL)
    p5.fill(hue, saturation, lightness)
    p5.ellipse(0, 0, this.r * 2)
    p5.pop()
  }

  this.isBelowLine = () => {
    return (this.body.position.y > (height * 0.95))
  }
  this.remove = () => {
    World.remove(world, this.body)
  }
}

export function Button(environment, settings) {
  const { p5, world, buttons } = environment
  const { CENTER, HSL } = p5
  const { x, y, options, textSettings, color } = settings

  // class properties
  this.text = textSettings.text || ''
  this.address = textSettings.address
  this.dimensions = setTextDimensions(p5, textSettings)
  this.options = options
  this.body = Bodies.rectangle(x, y, this.dimensions.w, this.dimensions.h, this.options)
  this.color = color || {
    hue: 0,
    saturation: 0,
    lightness: 94,
  }
  this.mouseInBounds = false
  addToWorld(world, this, buttons)

  // class methods
  this.show = () => {
    const { hue, saturation, lightness } = this.color
 
    p5.push()
    transformBody(p5, this.body)
    p5.rectMode(CENTER)
    p5.textAlign(CENTER, CENTER)
    p5.textSize(this.dimensions.textSize)
    p5.colorMode(HSL)
    p5.fill(hue, saturation, lightness)
    p5.text(this.text, 0, 0)
    p5.noFill()
    p5.stroke(hue, saturation, lightness)
    p5.rect(0, 0, this.dimensions.w + 10, this.dimensions.h + 10)
    if (this.mouseInBounds) {
      p5.fill(0, 0, 100, 0.05)
      p5.rect(0, 0, this.dimensions.w + 10, this.dimensions.h + 10)
    }
    p5.pop()
  }

  this.checkMouseInBounds = (mousePosition) => {
    const vertices = this.body.vertices
    const mouseArea = areaFromPoints(mousePosition, vertices, p5)
    if (mouseArea < this.body.area + 1) {
      this.mouseInBounds = true
    }
    else {
      this.mouseInBounds = false
    }
  }
}

export function Bubble(environment, settings) {
  const { p5, world, bubbles, height } = environment
  const { CENTER, HSL } = p5
  const { x, y, options, inputText, textSize, color } = settings
  p5.textSize(textSize || 18)

  // class properties
  this.text = inputText || ''
  this.textSize = textSize
  this.d = p5.textWidth(this.text)
  this.options = options
  this.body = Bodies.circle(x, y, this.d / 2, this.options)
  this.color = color || {
    hue: 0,
    saturation: 0,
    lightness: 94,
  }
  this.mouseInBounds = false
  this.bubbleShouldPop = false
  addToWorld(world, this, bubbles)

  // class methods
  this.show = () => {
    const { hue, saturation, lightness } = this.color

    p5.push()
    transformBody(p5, this.body)
    p5.textAlign(CENTER, CENTER)
    p5.textSize(this.textSize)
    p5.colorMode(HSL)
    p5.fill(hue, saturation, lightness)
    p5.text(this.text, 0, 0)
    p5.noFill()
    p5.stroke(hue, saturation, lightness)
    p5.ellipse(0, 0, this.d + 10)
    if (this.mouseInBounds) {
      p5.fill(0, 0, 100, 0.05)
      p5.ellipse(0, 0, this.d + 10)
    }
    p5.pop()
  }

  this.checkMouseInBounds = (mousePosition) => {
    const distance = p5.dist(this.body.position.x, this.body.position.y, mousePosition.x, mousePosition.y)
    if (distance < (this.d / 2)) {
      this.mouseInBounds = true
    }
    else {
      this.mouseInBounds = false
    }
  }

  this.checkBubblePop = () => {
    if (this.body.position.y - (this.d / 2) < 10) {
      this.bubbleShouldPop = true
    }
    else {
      this.bubbleShouldPop = false
    }
  }
}