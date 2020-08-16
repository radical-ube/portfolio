import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'

import { setupFrame, setupContact, createMouseConstraint } from '../utilities'

const { Engine, Mouse, MouseConstraint, World } = Matter

const Contact = props => {
  const {bgColor} = props
  const ref = React.createRef()
  const engine = Engine.create()
  const world = engine.world

  // const bodies = []

  const Sketch = p5 => {
    // let width = window.innerWidth
    // let height = window.innerHeight * 0.85

    const environment = { 
      p5, 
      engine, 
      world, 
      width: window.innerWidth, 
      height: window.innerHeight * 0.85, 
      bodies: [] 
    }

    // const canvas = p5.createCanvas(width, height)
    // const mouse = Mouse.create(canvas.elt)
    // mouse.pixelRatio = p5.pixelDensity()
    // const mouseOptions = {
    //   mouse
    // }
    // const mouseConstraint = MouseConstraint.create(engine, mouseOptions)
    // World.add(world, mouseConstraint)

    p5.setup = () => {
      const canvas = p5.createCanvas(environment.width, environment.height)
      createMouseConstraint(canvas, engine, world, p5)
      setupFrame(environment)
      setupContact(environment)
      Engine.run(engine)
    }
    p5.draw = () => {
      p5.background(bgColor)
      if (environment.bodies.length) {
        environment.bodies.forEach(body => {
          body.show()
        })
      }
    }

  }

  useEffect(() => {
    new p5(Sketch, ref.current)
  }, [])

  return <div ref={ref} />
}

export default Contact