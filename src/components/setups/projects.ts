import p5 from 'p5'
import Matter from 'matter-js'

import {
  Project,
  ImageBox,
  ImageSettings,
  RectBodySettings,
  ProjectEnv,
  TextBox
} from '../types'

import {
  addToWorld,
  renderGroup,
  checkGroupForMouse,
  renderProjectDescription,
  createWordColumn,
  setTextDimensions,
  defaultColor,
  defaultAlignment
} from '../utilities'

import {
  setupFrame,
  sketchWindowResized
} from './general'

const setupProjects = (sketch: p5, environment: ProjectEnv) => {
  const { width, height, images, descriptions, buttons, world, projects, bodies } = environment
  const { rainbow, ekopique } = images

  const imageWidth = width * 0.45
  const imageHeight = imageWidth * (9 / 16)
  const textSize = width * 0.03

  const rainbowImgSettings: ImageSettings = {
    bodySettings: {
      x: width * 0.25,
      y: height * 0.35,
      w: imageWidth,
      h: imageHeight,
      options: {
        isStatic: true
      },
      shape: 'rect'
    },
    image: rainbow
  }

  const rainbowImage = new ImageBox(sketch, rainbowImgSettings)
  addToWorld(world, rainbowImage, bodies)

  const titleText = 'Rainbow On Me'
  const dimensions = setTextDimensions(sketch, {
    textSize,
    text: titleText
  })
  const titleBodySettings: RectBodySettings = {
    x: width * 0.25,
    y: height * 0.7,
    w: dimensions.w,
    h: dimensions.h,
    options: {isStatic: true},
    padding: 10,
    shape: 'rect'
  }
  const title = new TextBox(sketch, {
    bodySettings: titleBodySettings,
    textSettings: {
      textSize,
      text: titleText,
      color: defaultColor,
      alignment: defaultAlignment
    }
  })
  addToWorld(world, title, bodies)

  // let rainbowText = 'Rainbow On Me was a 2-day hack-a-thon style project using p5.js to render Matter.js physics into rainbow colored blocks. It is a dedication to the Pride that can never be cancelled.'
  // let rainbowAddress = 'https://rainbow-on-me.herokuapp.com/rainbow'
  // let rainbowGithub = 'https://github.com/radical-ube/stackathon'

  // createWordColumn(rainbowText, sketch, environment, {
  //   xMod: 0.65
  // })

  // const rainbowProject = new Project(sketch, {
  //   x: width * 0.5,
  //   y: height * 0.25,
  //   w: imageWidth,
  //   h: imageHeight,
  //   options: {isStatic: true},
  //   image: rainbow,
  //   description: rainbowText,
  //   textSize,
  //   website: rainbowAddress,
  //   github: rainbowGithub,
  //   world
  // })
  // addToWorld(world, rainbowProject, projects)
  // addToWorld(world, rainbowProject.description, descriptions)
  // addToWorld(world, rainbowProject.webButton, buttons)
  // addToWorld(world, rainbowProject.githubButton, buttons)


  // let ekopiqueText = 'ekoPique is a web app that visualizes Spotify data, created in collaboration with teammates Lyle Aigbedion and Ousainu Jabbi. We used d3.js for calculation of data pulled using Spotify\'s API. Find out how "danceable" your favorite songs are!'
  // let ekopiqueAddress = 'https://ekopique.herokuapp.com'
  // let ekopiqueGithub = 'https://github.com/2004-wdf-capstone-d/capstone-spotify'

  // const ekopiqueProject = new Project(sketch, {
  //   x: width * 0.5,
  //   y: height * 0.75,
  //   w: imageWidth,
  //   h: imageHeight,
  //   options: {isStatic: true},
  //   image: ekopique,
  //   description: ekopiqueText,
  //   textSize,
  //   website: ekopiqueAddress,
  //   github: ekopiqueGithub,
  // })
  // addToWorld(world, ekopiqueProject, projects)
  // addToWorld(world, ekopiqueProject.description, descriptions)
  // addToWorld(world, ekopiqueProject.webButton, buttons)
  // addToWorld(world, ekopiqueProject.githubButton, buttons)
  
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
  // renderGroup(environment.projects)
  // checkGroupForMouse(environment.projects)
  // renderProjectDescription(environment.projects)
  // checkGroupForMouse(environment.buttons)
}

export const projectFns = {
  sketchSetup: projectSetup,
  sketchDraw: projectDraw,
  sketchWindowResized
}