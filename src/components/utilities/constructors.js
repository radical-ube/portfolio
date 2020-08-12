import Matter from 'matter-js'
import {areaFromPoints} from './utils'


const { Bodies, Constraint } = Matter

export const textBoxConstructor = environment => {
  const { p5 } = environment
  const { CENTER, HSL } = p5
  return function TextBox(settings) {
    const { x, y, inputText, isStatic, textSize, color } = settings
    p5.textSize(textSize)

    // class properties
    this.text = inputText
    this.w = p5.textWidth(this.text)
    this.h = p5.textAscent(this.text)
    this.options = {
      friction: 0.4,
      restitution: 0.8,
      isStatic
    }
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
}

export const boundaryConstructor = environment => {
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

export const constraintConstructor = environment => {
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

export const imageBoxConstructor = environment => {
  const { p5 } = environment
  const { CENTER } = p5
  return function ImageBox(settings) {
    const { x, y, image, width, height, isStatic } = settings

    // class properties
    this.image = image
    this.w = width
    this.h = height
    this.options = {
      friction: 0.4,
      restitution: 0.8,
      isStatic
    }
    this.body = Bodies.rectangle(x, y, this.w, this.h, this.options)

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
}

