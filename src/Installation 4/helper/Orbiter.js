import { Sphere } from "./Sphere.js";
let animationstarted = false;
export class Orbiter extends Sphere {
  constructor(pos, radius, col) {
    super(pos, radius, col);
    this.angle = random(TWO_PI);
    this.distance = random(50, 90);
    this.speed = random(0.01, 0.05);
    this.zOffset = random(-50, 50);
  }

  orbit(centralSphere) {
    this.angle += this.speed;
    this.pos.x = centralSphere.pos.x + cos(this.angle) * this.distance;
    this.pos.y = centralSphere.pos.y + sin(this.angle) * this.distance;
    this.pos.z = centralSphere.pos.z + this.zOffset;
  }

  changeDistance(distance, duration) {
    let currentTime = 0;
    let startValue = this.distance;
    let endValue = distance;
    if (!animationstarted) {
      let interval = setInterval(() => {
        animationstarted = true;
        currentTime += 10;
        if (currentTime <= duration) {
          let newValue = timerWithEaseInOut(
            currentTime,
            duration,
            startValue,
            endValue
          );
          animationstarted = true;
          this.distance = newValue;
        } else {
          clearInterval(interval);
          animationstarted = false;
        }
      }, 10);
    }
  }
}
// Timer mit Ease-In-Out Interpolation
function timerWithEaseInOut(currentTime, duration, startValue, endValue) {
  // Zeit normalisieren (zwischen 0 und 1)
  let t = currentTime / duration;

  // https://easings.net/#easeInOutCubic
  let cubicBezierEaseInOut = function (t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  // Berechne den neuen Wert mit Ease-In-Out und Langsam-Auslauf
  let newValue = cubicBezierEaseInOut(t) * (endValue - startValue) + startValue;

  return newValue;
}
