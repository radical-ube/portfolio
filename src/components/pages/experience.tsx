import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'
import { connect } from 'react-redux'

import { 
  createBubbles, 
} from '../utilities'

import {
  BubbleButton
} from '../types'

const Experience = (props: any) => {
  const { currentPage } = props
  const { env, sketch } = currentPage
  const ref = React.useRef<HTMLDivElement>(null!)
 
  const { sketchDraw, sketchSetup, sketchWindowResized } = sketch

  const Sketch = (sketch: p5) => {

    const handleClick = () => {
      env.buttons.forEach((button: BubbleButton) => {
        if (button.mouseInBounds && button.text) {
          createBubbles(sketch, env, button)
        }
        // if (button.mouseInBounds && button.address) {
        //   document.location.assign(button.address)
        // }
      })
      for (let i = 0; i < env.bubbles.length; i++) {
        let bubble = env.bubbles[i]
        if (bubble.mouseInBounds) {
          Matter.World.remove(env.world, bubble.body)
          env.bubbles.splice(i, 1)
          i--
        }
      }
    }

    sketch.setup = () => {
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

const mapState = (state: any) => {
  return {
    currentPage: state.currentPage
  }
}

export default connect(mapState)(Experience)