class LogoTextPoints {
  constructor(font) {
    this.font
    this.text = "chaos fiction"
    this.txtSize = 70
    this.width = font.textBounds(this.text, 0, 0, this.txtSize).w
    this.height = font.textBounds(this.text, 0, 0, this.txtSize).h
    this.radius = 8
    this.radians = 0
    this.x = this.radius * cos(this.radians) + this.radius * sin(this.radians)
    this.y = this.radius * sin(this.radians) + this.radius * cos(this.radians)
    this.greenOutline = "#3D6A55"
    this.blue = "#56B7B0"
    this.red = "#CC3261"
    this.yellow = "#F1BC47"
    this.green = "#3D6A55"

    // 'chaos fiction' text should be horizontally and vertically centered'
    this.points = font.textToPoints(
      this.text,
      width / 2 - this.width / 2,
      height / 2 + this.height / 2,
      this.txtSize,
      { sampleFactor: 1 }
    )
  }

  display() {
    let x = this.radius * cos(this.radians)
    let y = this.radius * sin(this.radians)

    // yellow points
    // translate(20, 300)

    textSize(this.txtSize)
    push()
    translate(width / 2 - this.width / 2, height / 2 + this.height / 2)
    fill(this.yellow)
    text(
      this.text,
      x + this.radius * sin(this.radians),
      y + this.radius * cos(this.radians)
    )
    fill(this.red)
    text(
      this.text,
      x + 8 - this.radius * sin(this.radians),
      y + 8 + this.radius * cos(this.radians)
    )
    fill(this.blue)
    stroke(this.green)
    strokeWeight(4)
    text(
      this.text,
      x + 16 + this.radius * sin(this.radians),
      y + 15 + this.radius * cos(this.radians)
    )
    noStroke()
    pop()
    this.radians += 0.05
  }

  // update() {
  //   this.x = this.radius * cos(this.radians) + this.radius * sin(this.radians)
  //   this.y = this.radius * sin(this.radians) + this.radius * cos(this.radians)
  //   this.radians += 0.05
  // }

  // display() {
  //   push()
  //   beginShape()
  //   for (let i = 0; i < this.points.length; i++) {
  //     stroke(this.greenOutline)
  //     ellipse(this.points[i].x + this.x, this.points[i].y + this.y, 1, 1)
  //   }
  //   endShape()
  //   pop()
  // }
}
