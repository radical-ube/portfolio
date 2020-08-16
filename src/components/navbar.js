import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'
import {connect} from 'react-redux'

import { setupFrame, setupNav } from './utilities'
import {setCurrentPage} from '../store/page'

const { Engine } = Matter

const Navbar = props => {
  const {setCurrentPage, bgColor} = props
  const ref = React.createRef()
  const engine = Engine.create()
  const world = engine.world

  const Sketch = p5 => {

    const environment = { 
      p5, 
      engine, 
      world, 
      width: window.innerWidth, 
      height: window.innerHeight * 0.15, 
      bodies: [],
      tabs: ['', 'home', 'about', 'projects', 'resume', 'contact', '']
    }

    const handlePageChange = () => {
      const mousePosition = {
        x: p5.mouseX,
        y: p5.mouseY
      }
      environment.bodies.forEach(body => {
        if (body.mouseInBounds(mousePosition)) {
          setCurrentPage(body.text)
        }
      })
    }

    p5.setup = () => {
      const canvas = p5.createCanvas(environment.width, environment.height)
      canvas.mouseClicked(handlePageChange)
      setupFrame(environment)
      setupNav(environment)
      Engine.run(engine)
    }
    p5.draw = () => {
      p5.background(bgColor)
      if (environment.bodies.length) {
        environment.bodies.forEach(body => {
          body.show()
        })
      }
    }
    p5.windowResized = () => {
      environment.width = window.innerWidth
      environment.height = window.innerHeight * 0.15
      p5.resizeCanvas(environment.width, environment.height)
    }
  }

  useEffect(() => {
    new p5(Sketch, ref.current)
  }, [])

  return <div ref={ref} />
}

const mapDispatch = dispatch => {
  return {
    setCurrentPage: (page) => dispatch(setCurrentPage(page))
  }
}

export default connect(null, mapDispatch)(Navbar)