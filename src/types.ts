import p5 from 'p5'
import Matter from 'matter-js'

// matter-js
export type Body = Matter.Body | Matter.Bodies

export type MatterBodies = Matter.Bodies

export type Constraint = Matter.Constraint

export type EngineType = Matter.Engine

export type WorldType = Matter.World

interface Bodies {
  bodies: Body[];
}

interface Boundaries {
  boundaries: Boundary[]
}

interface Projects {
  projects: any[]
}

interface Descriptions {
  descriptions: any[]
}

interface Buttons {
  buttons: Button[]
}

interface Springs {
  constraints: any[]
}

interface Particles {
  particles: any[]
}

interface Bubbles {
  bubbles: Bubble[]
}

export type Container = Bodies | Boundaries | Projects | Descriptions | Buttons | Springs | Particles | Bubbles


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

// export type Position = Matter.Vector
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

export interface TextSettings {
  text: string;
  textSize: number;
  boxWidth: number;
  boxHeight: number;
  padding: number;
}


// objects 
export interface Instance {
  body: Body | Constraint;
  index: number;
}

export interface Button extends Instance {
  body: Body;
  config: ButtonConfig;
  text: string;
  options: any;
  address: string;
  mouseInBounds: boolean | undefined;
  show: (environment: Environment) => void;
  // checkMouseInBounds: (mousePosition: Position) => void;
  remove: (environment: Environment) => void;
}

export type Canvas = HTMLCanvasElement

export type Image = p5.Image

export interface Boundary extends Instance {
  body: Body;
  w: number;
  h: number;
  index: number;
  remove: () => void;
}

export interface Spring extends Instance {
  body: Constraint;
  show: () => void;
}

export interface TextBox extends Instance {
  config: TextConfig;
  options: any;
  body: Body;
  show: (environment: Environment) => void;
}

export interface ParagraphBox extends Instance {
  config: ParagraphConfig;
  options: any;
  body: Body;
  show: () => void;
}

export interface ColorBall extends Instance {
  r: number;
  options: any;
  body: Body;
  color: Color;
  show: () => void;
  isBelowLine: () => void;
  remove: () => void;
}

export interface Bubble extends Instance {
  config: BubbleConfig;
  options: any;
  body: Body;
  mouseInBounds: boolean | undefined;
  bubbleShouldPop: boolean | undefined;
  show: () => void;
  checkMouseInBounds: (mousePosition: Position) => void;
  checkBubblePop: () => void;
  remove: () => void;
}

export interface Project extends Instance {
  bodyConfig: any;
  description: ParagraphBox;
  webButton: Button;
  githubButton: Button;
  body: Body;
  mouseInBounds: boolean | undefined;
  show: () => void;
  checkMouseInBounds: (mousePosition: Position) => void;
}

// type Object = Button | Boundary | Spring | TextBox | ParagraphBox | ColorBall | Bubble | Project

// constructors
// export type ObjectConstructor = {
//   new (environment: Environment, settings: any): Object;
// }


// settings
export interface Environment {
  sketch: p5;
  width: number;
  height: number;
  world: WorldType;
  boundaries: any[];
  bodies: any[];
  projects: any[];
  descriptions: any[];
  buttons: any[];
  constraints: any[];
  particles: any[];
  bubbles: any[];
}

interface Sketch {
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

interface HasImage {
  image: Image;
}

export interface ColorRenderConfig extends Sketch, HasShape, HasColor, HasDimensions {

}

export interface ImageConfig extends Sketch, HasImage, HasDimensions {

}

export interface TextConfig extends Sketch, HasText, HasShape, HasColor, HasDimensions {

}

export interface ParagraphConfig extends Sketch, HasText, HasColor, HasDimensions {}

export interface ButtonConfig extends ColorRenderConfig, HasText {}

interface BubbleConfig extends ColorRenderConfig, HasText {}
