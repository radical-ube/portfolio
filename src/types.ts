import * as p5 from 'p5'
import Matter from 'matter-js'

// const { Engine, World } = Matter
// const engineShape = Engine.create()
// const worldShape = engineShape.world

export interface Environment {
  p5: p5;
  width: number;
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

export interface Vertex {
  x: number;
  y: number;
}

export interface Button {
  body: any;
  config: any;
  values: any[];
}

export interface Body {
  position: Position;
  angle: any;
}

export enum Shape {
  Rectangle =  "rect",
  Circle = "circle"
}

export type EngineType = Matter.Engine

export type WorldType = Matter.World