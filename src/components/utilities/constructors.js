import Matter from 'matter-js'
import { setTextDimensions, transformBody, addToWorld, renderText, renderImage, renderOutline, renderHighlight, renderLowlight, checkMouseInBounds, defaultColor } from './utils'

const { World, Body, Bodies, Composite, Composites, Constraint } = Matter

export function Boundary(x, y, w, h, label, environment) {
  const { world, boundaries } = environment
  const options = {
    friction: 0.3,
    restitution: 1,
    isStatic: true,
    label: label || 'boundary'
  }
  this.body = Bodies.rectangle(x, y, w, h, options)
  this.w = w
  this.h = h
  addToWorld(world, this, boundaries)

  this.remove = () => {
    World.remove(world, this.body)
  }
}

export function TextBox(environment, settings) {
  const { p5, world, bodies } = environment
  const { x, y, options, textSettings, color } = settings

  // class properties
  this.config = {
    p5,
    textSettings,
    color: color || defaultColor,
    alignment: {
      horizontal: p5.CENTER,
      vertical: p5.CENTER
    },
    shape: 'rect'
  }
  this.config.dimensions = setTextDimensions(this.config)
  this.options = options
  this.body = Bodies.rectangle(x, y, this.config.dimensions.w, this.config.dimensions.h, this.options)
  addToWorld(world, this, bodies)

  // class methods
  this.show = () => {
    p5.push()
    transformBody(p5, this.body)
    renderText(this.config)
    p5.pop()
  }
}

export function ParagraphBox(environment, settings) {
  const { p5, world, bodies } = environment
  const { x, y, options, textSettings, color } = settings

  // class properties
  this.config = {
    p5,
    textSettings,
    color: color || defaultColor,
    alignment: {
      horizontal: p5.LEFT,
      vertical: p5.TOP
    }
  }
  this.config.dimensions = setTextDimensions(this.config)
  this.options = options
  this.body = Bodies.rectangle(x, y, this.config.dimensions.w, this.config.dimensions.h, this.options)
  addToWorld(world, this, bodies)

  // class methods
  this.show = () => {
    p5.push()
    transformBody(p5, this.body)
    renderText(this.config)
    p5.pop()
  }
}

export function Project(environment, settings) {
  const { p5, world, projects, descriptions, buttons } = environment
  const { x, y, width, height, image, description, textSize, website, github, options } = settings

  this.bodyConfig = {
    p5,
    image,
    dimensions: {
      w: width,
      h: height
    },
    shape: 'rect'
  }

  this.description = new ParagraphBox(environment, {
    x,
    y,
    textSettings: {
      text: description,
      textSize,
      boxWidth: width / 2,
      boxHeight: height / 2
    },
    options
  })

  this.webButton = new Button(environment, {
    x: x - 50,
    y: y + 50,
    textSettings: {
      text: 'Website',
      textSize,
      address: website
    },
    options
  })

  this.githubButton = new Button(environment, {
    x: x + 50,
    y: y + 50,
    textSettings: {
      text: 'Github',
      textSize,
      address: github
    },
    options
  })
  
  this.body = Bodies.rectangle(x, y, width, height, options)
  this.mouseInBounds = false
  addToWorld(world, this, projects)
  addToWorld(world, this.description, descriptions)
  addToWorld(world, this.webButton, buttons)
  addToWorld(world, this.githubButton, buttons)

  this.show = () => {
    p5.push()
    transformBody(p5, this.body)
    renderImage(this.bodyConfig)
    if (this.mouseInBounds) {
      renderLowlight(this.bodyConfig)
    }
    else {
      this.webButton.remove()
      this.githubButton.remove()
    }
    p5.pop()
  }

  this.checkMouseInBounds = (mousePosition) => {
    this.mouseInBounds = checkMouseInBounds(this, mousePosition, this.bodyConfig)
  }
}

export function Spring(environment, settings) {
  const { p5, world, constraints } = environment
  const { bodyA, bodyB, length, stiffness } = settings

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
  const { p5, world, particles, height } = environment
  const { HSL } = p5
  const { x, y, r, options, color } = settings

  this.r = r
  this.options = options
  this.color = color || defaultColor
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
  const { x, y, options, textSettings, color } = settings

  // class properties
  this.config = {
    p5,
    textSettings,
    color: color || defaultColor,
    alignment: {
      horizontal: p5.CENTER,
      vertical: p5.CENTER
    },
    shape: 'rect'
  }
  this.config.dimensions = setTextDimensions(this.config)
  this.options = options
  this.body = Bodies.rectangle(x, y, this.config.dimensions.w + this.config.dimensions.padding, this.config.dimensions.h + this.config.dimensions.padding, this.options)
  this.address = textSettings.address
  this.mouseInBounds = false
  addToWorld(world, this, buttons)

  // class methods
  this.show = () => {
    p5.push()
    transformBody(p5, this.body)
    renderText(this.config)
    renderOutline(this.config)
    if (this.mouseInBounds) {
      renderHighlight(this.config)
    }
    p5.pop()
  }

  this.checkMouseInBounds = (mousePosition) => {
    this.mouseInBounds = checkMouseInBounds(this, mousePosition, this.config)
  }

  this.remove = () => {
    World.remove(world, this.body)
  }
}

export function Bubble(environment, settings) {
  const { p5, world, bubbles } = environment
  const { x, y, options, textSettings, color } = settings

  // class properties
  this.config = {
    p5,
    textSettings,
    color: color || defaultColor,
    alignment: {
      horizontal: p5.CENTER,
      vertical: p5.CENTER
    },
    shape: 'circle'
  }
  this.config.dimensions = setTextDimensions(this.config)
  this.options = options
  this.body = Bodies.circle(x, y, this.config.dimensions.w / 2, this.options)
  this.mouseInBounds = false
  this.bubbleShouldPop = false
  addToWorld(world, this, bubbles)

  // class methods
  this.show = () => {
    p5.push()
    transformBody(p5, this.body)
    renderText(this.config)
    renderOutline(this.config)
    if (this.mouseInBounds) {
      renderHighlight(this.config)
    }
    p5.pop()
  }

  this.checkMouseInBounds = (mousePosition) => {
    this.mouseInBounds = checkMouseInBounds(this, mousePosition, this.config)
  }

  this.checkBubblePop = () => {
    this.bubbleShouldPop = (this.body.position.y - (this.config.dimensions.w / 2) < 1)
  }

  this.remove = () => {
    World.remove(world, this.body)
  }
}