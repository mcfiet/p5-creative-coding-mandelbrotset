import { Cube } from "./helper/Cube.js";
import { System } from "./helper/System.js";

let cubes = [];
const cubesCount = 100;

let sound;
let amplitude;

let system;
let system2;
let systemsCount = 2;
let systems = [];
let activesystem;
let starsCount = 100;
let stars = [];
let radio;
let btn;
let angle = 0;
export function preload() {
  // https://pixabay.com/de/music/uberschrift-warrior-long-192842/
  sound = loadSound("audio/audio-1.mp3");
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
  amplitude = new p5.Amplitude();
}
let active = false;
export function draw() {
  orbitControl();
  background(0);
  for (let i = 0; i < starsCount; i++) {
    stroke(360, 0, 100);
    point(stars[i]);
  }
  // TODO: Wenn kamera active werden alle anderen systeme nicht mehr geupdatet
  // UM LEISTUNG ZU SPAREN WIRD NUR DAS AKTIVE SYSTEM ANGEZEIGT
  if (activesystem) {
    let volume = amplitude.getLevel();
    let size = map(volume, 0, 0.3, 50, 400);
    active = true;
    activesystem.update(size, active);
    // cameraRotation();
  } else {
    active = false;
    systems.forEach((element) => {
      element.update(50);
    });
  }
  for (let i = 0; i < cubes.length; i++) {
    cubes[i].display();
  }
  angle += 0.01;
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
}

function toggleSound() {
  if (sound.isPlaying()) {
    sound.stop();
  } else {
    sound.play();
  }
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
