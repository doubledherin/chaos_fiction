let boundingBox, font, m, n, done, sand, logo
let numberOfSandGrains = 10000
let sandColor = "#f6d7b0"
let fontSize = 70

function preload() {
  font = loadFont("fonts/ALVEDON2.ttf")
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  stroke(sandColor)
  newVibration()
  cursor(HAND)
  textFont(font)
  textSize(fontSize)

  logo = new LogoTextPoints(font, fontSize)
}

function newVibration() {
  setNodeCounts()
  done = false
  sand = Array.from({ length: numberOfSandGrains }, () => new SandGrain())
}

// m and n are used in the chladni function.
// See Chladni plate mathematics here: https://paulbourke.net/geometry/chladni/
function setNodeCounts() {
  const min = 1
  const max = 50
  // m is the number of diametric (i.e. linear) nodes on the vibrating plate
  m = floor(random(min, max))
  // n is the number of radial (i.e. circular) nodes on the vibrating plate
  n = floor(random(min, max))

  // prevent m and n from being equal, as the results are uninteresting as a consequence
  while (m === n) {
    n = floor(random(min, max))
  }
}

function addSand() {
  for (let i = 0; i < 100; i++) {
    sand.push(new SandGrain())
  }
}

function swipeSand() {
  const swipeRadius = width / 15
  const swipeStrength = 5
  for (let grain of sand) {
    // the distance between the grain of sand and the mouse
    const distance = dist(
      mouseX,
      mouseY,
      grain.currentPosition.x,
      grain.currentPosition.y
    )

    if (distance < swipeRadius) {
      // the direction to push the grain away from the mouse
      const swipeForce = createVector(
        grain.currentPosition.x - mouseX,
        grain.currentPosition.y - mouseY
      )
      swipeForce.setMag(swipeStrength)

      // Apply the swipeForce to the grain
      grain.velocity.add(swipeForce)
    }
  }
}

function touchStarted() {
  newVibration()
}

function mousePressed() {
  newVibration()
}

// TO DO: Swipe sand when mouse moves over canvas
function mouseIsMoving() {
  return mouseX !== pmouseX || mouseY !== pmouseY
}

function mouseMoved() {
  addSand()
}

function draw() {
  background(0)
  // logo.update()
  logo.display()

  if (mouseIsMoving()) {
    swipeSand()
  }
  for (let grain of sand) {
    grain.update()
    grain.show()
  }
  done = sand.every((p) => p.isHome)
}
