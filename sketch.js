let m, n, done, sand
let numberOfGrains = 10000
let maxNumberOfGrains = 15000

let font
let textPoints
const chaos = "chaos fiction"
const fontSize = 100

function preload() {
  font = loadFont("fonts/ALVEDON2.ttf")
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  stroke("#f6d7b0") // sand color

  let bbox = font.textBounds(chaos, 0, 0, fontSize)
  textPoints = font
    .textToPoints(
      chaos,
      width / 2 - bbox.w / 2,
      height / 2 + bbox.h / 2,
      fontSize,
      {
        sampleFactor: 0.5,
      }
    )
    .map((p) => ({ x: p.x, y: p.y }))
  newVibration()
  cursor(HAND)
}

function newVibration() {
  setNodeCounts()
  done = false
  sand = Array.from({ length: numberOfGrains }, () => new SandGrain())
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
  if (sand.length < maxNumberOfGrains) {
    addSand()
  }
}

function draw() {
  for (let i = 0; i < textPoints.length; i++) {
    fill(255)
    ellipse(textPoints[i].x, textPoints[i].y, 1, 1)
  }
  if (mouseIsMoving()) {
    swipeSand()
  }
  if (!done) {
    background(0)

    for (let grain of sand) {
      grain.update()
      grain.show()
    }
    done = sand.every((p) => p.isHome)
  }
}
