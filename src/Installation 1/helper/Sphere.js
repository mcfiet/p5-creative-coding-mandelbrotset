export class Sphere {
  constructor(pos, radius, col) {
    this.radius = radius;
    this.col = col; // Farbe des Objekts
    this.pos = pos; // Startposition des Objekts
  }

  display() {
    push();
    fill(this.col);
    translate(this.pos);
    emissiveMaterial(this.col);
    noStroke();
    sphere(this.radius);
    pop();
  }
}
