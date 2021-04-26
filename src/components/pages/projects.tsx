// eslint-disable-next-line
import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'
import { connect } from 'react-redux'

const Project = (props: any) => {
  const ref = React.useRef<HTMLDivElement>(null!)
  const { currentPage } = props
  
  useEffect(() => {
    const { env, sketch } = currentPage
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
        Matter.World.clear(env.world, false)
        Matter.Engine.clear(env.engine)
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

export default connect(mapState)(Project)