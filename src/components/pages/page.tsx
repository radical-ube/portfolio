import React, { useEffect } from 'react'
import p5 from 'p5'
import { connect } from 'react-redux'

const Page = (props: any) => {
  const { currentPage } = props
  const { env, sketch } = currentPage
  const ref = React.useRef<HTMLDivElement>(null!)

  const { sketchDraw, sketchSetup, sketchWindowResized } = sketch

  const Sketch = (sketch: p5) => {
    sketch.setup = () => {
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
    currentPage: state.currentPage,
    // currentEnv: state.currentEnv,
    // currentSketch: state.currentSketch
  }
}

export default connect(mapState)(Page)