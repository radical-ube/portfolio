import p5 from 'p5'
import Matter from 'matter-js'

import {
  ProjectEnv, 
  ProjectData
} from '../types'

import {
  renderGroup,
  checkGroupForMouse,
  createProjectGroup
} from '../utilities'

import {
  setupFrame,
  sketchWindowResized
} from './general'

export const rainbowData = {
  imagePath: 'images/rainbowonme.png',
  titleText: 'Rainbow On Me (2020)',
  descriptionText: 'Rainbow On Me was a 2-day hack-a-thon style project using p5.js to render Matter.js physics into rainbow colored blocks. It is a dedication to the Pride that can never be cancelled.\n\nTech Stack includes:\n\nReact front-end architecture\np5.js for canvas rendering\nMatter.js for physics calculations',
  websiteAddress: 'https://rainbow-on-me.herokuapp.com/rainbow',
  githubAddress: 'https://github.com/radical-ube/stackathon'
}

export const ekopiqueData = {
  imagePath: 'images/ekopique.png',
  titleText: 'ekoPique (2020)',
  descriptionText: 'ekoPique is a web app that visualizes Spotify data, created in collaboration with teammates Lyle Aigbedion and Ousainu Jabbi. We used d3.js for calculation of data pulled using Spotify\'s API, and represented the data with a variety of graphs.\n\nTech Stack includes:\n\nReact/Redux front-end\nExpress and MongoDB back-end\nSpotify API for data sourcing\nd3.js for data calculation',
  githubAddress: 'https://github.com/2004-wdf-capstone-d/capstone-spotify'
}

const setupProjects = (sketch: p5, environment: ProjectEnv, data: ProjectData) => {
  createProjectGroup(sketch, environment, data)
}

const engine = Matter.Engine.create()
const world = engine.world

export const projectEnv: ProjectEnv = {
  engine,
  world,
  bgColor: '#282c34',
  width: window.innerWidth,
  height: window.innerHeight * 0.75,
  bodies: [],
  boundaries: [],
  image: {},
  buttons: [],
}

const projectSetup = (sketch: p5, environment: ProjectEnv, data: ProjectData) => {
  const { world } = environment
  world.gravity.y = 1
  // const canvas = sketch.createCanvas(environment.w, environment.h)
  // canvas.mouseClicked(projectHandleClick)
  setupFrame(environment)
  setupProjects(sketch, environment, data)
}

const projectDraw = (sketch: p5, environment: ProjectEnv) => {
  sketch.background(environment.bgColor)
  Matter.Engine.update(engine)
  renderGroup(environment.bodies)
  renderGroup(environment.buttons)
  checkGroupForMouse(environment.buttons)
  // renderProjectDescription(environment.projects)
  // checkGroupForMouse(environment.buttons)
}

export const projectFns = {
  sketchSetup: projectSetup,
  sketchDraw: projectDraw,
  sketchWindowResized
}