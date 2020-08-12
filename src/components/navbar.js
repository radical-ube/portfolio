import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'
import {connect} from 'react-redux'

import { setupFrame, setupNav } from './utilities'
import {setCurrentPage} from '../store/page'

const { Engine, World, Mouse, MouseConstraint } = Matter

const Navbar = props => {
  const {setCurrentPage} = props
  const ref = React.createRef()
  const engine = Engine.create()
  const world = engine.world
  const bodies = []
  const tabs = ['', 'home', 'about', 'projects', 'resume', 'contact', '']

  const Sketch = p5 => {
    let width = window.innerWidth
    let height = window.innerHeight * 0.15

    const environment = { p5, engine, world, width, height }

    const canvas = p5.createCanvas(width, height)
    const mouse = Mouse.create(canvas.elt)
    mouse.pixelRatio = p5.pixelDensity()
    const mouseOptions = {
      mouse
    }
    const mouseConstraint = MouseConstraint.create(engine, mouseOptions)
    World.add(world, mouseConstraint)

    const goToLink = () => {
      const mousePosition = {
        x: p5.mouseX,
        y: p5.mouseY
      }
      bodies.forEach(body => {
        if (body.mouseInBounds(mousePosition)) {
          setCurrentPage(body.text)
        }
      })
    }
    p5.setup = () => {
      const canvas = p5.createCanvas(width,height)
      canvas.mouseClicked(goToLink)
      setupFrame(environment)
      setupNav(environment, bodies, tabs)
      Engine.run(engine)
    }
    p5.draw = () => {
      p5.background(50, 50, 50)
      if (bodies.length) {
        bodies.forEach(body => {
          body.show()
        })
      }
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