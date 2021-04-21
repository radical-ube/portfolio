import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'
import { connect } from 'react-redux'

import { setupFrame, resetPageFrame, setupHome, createMouseConstraint } from '../utilities'

const { Engine, World } = Matter

const Home = props => {
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
      boundaries: []
    }

    sketch.setup = () => {
      World.clear(world, false)
      Engine.clear(engine)
      const canvas = sketch.createCanvas(environment.width, environment.height)
      createMouseConstraint(canvas.elt, engine, world, sketch)
      setupFrame(environment)
      setupHome(environment)
    }
    sketch.draw = () => {
      sketch.background(bgColor)
      Engine.update(engine)
      environment.bodies.forEach(body => {
        body.show()
      })
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

export default connect(mapState)(Home)