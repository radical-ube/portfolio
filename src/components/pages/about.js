import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'
import { connect } from 'react-redux'

import { setupFrame, resetPageFrame, setupAbout, 
  // createColorParticles, 
  manageParticleRender } from '../utilities'

const { Engine, World } = Matter

const About = props => {
  const { currentPage, bgColor } = props
  const ref = React.createRef()
  const engine = Engine.create()
  const world = engine.world

  const Sketch = sketch => {
    const environment = {
      sketch,
      engine,
      world,
      width: window.innerWidth,
      height: window.innerHeight * 0.85,
      bodies: [],
      boundaries: [],
      particles: []
    }

    sketch.setup = () => {
      World.clear(world, false)
      Engine.clear(engine)
      const canvas = sketch.createCanvas(environment.width, environment.height)
      setupFrame(environment)
      // setupAbout(environment)
    }
    sketch.draw = () => {
      sketch.background(bgColor)
      Engine.update(engine)
      if (sketch.frameCount % 4 === 0) {
        // createColorParticles(environment)
      }
      environment.bodies.forEach(body => {
        body.show()
      })
      manageParticleRender(environment.particles)
    }
    sketch.windowResized = () => {
      resetPageFrame(environment)
      setupFrame(environment)
    }
  }

  useEffect(() => {
    const p5canvas = new p5(Sketch, ref.current)
    return function cleanup() {
      p5canvas.remove()
    }
  }, [currentPage])

  return <div ref={ref} />
}

const mapState = state => {
  return {
    currentPage: state.currentPage
  }
}

export default connect(mapState)(About)