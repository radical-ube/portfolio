import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'
import { connect } from 'react-redux'

import { 
  createMouseConstraint
} from '../utilities'

import {
  LinkButton,
  State,
  ContactEnv
} from '../types'


const Contact = (props: State) => {
  const ref = React.useRef<HTMLDivElement>(null!)
  const { currentPage } = props
  const { sketch } = currentPage
  const env = currentPage.env as ContactEnv
  
  const { sketchDraw, sketchSetup, sketchWindowResized } = sketch

  const Sketch = (sketch: p5) => {
    const handleClick = () => {
      env.buttons.forEach((button: LinkButton) => {
        if (button.mouseInBounds && button.address) {
          document.location.assign(button.address)
        }
      })
    }

    sketch.setup = () => {
      Matter.World.clear(env.world, false)
      Matter.Engine.clear(env.engine)
      const canvas = sketch.createCanvas(env.width, env.height)
      createMouseConstraint(canvas.elt, env.engine, env.world, sketch)
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

export default connect(mapState)(Contact)