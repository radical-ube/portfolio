// eslint-disable-next-line
import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'
import { connect } from 'react-redux'

import {
  LoadedImageData
} from './types'

import {
  renderGroup,
  checkGroupForMouse,
  preloadImages
} from './utilities'

import {
  navEnv,
  setupNav,
  setupFrame,
  resetNavFrame,
  imageData
} from './setups'

import { setCurrentPage } from '../store/page'
import { setLoadedImages } from '../store/images'


const Navbar = (props: any) => {
  const ref = React.useRef<HTMLDivElement>(null!)
  const { setCurrentPage, setLoadedImages } = props

  useEffect(() => {  
    const {engine, world, width, height, buttons, bgColor } = navEnv

    const Sketch = (sketch: p5) => {
      const handleClick = () => {
          buttons.forEach(button => {
            if (button.mouseInBounds) {
              setCurrentPage(button.textSettings.text)
            }
          })
      }
  
      sketch.preload = () => {
        const loadedImages = preloadImages(sketch, imageData)
        setLoadedImages(loadedImages)
      }
      sketch.setup = () => {
        Matter.Engine.clear(engine)
        Matter.World.clear(world, false)
        const canvas = sketch.createCanvas(width, height)
        canvas.mouseClicked(handleClick)
        setupFrame(navEnv)
        setupNav(sketch, navEnv)
      }
      sketch.draw = () => {
        sketch.background(bgColor)
        Matter.Engine.update(engine)
        renderGroup(buttons)
        checkGroupForMouse(buttons)
      }
      sketch.windowResized = () => {
        resetNavFrame(sketch, navEnv)
        setupFrame(navEnv)
      }
    }

    const p5canvas = new p5(Sketch, ref.current)
    return function cleanup() {
      p5canvas.remove()
    }
  }, [setCurrentPage, setLoadedImages])

  return <div ref={ref} />
}

const mapDispatch = (dispatch: any) => {
  return {
    setCurrentPage: (page: string) => dispatch(setCurrentPage(page)),
    setLoadedImages: (images: LoadedImageData[]) => dispatch(setLoadedImages(images))
  }
}

export default connect(null, mapDispatch)(Navbar)