import p5 from 'p5'
import Matter from 'matter-js'

import {
  parseColor,
  transformBody,
  renderText,
  renderOutline,
  renderHighlight,
  setTextDimensions,
  renderImage,
  renderLowlight
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

export interface BodySettings {
  x: number
  y: number
  w: number
  h: number
  padding?: number
  color?: Color
  index?: number
  options: any
}

export interface CircleBodySettings {
  x: number
  y: number
  r: number
  color: Color
  options: any
}

export interface ButtonBodySettings extends BodySettings {
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
  address?: string
}

export interface HasBody {
  body: Matter.Body | Matter.Constraint
}

interface HasBodySettings {
  bodySettings: BodySettings
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

interface Removable {
  remove(world: Matter.World): void
}


// objects
export class Boundary implements Removable {
  body: Matter.Body
  bodySettings: BodySettings

  constructor(bodySettings: BodySettings) {
    const { x, y, w, h, options } = bodySettings
    
    this.bodySettings = bodySettings
    this.body = Matter.Bodies.rectangle(x, y, w, h, options)
  }
  
  remove(world: Matter.World) {
    Matter.World.remove(world, this.body)
  }
}

export class TextBox implements Renderable, HasText, HasBodySettings {
  sketch: p5
  bodySettings: BodySettings
  textSettings: TextSettings
  body: Matter.Body

  constructor(sketch: p5, settings: TextBoxSettings) {
    const { bodySettings, textSettings } = settings
    const { x, y, w, h, options } = bodySettings

    this.sketch = sketch
    this.bodySettings = bodySettings
    this.textSettings = textSettings
    
    this.body = Matter.Bodies.rectangle(x, y, w, h, options)
  }
  
  show() {
    this.sketch.push()
    transformBody(this.sketch, this.body)
    renderText(this.sketch, this.textSettings)
    this.sketch.pop()
  }
}

export class Button implements Renderable, Removable, HasText, HasBodySettings {
  body: Matter.Body
  mouseInBounds: boolean
  sketch: p5
  textSettings: TextSettings
  bodySettings: ButtonBodySettings

  constructor(sketch: p5, settings: ButtonSettings) {
    this.sketch = sketch
    this.bodySettings = settings.bodySettings
    this.textSettings = settings.textSettings
    const { x, y, w, h, padding = 0, options } = this.bodySettings

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

export class ParagraphBox implements Renderable, HasBodySettings, HasText {
  body: Matter.Body
  sketch: p5
  bodySettings: BodySettings
  textSettings: TextSettings

  constructor (sketch: p5, settings: any) {
    const { bodySettings, textSettings } = settings
    const { x, y, w, h, options } = bodySettings
    this.sketch = sketch
    this.bodySettings = bodySettings
    this.textSettings = textSettings
    
    this.body = Matter.Bodies.rectangle(x, y, w, h, options)
  }

  show() {
    this.sketch.push()
    transformBody(this.sketch, this.body)
    renderText(this.sketch, this.textSettings)
    this.sketch.pop()
  }
}

export class ColorBall {
  body: Matter.Body
  sketch: p5
  bodySettings: CircleBodySettings

  constructor (sketch: p5, settings: any) {
    const { x, y, r, options } = settings
  
    this.sketch = sketch
    this.bodySettings = settings
    this.body = Matter.Bodies.circle(x, y, r, options)
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

export class Project {
  sketch: p5
  body: Matter.Body
  mouseInBounds: boolean
  description: ParagraphBox
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
  
    this.description = new ParagraphBox(sketch, {
      bodySettings: {
        x,
        y,
        w: paraDimensions.w,
        h: paraDimensions.h
      },
      textSettings: {
        text: description,
        textSize,
        boxWidth: w / 2,
        boxHeight: h / 2
      },
      options
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
        address: website
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
        address: github
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

export class Bubble {
  sketch: p5
  body: Matter.Body
  mouseInBounds: boolean
  bubbleShouldPop: boolean
  bodySettings: any
  textSettings: TextSettings

  constructor (sketch: p5, settings: any) {
    
    const { bodySettings, textSettings } = settings
  
    this.sketch = sketch
    this.bodySettings = bodySettings
    this.textSettings = textSettings

    const { x, y, w, options } = bodySettings
    
    this.body = Matter.Bodies.circle(x, y, w / 2, options)
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
    return (this.body.position.y - (this.bodySettings.w / 2) < 1)
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

