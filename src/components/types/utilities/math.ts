import {
  Position,
  Triangle
} from '../types'

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min)) + min
}

export const distanceBetweenTwoPoints = (pointOne: Position, pointTwo: Position): number => {
  let sideOne = pointOne.x - pointTwo.x
  let sideTwo = pointOne.y - pointTwo.y

  return Math.sqrt( sideOne*sideOne + sideTwo*sideTwo )
}

const triangleFromVertices = (vertexOne: Position, vertexTwo: Position, vertexThree: Position): Triangle => {
  const sideOne = distanceBetweenTwoPoints(vertexOne, vertexTwo)
  const sideTwo = distanceBetweenTwoPoints(vertexOne, vertexThree)
  const sideThree = distanceBetweenTwoPoints(vertexTwo, vertexThree)

  return {
    sideOne,
    sideTwo,
    sideThree
  }
}

const areaOfTriangle = (triangle: Triangle): number => {
  const { sideOne, sideTwo, sideThree } = triangle
  const semiPerimeter = (sideOne + sideTwo + sideThree) / 2

  return Math.sqrt(semiPerimeter * (semiPerimeter - sideOne) * (semiPerimeter - sideTwo) * (semiPerimeter - sideThree))
}

export const rectAreaFromVertices = (position: Position, vertices: Position[]): number => {
  // find and sum the triangles created from position and vertices
  return vertices
    // find sides of triangles
    .map((vertex, index, array) => {
      let nextPointIdx = index + 1
      if (index === array.length - 1) nextPointIdx = 0
      return triangleFromVertices(position, vertex, array[nextPointIdx])
    })
    // find areas of triangles
    .map(triangle => {
      return areaOfTriangle(triangle)
    })
    // sum all the triangles
    .reduce((sum, curVal) => {
      return sum + curVal
    }, 0)
}