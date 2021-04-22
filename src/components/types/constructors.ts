import Matter from 'matter-js'
import p5 from 'p5'
import { 
  setTextDimensions, 
  transformBody, 
  // addToWorld, 
  renderText, 
  // renderImage, 
  // renderOutline, 
  // renderHighlight, 
  // renderLowlight, 
  // checkMouseInBounds, 
  defaultColor 
} from './utils'

import {
  Environment,
  Horizontal,
  Vertical,
  Shape,
  // ButtonConfig,
  // TextConfig
} from './types'

const { World, Bodies, Constraint } = Matter

export class Boundary {
  body: Matter.Body;
  w: number;
  h: number;
  index: number;

  constructor(x: number, y: number, w: number, h: number, label: string, environment: Environment) {
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
    // addToWorld(world, this, boundaries)

    World.add(environment.world, this.body)
    environment.boundaries.push(this)
    this.index = environment.boundaries.length - 1
  }
  
  remove(environment: Environment) {
    World.remove(environment.world, this.body)
  }
}

// export class TextBox {
//   config: TextConfig;
//   options: any;
//   body: Matter.Body;
//   index: number;

//   constructor(environment: Environment, settings: any) {
//     const { sketch, world, bodies } = environment
//     const { x, y, options, textSettings, color } = settings

//     this.config = {
//       sketch,
//       textSettings,
//       color: color || defaultColor,
//       alignment: {
//         horizontal: Horizontal.Center,
//         vertical: Vertical.Center
//       },
//       shape: Shape.Rectangle,
//       dimensions: setTextDimensions(environment.sketch, settings.textSettings)
//     }
//     this.options = options
//     this.body = Bodies.rectangle(x, y, this.config.dimensions.w, this.config.dimensions.h, this.options)
//     // addToWorld(world, this, bodies)
//     World.add(environment.world, this.body)
//     environment.bodies.push(this)
//     this.index = environment.bodies.length - 1
//   }
  

//   // class methods
//   show(environment: Environment) {
//     environment.sketch.push()
//     transformBody(environment.sketch, this.body)
//     renderText(this.config)
//     environment.sketch.pop()
//   }
// }

// export function ParagraphBoxConstructor(this: ParagraphBox, environment: Environment, settings: any) {
//   const { sketch, world, bodies } = environment
//   const { x, y, options, textSettings, color } = settings

//   // class properties
//   this.config = {
//     sketch,
//     textSettings,
//     color: color || defaultColor,
//     alignment: {
//       horizontal: Horizontal.Left,
//       vertical: Vertical.Top
//     },
//     dimensions: setTextDimensions(this.config)
//   }
//   this.options = options
//   this.body = Bodies.rectangle(x, y, this.config.dimensions.w, this.config.dimensions.h, this.options)
//   addToWorld(world, this, bodies)

//   // class methods
//   this.show = () => {
//     sketch.push()
//     transformBody(sketch, this.body)
//     renderText(this.config)
//     sketch.pop()
//   }
// }

// export function ProjectConstructor(this: Project, environment: Environment, settings: any) {
//   const { sketch, world, projects, descriptions, buttons } = environment
//   const { x, y, width, height, image, description, textSize, website, github, options } = settings

//   this.bodyConfig = {
//     sketch,
//     image,
//     dimensions: {
//       w: width,
//       h: height
//     },
//     shape: 'rect'
//   }

//   this.description = new ParagraphBoxConstructor(environment, {
//     x,
//     y,
//     textSettings: {
//       text: description,
//       textSize,
//       boxWidth: width / 2,
//       boxHeight: height / 2
//     },
//     options
//   })

//   this.webButton = new ButtonConstructor(environment, {
//     x: x - 50,
//     y: y + 50,
//     textSettings: {
//       text: 'Website',
//       textSize,
//       address: website
//     },
//     options
//   })

//   this.githubButton = new ButtonConstructor(environment, {
//     x: x + 50,
//     y: y + 50,
//     textSettings: {
//       text: 'Github',
//       textSize,
//       address: github
//     },
//     options
//   })
  
//   this.body = Bodies.rectangle(x, y, width, height, options)
//   this.mouseInBounds = false
//   addToWorld(world, this, projects)
//   addToWorld(world, this.description, descriptions)
//   addToWorld(world, this.webButton, buttons)
//   addToWorld(world, this.githubButton, buttons)

//   this.show = () => {
//     sketch.push()
//     transformBody(sketch, this.body)
//     renderImage(this.bodyConfig)
//     if (this.mouseInBounds) {
//       renderLowlight(this.bodyConfig)
//     }
//     else {
//       this.webButton.remove()
//       this.githubButton.remove()
//     }
//     sketch.pop()
//   }

//   this.checkMouseInBounds = (mousePosition) => {
//     this.mouseInBounds = checkMouseInBounds(this.body, mousePosition, this.bodyConfig)
//   }
// }

export class SpringConstructor {
  body: Matter.Constraint;
  index: number;

  constructor (environment: Environment, settings: any) {
    const { sketch, world, constraints } = environment
    const { bodyA, bodyB, length, stiffness } = settings
  
    this.body = Constraint.create({
      bodyA,
      bodyB,
      length,
      stiffness
    })
    // addToWorld(world, this, constraints)
    World.add(environment.world, this.body)
    environment.buttons.push(this)
    this.index = environment.buttons.length - 1
  }
  
  show(environment: Environment) {
    let a = this.body.bodyA.position
    let b = this.body.bodyB.position
    environment.sketch.push()
    environment.sketch.colorMode('hsl')
    environment.sketch.stroke(0, 0, 100, 0.1)
    environment.sketch.line(a.x, a.y, b.x, b.y)
    environment.sketch.pop()
  }
}

// export function SpringConstructor(this: Spring, environment: Environment, settings: any) {
//   const { sketch, world, constraints } = environment
//   const { bodyA, bodyB, length, stiffness } = settings

//   this.body = Constraint.create({
//     bodyA,
//     bodyB,
//     length,
//     stiffness
//   })
//   addToWorld(world, this, constraints)

//   this.show = () => {
//     let a = this.body.bodyA.position
//     let b = this.body.bodyB.position
//     sketch.push()
//     sketch.colorMode('hsl')
//     sketch.stroke(0, 0, 100, 0.1)
//     sketch.line(a.x, a.y, b.x, b.y)
//     sketch.pop()
//   }
// }

// export function ColorBallConstructor(this: ColorBall, environment: Environment, settings: any) {
//   const { sketch, world, particles, height } = environment
//   const { x, y, r, options, color } = settings

//   this.r = r
//   this.options = options
//   this.color = color || defaultColor
//   this.body = Bodies.circle(x, y, this.r, this.options)
//   if (particles.length < 200) {
//     addToWorld(world, this, particles)
//   }

//   this.show = () => {
//     const { hue, saturation, lightness } = this.color

//     sketch.push()
//     transformBody(sketch, this.body)
//     sketch.noStroke()
//     sketch.colorMode('hsl')
//     sketch.fill(hue, saturation, lightness)
//     sketch.ellipse(0, 0, this.r * 2)
//     sketch.pop()
//   }

//   this.isBelowLine = () => {
//     return (this.body.position.y > (height * 0.95))
//   }
//   this.remove = () => {
//     World.remove(world, this.body)
//   }
// }

// function fn(buttonConstructor: ObjectConstructor) {
//   return new buttonConstructor(environment, settings)
// }

// export class ButtonConstructor {
//   config: ButtonConfig;
//   options: any;
//   body: Matter.Body;
//   address: string;
//   mouseInBounds: boolean | undefined;
//   index: number;
//   text: string;

//   constructor(environment: Environment, settings: any) {
//     this.config = {
//       sketch: environment.sketch,
//       textSettings: settings.textSettings,
//       color: settings.color || defaultColor,
//       alignment: {
//         horizontal: Horizontal.Center,
//         vertical: Vertical.Center
//       },
//       shape: Shape.Rectangle,
//       dimensions: setTextDimensions(environment.sketch, settings.textSettings)
//     }
//     this.text = settings.textSettings.text
//     this.options = settings.options
//     this.body = Bodies.rectangle(settings.x, settings.y, this.config.dimensions.w + this.config.dimensions.padding, this.config.dimensions.h + this.config.dimensions.padding, this.options)
//     this.address = settings.textSettings.address
//     this.mouseInBounds = false
//     // addToWorld(environment.world, {body: this.body, index: 0}, environment.buttons)

//     World.add(environment.world, this.body)
//     environment.buttons.push(this)
//     this.index = environment.buttons.length - 1
//   }

//   // class methods
//   show(environment: Environment) {
//     environment.sketch.push()
//     transformBody(environment.sketch, this.body)
//     renderText(this.config)
//     renderOutline(this.config)
//     if (this.mouseInBounds) {
//       renderHighlight(this.config)
//     }
//     environment.sketch.pop()
//   }

//   // checkMouseInBounds(mousePosition: Position) {
//   //   this.mouseInBounds = checkMouseInBounds(this.body, mousePosition, this.config)
//   // }

//   remove(environment: Environment) {
//     World.remove(environment.world, this.body)
//   }
// }

// export function ButtonConstructor(this: Button, environment: Environment, settings: any) {
//   const { sketch, world, buttons } = environment
//   const { x, y, options, textSettings, color } = settings

//   // class properties
//   this.config = {
//     sketch,
//     textSettings,
//     color: color || defaultColor,
//     alignment: {
//       horizontal: Horizontal.Center,
//       vertical: Vertical.Center
//     },
//     shape: Shape.Rectangle,
//     dimensions: setTextDimensions(this.config)
//   }
//   this.options = options
//   this.body = Bodies.rectangle(x, y, this.config.dimensions.w + this.config.dimensions.padding, this.config.dimensions.h + this.config.dimensions.padding, this.options)
//   this.address = textSettings.address
//   this.mouseInBounds = false
//   addToWorld(world, this, buttons)

//   // class methods
//   this.show = () => {
//     sketch.push()
//     transformBody(sketch, this.body)
//     renderText(this.config)
//     renderOutline(this.config)
//     if (this.mouseInBounds) {
//       renderHighlight(this.config)
//     }
//     sketch.pop()
//   }

//   this.checkMouseInBounds = (mousePosition) => {
//     this.mouseInBounds = checkMouseInBounds(this.body, mousePosition, this.config)
//   }

//   this.remove = () => {
//     World.remove(world, this.body)
//   }
// }

// export function BubbleConstructor(this: Bubble, environment: Environment, settings: any) {
//   const { sketch, world, bubbles } = environment
//   const { x, y, options, textSettings, color } = settings

//   // class properties
//   this.config = {
//     sketch,
//     textSettings,
//     color: color || defaultColor,
//     alignment: {
//       horizontal: Horizontal.Center,
//       vertical: Vertical.Center
//     },
//     shape: Shape.Circle,
//     dimensions: setTextDimensions(this.config)
//   }
//   this.options = options
//   this.body = Bodies.circle(x, y, this.config.dimensions.w / 2, this.options)
//   this.mouseInBounds = false
//   this.bubbleShouldPop = false
//   addToWorld(world, this, bubbles)

//   // class methods
//   this.show = () => {
//     sketch.push()
//     transformBody(sketch, this.body)
//     renderText(this.config)
//     renderOutline(this.config)
//     if (this.mouseInBounds) {
//       renderHighlight(this.config)
//     }
//     sketch.pop()
//   }

//   this.checkMouseInBounds = (mousePosition) => {
//     this.mouseInBounds = checkMouseInBounds(this.body, mousePosition, this.config)
//   }

//   this.checkBubblePop = () => {
//     this.bubbleShouldPop = (this.body.position.y - (this.config.dimensions.w / 2) < 1)
//   }

//   this.remove = () => {
//     World.remove(world, this.body)
//   }
// }