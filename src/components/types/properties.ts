import p5 from 'p5'

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

export interface Renderable {
  sketch: p5
  show(): void
}