import React, { useEffect } from 'react'
import p5 from 'p5'
import Matter from 'matter-js'

import { setupFrame, setupNav, setupWorld } from '../utilities/constructors'

const { Engine, World } = Matter

const Navbar = props => {
  const ref = React.createRef()
  const engine = Engine.create()
  const world = engine.world

  const bodies = []
  const tabs = ['', 'home', 'about', 'projects', 'resume', 'contact', '']

  const Sketch = p5 => {
    let width = window.innerWidth
    let height = window.innerHeight * 0.15

    const environment = { p5, engine, world, width, height }

    const goToLink = () => {
      const mousePosition = {
        x: p5.mouseX,
        y: p5.mouseY
      }
      bodies.forEach(body => {
        if (body.mouseInBounds(mousePosition)) {
          console.log(body.text)
          // console.log('event', event)
          let url = body.text
          // const link = p5.createA(`/${url}`, `${url}`)
          // console.log('link', link)
          // return body.text
          const history = window.history
          console.log('history', history)
          const location = window.location
          console.log('location', location)
          // location.replace()

          // push onto history
          // or turn into a regular a navbar + CSS animations

        }
      })
    }
    p5.setup = () => {
      const canvas = p5.createCanvas(width,height)
      canvas.mouseClicked(goToLink)
      setupFrame(environment)
      setupNav(environment, bodies, tabs)
      // Engine.run(engine)
    }
    p5.draw = () => {
      p5.background(50, 50, 50)
      Engine.update(engine)
      if (bodies.length) {
        bodies.forEach(body => {
          body.show()
        })
      }
    }

    // p5.mouseReleased = (event) => {
    //   const mousePosition = {
    //     x: p5.mouseX,
    //     y: p5.mouseY
    //   }
    //   bodies.forEach(body => {
    //     if (body.mouseInBounds(mousePosition)) {
    //       console.log(body.text)
    //       console.log('event', event)
    //       let url = body.text
    //       // const link = p5.createA(`/${url}`, `${url}`)
    //       // console.log('link', link)

    //       // return body.text
    //     }
    //   })

    //   return false
    // }
  }

  useEffect(() => {
    new p5(Sketch, ref.current)
  }, [])

  return <div ref={ref} />
}

export default Navbar