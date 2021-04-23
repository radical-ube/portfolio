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

// interface Dimensions {
//   w: number;
//   h: number;
//   padding: number;
// }

export enum Shape {
  Circle = 'circle',
  Rectangle = 'rect'
}

interface BodySettings {
  x: number,
  y: number,
  w: number,
  h: number,
  index: number
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

interface Instanced {
  index: number;
}

interface HasBody {
  bodySettings: BodySettings;
}

interface HasText {
  textSettings: TextSettings;
}

interface HasShape {
  shape: Shape;
}

// interface HasDimensions {
//   dimensions: Dimensions;
// }

// interface HasColor {
//   color: Color;
// }

// interface HasImage {
//   image: Image;
// }

interface TextRenderable extends Renderable, HasText {
  show(): void;
}

// interface Instance extends HasBody, Instanced {}

// objects
interface TextBoxSettings extends HasBody, HasText {}

export class TextBox implements TextRenderable {
  sketch: p5;
  bodySettings: BodySettings;
  textSettings: TextSettings;
  body: Matter.Body;
  index: number;

  constructor(sketch: p5, settings: TextBoxSettings) {
    const { bodySettings, textSettings } = settings
    const { x, y, w, h } = bodySettings

    this.sketch = sketch
    this.bodySettings = bodySettings
    this.textSettings = textSettings
    this.index = bodySettings.index
    
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





// settings
// export interface Instance {
//   body: Matter.Body | Matter.Constraint;
//   index: number;
// }

export type Image = p5.Image

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

