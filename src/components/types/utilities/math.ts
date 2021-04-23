import p5 from 'p5'

import {
  Position
} from '../types'

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min)) + min
}

const areaFromPoints = (position: Position, vertices: Position[], sketch: p5): number => {
  // find and sum the triangles created from position and vertices
  return vertices
    // find edges of triangles
    .map((vertex, index, array) => {
      let nextPointIdx = index + 1
      if (index === array.length - 1) nextPointIdx = 0

      const edgeOne = sketch.dist(position.x, position.y, vertex.x, vertex.y)
      const edgeTwo = sketch.dist(position.x, position.y, array[nextPointIdx].x, array[nextPointIdx].y)
      const edgeThree = sketch.dist(vertex.x, vertex.y, array[nextPointIdx].x, array[nextPointIdx].y)

      return {
        edgeOne,
        edgeTwo,
        edgeThree
      }
    })
    // find areas of triangles
    .map((edges) => {
      const { edgeOne, edgeTwo, edgeThree } = edges
      const semiPerimeter = (edgeOne + edgeTwo + edgeThree) / 2

      return sketch.sqrt(semiPerimeter * (semiPerimeter - edgeOne) * (semiPerimeter - edgeTwo) * (semiPerimeter - edgeThree))
    })
    // sum all the triangles
    .reduce((sum, curVal) => {
      return sum + curVal
    }, 0)
}