const iterations = 1000;
export const LORENZ = 0;
export const ROESSLER = 1;
export class Attractor {
  constructor(type, color) {
    this.color = color;
    this.strokeWeight = 1;
    this.points = [];
    if (type == 0) {
      this.calcLorenz();
      this.scale = 5;
    } else if (type == 1) {
      this.calcRoessler();
      this.scale = 16;
    }
  }

  calcRoessler() {
    let scale = 50;
    let dt = 0.09;
    const a = 0.2,
      b = 0.2,
      c = 5.7;
    const initialX = 0,
      initialY = 0,
      initialZ = 0;

    let x = 0;
    let y = 0;
    let z = 0;
    this.points.push(new p5.Vector(initialX, initialY, initialZ));
    for (let i = 0; i < iterations; i++) {
      x = x + (-y - z) * dt;
      y = y + (x + a * y) * dt;
      z = z + (b + z * (x - c)) * dt;
      this.points.push(new p5.Vector(x, y, z).mult(scale));
    }
  }

  calcLorenz() {
    let scale = 20;
    let a = 10;
    let b = 28;
    let c = 8.0 / 3.0;
    let xL = 0 + 0.01;
    let yL = 0;
    let zL = 0;
    let dt = 0.01;
    this.points = [];
    for (let i = 0; i < iterations; i++) {
      let dx = a * (yL - xL) * dt;
      let dy = (xL * (b - zL) - yL) * dt;
      let dz = (xL * yL - c * zL) * dt;
      xL = xL + dx;
      yL = yL + dy;
      zL = zL + dz;
      this.points.push(new p5.Vector(xL, yL, zL).mult(scale));
    }
  }

  display() {
    let hu = 0;
    stroke(this.color);
    strokeWeight(this.strokeWeight);
    noFill();
    beginShape();
    this.points.forEach((element) => {
      // stroke(hu, 255, 255);
      vertex(element.x, element.y, element.z);
      hu += 1;
      if (hu > 255) {
        hu = 0;
      }
    });
    endShape();
  }
}
