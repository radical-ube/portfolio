import React, { useEffect } from 'react'
import p5 from 'p5'
import { connect } from 'react-redux'

import {
  Button
} from '../types'

const Project = (props: any) => {
  const { currentPage } = props
  const { env, sketch } = currentPage
  const ref = React.useRef<HTMLDivElement>(null!)

  const { sketchDraw, sketchSetup, sketchWindowResized } = sketch

  const projectHandleClick = () => {
    // env.buttons.forEach((button: Button) => {
    //   if (button.mouseInBounds && button.textSettings.address) {
    //     document.location.assign(button.textSettings.address)
    //   }
    // })
  }

  const Sketch = (sketch: p5) => {
    sketch.preload = () => {
      env.images.rainbow = sketch.loadImage('images/rainbowonme.png')
      env.images.ekopique = sketch.loadImage('images/ekopique.png')
    }
    sketch.setup = () => {
      const canvas = sketch.createCanvas(env.w, env.h)
      canvas.mouseClicked(projectHandleClick)
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

export default connect(mapState)(Project)