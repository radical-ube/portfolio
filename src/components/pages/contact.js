import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'
import { connect } from 'react-redux'

import { setupFrame, resetPageFrame, setupContact, createMouseConstraint, renderGroup, checkGroupForMouse } from '../utilities'

const { Engine, World } = Matter

const Contact = props => {
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
      constraints: [],
      buttons: []
    }

    const handleClick = () => {
      environment.buttons.forEach(button => {
        if (button.mouseInBounds && button.address) {
          document.location.assign(button.address)
        }
      })
    }

    p5.setup = () => {
      World.clear(world, false)
      Engine.clear(engine)
      const canvas = p5.createCanvas(environment.width, environment.height)
      createMouseConstraint(canvas, engine, world, p5)
      canvas.mouseClicked(handleClick)
      setupFrame(environment)
      setupContact(environment)
    }
    p5.draw = () => {
      p5.background(bgColor)
      Engine.update(engine)
      renderGroup(environment.bodies)
      renderGroup(environment.constraints)
      renderGroup(environment.buttons)
      checkGroupForMouse(environment.buttons)
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

export default connect(mapState)(Contact)