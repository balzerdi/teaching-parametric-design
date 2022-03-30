let WIDTH = 0;
let HEIGHT = 0;

const COUNT = 5000;

let particles = []
let flowField = null;

let scaleInput;
let scaleValue;
let colorInput;
let weightInput;
let weightValue;
let speedInput;
let speedValue;
let magnitudeInput;
let magnitudeValue;
let backgroundColorInput;
let saveButton;
let countInput;

function setup() {
  WIDTH = windowWidth;
  HEIGHT = windowHeight;

  let canvas = createCanvas(WIDTH, HEIGHT);
  canvas.parent("hero-sketch-container")

  // INPUTS
  scaleInput = createSlider(1, 50, 20);
  scaleInput.parent("scale")
  
  scaleValue = createP(scaleInput.value())
  scaleValue.parent("scale")

  colorInput = createColorPicker('#111');
  colorInput.parent("color")

  backgroundColorInput = createColorPicker('#fff');
  backgroundColorInput.parent("background-color")
  backgroundColorInput.changed(() => {
    background(backgroundColorInput.value())
  })

  weightInput = createSlider(0.1, 5, 1, 0.1);
  weightInput.parent("weight")

  weightValue = createP(weightInput.value())
  weightValue.parent("weight")

  speedInput = createSlider(0.5, 5, 0.75, 0.05);
  speedInput.parent("speed")

  speedValue = createP(speedInput.value())
  speedValue.parent("speed")

  magnitudeInput = createSlider(0.01, 1.5, 0.05, 0.01);
  magnitudeInput.parent("magnitude")

  magnitudeValue = createP(magnitudeInput.value())
  magnitudeValue.parent("magnitude")

  saveButton = createButton("Save Image")
  saveButton.parent("save-button")
  saveButton.mousePressed(() => {
    save(canvas, 'myNewNFT.jpg');
  })

  countInput = createInput('5000');
  countInput.parent('count')
  //

  flowField = new FlowField(WIDTH-2, HEIGHT-2, scaleInput.value());
  flowField.calculateForceVectors(magnitudeInput.value());

  for (let i = 0; i < countInput.value(); i++) {
    particles.push( new Particle(WIDTH, HEIGHT, weightInput.value(), speedInput.value()) )
  }

  scaleInput.changed(() => {
    background(backgroundColorInput.value())
    scaleValue.html(scaleInput.value())
    flowField.setScale(scaleInput.value())
    flowField.calculateForceVectors(0.05);
  })

  weightInput.changed(() => {
    background(backgroundColorInput.value())
    weightValue.html(weightInput.value())
    particles.forEach( particle => {
      particle.weight = weightInput.value();
    })
  })

  speedInput.changed(() => {
    background(backgroundColorInput.value())
    speedValue.html(speedInput.value())
    particles.forEach( particle => {
      particle.maxSpeed = speedInput.value();
    })
  })

  magnitudeInput.changed(() => {
    background(backgroundColorInput.value())
    magnitudeValue.html(magnitudeInput.value())
    flowField.calculateForceVectors(magnitudeInput.value());
  })

  countInput.changed(() => {
    background(backgroundColorInput.value())
    particles = []
    for (let i = 0; i < countInput.value(); i++) {
      particles.push( new Particle(WIDTH, HEIGHT, weightInput.value(), speedInput.value()) )
    }
  })
}

function draw() {
  let bColor = backgroundColorInput.color()
  bColor.setAlpha(8)
  background(bColor)
  
  particles.forEach( particle => {
    particle.move(flowField.getForceVector(particle.position));
    particle.checkEdge();
    particle.draw(colorInput.value());
  })

  scrollListener()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function scrollListener() {
  let height = document.getElementById('hero-rail').scrollHeight;
  window.addEventListener('scroll', () => {
    let scrolled = window.pageYOffset;

    let trigger = height * 0.5;

    let x = invlerp(0, trigger, scrolled)

    let animatedFrameRate = floor(lerp(60, 0, x))

    frameRate(animatedFrameRate)
  })
}