import { Sphere } from "./helper/Sphere.js";
import { Orbiter } from "./helper/Orbiter.js";
import { Cube } from "./helper/Cube.js";
import { Lorenz } from "./helper/Lorenz.js";

let cubes = [];
let centralSphere;
let orbiters = [];
const spheresCount = 100;
const cubesCount = 100;

let sound;
let amplitude;
let lightColor;

let angle = 0;

let lorenz;

export function preload() {
  // https://pixabay.com/de/music/uberschrift-warrior-long-192842/
  sound = loadSound("audio/audio-1.mp3");
}

export function loaded() {}
export function setup() {
  lightColor = color(0, 255, 255);
  createCanvas(windowWidth, windowHeight, WEBGL);
  lorenz = new Lorenz(color(255, 255, 0));
  centralSphere = new Sphere(
    createVector(0, 0, 0),
    50,
    lightColor,
    lorenz.points,
  );
  // intializeCubes();
  intializeOrbits();
  amplitude = new p5.Amplitude();
}
export function draw() {
  background(0);
  orbitControl();
  lorenz.display();

  let volume = amplitude.getLevel();
  let size = map(volume, 0, 0.3, 50, 400);
  pointLight(0, 255, 255, 0, 0, 0);
  for (let i = 0; i < cubes.length; i++) {
    cubes[i].display();
  }
  for (let i = 0; i < orbiters.length; i++) {
    orbiters[i].orbit(centralSphere);
    orbiters[i].changeDistance(size, 150);
    orbiters[i].display();
  }
  centralSphere.update();
  centralSphere.display();

  angle += 0.01;
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

function intializeOrbits() {
  for (let i = 0; i < spheresCount; i++) {
    let angle = random(TWO_PI);
    let distance = random(50, 150);
    let x = cos(angle) * distance;
    let y = sin(angle) * distance;
    let z = random(-50, 50);
    let radius = random(3, 8);
    orbiters.push(
      new Orbiter(
        createVector(x, y, z),
        radius,
        color(random(255), random(255), random(255)),
      ),
    );
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

function cameraRotation() {
  camera(0, 0, 200, 0, 0, 0, 0, 1, 0);
  let radius = 500;
  let x = cos(angle) * radius;
  let z = sin(angle) * radius;
  camera(x, 0, z, 0, 0, 0, 0, 1, 0);
}
