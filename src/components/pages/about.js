import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'
import {connect} from 'react-redux'

import { setupFrame, setupAbout, createMouseConstraint, createColorParticles } from '../utilities'

const { Engine, World } = Matter

const About = props => {
  const { currentPage, bgColor } = props
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
      particles: []
    }

    p5.setup = () => {
      World.clear(world, false)
      Engine.clear(engine)
      const canvas = p5.createCanvas(environment.width, environment.height)
      // createMouseConstraint(canvas, engine, world, p5)
      setupFrame(environment)
      setupAbout(environment)
      // Engine.run(engine)
    }
    p5.draw = () => {
      p5.background(bgColor)
      Engine.update(engine)
      if (p5.frameCount % 3 === 0) {
        createColorParticles(environment)
      }
      if (environment.bodies.length) {
        environment.bodies.forEach(body => {
          body.show()
        })
      }
      if (environment.particles.length) {
        for (let i = 0; i < environment.particles.length; i++) {
          let particle = environment.particles[i]
          particle.show()
          if (particle.isBelowLine()) {
            particle.remove()
            environment.particles.splice(i, 1)
            i--
          }
        }
      }
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