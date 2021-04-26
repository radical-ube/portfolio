import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'
import { connect } from 'react-redux'

import { 
  createBubbles, 
} from '../utilities'

import {
  BubbleButton,
  State,
  ExperienceEnv
} from '../types'

const Experience = (props: State) => {
  const ref = React.useRef<HTMLDivElement>(null!)
  const { currentPage } = props
  const { sketch } = currentPage
  const env = currentPage.env as ExperienceEnv
  const { buttons, bubbles } = env
  const { sketchDraw, sketchSetup, sketchWindowResized } = sketch

  const Sketch = (sketch: p5) => {

    const handleClick = () => {
      buttons.forEach((button: BubbleButton) => {
        if (button.mouseInBounds && button.text) {
          createBubbles(sketch, env, button)
        }
      })
      for (let i = 0; i < env.bubbles.length; i++) {
        let bubble = bubbles[i]
        if (bubble.mouseInBounds) {
          Matter.World.remove(env.world, bubble.body)
          bubbles.splice(i, 1)
          i--
        }
      }
    }

    sketch.setup = () => {
      Matter.World.clear(env.world, false)
      Matter.Engine.clear(env.engine)
      const canvas = sketch.createCanvas(env.width, env.height)
      canvas.mouseClicked(handleClick)
      sketchSetup(sketch, env)
    }
    sketch.draw = () => {
      sketchDraw(sketch, env)
    }
    sketch.windowResized = () => {
      sketchWindowResized(sketch, env)
    }
  }

  useEffect(() => {
    const p5canvas = new p5(Sketch, ref.current)
    return function cleanup() {
      p5canvas.remove()
    }
  }, [])

  return <div ref={ref} />
}

const mapState = (state: State) => {
  return {
    currentPage: state.currentPage
  }
}

export default connect(mapState)(Experience)