import { System } from "./helper/System.js";

let sounds = [];
let systemsCount = 2;
let systems = [];
let activesystem;
let starsCount = 800;
let stars = [];
let radio;
let btn;
let fft;
export function preload() {
  // https://pixabay.com/de/music/uberschrift-warrior-long-192842/
  sounds.push(loadSound("audio/audio-1.mp3"));
  // https://www.musicfox.com/en/info/free-music/
  sounds.push(loadSound("audio/audio-2.mp3"));
}
export function setup() {
  colorMode(HSB);
  createCanvas(windowWidth, windowHeight, WEBGL);
  radio = initRadio();
  btn = initBtn();
  // cam = createCamera();
  for (let i = 0; i < systemsCount; i++) {
    systems.push(
      new System(
        createVector(random(10), random(10), random(10)),
        "System " + i,
        i,
      ),
    );
  }

  // intializeCubes();
  for (let i = 0; i < starsCount; i++) {
    fill(255);
    stars.push(
      createVector(
        random(-2000, 2000),
        random(-2000, 2000),
        random(-2000, 2000),
      ),
    );
  }
  fft = new p5.FFT();
}

export function draw() {
  let spectrum = fft.analyze();
  let newArray = spectrum.map(mapSpectrum);

  orbitControl();
  background(0);
  initializeStars();

  systems.forEach((element) => {
    if (activesystem === element) {
      element.update(newArray, true);
    } else {
      let normalizedArray = [];
      for (let i = 0; i < newArray.length; i++) {
        normalizedArray[i] = 0;
      }
      element.update(normalizedArray, false);
    }
  });
}

function mapSpectrum(element) {
  return map(element, 0, 300, 50, 200);
}

function initRadio() {
  let myRadio = createRadio();
  myRadio.position(0, 0);
  myRadio.size(60);

  for (let i = 0; i < systemsCount; i++) {
    myRadio.option(i);
  }

  myRadio.selected(1);
  myRadio.style("color", "deeppink");

  myRadio.changed(radioChanged);

  return myRadio;
}

function initBtn() {
  let button = createButton("click me");
  button.position(0, 100);

  button.mousePressed(() => {
    console.log("btn pressed");
    activesystem = null;
    stopSound();
  });
  return button;
}

function radioChanged() {
  activesystem = systems[radio.value()];
  systems.forEach((element) => {
    element.deActivateCamera();
  });
  activesystem.activateCamera();
  toggleSound();
}

function toggleSound() {
  sounds.forEach((element) => {
    element.stop();
  });
  sounds[radio.value()].play();
}
function stopSound() {
  sounds.forEach((element) => {
    element.stop();
  });
}
export function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

export function keyPressed() {
  if (key === " ") {
    toggleSound();
  }
}

function initializeStars() {
  for (let i = 0; i < starsCount; i++) {
    stroke(360, 0, 100);
    point(stars[i]);
  }
}
