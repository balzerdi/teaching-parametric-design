class Particle {
    constructor(_canvasWidth, _canvasHeight, _weight=1.6, _maxSpeed=0.75) {
        this.canvasWidth = _canvasWidth;
        this.canvasHeight = _canvasHeight;
        this.position = createVector(random(_canvasWidth), random(_canvasHeight));
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.direction = createVector(0, 0);
        this.oldPosition = this.position.copy(); 
        this.weight = _weight;
        this.maxSpeed = _maxSpeed;
    }

    draw(color = "rgba(0, 0, 0, 0.75)") {
        stroke(color);
        strokeWeight(this.weight);
        line(this.position.x, this.position.y, this.oldPosition.x, this.position.y)
    }

    move(forceVector) {
        this.acceleration.add(forceVector);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.oldPosition = this.position.copy(); 
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    checkEdge() {
        if (this.position.x > this.canvasWidth 
            || this.position.x < 0 
            || this.position.y > this.canvasHeight 
            || this.position.y < 0) {
            this.position = createVector(random(this.canvasWidth), random(this.canvasHeight));
            this.oldPosition = this.position;
        }
    }
}