let font
let points = []
let msg = "chaos fiction"
let size = 100
let r = 8
let angle = 0
let t = 0
let blue = "#56B7B0"
let red = "#CC3261"
let yellow = "#F1BC47"
let green = "#3D6A55"

function preload() {
  font = loadFont("fonts/ALVEDON2.ttf")
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
function setup() {
  const canvas = createCanvas(windowWidth, windowHeight)
  angleMode(DEGREES)
  canvas.position(width / 2, 300)
  canvas.style("z-index", "-1")
}

function draw() {
  background(255)
  let x = r * cos(angle)
  let y = r * sin(angle)

  // yellow points
  translate(20, 100)
  textSize(size)
  textFont(font)
  fill(yellow)
  text(msg, x + r * sin(angle), y + r * cos(angle))
  fill(red)
  text(msg, x + 8 - r * sin(angle), y + 8 + r * cos(angle))
  fill(blue)
  stroke(green)
  strokeWeight(4)
  text(msg, x + 16 + r * sin(angle), y + 15 + r * cos(angle))
  noStroke()
  angle += 2
}
