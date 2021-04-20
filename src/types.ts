export interface Environment {
  p5: any;
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