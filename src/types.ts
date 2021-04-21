import * as p5 from 'p5'
import Matter from 'matter-js'

// matter-js
export type Body = Matter.Body

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
  boundaries: any[]
}

export type Container = Bodies | Boundaries


// p5
enum Horizontal {
  Left = 'left',
  Right = 'right',
  Center = 'center' 
}

enum Vertical {
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

// interface Rectangle {
//   shape: 'rect';
// }

// interface Circle {
//   shape: 'circle';
// }

// export type Shape = Rectangle | Circle

enum Shape {
  Circle = 'circle',
  Rectangle = 'rect'
}


// objects 
export interface Button {
  body: Body;
  config: Config;
  text: string[];
}

export type Canvas = HTMLCanvasElement

export type Image = HTMLImageElement

interface TextSettings {
  text: string;
  textSize: number;
  boxWidth: number;
  boxHeight: number;
  padding: number;
}

export interface Environment {
  sketch: p5;
  width: number;
  height: number;
  world: WorldType;
  boundaries: Container;
}

export interface Config {
  sketch: p5;
  textSettings: TextSettings;
  color: Color;
  alignment: Alignment;
  image: any;
  dimensions: Dimensions;
  shape: Shape;
}