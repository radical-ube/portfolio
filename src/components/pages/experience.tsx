import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'
import { connect } from 'react-redux'

import { 
  // setupFrame, 
  // resetPageFrame, 
  // setupExperience, 
  // createBubbles, 
  // manageBubbleRender 
} from '../types'

const { Engine, World } = Matter

const Experience = (props: any) => {
  const { currentPage, bgColor } = props
  const ref = React.useRef<HTMLDivElement>(null!)
  const engine = Engine.create()
  const world = engine.world

  const Sketch = (sketch: p5) => {
    const environment = {
      sketch,
      engine,
      world,
      width: window.innerWidth,
      height: window.innerHeight * 0.85,
      bodies: [],
      boundaries: [],
      buttons: [],
      bubbles: []
    }

    const handleClick = () => {
      environment.buttons.forEach(button => {
        // if (button.mouseInBounds && button.text) {
        //   // createBubbles(environment, button)
        // }
        // if (button.mouseInBounds && button.address) {
        //   document.location.assign(button.address)
        // }
      })
      for (let i = 0; i < environment.bubbles.length; i++) {
        // let bubble = environment.bubbles[i]
        // if (bubble.mouseInBounds) {
        //   World.remove(world, bubble.body)
        //   environment.bubbles.splice(i, 1)
        //   i--
        // }
      }
    }

    sketch.setup = () => {
      World.clear(world, false)
      Engine.clear(engine)
      world.gravity.y *= -1
      const canvas = sketch.createCanvas(environment.width, environment.height)
      canvas.mouseClicked(handleClick)
      // setupFrame(environment)
      // setupExperience(environment)
    }
    sketch.draw = () => {
      sketch.background(bgColor)
      Engine.update(engine)
      // renderGroup(environment.bodies)
      // renderGroup(environment.buttons)
      // checkGroupForMouse(environment.buttons)
      // renderGroup(environment.bubbles)
      // checkGroupForMouse(environment.bubbles)
      // checkGroupForRemoval(world, environment.bubbles)
    }
    sketch.windowResized = () => {
      // resetPageFrame(environment)
      // setupFrame(environment)
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

const mapState = (state: any) => {
  return {
    currentPage: state.currentPage
  }
}

export default connect(mapState)(Experience)