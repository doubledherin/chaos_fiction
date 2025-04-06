let boundingBox, alvedon, m, n, sand, sandColor
let numberOfSandGrains = 10000
let fontSize

function preload() {
  alvedon = loadFont("fonts/ALVEDON2.ttf")
  orbitronBold = loadFont("fonts/Orbitron-Bold.ttf")
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight)
  canvas.parent("p5-canvas")

  fontSize = width < 600 ? 50 : width / 14
  sandColor = color(252, 229, 174)
  steadyNervesBoundingBox = alvedon.textBounds("steady nerves", 0, 0, fontSize)
  steadyNervesX = width / 2 - steadyNervesBoundingBox.w / 2
  steadyNervesY = height / 2 - steadyNervesBoundingBox.h / 2
  newVibration()
  cursor(HAND)
  textFont(alvedon)
  textSize(fontSize)
  loadPixels()
}

function newVibration() {
  setNodeCounts()
  sand = Array.from(
    { length: numberOfSandGrains },
    () => new SandGrain(sandColor)
  )
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
    sand.push(new SandGrain(sandColor))
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

  if (mouseIsMoving()) {
    swipeSand()
  }
  for (let grain of sand) {
    grain.update()
    grain.show()
  }
  push()
  strokeWeight(3)
  textSize(fontSize)
  text("steady nerves", steadyNervesX, steadyNervesY)
  pop()
}
