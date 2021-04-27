import p5 from 'p5'
import Matter from 'matter-js'

import {
  ProjectEnv
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

const setupProjects = (sketch: p5, environment: ProjectEnv) => {
  const { images } = environment
  const { rainbow, ekopique } = images

  const rainbowTitle = 'Rainbow On Me (2020)'
  const rainbowDescription = 'Rainbow On Me was a 2-day hack-a-thon style project using p5.js to render Matter.js physics into rainbow colored blocks. It is a dedication to the Pride that can never be cancelled.\n\nTech Stack includes:\n\nReact front-end architecture\np5.js for canvas rendering\nMatter.js for physics calculations'
  const rainbowWebsite = 'https://rainbow-on-me.herokuapp.com/rainbow'
  const rainbowGithub = 'https://github.com/radical-ube/stackathon'

  const rainbowData = {
    image: rainbow,
    titleText: rainbowTitle,
    descriptionText: rainbowDescription,
    websiteAddress: rainbowWebsite,
    githubAddress: rainbowGithub
  }

  createProjectGroup(sketch, environment, rainbowData)


  const ekopiqueTitle = 'ekoPique (2020)'
  const ekopiqueDescription = 'ekoPique is a web app that visualizes Spotify data, created in collaboration with teammates Lyle Aigbedion and Ousainu Jabbi. We used d3.js for calculation of data pulled using Spotify\'s API, and represented the data with a variety of graphs.\n\nTech Stack includes:\n\nReact/Redux front-end\nExpress and MongoDB back-end\nSpotify API for data sourcing\nd3.js for data calculation'
  let ekopiqueAddress = 'https://ekopique.herokuapp.com'
  let ekopiqueGithub = 'https://github.com/2004-wdf-capstone-d/capstone-spotify'

  const ekopiqueData = {
    image: ekopique,
    titleText: ekopiqueTitle,
    descriptionText: ekopiqueDescription,
    // websiteAddress: ekopiqueAddress,
    githubAddress: ekopiqueGithub
  }

  // createProjectGroup(sketch, environment, ekopiqueData)
  
}

const engine = Matter.Engine.create()
const world = engine.world

export const projectEnv: ProjectEnv = {
  engine,
  world,
  bgColor: '#282c34',
  width: window.innerWidth,
  height: window.innerHeight * 0.85,
  bodies: [],
  boundaries: [],
  images: {},
  buttons: [],
  descriptions: [],
  projects: []
}

const projectSetup = (sketch: p5, environment: ProjectEnv) => {
  const { world } = environment
  world.gravity.y = 1
  // const canvas = sketch.createCanvas(environment.w, environment.h)
  // canvas.mouseClicked(projectHandleClick)
  setupFrame(environment)
  setupProjects(sketch, environment)
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