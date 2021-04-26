import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'
import { connect } from 'react-redux'

import {
  State
} from '../types'

const Page = (props: State) => {
  const { currentPage } = props
  const { env, sketch } = currentPage
  const ref = React.useRef<HTMLDivElement>(null!)

  const { sketchDraw, sketchSetup, sketchWindowResized } = sketch

  const Sketch = (sketch: p5) => {
    sketch.setup = () => {
      Matter.World.clear(env.world, false)
      Matter.Engine.clear(env.engine)
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

export default connect(mapState)(Page)