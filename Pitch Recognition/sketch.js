
var carrier;

var freq = 261.6256;

var note = "Wait..."

function setup() {
  createCanvas(1200, 800);

  carrier = new p5.Oscillator('sine');
  carrier.amp(0, 1);
  carrier.freq(freq); 
  carrier.start();

  initMidi();
}

function keyPressed() {
  if(keyIsDown(32)) carrier.amp(0, 1);
  if(keyIsDown(13)) carrier.amp(1.0, 1);
}

function draw() {
  background(51);

  textSize(140);
  fill(255);
  textAlign(CENTER, CENTER)

  if(random(10) < 0.1) {
    var i = floor(random(names.length));

    carrier.freq(notes[i]);
    note = names[i];
  }

  text(note, width/2, height/3);

}
