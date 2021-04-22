import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'
import { connect } from 'react-redux'

import { setupFrame, resetPageFrame, setupProjects } from '../utilities'

const { Engine, World } = Matter

const Projects = props => {
  const { currentPage, bgColor } = props
  const ref = React.createRef()
  const engine = Engine.create()
  const world = engine.world

  const Sketch = sketch => {
    const environment = {
      sketch,
      engine,
      world,
      width: window.innerWidth,
      height: window.innerHeight * 0.85 * 2,
      bodies: [],
      boundaries: [],
      images: {},
      buttons: [],
      descriptions: [],
      projects: []
    }

    const handleClick = () => {
      environment.buttons.forEach(button => {
        if (button.mouseInBounds && button.address) {
          document.location.assign(button.address)
        }
      })
    }

    sketch.preload = () => {
      environment.images.rainbow = sketch.loadImage('images/rainbowonme.png')
      environment.images.ekopique = sketch.loadImage('images/ekopique.png')
    }
    sketch.setup = () => {
      World.clear(world, false)
      Engine.clear(engine)
      const canvas = sketch.createCanvas(environment.width, environment.height)
      canvas.mouseClicked(handleClick)
      setupFrame(environment)
      // setupProjects(environment)
    }
    sketch.draw = () => {
      sketch.background(bgColor)
      Engine.update(engine)
      const mousePosition = {
        x: sketch.mouseX,
        y: sketch.mouseY
      }
      environment.projects.forEach(project => {
        project.show()
        project.checkMouseInBounds(mousePosition)
        if (project.mouseInBounds) {
          project.description.show()
          project.webButton.show()
          project.githubButton.show()
        }
      })
      environment.buttons.forEach(button => {

        // button.show()
        button.checkMouseInBounds(mousePosition)
      })
    }
    sketch.windowResized = () => {
      resetPageFrame(environment)
      setupFrame(environment)
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