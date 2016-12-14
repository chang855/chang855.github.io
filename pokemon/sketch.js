var data;
var bubbles = [];

function preload() {
  data = loadJSON("pokemon.json");

}

function setup() {
  console.log(highest)
  var x = bubble.name.length
  colorMode(HSB, 310)
  createCanvas(1000, 1000);
  bubbles[0] = new bubble(0, 80, 240, 110); //yellow
  bubbles[1] = new bubble(45, 220, 200, 240) //orange 
  bubbles[2] = new bubble(90, 310, 400, 500) // red
  bubbles[3] = new bubble(135, 360, 60, 410); // green
  bubbles[4] = new bubble(180, 400, 180, 400); // reddish orange 
  bubbles[5] = new bubble(225, 90, 90, 160); // blue
  for (var i = 1; i < data.pokemon.length; i++) {
    if (data.pokemon[i].catch_rate < 10) {
      bubbles[0].name.push(data.pokemon[i].name)
    } else if (data.pokemon[i].catch_rate < 45) {
      bubbles[1].name.push(data.pokemon[i].name)

    } else if (data.pokemon[i].catch_rate < 90) {
      bubbles[2].name.push(data.pokemon[i].name)

    } else if (data.pokemon[i].catch_rate < 135) {
      bubbles[3].name.push(data.pokemon[i].name)

    } else if (data.pokemon[i].catch_rate < 180) {
      bubbles[4].name.push(data.pokemon[i].name)

    } else bubbles[5].name.push(data.pokemon[i].name)

  }
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].size = bubbles[i].name.length;
    bubbles[i].tone = bubbles[i].name.length;
  }

}

function lowest() {
  var low = 20;
  for (var i = 0; i < data.pokemon.length; i++) {
    if (parseInt(data.pokemon[i].catch_rate) < low) {
      low = data.pokemon[i].catch_rate
    }
  }
}

function highest() {
  var max2 = 0;
  for (var i = 0; i < data.pokemon.length; i++) {
    if (parseInt(data.pokemon[i].catch_rate) > max2) {
      max2 = data.pokemon[i].catch_rate
    }
  }
}

function draw() {
  background(100)
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].display();
    bubbles[i].checkCursorOver();
  }
}



function bubble(range, x, y, xtext) {
  this.catchRange = range;
  this.x = x;
  this.y = y;
  this.xtext = xtext;
  this.tone = 0;
  this.size = 0;
  this.name = [];
  this.checkCursorOver = function() {
    var distance = sqrt((mouseX - this.x) * (mouseX - this.x) + (mouseY - this.y) * (mouseY - this.y))
    if (distance < this.size / 2) {
      this.displayNames();
      //console.log("should be displaying names");
    }
  }
  this.displayNames = function() {
    stroke(0);
    fill(0);
    textSize(14);
    for (var i = 0; i < this.name.length; i++) {
      if (i < 65) {
        text(this.name[i], 500, (i * 10));
      } else if (i < 130) {
        text(this.name[i], 575, (i * 10) - 650);
      } else if (i < 195) {
        text(this.name[i], 650, (i * 10) - 1300)
      } else if (i < 260) {
        text(this.name[i], 725, (i * 10) - 1950)
      } else {
        text(this.name[i], 800, (i * 10) - 2600)
      }

    }
  }
  this.display = function() {
    textSize(14);
    stroke(this.tone, 310, 310);
    fill(this.tone, 710, 710);
    ellipse(this.x, this.y, this.size, this.size);
    text(range + " to " + (range + 45), this.xtext, this.y + 20);
  }
}