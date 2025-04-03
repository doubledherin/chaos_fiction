class LogoTextPoints {
  constructor(font, textSize, sandColor) {
    this.font
    this.text = "steady nerves"
    this.textSize = textSize
    this.boundingBox = font.textBounds(this.text, 0, 0, this.textSize)
    this.width = this.boundingBox.w
    this.height = this.boundingBox.h
    this.bboxx = width / 2 - this.width / 2
    this.bboxy = height / 2 + this.height / 2
    this.outerBox = {
      x: this.bboxx - 15,
      y: this.bboxy - this.height + 10,
      width: this.width + 45,
      height: this.height + 30,
    }
    // this.boundingBox = font.textBounds(this.text, this.x, this.y, this.textSize)
    this.radius = 8
    this.radians = 0
    this.x = this.radius * cos(this.radians) + this.radius * sin(this.radians)
    this.y = this.radius * sin(this.radians) + this.radius * cos(this.radians)
    this.greenOutline = color(61, 106, 85) //"#3D6A55"
    this.blue = color(86, 183, 176) // "#56B7B0"
    this.red = color(204, 50, 97) // "#CC3261"
    this.yellow = color(241, 188, 71)
    this.green = color(61, 106, 85) //"#3D6A55"
    this.sandColor = sandColor
    this.rightForce = createVector(10, 0)
    this.leftForce = createVector(-10, 0)
    this.horizontalDirection = ""

    // 'chaos fiction' text should be horizontally and vertically centered'
    this.points = font.textToPoints(
      this.text,
      this.bboxx,
      this.bboxy,
      this.textSize,
      {
        sampleFactor: 1,
      }
    )
  }

  display() {
    let x = this.radius * cos(this.radians)
    let y = this.radius * sin(this.radians)

    push()
    translate(this.bboxx, this.bboxy)

    // // yellow logo
    // fill(this.yellow)
    // text(
    //   this.text,
    //   x + this.radius * sin(this.radians),
    //   y + this.radius * cos(this.radians)
    // )
    // if (sin(this.radians) < 0) {
    //   this.horizontalDirection = "left"
    //   // print(this.horizontalDirection)
    // } else {
    //   this.horizontalDirection = "right"
    //   // print(this.horizontalDirection)
    // }
    // // print("sin(this.radians)", sin(this.radians))
    // // if (sin(this.radians) < 0) {
    // //   print("right")
    // // } else {
    // //   print("left")
    // // }

    // // if (cos(this.radians) < 0) {
    // //   print("up")
    // // } else {
    // //   print("down")
    // // }

    // // red logo
    // fill(this.red)
    // text(
    //   this.text,
    //   x + 8 - this.radius * sin(this.radians),
    //   y + 8 + this.radius * cos(this.radians)
    // )

    // // blue logo
    // fill(this.blue)
    // stroke(this.green)
    // strokeWeight(4)
    // text(
    //   this.text,
    //   x + 16 + this.radius * sin(this.radians),
    //   y + 15 + this.radius * cos(this.radians)
    // )

    // pop()
    // this.radians += 0.08
  }

  update() {
    this.x = this.radius * cos(this.radians) + this.radius * sin(this.radians)
    this.y = this.radius * sin(this.radians) + this.radius * cos(this.radians)
    this.radians += 0.05
  }

  display() {
    push()
    stroke(this.sandColor)
    // noFill()
    // rect(
    //   this.outerBox.x,
    //   this.outerBox.y,
    //   this.outerBox.width,
    //   this.outerBox.height
    // )
    beginShape()
    for (let i = 0; i < this.points.length; i++) {
      ellipse(this.points[i].x + this.x, this.points[i].y + this.y, 1, 1)
    }
    endShape()
    pop()
  }
}
