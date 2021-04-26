import p5 from 'p5'
import Matter from 'matter-js'

import {
  parseColor,
  transformBody,
  renderText,
  renderOutline,
  renderHighlight,
  renderImage,
  renderLowlight,
  setTextDimensions
} from './utilities'

// properties
export type Horizontal = p5.LEFT | p5.RIGHT | p5.CENTER

export type Vertical = p5.CENTER | p5.TOP | p5.BOTTOM

export interface Alignment {
  horizontal: Horizontal
  vertical: Vertical
}

export interface Color {
  hue: number
  saturation: number
  lightness: number
}

export interface Position {
  x: number
  y: number
}

export interface Triangle {
  sideOne: number
  sideTwo: number
  sideThree: number
}

export type Shape = 'circle' | 'rect'

interface BodySettings extends Position {
  padding?: number
  color?: Color
  shape: Shape
  options: any
}

export interface RectBodySettings extends BodySettings {
  w: number
  h: number
}

export interface CircleBodySettings extends BodySettings {
  r: number
}

export interface ButtonBodySettings extends RectBodySettings {
  shape: Shape
}

export interface TextSettings {
  text: string
  textSize: number
  color?: Color
  alignment?: Alignment
  boxWidth?: number
  boxHeight?: number
  padding?: number
}

export interface HasBody {
  body: Matter.Body | Matter.Constraint
}

interface HasBodySettings {
  bodySettings: RectBodySettings
}

interface HasText {
  textSettings: TextSettings
}

interface TextBoxSettings extends HasBodySettings, HasText {}

export interface ButtonSettings {
  bodySettings: ButtonBodySettings
  textSettings: TextSettings
}

export interface BubbleButtonSettings extends ButtonSettings {
  bubbleText: string[]
}

export interface LinkButtonSettings extends ButtonSettings {
  address: string
}

export interface ProjectSettings extends HasBodySettings {
  image: any
  description: string
  textSize: number
  website: string
  github: string
}

export interface Renderable {
  show(): void
}

// interface Removable {
//   remove(world: Matter.World): void
// }

interface HasSketch {
  sketch: p5
}


// objects
export class Boundary {
  body: Matter.Body
  bodySettings: RectBodySettings

  constructor(bodySettings: RectBodySettings) {
    const { x, y, w, h, options } = bodySettings
    
    this.bodySettings = bodySettings
    this.body = Matter.Bodies.rectangle(x, y, w, h, options)
  }
  
  remove(world: Matter.World) {
    Matter.World.remove(world, this.body)
  }
}

class P5Object implements HasSketch {
  sketch: p5

  constructor (sketch: p5) {
    this.sketch = sketch
  }
}

class RectBody extends P5Object {
  body: Matter.Body

  constructor(sketch: p5, settings: RectBodySettings) {
    super(sketch)

    const { x, y, w, h, options } = settings
    this.body = Matter.Bodies.rectangle(x, y, w, h, options)
  }
}

class CircleBody extends P5Object {
  body: Matter.Body

  constructor(sketch: p5, settings: CircleBodySettings) {
    super (sketch)

    const { x, y, r, options } = settings
    this.body = Matter.Bodies.circle(x, y, r, options)
  }
}

export class TextBox extends RectBody implements Renderable, HasText {
  textSettings: TextSettings

  constructor(sketch: p5, settings: TextBoxSettings) {
    super(sketch, settings.bodySettings)

    this.textSettings = settings.textSettings
  }
  
  show() {
    this.sketch.push()
    transformBody(this.sketch, this.body)
    renderText(this.sketch, this.textSettings)
    this.sketch.pop()
  }
}

export class Button extends TextBox implements Renderable, HasText {
  mouseInBounds: boolean
  bodySettings: ButtonBodySettings

  constructor(sketch: p5, settings: ButtonSettings) {
    super (sketch, settings)

    const { x, y, w, h, padding = 0, options } = settings.bodySettings
    
    this.bodySettings = settings.bodySettings
    this.body = Matter.Bodies.rectangle(x, y, w + padding, h + padding, options)
    this.mouseInBounds = false
  }

  show() {
    this.sketch.push()
    transformBody(this.sketch, this.body)
    renderText(this.sketch, this.textSettings)
    renderOutline(this.sketch, this.bodySettings, parseColor(this.textSettings.color))
    if (this.mouseInBounds) {
      renderHighlight(this.sketch, this.bodySettings)
    }
    this.sketch.pop()
  }

  remove(world: Matter.World) {
    Matter.World.remove(world, this.body)
  }
}

export class BubbleButton extends Button {
  text: string[]

  constructor (sketch: p5, settings: BubbleButtonSettings) {
    super(sketch, {
      bodySettings: settings.bodySettings,
      textSettings: settings.textSettings
    })

    this.text = settings.bubbleText
  }
}

export class LinkButton extends Button {
  address: string

  constructor (sketch: p5, settings: LinkButtonSettings) {
    super(sketch, {
      bodySettings: settings.bodySettings,
      textSettings: settings.textSettings
    })

    this.address = settings.address
  }
}

export class Spring {
  body: Matter.Constraint
  sketch: p5

  constructor (sketch: p5, settings: any) {
    const { bodyA, bodyB, length, stiffness } = settings
  
    this.sketch = sketch
    this.body = Matter.Constraint.create({
      bodyA,
      bodyB,
      length,
      stiffness
    })
  }
  
  show() {
    const a = this.body.bodyA.position
    const b = this.body.bodyB.position
    this.sketch.push()
    this.sketch.colorMode('hsl')
    this.sketch.stroke(0, 0, 100, 0.1)
    this.sketch.line(a.x, a.y, b.x, b.y)
    this.sketch.pop()
  }
}

export class ColorBall extends CircleBody {
  bodySettings: CircleBodySettings

  constructor (sketch: p5, settings: CircleBodySettings) {
    super(sketch, settings)
  
    this.bodySettings = settings
  }

  show() {
    const { hue, saturation, lightness } = parseColor(this.bodySettings.color)

    this.sketch.push()
    transformBody(this.sketch, this.body)
    this.sketch.noStroke()
    this.sketch.colorMode('hsl')
    this.sketch.fill(hue, saturation, lightness)
    this.sketch.ellipse(0, 0, this.bodySettings.r * 2)
    this.sketch.pop()
  }

  shouldBeRemoved(): boolean {
    return (this.body.position.y > (window.innerHeight * 0.85 * 0.95))
  }

  remove(world: Matter.World) {
    Matter.World.remove(world, this.body)
  }
}



export class Bubble extends CircleBody implements Renderable {
  mouseInBounds: boolean
  bubbleShouldPop: boolean
  bodySettings: CircleBodySettings
  textSettings: TextSettings

  constructor (sketch: p5, settings: any) {
    super(sketch, settings.bodySettings)
    
    const { bodySettings, textSettings } = settings
    this.bodySettings = bodySettings
    this.textSettings = textSettings
    this.mouseInBounds = false
    this.bubbleShouldPop = false
  }

  show() {
    this.sketch.push()
    transformBody(this.sketch, this.body)
    renderText(this.sketch, this.textSettings)
    renderOutline(this.sketch, this.bodySettings, parseColor(this.textSettings.color))
    if (this.mouseInBounds) {
      renderHighlight(this.sketch, this.bodySettings)
    }
    this.sketch.pop()
  }

  shouldBeRemoved(): boolean {
    return (this.body.position.y - (this.bodySettings.r) < 1)
  }
}

export type PhysicalObject = TextBox | Boundary | Button | Spring

export type Container = Button[] | Boundary[] | Spring[] | TextBox[]

// env settings
export interface Environment {
  engine: Matter.Engine
  world: Matter.World
  bgColor: string
  width: number
  height: number
}

interface HasBoundaryGroup {
  boundaries: Boundary[]
}

interface HasBodyGroup {
  bodies: Matter.Body[]
}

interface HasButtonGroup {
  buttons: Button[]
}

interface HasSpringGroup {
  constraints: Spring[]
}

export interface FramedEnv extends Environment, HasBoundaryGroup {}

export interface PhysicalEnv extends FramedEnv, HasBodyGroup {}

export interface NavEnv extends PhysicalEnv, HasButtonGroup, HasSpringGroup {
  tabs: string[],
}

export interface AboutEnv extends PhysicalEnv {
  particles: any[]
}

export interface ProjectEnv extends PhysicalEnv, HasButtonGroup {
  projects: any[]
  descriptions: any[]
  images: any
}

export interface ExperienceEnv extends PhysicalEnv, HasButtonGroup {
  bubbles: any[]
}


//

export class Project {
  sketch: p5
  body: Matter.Body
  mouseInBounds: boolean
  description: TextBox
  webButton: Button
  githubButton: Button
  bodySettings: any

  constructor (sketch: p5, settings: any) {
    const { x, y, w, h, options, image, description, textSize, website, github } = settings
  
    this.sketch = sketch
    this.bodySettings = settings

    const paraDimensions = setTextDimensions(sketch, {
      textSize,
      text: description
    })

    const webButtonDimensions = setTextDimensions(sketch, {
      textSize,
      text: website
    })

    const githubButtonDimensions = setTextDimensions(sketch, {
      textSize,
      text: github
    })
  
    this.description = new TextBox(sketch, {
      bodySettings: {
        x,
        y,
        w: paraDimensions.w,
        h: paraDimensions.h,
        shape: 'rect',
        options
      },
      textSettings: {
        text: description,
        textSize,
        boxWidth: w / 2,
        boxHeight: h / 2
      },
    })
  
    this.webButton = new Button(sketch, {
      bodySettings: {
        x: x - 50,
        y: y + 50,
        w: webButtonDimensions.w,
        h: webButtonDimensions.h,
        options,
        shape: 'rect'
      },
      
      textSettings: {
        text: 'Website',
        textSize,
        // address: website
      }
      
    })
  
    this.githubButton = new Button(sketch, {
      bodySettings: {
        x: x + 50,
        y: y + 50,
        w: githubButtonDimensions.w,
        h: githubButtonDimensions.h,
        options,
        shape: 'rect'
      },
      textSettings: {
        text: 'Github',
        textSize,
        // address: github
      },
    })
    
    this.body = Matter.Bodies.rectangle(x, y, w, h, options)
    this.mouseInBounds = false
    
  }
  
  show() {
    this.sketch.push()
    transformBody(this.sketch, this.body)
    renderImage(this.sketch, {
      image: this.bodySettings.image,
      dimensions: {
        w: this.bodySettings.w,
        h: this.bodySettings.h
      }
    })
    if (this.mouseInBounds) {
      renderLowlight(this.sketch, this.bodySettings)
    }
    // else {
    //   this.webButton.remove(this.bodySettings.world)
    //   this.githubButton.remove(this.bodySettings.world)
    // }
    this.sketch.pop()
  }

  // checkMouseInBounds(mousePosition) => {
  //   this.mouseInBounds = checkMouseInBounds(this.body, mousePosition, this.bodyConfig)
  // }
}
