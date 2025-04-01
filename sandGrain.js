class SandGrain {
  constructor() {
    this.currentPosition = createVector(random(0, width), random(0, height))
    this.velocity = p5.Vector.random2D()
    this.acceleration = createVector()
    this.maxCurrentVelocity = 1
    this.maxSteeringVelocity = 1
    this.isHome = false
    this.threshold = 0.05
    // this.closestTextPoint = this.getClosestTextPoint()
  }

  checkEdges() {
    if (this.currentPosition.x > width) {
      this.currentPosition.x = width
    } else if (this.currentPosition.x < 0) {
      this.currentPosition.x = 0
    }
    if (this.currentPosition.y > height) {
      this.currentPosition.y = height
    } else if (this.currentPosition.y < 0) {
      this.currentPosition.y = 0
    }
  }

  // getClosestTextPoint() {
  //   let closestPoint
  //   let shortestDistance = width

  //   for (let point of textPoints) {
  //     // Calculate the distance between the current position and the text point
  //     let distance = dist(
  //       this.currentPosition.x,
  //       this.currentPosition.y,
  //       point.x,
  //       point.y
  //     )

  //     // If this distance is shorter than the current shortest distance, update
  //     if (distance < shortestDistance) {
  //       shortestDistance = distance
  //       closestPoint = point
  //     }
  //   }

  //   return createVector(closestPoint.x, closestPoint.y)
  // }

  getSteeringVelocity() {
    let x = map(this.currentPosition.x, 0, width, 0, 1)
    let y = map(this.currentPosition.y, 0, height, 0, 1)
    let chladniValue = this.chladni(x, y)
    let targetPosition = this.currentPosition.copy()
    // let targetPosition = this.closestTextPoint
    //
    // if the chladni values are not on nodal lines (+/- the threshold), make the target +/- 3x3 pixels away; otherwise, the target is the same as the current currentPosition, so the particle doesn't move
    // if (targetPosition.mag() > this.threshold) {
    if (abs(chladniValue) > this.threshold) {
      targetPosition.x += random(-1, 1)
      targetPosition.y += random(-1, 1)
    }
    let desiredVelocity = p5.Vector.sub(targetPosition, this.currentPosition)
    desiredVelocity.setMag(this.maxCurrentVelocity)
    let steeringVelocity = p5.Vector.sub(desiredVelocity, this.velocity)
    steeringVelocity.limit(this.maxSteeringVelocity)
    return steeringVelocity
  }

  // See https://paulbourke.net/geometry/chladni/
  chladni(x, y) {
    // L is a scalar; changing it zooms in/out and pans
    const L = 1
    return (
      cos((n * PI * x) / L) * cos((m * PI * y) / L) -
      cos((m * PI * x) / L) * cos((n * PI * y) / L)
    )
  }

  update() {
    const steeringVelocity = this.getSteeringVelocity()

    // If the magnitude of the steering velocity is zero,
    // then the grain of sand has reached its target,
    // and is therefore 'home'
    this.isHome = steeringVelocity.mag() === 0

    if (!this.isHome) {
      this.checkEdges()
      this.acceleration.add(steeringVelocity)
      this.velocity.add(this.acceleration)
      this.velocity.limit(this.maxCurrentVelocity)
      this.currentPosition.add(this.velocity)
      this.acceleration.mult(0)
    }
  }

  show() {
    ellipse(this.currentPosition.x, this.currentPosition.y, 1, 1)
  }
}
