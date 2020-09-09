import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'
import { connect } from 'react-redux'

import { setupFrame, resetPageFrame, setupAbout, createColorParticles, renderGroup, checkGroupForRemoval } from '../utilities'

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
      boundaries: [],
      particles: []
    }

    p5.setup = () => {
      World.clear(world, false)
      Engine.clear(engine)
      const canvas = p5.createCanvas(environment.width, environment.height)
      setupFrame(environment)
      setupAbout(environment)
    }
    p5.draw = () => {
      p5.background(bgColor)
      Engine.update(engine)
      if (p5.frameCount % 4 === 0) {
        createColorParticles(environment)
      }
      renderGroup(environment.bodies)
      renderGroup(environment.particles)
      checkGroupForRemoval(world, environment.particles)
    }
    p5.windowResized = () => {
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