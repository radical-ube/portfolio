// eslint-disable-next-line
import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'
import { connect } from 'react-redux'

import { 
  createMouseConstraint
} from '../utilities'

import {
  LinkButton,
  ContactEnv,
  SketchFunctions
} from '../types'

type Props = {
  currentPage: {
    env: ContactEnv,
    sketch: SketchFunctions
  }
}

type State = {
  currentPage: {
    env: ContactEnv,
    sketch: SketchFunctions
  }
}


const Contact = (props: Props) => {
  const ref = React.useRef<HTMLDivElement>(null!)
  const { currentPage } = props
  
  useEffect(() => {
    const { env, sketch } = currentPage
    const { world, engine, width, height } = env
    
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
        Matter.World.clear(world, false)
        Matter.Engine.clear(engine)
        const canvas = sketch.createCanvas(width, height)
        createMouseConstraint(canvas.elt, engine, world, sketch)
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

    const p5canvas = new p5(Sketch, ref.current)
    return function cleanup() {
      p5canvas.remove()
    }
  }, [currentPage])

  return <div ref={ref} />
}

const mapState = (state: State) => {
  return {
    currentPage: state.currentPage
  }
}

export default connect(mapState)(Contact)