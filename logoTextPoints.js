class LogoTextPoints {
  constructor(font) {
    this.text = "chaos fiction"
    this.txtSize = 70
    this.width = font.textBounds(this.text, 0, 0, this.txtSize).w
    this.height = font.textBounds(this.text, 0, 0, this.txtSize).h
    this.radius = 8
    this.radians = 0
    this.x = this.radius * cos(this.radians) + this.radius * sin(this.radians)
    this.y = this.radius * sin(this.radians) + this.radius * cos(this.radians)

    // 'chaos fiction' text should be horizontally and vertically centered'
    this.points = font.textToPoints(
      this.text,
      width / 2 - this.width / 2,
      height / 2 + this.height / 2,
      this.txtSize,
      { sampleFactor: 1 }
    )
  }

  update() {
    this.x = this.radius * cos(this.radians) + this.radius * sin(this.radians)
    this.y = this.radius * sin(this.radians) + this.radius * cos(this.radians)
    this.radians += 0.05
  }

  display() {
    for (let i = 0; i < this.points.length; i++) {
      ellipse(this.points[i].x + this.x, this.points[i].y + this.y, 1, 1)
    }
  }
}
