import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'

import { setupFrame, setupNav, setupWorld } from '../utilities/constructors'

const { Engine, World } = Matter

const Navbar = props => {
  const ref = React.createRef()
  const engine = Engine.create()
  const world = engine.world

  const bodies = []
  const tabs = ['', 'home', 'about', 'projects', 'resume', 'contact', '']

  const Sketch = p5 => {
    let width = window.innerWidth
    let height = window.innerHeight * 0.15

    const environment = { p5, engine, world, width, height }

    p5.setup = () => {
      p5.createCanvas(width,height)
      setupFrame(environment)
      setupNav(environment, bodies, tabs)
      // setupWorld(environment, bodies)
      // Engine.run(engine)
    }
    p5.draw = () => {
      p5.background(50, 50, 50)
      Engine.update(engine)
      if (bodies.length) {
        for (let i = 0; i < bodies.length; i++) {
          bodies[i].show()
        }
      }

    }
  }

  useEffect(() => {
    new p5(Sketch, ref.current)
  }, [])

  return <div ref={ref} />
}

export default Navbar