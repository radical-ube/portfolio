import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'
import { connect } from 'react-redux'

import { 
  setupFrame, 
  resetPageFrame, 
  setupExperience, 
  // createBubbles, 
  // manageBubbleRender ,
  renderGroup
} from '../utilities'

import {
  ExperienceEnv
} from '../types'

const { Engine, World } = Matter

const Experience = (props: any) => {
  const { currentPage } = props
  const { env, sketch } = currentPage
  const ref = React.useRef<HTMLDivElement>(null!)
  // const engine = Engine.create()
  // const world = engine.world
  const { sketchDraw, sketchSetup, sketchWindowResized } = sketch

  const Sketch = (sketch: p5) => {
    // const environment: ExperienceEnv = {
    //   engine,
    //   world,
    //   bgColor: '#282c34',
    //   width: window.innerWidth,
    //   height: window.innerHeight * 0.85,
    //   bodies: [],
    //   boundaries: [],
    //   buttons: [],
    //   bubbles: []
    // }

    const handleClick = () => {
      // env.buttons.forEach(button => {
        // if (button.mouseInBounds && button.text) {
        //   // createBubbles(env, button)
        // }
        // if (button.mouseInBounds && button.address) {
        //   document.location.assign(button.address)
        // }
      // })
      // for (let i = 0; i < env.bubbles.length; i++) {
        // let bubble = env.bubbles[i]
        // if (bubble.mouseInBounds) {
        //   World.remove(world, bubble.body)
        //   env.bubbles.splice(i, 1)
        //   i--
        // }
      // }
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
      // resetPageFrame(sketch, environment)
      // setupFrame(environment)
      sketchWindowResized(sketch, env)
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