import { Cube } from "./helper/Cube.js";
import { System } from "./helper/System.js";

let cubes = [];
const cubesCount = 100;

let sound;
let sounds = [];
let amplitudes = [];
let amplitude;

let system;
let system2;
let systemsCount = 2;
let systems = [];
let activesystem;
let starsCount = 500;
let stars = [];
let radio;
let btn;
let angle = 0;
let active = false;
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
        random(-5000, 5000),
        random(-5000, 5000),
        random(-5000, 5000),
      ),
    );
  }
  amplitudes.push(new p5.Amplitude());
  amplitudes.push(new p5.Amplitude());
  amplitude = new p5.Amplitude();

  fft = new p5.FFT();
}

export function draw() {
  let spectrum = fft.analyze();
  // spectrum = spectrum.filter((element) => element !== 0);
  // console.log(spectrum.length);
  let f1 = 0;
  let f2 = 0;
  let f3 = 0;
  let fRange = spectrum.length / 3;
  spectrum.forEach((element, index) => {
    if (index < fRange) {
      f1 += element;
    }
    if (index > fRange && index < fRange * 2) {
      f2 += element;
    }
    if (index > fRange * 2 && index < fRange * 3) {
      f3 += element;
    }
  });
  let average1 = f1 / fRange;
  let average2 = f2 / fRange;
  let average3 = f3 / fRange;
  let h = [];

  if (average1) {
    h[0] = map(spectrum[0], 0, 300, 50, 200);
    h[1] = map(spectrum[20], 0, 300, 50, 200);
    h[2] = map(spectrum[50], 0, 300, 50, 200);
  } else {
    h[0] = 80;
    h[1] = 80;
    h[2] = 80;
  }

  orbitControl();
  background(0);
  for (let i = 0; i < starsCount; i++) {
    stroke(360, 0, 100);
    point(stars[i]);
  }
  // TODO: Wenn kamera active werden alle anderen systeme nicht mehr geupdatet
  // UM LEISTUNG ZU SPAREN WIRD NUR DAS AKTIVE SYSTEM ANGEZEIGT

  if (activesystem) {
    let volume = amplitudes[radio.value()].getLevel();

    let size = map(volume, 0, 0.3, 50, 200);
    active = true;
    activesystem.update(h, active);
    // cameraRotation();
  } else {
    active = false;
    systems.forEach((element) => {
      element.update(h);
    });
  }
  for (let i = 0; i < cubes.length; i++) {
    cubes[i].display();
  }
  angle += 0.01;
}

function getMiddle() {
  let durchschnitt = createVector();
  systems.forEach((element) => {
    durchschnitt.add(element.pos);
  });
  durchschnitt.div(systems.length);
  console.log(durchschnitt);
  return durchschnitt;
}

function cameraRotation() {
  const radius = 500;
  const camX = activesystem.centralSphere.pos.x + sin(angle) * radius;
  const camY = activesystem.centralSphere.pos.y;
  const camZ = activesystem.centralSphere.pos.z + cos(angle) * radius;

  const centerX = activesystem.centralSphere.pos.x;
  const centerY = activesystem.centralSphere.pos.y;
  const centerZ = activesystem.centralSphere.pos.z;
  stroke(255, 100, 100);
  camera(camX, camY, camZ, centerX, centerY, centerZ, 0, 1, 0);
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
    active = false;
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
  systems.forEach((element) => {
    console.log(element.cameraActive);
  });
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
    fill(255);
    point(random(0, 5000), random(0, 5000), random(0, 5000));
  }
}

function intializeCubes() {
  for (let i = 0; i < cubesCount; i++) {
    let x = random(-200, 200);
    let y = random(-200, 200);
    let z = random(-200, 200);
    let size = random(10, 50);
    cubes.push(new Cube(x, y, z, size));
  }
}
