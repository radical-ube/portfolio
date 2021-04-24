import React, { useEffect } from 'react'
import p5 from 'p5'
import { connect } from 'react-redux'

const Page = (props: any) => {
  const { currentEnv, currentSketch } = props
  const ref = React.useRef<HTMLDivElement>(null!)

  const { sketchDraw, sketchSetup, sketchWindowResized } = currentSketch

  const Sketch = (sketch: p5) => {
    sketch.setup = () => {
      sketchSetup(sketch, currentEnv)
    }
    sketch.draw = () => {
      sketchDraw(sketch, currentEnv)
    }
    sketch.windowResized = () => {
      sketchWindowResized(sketch, currentEnv)
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
    currentEnv: state.currentEnv,
    currentSketch: state.currentSketch
  }
}

export default connect(mapState)(Page)