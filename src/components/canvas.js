import React, {useState, useEffect} from 'react'
import p5 from 'p5'
import Matter from 'matter-js'

import {setupWorld} from './constructors'

const {Engine, Events, World} = Matter

const Canvas = props => {
  const ref = React.createRef()
  const engine = Engine.create()
  const world = engine.world

  const bodies = []

  const Sketch = p5 => {
    let width = window.innerWidth
    let height = window.innerHeight
    // const {setup, draw, createCanvas} = p5

    const settings = {p5, engine, world}
    const viewScreen = {width, height}

    p5.setup = () => {
      p5.createCanvas(width, height)
      setupWorld(settings, viewScreen, bodies)
    }
    p5.draw = () => {
      p5.background(50, 50, 50)
      Engine.update(engine)
      if (bodies.length) {
        for (let i = 0; i < bodies.length; i++) {
          bodies[i].show()
        }
      }
      // p5.push()
      // p5.rectMode(p5.CENTER)
      // p5.strokeWeight(1)
      // p5.stroke(255)
      // p5.rect(200, 200, 200, 200)
      // p5.pop()
    }
  }

  useEffect(() => {
    const myP5 = new p5(Sketch, ref.current)
  }, [])

  return <div ref={ref} />
}

export default Canvas