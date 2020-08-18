import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'
import { connect } from 'react-redux'

import { setupFrame, setupProjects } from '../utilities'

const { Engine, World } = Matter

const Projects = props => {
  const { currentPage, bgColor } = props
  const ref = React.createRef()
  const engine = Engine.create()
  const world = engine.world

  const Sketch = p5 => {
    const environment = {
      p5,
      engine,
      world,
      width: window.innerWidth,
      height: window.innerHeight * 0.85,
      bodies: [],
      images: {},
      buttons: []
    }

    const handleClick = () => {
      environment.buttons.forEach(button => {
        if (button.mouseInBounds && button.address) {
          document.location.assign(button.address)
        }
      })
    }

    p5.preload = () => {
      environment.images.rainbow = p5.loadImage('images/rainbowonme.png')
      environment.images.ekopique = p5.loadImage('images/ekopique.png')
    }
    p5.setup = () => {
      World.clear(world, false)
      Engine.clear(engine)
      const canvas = p5.createCanvas(environment.width, environment.height)
      canvas.mouseClicked(handleClick)
      setupFrame(environment)
      setupProjects(environment)
    }
    p5.draw = () => {
      p5.background(bgColor)
      Engine.update(engine)
      const mousePosition = {
        x: p5.mouseX,
        y: p5.mouseY
      }
      environment.bodies.forEach(body => {
        body.show()
      })
      environment.buttons.forEach(button => {
        button.show()
        button.checkMouseInBounds(mousePosition)
      })
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

const mapState = state => {
  return {
    currentPage: state.currentPage
  }
}

export default connect(mapState)(Projects)