import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'

import { setupFrame, setupHome, createMouseConstraint } from '../utilities'

const { Engine } = Matter

const Home = props => {
  const ref = React.createRef()
  const engine = Engine.create()
  const world = engine.world

  const bodies = []

  const Sketch = p5 => {
    let width = window.innerWidth
    let height = window.innerHeight * 0.85

    const environment = { p5, engine, world, width, height }

    p5.setup = () => {
      const canvas = p5.createCanvas(width, height)
      createMouseConstraint(canvas, engine, world, p5)
      setupFrame(environment)
      setupHome(environment, bodies)
      Engine.run(engine)
    }
    p5.draw = () => {
      p5.background(50, 50, 50)
      if (bodies.length) {
        bodies.forEach(body => {
          body.show()
        })
      }
    }
    p5.windowResized = () => {
      width = window.innerWidth
      height = window.innerHeight * 0.85
      p5.resizeCanvas(width, height)
      console.log('world', world)
    }
  }

  useEffect(() => {
    new p5(Sketch, ref.current)
  }, [])

  return <div ref={ref} />
}

export default Home