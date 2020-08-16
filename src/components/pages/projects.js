import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'

import { setupFrame, setupProjects, createMouseConstraint } from '../utilities'

const { Engine } = Matter

const Projects = props => {
  const {bgColor} = props
  const ref = React.createRef()
  const engine = Engine.create()
  const world = engine.world

  const Sketch = p5 => {
    const environment = { 
      p5, 
      engine, 
      world, 
      width: window.innerWidth, 
      height: window.innerHeight * 0.85, 
      bodies: [],
      images: {}
    }

    const handleAddressChange = () => {
      const mousePosition = {
        x: p5.mouseX,
        y: p5.mouseY
      }
      environment.bodies.forEach(body => {
        if (body.mouseInBounds(mousePosition) && body.address) {
          document.location.assign(body.address)
        }
      })
    }

    p5.preload = () => {
      environment.images.rainbow = p5.loadImage('images/rainbowonme.png')
      environment.images.ekopique = p5.loadImage('images/ekopique.png')
    }
    p5.setup = () => {
      const canvas = p5.createCanvas(environment.width, environment.height)
      canvas.mouseClicked(handleAddressChange)
      // createMouseConstraint(canvas, engine, world, p5)
      setupFrame(environment)
      setupProjects(environment)
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

export default Projects