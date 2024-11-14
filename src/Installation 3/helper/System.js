import { Sphere } from "./Sphere.js";
import { Orbiter } from "./Orbiter.js";
import { Attractor } from "./attractors/Attractor.js";
import { Roessler } from "./attractors/Roessler.js";
let angle = 0;
export class System {
  constructor(pos, name, attractor) {
    this.name = name;
    this.pos = createVector(
      random(-1000, 1000),
      random(-1000, 1000),
      random(-1000, 1000)
    );
    // this.pos = createVector(0, 0, 0);
    this.rot = 0;
    this.lightColor = color(random(360), 100, 100);
    this.orbitersCount = 30;
    this.orbiters = this.intializeOrbits();
    this.attractor = new Attractor(attractor, this.lightColor);
    this.centralSphere = new Sphere(
      createVector(0, 0, 0),
      50,
      this.lightColor,
      this.attractor.points
    );
  }

  update(distance, active = false) {
    const radius = 700;
    if (active) {
      camera(
        this.pos.x + this.centralSphere.pos.x + sin(angle) * radius,
        this.pos.y + this.centralSphere.pos.y,
        this.pos.z + this.centralSphere.pos.z + cos(angle) * radius,
        this.pos.x + this.centralSphere.pos.x,
        this.pos.y + this.centralSphere.pos.y,
        this.pos.z + this.centralSphere.pos.z,
        0,
        1,
        0
      );
    }
    push();
    translate(this.pos);
    pointLight(this.lightColor, this.centralSphere.pos);
    for (let i = 0; i < this.orbiters.length; i++) {
      this.orbiters[i].orbit(this.centralSphere);
      if (distance.length > 0) {
        this.centralSphere.radius = map(distance[0], 50, 255, 50, 10);
        this.orbiters[i].changeDistance(
          map(distance[0], 50, 255, 200, 50),
          150
        );
        console.log(map(distance[0], 50, 255, 200, 50));
        this.attractor.color = color(
          10,
          100,
          map(distance[0], 10, 255, 100, 0)
        );
        this.attractor.strokeWeight = map(distance[0], 50, 255, 5, 0);
      }
      this.orbiters[i].display();
    }
    this.centralSphere.update();
    this.centralSphere.display();
    this.attractor.display();

    pop();
    angle += 0.01;
  }

  intializeOrbits() {
    let orbiters = [];
    for (let i = 0; i < this.orbitersCount; i++) {
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
          color(hue(this.lightColor), 100, 100 - 50)
        )
      );
    }
    return orbiters;
  }

  activateCamera() {
    this.cameraActive = true;
  }
  deActivateCamera() {
    this.cameraActive = false;
  }
}
