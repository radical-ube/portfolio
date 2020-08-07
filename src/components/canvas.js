import React, { useState, useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'

import { setupWorld } from './constructors'

const { Engine, Mouse, MouseConstraint, Events, World } = Matter

const Canvas = props => {
  const ref = React.createRef()
  const engine = Engine.create()
  const world = engine.world

  const bodies = []

  const Sketch = p5 => {
    let width = window.innerWidth
    let height = window.innerHeight * 0.3

    const settings = { p5, engine, world, width, height }

    // const canvas = p5.createCanvas(width, height)
    // const mouse = Mouse.create(canvas.elt)
    // mouse.pixelRatio = p5.pixelDensity()
    // const mouseOptions = {
    //   mouse
    // }
    // const mouseConstraint = MouseConstraint.create(engine, mouseOptions)
    // World.add(world, mouseConstraint)

    p5.setup = () => {
      p5.createCanvas(width,height)
      setupWorld(settings, bodies)

    }
    p5.draw = () => {
      p5.background(50, 50, 50)
      Engine.update(engine)
      if (bodies.length) {
        for (let i = 0; i < bodies.length; i++) {
          bodies[i].show()
        }
      }

      // if (mouseConstraint.body) {
      //   let pos = mouseConstraint.body.position
      //   let offset = mouseConstraint.constraint.pointB
      //   // p5.fill(255, 255, 255, 30)
      //   // p5.stroke(255, 255, 255, 50)
      //   // p5.rectMode(p5.CENTER)
      //   // p5.rect(pos.x + offset.x, pos.y + offset.y, 70, 35)
      // }
    }
  }

  useEffect(() => {
    const myP5 = new p5(Sketch, ref.current)
  }, [])

  return <div ref={ref} />
}

export default Canvas