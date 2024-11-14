export class Sphere {
  constructor(pos, radius, col, path) {
    this.radius = radius;
    this.col = col;
    this.pos = pos; // Startposition des Objekts
    this.speed = 1; // Geschwindigkeit, mit der das Objekt den Pfad entlangbewegt
    this.targetIndex = 0; // Index des aktuellen Zielpunkts auf dem Pfad
    this.path = path;
    this.positionHistory = []; // Array zur Speicherung der vorherigen Positionen
    this.numHistory = 200;
  }

  update() {
    // Richtung zum nächsten Punkt auf dem Pfad berechnen
    let target = this.path[this.targetIndex];
    let direction = p5.Vector.sub(target, this.pos);
    direction.normalize();

    // Geschwindigkeit anwenden
    direction.mult(this.speed);

    // Position aktualisieren
    this.pos.add(direction);

    // Überprüfen, ob das Objekt den aktuellen Punkt erreicht hat
    let d = p5.Vector.dist(this.pos, target);
    if (d < 1) {
      // Wenn ja, zum nächsten Punkt auf dem Pfad gehen
      this.targetIndex = (this.targetIndex + 1) % this.path.length;
    }
  }
  display() {
    push();
    fill(255);
    translate(this.pos);
    emissiveMaterial(this.col);
    noStroke();
    sphere(this.radius);
    pop();
  }
}
