import p5 from 'p5'
import Matter from 'matter-js'

import {
  RectBodySettings,
  Renderable,
  CircleBodySettings,
  TextSettings,
  TextBoxSettings,
  ButtonSettings,
  ButtonBodySettings,
  BubbleButtonSettings,
  LinkButtonSettings
} from './'

import {
  transformBody,
  renderText,
  renderOutline,
  renderHighlight,
  defaultColor,
  setTextDimensions,
} from '../utilities'

export class Boundary {
  body: Matter.Body
  bodySettings: RectBodySettings

  constructor(bodySettings: RectBodySettings) {
    const { x, y, w, h, options } = bodySettings
    
    this.bodySettings = bodySettings
    this.body = Matter.Bodies.rectangle(x, y, w, h, options)
  }
  
  remove(world: Matter.World) {
    Matter.World.remove(world, this.body)
  }
}

export class RenderedObject implements Renderable {
  sketch: p5

  constructor (sketch: p5) {
    this.sketch = sketch
  }

  show() {}
}

class RectBody extends RenderedObject {
  body: Matter.Body

  constructor(sketch: p5, settings: RectBodySettings) {
    super(sketch)

    const { x, y, w, h, options } = settings
    this.body = Matter.Bodies.rectangle(x, y, w, h, options)
  }
}

class CircleBody extends RenderedObject {
  body: Matter.Body

  constructor(sketch: p5, settings: CircleBodySettings) {
    super (sketch)

    const { x, y, r, options } = settings
    this.body = Matter.Bodies.circle(x, y, r, options)
  }
}

export class TextBox extends RectBody {
  textSettings: TextSettings

  constructor(sketch: p5, settings: TextBoxSettings) {
    super(sketch, settings.bodySettings)

    this.textSettings = settings.textSettings
  }
  
  show() {
    this.sketch.push()
    transformBody(this.sketch, this.body)
    renderText(this.sketch, this.textSettings)
    this.sketch.pop()
  }
}

export class Button extends TextBox {
  mouseInBounds: boolean
  bodySettings: ButtonBodySettings

  constructor(sketch: p5, settings: ButtonSettings) {
    super (sketch, settings)

    const { x, y, w, h, padding = 0, options } = settings.bodySettings
    
    this.bodySettings = settings.bodySettings
    this.body = Matter.Bodies.rectangle(x, y, w + padding, h + padding, options)
    this.mouseInBounds = false
  }

  show() {
    this.sketch.push()
    transformBody(this.sketch, this.body)
    renderText(this.sketch, this.textSettings)
    renderOutline(this.sketch, this.bodySettings)
    if (this.mouseInBounds) {
      renderHighlight(this.sketch, this.bodySettings)
    }
    this.sketch.pop()
  }

  remove(world: Matter.World) {
    Matter.World.remove(world, this.body)
  }
}

export class BubbleButton extends Button {
  text: string[]

  constructor (sketch: p5, settings: BubbleButtonSettings) {
    super(sketch, {
      bodySettings: settings.bodySettings,
      textSettings: settings.textSettings
    })

    this.text = settings.bubbleText
  }
}

export class LinkButton extends Button {
  address: string

  constructor (sketch: p5, settings: LinkButtonSettings) {
    super(sketch, {
      bodySettings: settings.bodySettings,
      textSettings: settings.textSettings
    })

    this.address = settings.address
  }
}

export class Spring {
  body: Matter.Constraint
  sketch: p5

  constructor (sketch: p5, settings: any) {
    const { bodyA, bodyB, length, stiffness } = settings
  
    this.sketch = sketch
    this.body = Matter.Constraint.create({
      bodyA,
      bodyB,
      length,
      stiffness
    })
  }
  
  show() {
    const a = this.body.bodyA.position
    const b = this.body.bodyB.position
    this.sketch.push()
    this.sketch.colorMode('hsl')
    this.sketch.stroke(0, 0, 100, 0.1)
    this.sketch.line(a.x, a.y, b.x, b.y)
    this.sketch.pop()
  }
}

export class ColorBall extends CircleBody {
  bodySettings: CircleBodySettings

  constructor (sketch: p5, settings: CircleBodySettings) {
    super(sketch, settings)
  
    this.bodySettings = settings
  }

  show() {
    const { color = defaultColor } = this.bodySettings
    const { hue, saturation, lightness } = color

    this.sketch.push()
    transformBody(this.sketch, this.body)
    this.sketch.noStroke()
    this.sketch.colorMode('hsl')
    this.sketch.fill(hue, saturation, lightness)
    this.sketch.ellipse(0, 0, this.bodySettings.r * 2)
    this.sketch.pop()
  }

  shouldBeRemoved(): boolean {
    return (this.body.position.y > (window.innerHeight * 0.85 * 0.95))
  }

  remove(world: Matter.World) {
    Matter.World.remove(world, this.body)
  }
}

export class Bubble extends CircleBody {
  mouseInBounds: boolean
  bubbleShouldPop: boolean
  bodySettings: CircleBodySettings
  textSettings: TextSettings

  constructor (sketch: p5, settings: any) {
    super(sketch, settings.bodySettings)
    
    const { bodySettings, textSettings } = settings
    this.bodySettings = bodySettings
    this.textSettings = textSettings
    this.mouseInBounds = false
    this.bubbleShouldPop = false
  }

  show() {
    this.sketch.push()
    transformBody(this.sketch, this.body)
    renderText(this.sketch, this.textSettings)
    renderOutline(this.sketch, this.bodySettings)
    if (this.mouseInBounds) {
      renderHighlight(this.sketch, this.bodySettings)
    }
    this.sketch.pop()
  }

  shouldBeRemoved(): boolean {
    return (this.body.position.y - (this.bodySettings.r) < 1)
  }
}


// --- TBD ---
export class Project {
  sketch: p5
  body: Matter.Body
  mouseInBounds: boolean
  description: TextBox
  webButton: Button
  githubButton: Button
  bodySettings: any

  constructor (sketch: p5, settings: any) {
    const { x, y, w, h, options, description, textSize, website, github } = settings
  
    this.sketch = sketch
    this.bodySettings = settings

    const paraDimensions = setTextDimensions(sketch, {
      textSize,
      text: description
    })

    const webButtonDimensions = setTextDimensions(sketch, {
      textSize,
      text: website
    })

    const githubButtonDimensions = setTextDimensions(sketch, {
      textSize,
      text: github
    })
  
    this.description = new TextBox(sketch, {
      bodySettings: {
        x,
        y,
        w: paraDimensions.w,
        h: paraDimensions.h,
        shape: 'rect',
        options
      },
      textSettings: {
        text: description,
        textSize,
        boxWidth: w / 2,
        boxHeight: h / 2
      },
    })
  
    this.webButton = new Button(sketch, {
      bodySettings: {
        x: x - 50,
        y: y + 50,
        w: webButtonDimensions.w,
        h: webButtonDimensions.h,
        options,
        shape: 'rect'
      },
      
      textSettings: {
        text: 'Website',
        textSize,
        // address: website
      }
      
    })
  
    this.githubButton = new Button(sketch, {
      bodySettings: {
        x: x + 50,
        y: y + 50,
        w: githubButtonDimensions.w,
        h: githubButtonDimensions.h,
        options,
        shape: 'rect'
      },
      textSettings: {
        text: 'Github',
        textSize,
        // address: github
      },
    })
    
    this.body = Matter.Bodies.rectangle(x, y, w, h, options)
    this.mouseInBounds = false
    
  }
  
  // show() {
  //   this.sketch.push()
  //   transformBody(this.sketch, this.body)
  //   renderImage(this.sketch, {
  //     image: this.bodySettings.image,
  //     dimensions: {
  //       w: this.bodySettings.w,
  //       h: this.bodySettings.h
  //     }
  //   })
  //   if (this.mouseInBounds) {
  //     renderLowlight(this.sketch, this.bodySettings)
  //   }
  //   // else {
  //   //   this.webButton.remove(this.bodySettings.world)
  //   //   this.githubButton.remove(this.bodySettings.world)
  //   // }
  //   this.sketch.pop()
  // }

  // checkMouseInBounds(mousePosition) => {
  //   this.mouseInBounds = checkMouseInBounds(this.body, mousePosition, this.bodyConfig)
  // }
}