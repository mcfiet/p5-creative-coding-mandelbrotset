export class Cube {
  constructor(x, y, z, side) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.side = side;
  }

  display() {
    push();
    translate(this.x, this.y, this.z);
    box(this.side);
    pop();
  }
}
