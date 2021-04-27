// eslint-disable-next-line
import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'
import { connect } from 'react-redux'

import {
  NavEnv
} from './types'

import {
  renderGroup,
  checkGroupForMouse,
  preloadImages
} from './utilities'

import {
  setupNav,
  setupFrame,
  resetNavFrame
} from './setups'

import { setCurrentPage } from '../store/page'
import { setLoadedImages } from '../store/images'


const imageData = [
  {
    key: 'rainbow',
    object: 'images/rainbowonme.png'
  },
  {
    key: 'ekopique',
    object: 'images/ekopique.png'
  },
  {
    key: 'portfolio',
    object: 'images/portfolio.png'
  }
]


const Navbar = (props: any) => {
  const ref = React.useRef<HTMLDivElement>(null!)
  const { setCurrentPage, setLoadedImages } = props

  useEffect(() => {  
    const engine = Matter.Engine.create()
    const world = engine.world

    const Sketch = (sketch: p5) => {
      const environment: NavEnv = {
        engine,
        world,
        bgColor: '#282c34',
        width: window.innerWidth,
        height: window.innerHeight * 0.15,
        bodies: [],
        boundaries: [],
        constraints: [],
        tabs: [
          'home', 
          'about', 
          'projects', 
          'experience', 
          'contact'
        ],
        buttons: []
      }
  
      const handleClick = () => {
          environment.buttons.forEach(button => {
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
        const canvas = sketch.createCanvas(environment.width, environment.height)
        canvas.mouseClicked(handleClick)
        setupFrame(environment)
        setupNav(sketch, environment)
      }
      sketch.draw = () => {
        sketch.background(environment.bgColor)
        Matter.Engine.update(engine)
        renderGroup(environment.buttons)
        checkGroupForMouse(environment.buttons)
      }
      sketch.windowResized = () => {
        resetNavFrame(sketch, environment)
        setupFrame(environment)
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
    setLoadedImages: (images: any[]) => dispatch(setLoadedImages(images))
  }
}

export default connect(null, mapDispatch)(Navbar)