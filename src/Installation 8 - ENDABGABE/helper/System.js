import { Sphere } from "./Sphere.js";
import { Orbiter } from "./Orbiter.js";
import { Attractor } from "./Attractor.js";
let angle = 0;
let trailLength = 100;
let trailDensity = 8;

export class System {
  constructor(pos, name, attractor, texture) {
    this.name = name;
    this.pos = createVector(
      random(-1000, 1000),
      random(-1000, 1000),
      random(-1000, 1000)
    );
    // this.pos = createVector(0, 0, 0);
    this.rot = 0;
    this.lightColor = color(random(360), 100, 100);
    this.orbitersCount = 50;
    this.orbiters = this.intializeOrbits();
    this.attractor = new Attractor(attractor, this.lightColor);
    this.centralSphere = new Sphere(
      createVector(0, 0, 0),
      30,
      this.lightColor,
      this.attractor.points,
      texture
    );
    this.trail = [];
    this.counter = 0;
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
    pointLight(color(hue(this.lightColor), 100, 100), this.centralSphere.pos);
    for (let i = 0; i < this.orbiters.length; i++) {
      this.orbiters[i].orbit(this.centralSphere);

      // OPTION 1 - ORBITERS ÄNDERN HUE JE NACH DISTANZ
      let orbitHue = map(this.orbiters[i].distance, 0, 230, 250, 100);
      this.orbiters[i].col = color(orbitHue, 100, 100);

      // OPTION 2 - ORBITERS ÄNDERN HELLIGKEIT UND SÄTTIGUNG JE NACH DISTANZ
      /*       let orbitColor = map(this.orbiters[i].distance, 0, 230, 150, 0);
      this.orbiters[i].col = color(
        hue(this.lightColor),
        orbitColor,
        orbitColor
      ); */

      this.orbiters[i].changeDistance(
        map(distance[i * 4], 0, 255, 300, -50),
        150
      );

      this.orbiters[i].display();
    }

    // TODO: ATTRAKTOR COLOR ÄNDERUNG NICHT AKTIV
    /*     this.attractor.color = color(
      hue(this.lightColor),
      100,
      map(distance[2], 90, 100, 0, 100)
    );
    this.attractor.strokeWeight = map(distance[2], 120, 170, 0, 3); */

    if (this.counter > trailDensity) {
      // console.log(this.trail);
      this.addTrail(
        new p5.Vector(
          this.centralSphere.pos.x,
          this.centralSphere.pos.y,
          this.centralSphere.pos.z
        )
      );
      this.counter = 0;
    }
    this.displayTrail();
    this.centralSphere.update();
    this.centralSphere.display();
    // if (distance[50] > 98 && active) {
    //   this.attractor.display();
    // }
    if (active) this.attractor.display();

    pop();
    this.counter++;
    angle += 0.0001 * deltaTime;
  }

  addTrail(element) {
    // Element zum Array hinzufügen
    this.trail.push(new p5.Vector(element.x, element.y, element.z));

    // Wenn die maximale Größe erreicht ist, das erste Element löschen
    if (this.trail.length > trailLength) {
      this.trail.shift(); // Das erste Element löschen
    }
  }

  displayTrail() {
    // Element zum Array hinzufügen
    stroke(hue(this.lightColor), 100, 100);
    noFill();
    beginShape();
    this.trail.forEach((element, counter) => {
      stroke(hue(this.lightColor), counter, counter);
      vertex(element.x, element.y, element.z);
    });
    endShape();
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
