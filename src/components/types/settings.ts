import Matter from 'matter-js'

import {
  Color,
  Shape,
  Alignment,
  Position
} from './'

interface BodySettings extends Position {
  padding?: number
  color?: Color
  shape: Shape
  options: any
}

export interface RectBodySettings extends BodySettings {
  w: number
  h: number
}

export interface CircleBodySettings extends BodySettings {
  r: number
}

export interface ButtonBodySettings extends RectBodySettings {
  shape: Shape
}

export interface TextSettings {
  text: string
  textSize: number
  color?: Color
  alignment?: Alignment
  boxWidth?: number
  boxHeight?: number
  padding?: number
}

export interface HasBody {
  body: Matter.Body | Matter.Constraint
}

interface HasBodySettings {
  bodySettings: RectBodySettings
}

interface HasText {
  textSettings: TextSettings
}

export interface TextBoxSettings extends HasBodySettings, HasText {}

export interface ButtonSettings {
  bodySettings: ButtonBodySettings
  textSettings: TextSettings
}

export interface BubbleButtonSettings extends ButtonSettings {
  bubbleText: string[]
}

export interface LinkButtonSettings extends ButtonSettings {
  address: string
}

export interface ProjectSettings extends HasBodySettings {
  image: any
  description: string
  textSize: number
  website: string
  github: string
}