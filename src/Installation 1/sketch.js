import { Sphere } from "./helper/Sphere.js";
import { Orbiter } from "./helper/Orbiter.js";
import { Cube } from "./helper/Cube.js";

let cubes = [];
const cubesCount = 100;

let lightColor;
let changed = false;
let centralSphere;
let spheresCount = 100;
let orbiters = [];
export function setup() {
  lightColor = color(0, 255, 255);
  let cnv = createCanvas(windowWidth, windowHeight, WEBGL);

  // Zentrale Kugel
  centralSphere = new Sphere(createVector(0, 0, 0), 50, lightColor, []);
  intializeCubes();
  intializeOrbits();
}
export function draw() {
  background(0);
  orbitControl();
  // Positioniere das Licht in der Mitte des Koordinatensystems
  pointLight(0, 255, 255, 0, 0, 0);
  for (let i = 0; i < cubes.length; i++) {
    cubes[i].display();
  }
  // Zeichne die zentrale Kugel
  centralSphere.display();
  // Bewege und zeichne die fliegenden Kugeln
  for (let i = 0; i < orbiters.length; i++) {
    orbiters[i].orbit(centralSphere);
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

  // Überprüfe, ob die Distanz kleiner als die Hälfte der Radius des Würfels ist
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
