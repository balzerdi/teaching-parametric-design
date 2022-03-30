class FlowField {
    constructor(width, height, _scale, ) {
        this.columns = floor(width / _scale);
        this.rows = floor(height / _scale);
        this.scale = _scale;
        this.forceVectors = new Array(this.columns * this.rows)
    }

    zoff = 0;

    calculateForceVectors(magnitude = 0.2) {
        let yoff = 0;
        for (let i = 0; i < this.columns; i++) {
            let xoff = 0;
            for (let j = 0; j < this.rows; j++) {
                let index = i + j * this.columns;
                let angle = noise(xoff, yoff, this.zoff) * TWO_PI * 4;
                var forceVector = p5.Vector.fromAngle(angle);
                forceVector.setMag(magnitude);
                this.forceVectors[index] = forceVector;
                xoff += 0.01;
            }
            yoff += 0.02;
            this.zoff += 0.0001;
        }
    }

    getForceVector(position) {
        let x = floor(position.x / this.scale)
        let y = floor(position.y / this.scale)
        let index = x + y * this.columns;

        return this.forceVectors[index];
    }

    setScale(scale) {
        this.scale = scale;
    }
}