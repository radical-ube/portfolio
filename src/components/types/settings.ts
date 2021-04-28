import p5 from 'p5'
import Matter from 'matter-js'

import {
  Color,
  Shape,
  Alignment,
  Position,
  StateEnv
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
  imageKey: string
  titleText: string
  descriptionText: string
  websiteAddress?: string
  githubAddress: string
}

export interface LoadedImageData {
  key: string
  object: HTMLImageElement
}

export interface SetupModifiers {
  projectData: ProjectData
  images: LoadedImageData[]
}

export interface SketchFunctions {
  sketchSetup: (sketch: p5, environment: StateEnv, modifiers?: SetupModifiers) => void
  sketchDraw: (sketch: p5, environment: StateEnv) => void
  sketchWindowResized: (sketch: p5, environment: StateEnv) => void
}

export interface CurrentPage {
  tab: string
  env: StateEnv
  sketch: SketchFunctions
}

