import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'
import { connect } from 'react-redux'

import { setupFrame, resetNavFrame, 
  setupNav, checkGroupForMouse
} from './types'
import {
  renderGroup,
  // checkGroupForMouse
} from './types/utilities'
import { setCurrentPage } from '../store/page'

const { Engine, World } = Matter

const Navbar = props => {
  const { setCurrentPage, bgColor } = props
  const ref = React.createRef()
  const engine = Engine.create()
  const world = engine.world

  const Sketch = sketch => {

    const environment = {
      sketch,
      engine,
      world,
      width: window.innerWidth,
      height: window.innerHeight * 0.15,
      bodies: [],
      boundaries: [],
      constraints: [],
      tabs: ['home', 'about', 'projects', 'experience', 'contact'],
      buttons: []
    }

    // const handleClick = () => {
    //   environment.buttons.forEach(button => {
    //     if (button.mouseInBounds) {
    //       setCurrentPage(button.config.textSettings.text)
    //     }
    //   })
    // }

    sketch.setup = () => {
      Engine.clear(engine)
      World.clear(world, false)
      const canvas = sketch.createCanvas(environment.width, environment.height)
      // canvas.mouseClicked(handleClick)
      setupFrame(environment)
      setupNav(environment)
    }
    sketch.draw = () => {
      sketch.background(bgColor)
      Engine.update(engine)
      renderGroup(environment.buttons)
      checkGroupForMouse(environment.buttons)
    }
    sketch.windowResized = () => {
      resetNavFrame(environment)
      setupFrame(environment)
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

const mapDispatch = dispatch => {
  return {
    setCurrentPage: (page) => dispatch(setCurrentPage(page))
  }
}

export default connect(null, mapDispatch)(Navbar)