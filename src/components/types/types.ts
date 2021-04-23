import p5 from 'p5'
import Matter from 'matter-js'
import {
  transformBody,
  renderText,
} from './utils'

// properties
export enum Horizontal {
  Left = 'left',
  Right = 'right',
  Center = 'center' 
}

export enum Vertical {
  Center = 'center',
  Top = 'top',
  Bottom = 'bottom',
}

export interface Alignment {
  horizontal: Horizontal;
  vertical: Vertical;
}

export interface Color {
  hue: number;
  saturation: number;
  lightness: number;
}

export interface Position {
  x: number;
  y: number;
}

export enum Shape {
  Circle = 'circle',
  Rectangle = 'rect'
}

interface BodySettings {
  x: number;
  y: number;
  w: number;
  h: number;
  padding: number;
  shape?: Shape;
  index?: number;
}

export interface TextSettings {
  text: string;
  textSize: number;
  color?: Color;
  alignment: Alignment;
  boxWidth?: number;
  boxHeight?: number;
  padding?: number;
}

// interfaces
interface Renderable {
  sketch: p5;
}

interface HasBody {
  bodySettings: BodySettings;
}

interface HasText {
  textSettings: TextSettings;
}

interface TextBoxSettings extends HasBody, HasText {}
interface ButtonSettings extends HasBody, HasText {}

interface HasShape {
  shape: Shape;
}

interface TextRenderable extends Renderable, HasText {
  show(): void;
}

interface Removable {
  remove(world: Matter.World): void;
}

// objects
export class Boundary implements Removable {
  body: Matter.Body;
  bodySettings: BodySettings;

  constructor(bodySettings: BodySettings) {
    const { x, y, w, h } = bodySettings
    const options = {
      friction: 0.3,
      restitution: 1,
      isStatic: true,
      label: 'boundary'
    }
    this.bodySettings = bodySettings
    this.body = Matter.Bodies.rectangle(x, y, w, h, options)
  }
  
  remove(world: Matter.World) {
    Matter.World.remove(world, this.body)
  }
}

export class TextBox implements TextRenderable {
  sketch: p5;
  bodySettings: BodySettings;
  textSettings: TextSettings;
  body: Matter.Body;

  constructor(sketch: p5, settings: TextBoxSettings) {
    const { bodySettings, textSettings } = settings
    const { x, y, w, h } = bodySettings

    this.sketch = sketch
    this.bodySettings = bodySettings
    this.textSettings = textSettings
    
    this.body = Matter.Bodies.rectangle(x, y, w, h, {
      friction: 0.4,
      restitution: 0.8,
      isStatic: false
    })
  }
  
  show() {
    this.sketch.push()
    transformBody(this.sketch, this.body)
    renderText(this.sketch, this.textSettings)
    this.sketch.pop()
  }
}

export class Button {
  // options: any;
  body: Matter.Body;
  // address: string;
  mouseInBounds: boolean | undefined;
  // index: number;
  // text: string;
  sketch: p5;
  textSettings: TextSettings;
  bodySettings: BodySettings;

  constructor(sketch: p5, settings: ButtonSettings) {
    
    this.sketch = sketch
    this.bodySettings = settings.bodySettings
    this.textSettings = settings.textSettings
    const { x, y, w, h, padding, shape } = this.bodySettings

    // this.text = settings.textSettings.text
    // this.options = settings.options
    this.body = Matter.Bodies.rectangle(x, y, w + padding, h + padding, {
      friction: 0.4,
      restitution: 0.8,
      isStatic: false
    })
    // this.address = settings.textSettings.address
    this.mouseInBounds = false
  }

  // class methods
  show() {
    this.sketch.push()
    transformBody(this.sketch, this.body)
    renderText(this.sketch, this.textSettings)
    // renderOutline(this.config)
    // if (this.mouseInBounds) {
    //   renderHighlight(this.config)
    // }
    this.sketch.pop()
  }

  // checkMouseInBounds(mousePosition: Position) {
  //   this.mouseInBounds = checkMouseInBounds(this.body, mousePosition, this.config)
  // }

  remove(world: Matter.World) {
    Matter.World.remove(world, this.body)
  }
}

export class Spring {
  body: Matter.Constraint;
  // index: number;
  sketch: p5;

  constructor (sketch: p5, settings: any) {
    // const { sketch, world, constraints } = environment
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

export type PhysicalObject = TextBox | Boundary



// settings
export interface Environment {
  sketch: p5;
  width: number;
  height: number;
  world: Matter.World;
  boundaries: any[];
  bodies: any[];
  projects: any[];
  descriptions: any[];
  buttons: any[];
  constraints: any[];
  particles: any[];
  bubbles: any[];
}

