const c = -0.5;

const range = 21;

const cArray = [];

let minX = -0.5;
let minY = -0.5;
const size = 360;
let minSlider;
let maxSlider;
let sliderX;
let sliderY;
let maxIterations = 1000;
const TRANSLATESTEPS = 100;
const SCALESTEPS = 1.1;
let scale = 1;
let translateX = 0;
let translateY = 0;
let mouseDown = false;
let dir = 1;
export function setup() {
  // put setup code here
  createCanvas(size, size);
  colorMode(HSB);
  // Wenn ein Folgewert von c > 2 geht die Zahl defintiv gegen unendlich, da sie es in den weiteren Durchläufen nicht mehr unter den Wert aus der vorherigen Iteration schafft, da sie mindestens doppelt so groß wie der vorherige Wert sein muss.
  pixelDensity(1);
}

export function mousePressed() {
  mouseDown = true;
}

export function mouseDragged(event) {
  if (mouseDown) {
    translateX += event.movementX;
    translateY -= event.movementY;
    console.log("Translate: " + translateX);
  }
}

export function mouseReleased() {
  mouseDown = false;
}

export function mouseWheel(event) {
  //move the square according to the vertical scroll amount
  if (event.deltaY < 0) {
    scale *= SCALESTEPS;
  } else {
    scale /= SCALESTEPS;
  }
  console.log("Scale: " + -0.5 / scale);
  //uncomment to block page scrolling
  //return false;
}

export function draw() {
  loadPixels();

  const z = 0;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // Koordinaten auf den Wertebereich der Mandelbrot-Menge mappen
      let a = map(
        x,
        0 + translateX,
        width + translateX,
        -1.5 / scale,
        1.5 / scale,
      );
      let b = map(
        y,
        height - translateY,
        0 - translateY,
        -1.5 / scale,
        1.5 / scale,
      );
      // Startwerte für die Iteration speichern
      let ca = a;
      let cb = b;

      let n = 0;

      while (n < maxIterations) {
        // Mandelbrot-Funktion für komplexe Zahlen: z = z^2 + c
        // Zerlegt in die zwei Teile für x und y
        let xN = pow(a, 2) - pow(b, 2);
        let yN = 2 * a * b;
        a = xN + ca;
        b = yN + cb;

        // Überprüfen, ob die Iteration gegen unendlich geht
        if (abs(a + b) > 16) {
          break;
        }
        n++;
      }
      let red;
      let green;
      let blue;
      let bright = map(n, 0, maxIterations, 0, 1);

      if (bright > 0 && bright < 0.3) {
        red = 255;
        green = 0;
        blue = 0;
      } else if (bright >= 0.3 && bright < 0.6) {
        red = 0;
        green = 255;
        blue = 0;
      } else if (bright >= 0.6) {
        red = 0;
        green = 0;
        blue = 255;
      }
      bright = map(sqrt(bright), 0, 1, 0, 255);
      if (n === maxIterations) {
        red = 0;
        green = 0;
        blue = 0;
      }
      var hue = map(n, 0, maxIterations, 0, 356);
      let colorRGB = HSBToRGB(hue, 100, 100);
      if (n === maxIterations) {
        colorRGB[0] = 0;
        colorRGB[1] = 0;
        colorRGB[2] = 0;
      }
      let pix = (x + y * width) * 4;
      pixels[pix + 0] = colorRGB[0];
      pixels[pix + 1] = colorRGB[1];
      pixels[pix + 2] = colorRGB[2];
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
}

export function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// https://www.30secondsofcode.org/js/s/hsb-to-rgb/
function HSBToRGB(h, s, b) {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
}
