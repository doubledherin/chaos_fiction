let boundingBox, alvedon, m, n, sand, sandColor
let numberOfSandGrains = 10000
let fontSize
const releaseDateTimestamp = "2025-04-11T07:01:00Z"
const prereleaseHtml = `<div>New album Steady Nerves releasing on April 11, 2025<div>`
const postreleaseHtml = `<div>New album Steady Nerves now streaming everywhere.</br>Vinyl coming soon!</br>Listen <a href='https://chaosfiction.hearnow.com/steady-nerves'>here</a>.<div>`

// check every minute to see if the release date has passed
const isPostRelease = setInterval(() => {
  checkTime()
}, 60000)

function preload() {
  alvedon = loadFont("fonts/ALVEDON2.ttf")
  orbitronBold = loadFont("fonts/Orbitron-Bold.ttf")
}

function setup() {
  // const canvasMargin = 100
  const canvas = createCanvas(windowWidth, windowHeight)
  canvas.parent("p5-canvas")

  // setReleaseCopy(canvas)
  // updateReleaseCopy(postreleaseHtml)
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

function checkTime() {
  const releaseDate = new Date(releaseDateTimestamp)
  console.log(getISODateStringFor10SecondsFromNow())
  const tenSecondsFromNow = new Date("2025-04-04T02:21:30Z")
  const now = new Date()
  if (now >= releaseDate) {
    clearInterval(isPostRelease) // Stop checking once the update is made
    return true
  }
  return false
}

// for testing the update to the release info
function getISODateStringFor10SecondsFromNow() {
  const now = new Date()
  const thirtySecondsFromNow = new Date(now.getTime() + 10000) // Add 30 seconds

  // Format the date to "YYYY-MM-DDTHH:mm:ssZ"
  const year = thirtySecondsFromNow.getUTCFullYear()
  const month = String(thirtySecondsFromNow.getUTCMonth() + 1).padStart(2, "0") // Months are 0-indexed
  const day = String(thirtySecondsFromNow.getUTCDate()).padStart(2, "0")
  const hours = String(thirtySecondsFromNow.getUTCHours()).padStart(2, "0")
  const minutes = String(thirtySecondsFromNow.getUTCMinutes()).padStart(2, "0")
  const seconds = String(thirtySecondsFromNow.getUTCSeconds()).padStart(2, "0")

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`
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

// function setReleaseCopy(canvas) {
//   const releaseDiv = createDiv(prereleaseHtml)
//   releaseDiv.id("release-info")

//   // Wait for the DOM to calculate the dimensions of releaseDiv
//   releaseDiv.style("visibility", "hidden") // Hide it temporarily to avoid flickering
//   releaseDiv.position(0, 0) // Temporarily position it to calculate dimensions

//   // Use a timeout to ensure the DOM has calculated the dimensions
//   setTimeout(() => {
//     const releaseDivWidth = releaseDiv.elt.offsetWidth
//     const releaseDivHeight = releaseDiv.elt.offsetHeight

//     // Increase the width by a percentage
//     const increasedWidth = releaseDivWidth * 1.05 // 10% increase
//     releaseDiv.style("width", `${increasedWidth}px`)

//     // Align the top of the releaseDiv with the top of the canvas
//     releaseDiv.position(
//       canvas.elt.offsetLeft + (canvas.width - increasedWidth) / 2,
//       // canvas.elt.offsetLeft, //+ (canvas.width - increasedWidth) / 2, // Center horizontally
//       canvas.elt.offsetTop + releaseDivHeight / 2 + 20 // Align with the top of the canvas
//     )

//     releaseDiv.style("visibility", "visible") // Make it visible again
//   }, 0)
// }
