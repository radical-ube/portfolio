import Matter from 'matter-js'

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