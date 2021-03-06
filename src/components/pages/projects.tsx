// eslint-disable-next-line
import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'
import { connect } from 'react-redux'

import {
  ProjectEnv,
  LinkButton,
  SketchFunctions,
  LoadedImageData,
  ProjectData
} from '../types'


type OwnProps = {
  projectData: ProjectData
}

type StoreProps = {
  currentPage: {
    env: ProjectEnv,
    sketch: SketchFunctions
  },
  images: LoadedImageData[]
}

type Props = OwnProps & StoreProps

type State = {
  currentPage: {
    env: ProjectEnv,
    sketch: SketchFunctions
  },
  loadedImages: LoadedImageData[]
}

const Project = (props: Props) => {
  const ref = React.useRef<HTMLDivElement>(null!)
  const { currentPage, projectData, images } = props
  
  useEffect(() => {
    const { env, sketch } = currentPage
    const { sketchDraw, sketchSetup, sketchWindowResized } = sketch
    const { world, engine, width, height, buttons } = env
    const modifiers = { projectData, images}

    const projectHandleClick = () => {
      buttons.forEach((button: LinkButton) => {
        if (button.mouseInBounds && button.address) {
          document.location.assign(button.address)
        }
      })
    }
  
    const Sketch = (sketch: p5) => {
      sketch.setup = () => {
        Matter.World.clear(world, false)
        Matter.Engine.clear(engine)
        const canvas = sketch.createCanvas(width, height)
        canvas.mouseClicked(projectHandleClick)
        sketchSetup(sketch, env, modifiers)
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
  }, [currentPage, images, projectData])

  return <div ref={ref} />
}

const mapState = (state: State) => {
  return {
    currentPage: state.currentPage,
    images: state.loadedImages
  }
}

export default connect(mapState)(Project)