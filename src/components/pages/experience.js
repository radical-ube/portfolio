import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'
import { connect } from 'react-redux'

import { setupFrame, setupExperience, createBubbles } from '../utilities'

const { Engine, World } = Matter

const Experience = props => {
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
      buttons: [],
      bubbles: []
    }

    const handleClick = () => {
      environment.buttons.forEach(button => {
        if (button.mouseInBounds && button.values) {
          createBubbles(environment, button)
        }
        if (button.mouseInBounds && button.address) {
          document.location.assign(button.address)
        }
      })
      for (let i = 0; i < environment.bubbles.length; i++) {
        let bubble = environment.bubbles[i]
        if (bubble.mouseInBounds) {
          World.remove(world, bubble.body)
          environment.bubbles.splice(i, 1)
          i--
        }
      }
    }

    p5.setup = () => {
      World.clear(world, false)
      Engine.clear(engine)
      world.gravity.y *= -1
      const canvas = p5.createCanvas(environment.width, environment.height)
      canvas.mouseClicked(handleClick)
      setupFrame(environment)
      setupExperience(environment)
    }
    p5.draw = () => {
      p5.background(bgColor)
      Engine.update(engine)
      const mousePosition = {
        x: p5.mouseX,
        y: p5.mouseY
      }
      environment.bodies.forEach(body => {
        body.show()
      })
      environment.buttons.forEach(button => {
        button.show()
        button.checkMouseInBounds(mousePosition)
      })
      for (let index = 0; index < environment.bubbles.length; index++) {
        let bubble = environment.bubbles[index]
        bubble.show()
        bubble.checkMouseInBounds(mousePosition)
        bubble.checkBubblePop()
        if (bubble.bubbleShouldPop) {
          World.remove(world, bubble.body)
          environment.bubbles.splice(index, 1)
          index--
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

export default connect(mapState)(Experience)