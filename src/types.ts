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

interface Rectangle {
  type: 'rect';

}

interface Circle {
  type: 'circle';
}

export type Shape = Rectangle | Circle


// objects 
export interface Button {
  body: Body;
  config: Config;
  values: any[];
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
  p5: p5;
  width: number;
  height: number;
  world: WorldType;
  boundaries: Container;
}

export interface Config {
  p5: p5;
  textSettings: TextSettings;
  color: Color;
  alignment: Alignment;
  image: any;
  dimensions: any;
  shape: any;
}