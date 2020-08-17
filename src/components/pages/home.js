import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'
import { connect } from 'react-redux'

import { setupFrame, setupHome, createMouseConstraint } from '../utilities'

const { Engine, World } = Matter

const Home = props => {
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
      bodies: []
    }

    p5.setup = () => {
      World.clear(world, false)
      Engine.clear(engine)
      const canvas = p5.createCanvas(environment.width, environment.height)
      createMouseConstraint(canvas, engine, world, p5)
      setupFrame(environment)
      setupHome(environment)
    }
    p5.draw = () => {
      p5.background(bgColor)
      Engine.update(engine)
      environment.bodies.forEach(body => {
        body.show()
      })
    }
    p5.windowResized = () => {
      environment.width = window.innerWidth
      environment.height = window.innerHeight * 0.85
      p5.resizeCanvas(environment.width, environment.height)
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