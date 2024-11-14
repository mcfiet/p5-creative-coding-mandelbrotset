import { Sphere } from "./helper/Sphere.js";
import { Orbiter } from "./helper/Orbiter.js";
import { Cube } from "./helper/Cube.js";

let cubes = [];
const cubesCount = 100;

let sound;
let amplitude;
let lightColor;
let changed = false;
let centralSphere;
let spheresCount = 100;
let orbiters = [];
export function preload() {
  // https://pixabay.com/de/music/uberschrift-warrior-long-192842/
  sound = loadSound("audio/audio-1.mp3");
}
export function setup() {
  lightColor = color(0, 255, 255);
  let cnv = createCanvas(windowWidth, windowHeight, WEBGL);

  // Zentrale Kugel
  centralSphere = new Sphere(createVector(0, 0, 0), 50, lightColor, []);
  intializeCubes();
  intializeOrbits();
  amplitude = new p5.Amplitude();
}
export function draw() {
  background(0);
  orbitControl();
  let volume = amplitude.getLevel();
  let size = map(volume, 0, 0.3, 50, 400);
  // Positioniere das Licht in der Mitte des Koordinatensystems
  pointLight(0, 255, 255, 0, 0, 0);
  for (let i = 0; i < cubes.length; i++) {
    cubes[i].display();
  }
  // Zeichne die zentrale Kugel
  centralSphere.display();
  // Bewege und zeichne die fliegenden Kugeln
  console.log(size);
  for (let i = 0; i < orbiters.length; i++) {
    orbiters[i].orbit(centralSphere);
    orbiters[i].changeDistance(size, 150);
    orbiters[i].display();
  }
}

export function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

export function mousePressed() {
  // Berechne die Distanz zwischen der Mausposition und der Position des 3D-Würfels
  let distance = dist(
    mouseX - width / 2,
    mouseY - height / 2,
    0,
    centralSphere.pos.x,
    centralSphere.pos.y,
    centralSphere.pos.z,
  );

  // Überprüfe, ob die Distanz kleiner als die Hälfte der Seitenlänge des Würfels ist
  if (distance < centralSphere.radius) {
    console.log("Der Würfel wurde angeklickt!");
    if (changed) {
      for (let i = 0; i < orbiters.length; i++) {
        orbiters[i].changeDistance(orbiters[i].distance - 200, 1000);
      }
    } else {
      for (let i = 0; i < orbiters.length; i++) {
        orbiters[i].changeDistance(orbiters[i].distance + 200, 1000);
      }
    }
    changed = !changed;
  } else {
    console.log("Der Würfel wurde nicht angeklickt.");
  }
}

export function keyPressed() {
  if (key === " ") {
    toggleSound();
  }
}
function toggleSound() {
  if (sound.isPlaying()) {
    sound.stop();
  } else {
    sound.play();
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
