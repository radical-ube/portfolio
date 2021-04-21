import p5 from 'p5'
import Matter from 'matter-js'

// matter-js
export type Body = Matter.Body

export type Constraint = Matter.Constraint

export type EngineType = Matter.Engine

export type WorldType = Matter.World

export interface Instance {
  body: Body;
  index: number;
}

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

interface TextSettings {
  text: string;
  textSize: number;
  boxWidth: number;
  boxHeight: number;
  padding: number;
}


// objects 
export interface Button {
  body: Body;
  config: Config;
  text: string[];
  options: any;
  address: string;
  mouseInBounds: boolean | undefined;
  show: () => void;
  checkMouseInBounds: (mousePosition: Position) => void;
  remove: () => void;
}

export type Canvas = HTMLCanvasElement

export type Image = HTMLImageElement

export interface Boundary {
  body: Body;
  w: number;
  h: number;
  index: number;
  remove: () => void;
}

export interface Spring {
  body: Constraint;
  show: () => void;
}

export interface TextBox {
  config: Config;
  options: any;
  body: Body;
  show: () => void;
}

export interface ParagraphBox {
  config: Config;
  options: any;
  body: Body;
  show: () => void;
}

export interface ColorBall {
  r: number;
  options: any;
  body: Body;
  color: Color;
  show: () => void;
  isBelowLine: () => void;
  remove: () => void;
}

export interface Bubble {
  config: Config;
  options: any;
  body: Body;
  mouseInBounds: boolean | undefined;
  bubbleShouldPop: boolean | undefined;
  show: () => void;
  checkMouseInBounds: (mousePosition: Position) => void;
  checkBubblePop: () => void;
  remove: () => void;
}

export interface Project {
  bodyConfig: any;
  description: ParagraphBox;
  webButton: Button;
  githubButton: Button;
  body: Body;
  mouseInBounds: boolean | undefined;
  show: () => void;
  checkMouseInBounds: (mousePosition: Position) => void;
}

export interface Environment {
  sketch: p5;
  width: number;
  height: number;
  world: WorldType;
  boundaries: Container;
  bodies: Container;
  projects: Container;
  descriptions: Container;
  buttons: Container;
  constraints: Container;
  particles: Container;
  bubbles: Container;
}

export interface Config {
  sketch: p5;
  textSettings: TextSettings;
  color: Color;
  alignment: Alignment;
  image?: p5.Image;
  dimensions?: Dimensions;
  shape?: Shape;
}