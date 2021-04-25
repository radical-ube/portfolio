import Matter from 'matter-js'


// export function ProjectConstructor(this: Project, environment: Environment, settings: any) {
//   const { sketch, world, projects, descriptions, buttons } = environment
//   const { x, y, width, height, image, description, textSize, website, github, options } = settings

//   this.bodyConfig = {
//     sketch,
//     image,
//     dimensions: {
//       w: width,
//       h: height
//     },
//     shape: 'rect'
//   }

//   this.description = new ParagraphBoxConstructor(environment, {
//     x,
//     y,
//     textSettings: {
//       text: description,
//       textSize,
//       boxWidth: width / 2,
//       boxHeight: height / 2
//     },
//     options
//   })

//   this.webButton = new ButtonConstructor(environment, {
//     x: x - 50,
//     y: y + 50,
//     textSettings: {
//       text: 'Website',
//       textSize,
//       address: website
//     },
//     options
//   })

//   this.githubButton = new ButtonConstructor(environment, {
//     x: x + 50,
//     y: y + 50,
//     textSettings: {
//       text: 'Github',
//       textSize,
//       address: github
//     },
//     options
//   })
  
//   this.body = Bodies.rectangle(x, y, width, height, options)
//   this.mouseInBounds = false
//   addToWorld(world, this, projects)
//   addToWorld(world, this.description, descriptions)
//   addToWorld(world, this.webButton, buttons)
//   addToWorld(world, this.githubButton, buttons)

//   this.show = () => {
//     sketch.push()
//     transformBody(sketch, this.body)
//     renderImage(this.bodyConfig)
//     if (this.mouseInBounds) {
//       renderLowlight(this.bodyConfig)
//     }
//     else {
//       this.webButton.remove()
//       this.githubButton.remove()
//     }
//     sketch.pop()
//   }

//   this.checkMouseInBounds = (mousePosition) => {
//     this.mouseInBounds = checkMouseInBounds(this.body, mousePosition, this.bodyConfig)
//   }
// }



// export function ColorBallConstructor(this: ColorBall, environment: Environment, settings: any) {
//   const { sketch, world, particles, height } = environment
//   const { x, y, r, options, color } = settings

//   this.r = r
//   this.options = options
//   this.color = color || defaultColor
//   this.body = Bodies.circle(x, y, this.r, this.options)
//   if (particles.length < 200) {
//     addToWorld(world, this, particles)
//   }

//   this.show = () => {
//     const { hue, saturation, lightness } = this.color

//     sketch.push()
//     transformBody(sketch, this.body)
//     sketch.noStroke()
//     sketch.colorMode('hsl')
//     sketch.fill(hue, saturation, lightness)
//     sketch.ellipse(0, 0, this.r * 2)
//     sketch.pop()
//   }

//   this.isBelowLine = () => {
//     return (this.body.position.y > (height * 0.95))
//   }
//   this.remove = () => {
//     World.remove(world, this.body)
//   }
// }




// export function BubbleConstructor(this: Bubble, environment: Environment, settings: any) {
//   const { sketch, world, bubbles } = environment
//   const { x, y, options, textSettings, color } = settings

//   // class properties
//   this.config = {
//     sketch,
//     textSettings,
//     color: color || defaultColor,
//     alignment: {
//       horizontal: Horizontal.Center,
//       vertical: Vertical.Center
//     },
//     shape: Shape.Circle,
//     dimensions: setTextDimensions(this.config)
//   }
//   this.options = options
//   this.body = Bodies.circle(x, y, this.config.dimensions.w / 2, this.options)
//   this.mouseInBounds = false
//   this.bubbleShouldPop = false
//   addToWorld(world, this, bubbles)

//   // class methods
//   this.show = () => {
//     sketch.push()
//     transformBody(sketch, this.body)
//     renderText(this.config)
//     renderOutline(this.config)
//     if (this.mouseInBounds) {
//       renderHighlight(this.config)
//     }
//     sketch.pop()
//   }

//   this.checkMouseInBounds = (mousePosition) => {
//     this.mouseInBounds = checkMouseInBounds(this.body, mousePosition, this.config)
//   }

//   this.checkBubblePop = () => {
//     this.bubbleShouldPop = (this.body.position.y - (this.config.dimensions.w / 2) < 1)
//   }

//   this.remove = () => {
//     World.remove(world, this.body)
//   }
// }