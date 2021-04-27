// eslint-disable-next-line
import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'
import { connect } from 'react-redux'

import {
  State, 
  ProjectEnv,
  LinkButton
} from '../types'

const Project = (props: any) => {
  const ref = React.useRef<HTMLDivElement>(null!)
  const { currentPage, projectData } = props
  const { imagePath } = projectData
  useEffect(() => {
    const { env, sketch } = currentPage
    const { sketchDraw, sketchSetup, sketchWindowResized } = sketch
    const { image, buttons } = env as ProjectEnv
  
    const projectHandleClick = () => {
      buttons.forEach((button: LinkButton) => {
        if (button.mouseInBounds && button.address) {
          document.location.assign(button.address)
        }
      })
    }
  
    const Sketch = (sketch: p5) => {
      sketch.preload = () => {
        image.data = sketch.loadImage(imagePath)
      }
      sketch.setup = () => {
        Matter.World.clear(env.world, false)
        Matter.Engine.clear(env.engine)
        const canvas = sketch.createCanvas(env.width, env.height)
        canvas.mouseClicked(projectHandleClick)
        sketchSetup(sketch, env, projectData)
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

export default connect(mapState)(Project)