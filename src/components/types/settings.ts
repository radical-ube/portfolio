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

interface HasRectBody {
  bodySettings: RectBodySettings
}

interface HasText {
  textSettings: TextSettings
}

export interface TextBoxSettings extends HasRectBody, HasText {}

export interface BubbleButtonSettings extends TextBoxSettings {
  bubbleText: string[]
}

export interface LinkButtonSettings extends TextBoxSettings {
  address: string
}

export type Image = any 

export interface ImageSettings extends HasRectBody {
  image: Image
}

export interface ProjectData {
  image: any
  titleText: string
  descriptionText: string
  websiteAddress?: string
  githubAddress: string
}