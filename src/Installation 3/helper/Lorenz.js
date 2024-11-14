const iterations = 1000;
export const LORENZ = 0;
export const ROESSLER = 1;
export class Lorenz {
  constructor() {
    this.strokeWeight = 1;
    this.points = [];
    let scale = 20;
    let a = 10; // Konstante für x
    let b = 28; // Konstante für y
    let c = 8.0 / 3.0; // Konstante für z
    let xL = 0 + 0.01; // Startwert x
    let yL = 0; // Startwert y
    let zL = 0; // Startwert z
    let dt = 0.01; // Auflösung des Attraktors
    this.points = [];
    for (let i = 0; i < iterations; i++) {
      // x' = a*( y - x )
      let dx = a * (yL - xL) * dt;
      // y' = b*x - y - x*z
      let dy = (xL * (b - zL) - yL) * dt;
      // z' = x*y - c*z
      let dz = (xL * yL - c * zL) * dt;
      xL = xL + dx;
      yL = yL + dy;
      zL = zL + dz;
      this.points.push(new p5.Vector(xL, yL, zL).mult(scale));
    }
  }

  display() {
    strokeWeight(this.strokeWeight);
    stroke(255, 255, 0);
    noFill();
    beginShape();
    this.points.forEach((element) => {
      vertex(element.x, element.y, element.z);
    });
    endShape();
  }
}
