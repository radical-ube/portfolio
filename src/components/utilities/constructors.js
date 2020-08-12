import Matter from 'matter-js'

import { getRandomColor } from './color'

const { Bodies, World, Constraint } = Matter

const textBoxConstructor = environment => {
  const { p5 } = environment
  const { CENTER, HSL } = p5
  return function TextBox(settings) {
    const { x, y, inputText, isStatic, textSize, color } = settings
    p5.textSize(textSize)

    this.text = inputText
    this.w = p5.textWidth(this.text)
    this.h = p5.textAscent(this.text)
    this.options = {
      friction: 0.4,
      restitution: 0.8,
      isStatic
    }
    this.body = Bodies.rectangle(x, y, this.w, this.h, this.options)
    this.color = color || {
      hue: 0,
      saturation: 0,
      lightness: 100,
      alpha: 0.2
    }


    this.show = () => {
      const { hue, saturation, lightness, alpha } = this.color
      this.position = this.body.position
      this.angle = this.body.angle

      p5.push()
      p5.translate(this.position.x, this.position.y)
      p5.rotate(this.angle)
      p5.rectMode(CENTER)
      p5.textAlign(CENTER, CENTER)
      p5.colorMode(HSL)
      p5.fill(hue, saturation, lightness, alpha)
      p5.text(this.text, 0, 0)
      p5.pop()
    }

    this.mouseInBounds = (mousePosition) => {
      const vertices = this.body.vertices

      // find and sum the triangles created from position and vertices
      const areaFromPoints = (position, vertices) => {
        return vertices
          // find edges of triangles
          .map((vertex, index, array) => {
            let nextPointIdx = index + 1
            if (index === array.length - 1) nextPointIdx = 0

            const edgeOne = p5.dist(position.x, position.y, vertex.x, vertex.y)
            const edgeTwo = p5.dist(position.x, position.y, array[nextPointIdx].x, array[nextPointIdx].y)
            const edgeThree = p5.dist(vertex.x, vertex.y, array[nextPointIdx].x, array[nextPointIdx].y)

            return {
              edgeOne,
              edgeTwo,
              edgeThree
            }
          })
          // find areas of triangles
          .map((edges, index, array) => {
            const { edgeOne, edgeTwo, edgeThree } = edges
            const semiPerimeter = (edgeOne + edgeTwo + edgeThree) / 2

            return p5.sqrt(semiPerimeter * (semiPerimeter - edgeOne) * (semiPerimeter - edgeTwo) * (semiPerimeter - edgeThree))
          })
          // sum all the triangles
          .reduce((sum, curVal) => {
            return sum + curVal
          }, 0)
      }

      const mouseArea = areaFromPoints(mousePosition, vertices)

      return (mouseArea < this.body.area + 1)
    }

  }
}



const boundaryConstructor = environment => {
  return function Boundary(x, y, w, h, label = 'boundary') {
    const options = {
      friction: 0.3,
      restitution: 1,
      isStatic: true,
      label
    }
    this.body = Bodies.rectangle(x, y, w, h, options)
    this.w = w
    this.h = h
  }
}

const constraintConstructor = environment => {
  // const { p5, world } = environment
  return function Spring(bodyA, bodyB, length, stiffness) {
    this.body = Constraint.create({
      bodyA,
      bodyB,
      length,
      stiffness
    })
  }
}

export const setupFrame = environment => {
  const { world, width, height } = environment
  const Boundary = boundaryConstructor(environment)

  const ground = new Boundary(width / 2, height * 2, width * 2, height * 2)
  const ceiling = new Boundary(width / 2, height * -1, width * 2, height * 2)
  const leftWall = new Boundary(width * -1, height / 2, width * 2, height)
  const rightWall = new Boundary(width * 2, height / 2, width * 2, height)

  World.add(world, [ground.body, ceiling.body, leftWall.body, rightWall.body])
}

export const setupNav = (environment, bodies, tabs) => {
  const { world, width, height } = environment
  const TextBox = textBoxConstructor(environment)
  const Spring = constraintConstructor(environment)

  let previousWord = null
  for (let i = 0; i < tabs.length; i++) {
    const randomColor = getRandomColor()
    let settings = {
      x: 0,
      y: 0,
      inputText: tabs[i],
      isStatic: false,
      textSize: 32,
      color: randomColor()
    }
    if (!previousWord || i === tabs.length - 1) settings.isStatic = true
    settings.x = -15 + (i * 20)
    settings.y = height * 0.5
    if (i === tabs.length - 1) {
      settings.x = width + 15
      // y = height + 10
    }
    let word = new TextBox(settings)
    World.add(world, word.body)
    bodies.push(word)

    if (i > 0) {
      let constraint = new Spring(word.body, previousWord.body, width * 0.135, 0.65)
      World.add(world, constraint.body)
    }
    previousWord = word
  }
}



export const setupHome = (environment, bodies) => {
  const { world, width, height } = environment
  const TextBox = textBoxConstructor(environment)

  let titleText = 'hello world, my name is ube'
  const words = titleText.split(' ')
  for (let i = 0; i < words.length; i++) {
    const randomColor = getRandomColor()
    let settings = {
      x: 0,
      y: 0,
      inputText: words[i],
      isStatic: false,
      textSize: height / 6,
      color: randomColor()
    }

    settings.x = width / 2
    settings.y = height * 0.2 + (i * 100)
   
    let word = new TextBox(settings)
    World.add(world, word.body)
    bodies.push(word)
   
  }

}