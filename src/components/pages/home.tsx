// eslint-disable-next-line
import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'
import { connect } from 'react-redux'

import {
  PhysicalEnv,
  SketchFunctions
} from '../types'

type Props = {
  currentPage: {
    env: PhysicalEnv,
    sketch: SketchFunctions
  }
}

type State = {
  currentPage: {
    env: PhysicalEnv,
    sketch: SketchFunctions
  }
}

const mapState = (state: State) => {
  return {
    currentPage: state.currentPage
  }
}

const Home = (props: Props) => {
  const ref = React.useRef<HTMLDivElement>(null!)
  const { currentPage } = props

  useEffect(() => {
    const { env, sketch } = currentPage
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

    const p5canvas = new p5(Sketch, ref.current)
    return function cleanup() {
      p5canvas.remove()
    }
  }, [currentPage])

  return <div ref={ref} />
}

export default connect(mapState)(Home)