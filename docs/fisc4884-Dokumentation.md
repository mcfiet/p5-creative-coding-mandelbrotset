# CREATIVE CODING - GENERATIVE ARTS

Dokumentation zur Hausarbeit von Fiete Scheel

## Inhalt

- [Das Thema zur Umsetzung finden](#das-thema-zur-umsetzung-finden)
- [Feedback zur Projektidee](#feedback-zur-projektidee)
- [Mandelbrot-Menge](#mandelbrot-menge)
- [Feedback 1](#feedback-1)
- [Die erste Installation](#die-erste-installation)
- [Installation 2](#installation-2)
- [Installation 3](#installation-3)
- [Installation 4](#installation-4)
- [Installation 5](#installation-5)
- [Feedback 2](#feedback-2)
- [Installation 6](#installation-6)
- [Installation 7](#installation-7)
- [Feedback 3](#feedback-3)
- [Installation 8 - Endabgabe](#installation-8---endabgabe)
- [Fazit](#fazit)
- [Quellen](#quellen)

---

## Das Thema zur Umsetzung finden

Der erste Schritt der Hausarbeit bestand darin, ein passendes Thema zu finden, welches ich umsetzen möchte.

Bei einem anderen Modul bin ich auf die Mandelbrot-Menge gestoßen und war fasziniert von dieser. Ab dem Punkt wollte ich mich mit der Mandelbrot-Menge genauer auseinandersetzen und verstehen, was dahintersteckt und warum genau diese Fraktale entstehen.

Die Mandelbrot-Menge sollte die Wiederholungen in der Natur darstellen oder beweisen. Flusszweige, Baumstrukturen – alles besteht aus Wiederholungen und ähnlichen Mustern, so wie die Mandelbrot-Menge. Diese besteht aus vielen Fragmenten, die wiederum in Summe neue Fragmente erzeugen und sich am Ende wiederholen.

Die Mandelbrot-Menge ist eine Menge aus komplexen Zahlen.

## Feedback zur Projektidee

Das Feedback fiel zunächst positiv aus, aber es wurden auch einige Risiken aufgedeckt. Die größte Schwierigkeit bestand darin, mit der Mandelbrot-Menge ein weiterführendes Ergebnis zu erschaffen als nur das Anzeigen.

Denn das Anzeigen und Navigieren in der Mandelbrot-Menge wurde schon sehr häufig umgesetzt und stellt nicht wirklich ein neues Werk dar.

Es gab Überlegungen zu Tönen, die man integrieren kann, oder eine Fahrt durch die Mandelbrot-Menge.

Mit diesem Feedback ging ich dann über in die Umsetzung des Projekts.

## Mandelbrot-Menge

Um mit den ersten Skizzen beginnen zu können, setzte ich mich mit dem Thema genau auseinander.

Komplexe Zahlen werden aus zwei reellen Zahlen und der imaginären Komponente gebildet: also \( a + b \cdot i \).

Die Mandelbrot-Menge setzt sich aus folgender Formel zusammen:

\[
z\_{n+1} = z_n^2 + c
\]

- \( z \) und \( c \) sind komplexe Zahlen.
- Der Anfangswert \( z_0 \) ist 0.

Um das Ganze zu visualisieren, berechnen wir mit dieser Formel jeden einzelnen Pixel und geben diesem je nach Anzahl der Iterationen eine Farbe.

Hierbei können wir die Ausgangsformel in zwei Teile zerlegen:

**Reeller Teil (X-Koordinate):**

\[
x\_{n+1} = x_n^2 - y_n^2 + x_0
\]

**Imaginärer Teil (Y-Koordinate):**

\[
y\_{n+1} = 2x_n y_n + y_0
\]

In jeder Iteration wird das Ergebnis der vorherigen Iteration verwendet. Eine maximale Anzahl an Iterationen wird festgelegt, und wenn die Summe von beiden Teilen einen bestimmten Wert übersteigt, geht diese Zahl gegen Unendlich und man kann diese Schleife abbrechen.

Der Code sieht dann folgendermaßen aus:

```javascript
for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    // Berechnungen hier
  }
}
```

Dadurch entsteht folgendes Bild, wenn man die Pixel nach der Anzahl der durchlaufenen Iterationen einfärbt:

![Mandelbrot-Menge](image1.png)

Damit man die Mandelbrot-Menge auch etwas erforschen kann, habe ich noch eine Steuerung hinzugefügt, mit der man durch die Menge navigieren kann.

Dazu habe ich das Delta des Mausrades ausgelesen und einen Wert `scale` manipuliert. Beim Mapping teile ich dann durch diesen Wert, um in das Bild zu zoomen. Dabei werden die Pixel immer wieder mit den neuen Input-Werten berechnet und das Bild baut sich jeden Frame wieder neu auf. Deshalb ist es auch ein sehr rechenintensiver Prozess.

## Feedback 1

Als ich mit der Mandelbrot-Menge fertig war und diese auch in ihren einzelnen Fragmenten entdecken konnte, war ich begeistert. Es war toll, mit einem so kurzen Code etwas so Schönes zu kreieren. Es war zwar deutlich weniger Code als ich angenommen hatte, dafür umso mehr Theorie.

Schnell kam aber der Moment, wo ich nicht weiterwusste. Einerseits wurden diese Mandelbrot-Mengen schon sehr oft umgesetzt, und viel Programmieraufwand war es nun auch nicht, wenn man sich einmal intensiv mit der Theorie auseinandergesetzt hatte.

Weitere Umsetzungen und Erweiterungen fielen mir auch nicht ein. Deshalb zeigte ich das Zwischenergebnis in einer Feedback-Runde und entschloss mich letztendlich, eine andere Idee zu verfolgen, die ich noch im Kopf hatte.

Ich hatte eine Galaxie im Kopf mit ein paar Planetensystemen, die von außen beeinflusst werden können. In der Feedbackrunde wurde mir der Lorenz-Attraktor nahegelegt und damit kam mir dann die Idee für meine nächste Umsetzung. Der Lorenz-Attraktor war für mich eine tolle Option, da dieser auch einer mathematischen Theorie zugrunde liegt und dabei meine zweite Idee mit der Galaxie befeuerte.

Der Lorenz-Attraktor sah für mich aus wie eine Umlaufbahn. Diese wollte ich für meine Planeten nutzen. Eine weitere Idee war, eine Art virtuelle Ausstellung zu machen, die verschiedene Attraktoren als Umlaufbahnen für Planeten vorstellt. Jedes einzelne Planetensystem kann dann angesteuert und begutachtet werden.

## Die erste Installation

Um überhaupt ein Planetensystem zu erstellen, wollte ich erst einmal in einem einzelnen Sketch eine Kugel (Sphere) im Mittelpunkt erschaffen, um die dann viele kleine Kugeln, sogenannte Orbits, fliegen.

Dafür habe ich mir zwei Klassen angelegt.

**Klasse `Sphere`:**

```javascript
class Sphere {
  constructor(x, y, z, r) {
    this.position = createVector(x, y, z);
    this.radius = r;
  }

  display() {
    // Anzeige der Kugel
  }
}
```

**Klasse `Orbiter` (erbt von `Sphere`):**

```javascript
class Orbiter extends Sphere {
  constructor(x, y, z, r) {
    super(x, y, z, r);
    this.angle = random(TWO_PI);
    this.speed = random(0.01, 0.05);
    this.distance = random(50, 150);
    this.color = color(random(255), random(255), random(255));
  }

  orbit(center) {
    this.angle += this.speed;
    this.position.x = center.position.x + cos(this.angle) * this.distance;
    this.position.y = center.position.y + sin(this.angle) * this.distance;
  }

  display() {
    // Anzeige des Orbiters
  }
}
```

Nun hatte ich ein Planetensystem, das sich bewegt. Da dieses aber nur in einem schwarzen Raum war, hatte man keinen wirklichen Anhaltspunkt. Deshalb kam mir die Idee, den Raum zu füllen. Als Kontrast zu den vielen Kugeln entschied ich mich, in dem Raum Quader zufällig zu verteilen. Dabei entstand dieser Eindruck:

![Planetensystem mit Quadern](image2.png)

Allerdings wirkte das noch nicht so, wie ich es mir vorgestellt hatte. Die Elemente wirkten zusammengewürfelt und fügten sich noch nicht harmonisch ein.

Bei meiner Recherche hatte ich ein Bild gesehen, bei dem leuchtende Kugeln andere Elemente anstrahlen. Das war das Element, das mir fehlte. Die Kugel in der Mitte sollte leuchten und die anderen Objekte in der Szene anleuchten. Außerdem sollte es die einzige Lichtquelle sein, sodass der Fokus auf die Kugel und das Orbitsystem gelenkt wird. Mithilfe von `pointLight()` und einem `emissiveMaterial()` in der Farbe der zentralen Kugel konnte ich dann diese als Leuchtquelle setzen.

Dadurch ergab sich folgendes Ergebnis:

![Leuchtende zentrale Kugel](image3.png)

Nun wirkte das Werk visuell passend. Die Elemente fügten sich gut in der Szene ein. Allerdings passiert außer dem Fliegen der Orbits um die zentrale Kugel nicht wirklich viel.

Als nächste Idee kam mir, eine Benutzerinteraktion hinzuzufügen. Die Orbits sollen den Umlaufbahn-Radius, also die Distanz zur zentralen Kugel, ändern, wenn der Benutzer die Kugel anklickt. Das ist mit einer kleinen Funktion schnell gemacht; es wird die Maus- und die Kugelposition ausgelesen und die Distanz berechnet. Wenn diese kleiner als der Radius der Kugel ist, wurde diese angeklickt.

Allerdings springen die Punkte dann einfach an den neu bestimmten Radius und ich hatte eine sanfte Ease-In-Out-Bewegung im Kopf. Wie man solch eine Bewegung berechnet, habe ich recherchiert[^7] und diese dann im Code umgesetzt.

```javascript
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - pow(-2 * t + 2, 3) / 2;
}
```

Diese Funktion wird dann in der Methode `changeDistance()` in der `Orbiter`-Klasse in einem Intervall aufgerufen.

Nun lässt sich der Radius der Umlaufbahn der Orbits mit einem Mausklick vergrößern oder verkleinern.

## Installation 2

Während dieses Vorgangs kam mir nebenbei schon die nächste Idee für eine Erweiterung.

Da ich beim Programmieren oft 80er Musik höre, dachte ich, dass der Benutzer, anstatt monoton auf einer Kugel herumzudrücken, den Umlauf-Radius von der Amplitude eines Liedes steuern lassen kann. Dabei hat der Benutzer nicht nur einen visuellen Eindruck, sondern auch einen auditiven, der den visuellen beeinflusst.

Dafür habe ich mit `p5.sound.js` und `loadSound()` ein Lied geladen und daraus mit `amplitude.getLevel()` die Amplitude ausgelesen. Diese habe ich dann auf die entsprechenden Radiuswerte normalisiert und konnte dann die Amplitude der `changeDistance()`-Methode übergeben. In dieser Methode musste ich dann noch mithilfe eines Booleans prüfen, dass, solange die Animation mit dem Ease-In-Out läuft, keine neue Animation gestartet wird.

Nun bewegten sich die Orbits korrekt nach der Amplitude. Das Lied konnte mit der Leertaste gestartet werden.

![Orbits gesteuert durch Musik](image4.png)

## Installation 3

Nun wollte ich den Lorenz-Attraktor umsetzen. Dieser besteht im Gegensatz zur Mandelbrot-Menge nicht aus komplexen Zahlen, sondern aus Differentialgleichungen. Genauer gesagt aus drei Formeln, die später die Koordinaten \( x \), \( y \), \( z \) bestimmen.

Mithilfe der drei Formeln[^8] konnte ich die Koordinaten der einzelnen Punkte des Attraktors errechnen:

\[
\begin{align*}
x*{n+1} &= x_n + a (y_n - x_n) \cdot dt \\
y*{n+1} &= y*n + (x_n (b - z_n) - y_n) \cdot dt \\
z*{n+1} &= z_n + (x_n y_n - c z_n) \cdot dt
\end{align*}
\]

Für den Lorenz-Attraktor erstellte ich eine eigene Klasse, die die Punkte im Konstruktor berechnet und eine Funktion `display()` zum Anzeigen hat. Dabei werden die Punkte mit einer Linie verbunden und angezeigt.

Daraus ergab sich folgendes Ergebnis:

![Lorenz-Attraktor](image5.png)

Dieses Beispiel hat insgesamt 10.000 Iterationen und ist damit sehr rechenaufwendig. Deshalb habe ich die Iterationen auf 1.000 beschränkt.

Da ich nun alle Punkte des Lorenz-Attraktors in einem Array hatte, war der nächste Schritt, mein Planetensystem die Punkte ablaufen zu lassen.

Einen solchen Algorithmus hatte ich in Spieleprogrammierung schon einmal geschrieben, deshalb war dies relativ schnell gemacht. Dazu bekam die Klasse `Sphere` eine weitere Funktion `update()`, die sich um die Bewegung kümmert.

```javascript
Sphere.prototype.update = function (path) {
  // Bewegung entlang des Pfades
};
```

Damit bewegt sich das Planetensystem nun entlang eines übergebenen Pfades. Dieser besteht aus einem Array von Vektoren. In diesem Fall übergebe ich das Array des Lorenz-Attraktors.

So entstand dieses Ergebnis mit einer reduzierten Anzahl an Iterationen:

![Planetensystem entlang des Lorenz-Attraktors](image6.png)

Mit der Leertaste lässt sich weiterhin das Lied starten und stoppen. Auch die Orbits bewegen sich zur Amplitude.

## Installation 4

Da ich gerne mehrere Planetensysteme hätte und ich bei meiner Recherche auf weitere Attraktoren gestoßen bin, wollte ich eine Art Galaxie als Ausstellungsraum erschaffen. Es sollten mehrere Attraktoren als Umlaufbahnen in einem Raum ausgestellt werden und der Benutzer kann dann per Auswahl einen bestimmten Attraktor fokussieren und genauer anschauen.

Ein weiterer Attraktor ist der Rössler-Attraktor. Ähnlich wie der Lorenz-Attraktor besteht dieser wieder aus drei Differentialgleichungen, die auch wieder für \( x \), \( y \), \( z \) Koordinaten verwendet werden können[^9].

\[
\begin{align*}
x*{n+1} &= x_n + (- y_n - z_n) \cdot dt \\
y*{n+1} &= y*n + (x_n + a y_n) \cdot dt \\
z*{n+1} &= z_n + (b + z_n (x_n - c)) \cdot dt
\end{align*}
\]

Zum Testen habe ich wieder einen eigenen Sketch erstellt, in dem ich die Formel des Lorenz-Attraktors nur etwas anpassen musste.

Das Ergebnis sah dann so aus:

![Rössler-Attraktor](image7.png)

Um nun verschiedene Systeme mit verschiedenen Attraktoren erstellen zu können, habe ich eine zusätzliche Klasse geschrieben, die `System` heißt. In dieser werden die zentrale Kugel, der Attraktor und die Orbits verwaltet und aktualisiert.

Dadurch habe ich die Möglichkeit, ein gekapseltes System zu verschieben, zu drehen oder andere Eigenschaften zu verändern.

Zusätzlich zu der `orbitControl()` wollte ich noch, dass der Benutzer die Möglichkeit hat, ein System zu fokussieren. Deshalb habe ich pro erstelltes System einen Radio-Button hinzugefügt, der, wenn er ausgewählt wurde, die Kamera auf das System ausrichtet. Mit der Leertaste lässt sich immer noch das Lied starten oder stoppen und die Orbits bewegen sich zur Amplitude.

Um ein paar Anhaltspunkte für das Auge zu schaffen, wurden noch Sterne im Raum platziert.

Das Ergebnis dieser Installation sieht folgendermaßen aus:

![Galaxie mit mehreren Systemen](image8.png)

## Feedback 2

An diesem Punkt habe ich mir wieder Feedback eingeholt zu dem aktuellen Stand.

Weitere Ideen und Erweiterungen habe ich dabei aus dem Gespräch mitgenommen:

Zum einen würde es deutlich tiefer gehen, wenn ich nicht nur die Amplitude, sondern mithilfe der Fourier-Transformation die einzelnen Frequenzbereiche und deren Amplituden auslese und verarbeite.

Zum anderen müssen die Attraktoren vielleicht gar nicht die ganze Zeit zu sehen sein, sondern können nur bei bestimmten Beats vollständig zu sehen sein. Ansonsten würde ein Trail der Kugel die Form des Attraktors andeuten.

## Installation 5

Im nächsten Schritt sollen sich die Systeme entkoppelt voneinander zu ihrer eigenen Musik bewegen. Dazu habe ich einen zweiten Sound heruntergeladen und diesen auch eingelesen.

Aus der vorherigen Installation habe ich die `radioChanged()`-Methode, mit der ich auslesen kann, wenn sich der Wert in den Radio-Buttons ändert. An dieser Stelle ändere ich nun auch den Sound, sodass dieser immer zwischen den beiden Liedern wechselt, je nachdem welches System ausgewählt wurde.

Somit hat man nun auch wieder einen auditiven Unterschied zwischen den beiden Systemen, was das Erlebnis meiner Meinung nach deutlich steigert.

## Installation 6

Im nächsten Schritt kümmerte ich mich um die FFT und wie ich diese Werte nutzen kann.

Dazu habe ich einen `sketch_fft.js` erstellt, in dem ich ein Lied laden kann, um dieses zu analysieren. Es werden mir die Frequenzen und die jeweilige Amplitude angezeigt.

Meine Überlegung war, die Frequenzen in zwei große Bereiche aufzuteilen. Das heißt, die eine Hälfte der Orbits spielt den unteren Frequenzbereich und die andere den oberen. Dazu würde ich je nach Gruppe die Orbits auch einfärben, sodass auch diese visuell leichter auseinandergehalten werden können. Die Amplitude der Frequenzen bestimmt den Radius der Orbits-Gruppe.

Dabei entstand folgendes Ergebnis:

![Orbits gesteuert durch FFT](image9.png)

Die beiden Farben der Orbits stehen für unterschiedliche Frequenzbereiche.

## Installation 7

Nun wollte ich den zweiten Punkt aus der Feedback-Runde angehen.

Die Planetensysteme sollten einen Trail erhalten, der die abgelaufene Spur andeutet. Dazu habe ich eine kleine Funktion erstellt, die ein Array mit Punkten nicht länger als einen bestimmten Wert werden lässt und immer wieder den zuletzt abgelaufenen Punkt hinzufügt.

Beim Anzeigen des Trails nimmt die Sättigung und Helligkeit mit jedem Punkt ab. So hat es den Effekt, als würde der Trail zum Ende hin auslaufen. Außerdem ist der Attraktor in der nicht fokussierten Ansicht nun nicht mehr zu sehen. Der Betrachter kann nur noch die beiden Planetensysteme mit dem Trail sehen, und erst wenn man über die Radio-Buttons ein System auswählt, erscheint der Attraktor.

Zusätzlich steht nun jeder einzelne Orbit für einen Frequenzbereich und bewegt sich zu diesem. Je näher die Orbits dabei zum Mittelpunkt kommen, desto stärker verändern sie ihre Farbe.

Das sieht dann im Ergebnis so aus:

![Planetensystem mit Trail](image10.png)

## Feedback 3

Mit diesem Stand ging ich in die letzte Feedback-Runde, in der ich noch einmal die letzten Kleinigkeiten aussortieren wollte.

Einige Punkte fielen dabei auf. Die Sterne traten noch zu sehr in den Vordergrund und konkurrierten mit der Aufmerksamkeit, die eigentlich auf den Planeten liegen sollte.

Außerdem entschied ich mich für eine buntere Version der Orbits, damit diese sich auch noch einmal von der zentralen Kugel abheben.

Die zentrale Kugel wirkte auch etwas flach durch ihre eigene Leuchtkraft. So habe ich eine Planetentextur auf die zentrale Kugel gelegt, und es wirkte deutlich besser.

Um auch einen auditiven Eindruck zu schaffen, wenn keines der beiden Systeme ausgewählt ist, habe ich auch dort eine atmosphärische Musik hinterlegt.

## Installation 8 - Endabgabe

Zur Endabgabe habe ich die Punkte aus dem Feedback ausgearbeitet und letzte kleine Änderungen vorgenommen, wie das Styling der Buttons, um ein rundes, in sich geschlossenes Bild zu erschaffen.

Somit sah das Endergebnis folgendermaßen aus:

![Endergebnis 1](image11.png)

![Endergebnis 2](image12.png)

![Endergebnis 3](image13.png)

![Endergebnis 4](image14.png)

## Fazit

Auch wenn die Mandelbrot-Menge letztendlich nicht verwendet wurde, war es trotzdem toll, sich damit zu beschäftigen und zu verstehen, was dahintersteckt.

Leider kamen mir dazu dann keine weiteren Ideen für eine Umsetzung.

Dafür umso mehr bei meiner anderen Idee, ein Planetensystem als Ausstellung von Attraktoren zu nutzen. Dort hatte ich meinen gewohnten Ideenfluss, wo mir nach der Umsetzung einer Idee direkt die nächste einfiel, was ich noch besser machen kann.

Außerdem konnte ich viele Bereiche von anderen Modulen weiterverwenden. So hatte ich keine Probleme mit der FFT, da ich diese schon in Signalverarbeitung und Mustererkennung verwendet habe.

Insgesamt bin ich mit dem Endergebnis sehr zufrieden, auch wenn ich einige Zwischenergebnisse (Installation 2) toll fand, die ich aber aufgrund der Gesamtidee nicht weiterverfolgt habe.

## Quellen

- Texture: [https://www.pexels.com/photo/photo-of-acrylic-paint-2832432/](https://www.pexels.com/photo/photo-of-acrylic-paint-2832432/)
- Audio-1: [https://pixabay.com/de/music/uberschrift-warrior-long-192842/](https://pixabay.com/de/music/uberschrift-warrior-long-192842/)
- Audio-2: [https://www.musicfox.com/en/info/free-music/](https://www.musicfox.com/en/info/free-music/)
- Audio-3: [https://pixabay.com/de/sound-effects/padsound-meditation-21384/](https://pixabay.com/de/sound-effects/padsound-meditation-21384/)

---

[^1]: https://www.informatik.uni-leipzig.de/~meiler/Schuelerseiten.dir/DPlotzki/html/mndlbrt.htm

[^2]: https://de.wikipedia.org/wiki/Mandelbrot-Menge

[^3]: https://www.youtube.com/watch?v=5TzqfheD3rQ

[^4]: https://www.youtube.com/watch?v=_78kGnsYXLc

[^5]: https://www.youtube.com/watch?v=6z7GQewK-Ks

[^6]: https://www.youtube.com/watch?v=fAsaSkmbF5s

[^7]: https://easings.net/#easeInOutCubic

[^8]: https://de.wikipedia.org/wiki/Lorenz-Attraktor

[^9]: https://de.wikipedia.org/wiki/Seltsamer_Attraktor#Rössler-Attraktor
