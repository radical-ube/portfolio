import Matter from 'matter-js'

import {
  Boundary,
  RenderedObject,
  Button,
  Spring,
  ColorBall,
  BubbleButton,
  Bubble,
  LinkButton
} from './'

export interface Environment {
  engine: Matter.Engine
  world: Matter.World
  bgColor: string
  width: number
  height: number
}

interface HasBoundaryGroup {
  boundaries: Boundary[]
}

interface HasBodyGroup {
  bodies: RenderedObject[]
}

interface HasButtonGroup {
  buttons: Button[]
}

interface HasSpringGroup {
  constraints: Spring[]
}

export interface FramedEnv extends Environment, HasBoundaryGroup {}

export interface PhysicalEnv extends FramedEnv, HasBodyGroup {}

export interface NavEnv extends PhysicalEnv, HasButtonGroup, HasSpringGroup {
  tabs: string[],
}

export interface AboutEnv extends PhysicalEnv {
  particles: ColorBall[]
}

export interface ProjectEnv extends PhysicalEnv, HasButtonGroup {
  buttons: LinkButton[]
  image: any
}

export interface ExperienceEnv extends PhysicalEnv, HasButtonGroup {
  buttons: BubbleButton[]
  bubbles: Bubble[]
}

export interface ContactEnv extends PhysicalEnv, HasButtonGroup, HasSpringGroup {
  buttons: LinkButton[]
}

export type StateEnv = PhysicalEnv | AboutEnv | ExperienceEnv | ContactEnv