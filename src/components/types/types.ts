import p5 from 'p5'
import Matter from 'matter-js'
import {
  setTextDimensions,
  transformBody,
  renderText,
  defaultColor
} from './utils'

// p5
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

interface Alignment {
  horizontal: Horizontal;
  vertical: Vertical;
}

// object properties
export interface Color {
  hue: number;
  saturation: number;
  lightness: number;
}

export interface Position {
  x: number;
  y: number;
}

interface Dimensions {
  w: number;
  h: number;
  padding: number;
}

export enum Shape {
  Circle = 'circle',
  Rectangle = 'rect'
}

interface Renderable {
  sketch: p5;
}

interface HasText {
  textSettings: TextSettings;
  alignment: Alignment;
}

interface HasShape {
  shape: Shape;
}

interface HasDimensions {
  dimensions: Dimensions;
}

interface HasColor {
  color: Color;
}

// interface HasImage {
//   image: Image;
// }

export interface TextSettings {
  text: string;
  textSize: number;
  boxWidth: number;
  boxHeight: number;
  padding: number;
}

// export interface TextConfig extends Sketch, HasText, HasShape, HasColor, HasDimensions {}

export class TextBox implements Renderable, HasText, HasShape, HasDimensions, HasColor {
  // config: TextConfig;
  // options: any;
  sketch: p5;
  body: Matter.Body;
  index: number;
  textSettings: TextSettings;
  alignment: Alignment;
  shape: Shape;
  dimensions: Dimensions;
  color: Color;

  constructor(environment: Environment, settings: any) {
    const { sketch, world, bodies } = environment
    const { x, y, options, textSettings, color } = settings

    this.sketch = sketch
    this.textSettings = settings.textSettings
    this.alignment = {
      horizontal: Horizontal.Center,
      vertical: Vertical.Center
    }
    this.shape = Shape.Rectangle
    this.dimensions = setTextDimensions(this.sketch, this.textSettings)
    this.color = color || defaultColor
    this.body = Matter.Bodies.rectangle(x, y, this.dimensions.w, this.dimensions.h, options)
    // addToWorld(world, this, bodies)
    Matter.World.add(environment.world, this.body)
    environment.bodies.push(this)
    this.index = environment.bodies.length - 1
  }
  

  // class methods
  show(environment: Environment) {
    environment.sketch.push()
    transformBody(environment.sketch, this.body)
    renderText({
      sketch: environment.sketch,
      textSettings: this.textSettings,
      color: this.color,
      alignment: this.alignment
    })
    environment.sketch.pop()
  }
}

// objects 
export interface Instance {
  body: Matter.Body | Matter.Constraint;
  index: number;
}

export type Image = p5.Image


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



// export interface ColorRenderConfig extends Sketch, HasShape, HasColor, HasDimensions {

// }

// export interface ImageConfig extends Sketch, HasImage, HasDimensions {

// }



// export interface ParagraphConfig extends Sketch, HasText, HasColor, HasDimensions {}

// export interface ButtonConfig extends ColorRenderConfig, HasText {}

// interface BubbleConfig extends ColorRenderConfig, HasText {}
