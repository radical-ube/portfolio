import p5 from 'p5'
import Matter from 'matter-js'

import {
  ProjectEnv, 
  SetupModifiers
} from '../types'

import {
  renderGroup,
  checkGroupForMouse,
  createProjectGroup
} from '../utilities'

import {
  setupFrame,
  sketchWindowResized,
  engine,
  world,
  bgColor,
  width,
  height
} from './defaults'


export const rainbowData = {
  imageKey: 'rainbow',
  titleText: 'Rainbow On Me (2020)',
  descriptionText: 'Rainbow On Me was a 2-day hack-a-thon style project using p5.js to render Matter.js physics into rainbow colored blocks. It is a dedication to the Pride that can never be cancelled.\n\nTech Stack includes:\n\nReact front-end architecture\np5.js for canvas rendering\nMatter.js for physics calculations',
  websiteAddress: 'https://rainbow-on-me.herokuapp.com/rainbow',
  githubAddress: 'https://github.com/radical-ube/stackathon'
}

export const ekopiqueData = {
  imageKey: 'ekopique',
  titleText: 'ekoPique (2020)',
  descriptionText: 'ekoPique is a web app that visualizes Spotify data, created in collaboration with teammates Lyle Aigbedion and Ousainu Jabbi. We used d3.js for calculation of data pulled using Spotify\'s API, and represented the data with a variety of graphs.\n\nTech Stack includes:\n\nReact/Redux front-end\nExpress and MongoDB back-end\nSpotify API for data sourcing\nd3.js for data calculation',
  githubAddress: 'https://github.com/2004-wdf-capstone-d/capstone-spotify'
}

export const portfolioData = {
  imageKey: 'portfolio',
  titleText: 'portfolio project (2020-21)',
  descriptionText: 'This website was created as an extension of my Rainbow On Me solo project. It was bootstrapped with Create React App, originally written in JavaScript (2020), and recently transcribed and reorganized with TypeScript (2021).\n\nTech Stack includes:\n\nTypeScript React/Redux front-end architecture\np5.js for canvas rendering\nMatter.js for physics calculations',
  websiteAddress: 'https://radical-ube.netlify.app',
  githubAddress: 'https://github.com/radical-ube/portfolio'
}

const setupProjects = (sketch: p5, environment: ProjectEnv, modifiers: SetupModifiers) => {
  createProjectGroup(sketch, environment, modifiers)
}

export const projectEnv: ProjectEnv = {
  engine,
  world,
  bgColor,
  width,
  height: height * 0.85,
  bodies: [],
  boundaries: [],
  buttons: [],
}

const projectSetup = (sketch: p5, environment: ProjectEnv, modifiers: SetupModifiers) => {
  const { world } = environment
  world.gravity.y = 1
  setupFrame(environment)
  setupProjects(sketch, environment, modifiers)
}

const projectDraw = (sketch: p5, environment: ProjectEnv) => {
  sketch.background(environment.bgColor)
  Matter.Engine.update(engine)
  renderGroup(environment.bodies)
  renderGroup(environment.buttons)
  checkGroupForMouse(environment.buttons)
}

export const projectFns = {
  sketchSetup: projectSetup,
  sketchDraw: projectDraw,
  sketchWindowResized
}