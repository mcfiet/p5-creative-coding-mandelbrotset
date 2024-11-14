const a = 0.2,
  b = 0.2,
  c = 5.7;
const initialX = 0,
  initialY = 0,
  initialZ = 0;

let hue = 0;
let zoomLevel = 16;
let dt = 0.09;

const iterations = 1000;

export class Roessler {
  constructor(pos, scale = 16) {
    this.points = [];
  }

  display() {
    let hu = 0;
    noFill();
    beginShape();

    this.points.forEach((element) => {
      console.log(element);
      stroke(hu, 255, 255);
      vertex(element.x, element.y, element.z);
      hu += 1;
      if (hu > 255) {
        hu = 0;
      }
    });
    endShape();
  }
}
