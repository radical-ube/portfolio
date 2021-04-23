import p5 from 'p5'
import Matter from 'matter-js'

import {
  PhysicalObject
} from '../types'

export const createMouseConstraint = (canvas: HTMLCanvasElement, engine: Matter.Engine, world: Matter.World, sketch: p5) => {
  const mouse = Matter.Mouse.create(canvas)
  mouse.pixelRatio = sketch.pixelDensity()
  const mouseOptions = {
    mouse
  }
  const mouseConstraint = Matter.MouseConstraint.create(engine, mouseOptions)
  Matter.World.add(world, mouseConstraint)
}

export const transformBody = (sketch: p5, body: Matter.Body) => {
  const position = body.position
  const angle = body.angle

  sketch.translate(position.x, position.y)
  sketch.rotate(angle)
}

export function addToWorld (world: Matter.World, object: PhysicalObject, container: any[]): void {
  Matter.World.add(world, object.body)
  container.push(object)
}