import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'
import { connect } from 'react-redux'


const Home = (props: any) => {
  const { currentPage, environment, sketchFns } = props
  const ref = React.useRef<HTMLDivElement>(null!)

  const { sketchDraw, sketchSetup, sketchWindowResized } = sketchFns

  const Sketch = (sketch: p5) => {
    sketch.setup = () => {
      sketchSetup(sketch, environment)
    }
    sketch.draw = () => {
      sketchDraw(sketch, environment)
    }
    sketch.windowResized = () => {
      sketchWindowResized(environment)
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

export default connect(mapState)(Home)