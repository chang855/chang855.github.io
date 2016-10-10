var message = "Congrats"
var bubbles = [];
var img;

function preload() {
  var link = prompt("please enter the url of a picture", "pen.jpg");
  img = loadImage(link);
}

function setup() {
  bubbles[0] = new Bubble(0, 0, 400);
  ellipseMode(CORNER);
  createCanvas(300, 300);
}

function draw() {
  background(255);
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].display();
    bubbles[i].cursor();
  } if (allSmallCircles() === true) {
    text(message, 120, 150);
    textSize(30)
  }
}


function Bubble(x, y, size) {
  this.x = x;
  this.y = y;
  this.color = color(img.get(this.x, this.y));
  this.size = size;
  this.display = function() {
    //fill (this.color);
    fill(this.color)
    ellipse(this.x, this.y, this.size, this.size);
  }
  this.cursor = function() {
    if (mouseX > this.x && mouseX < this.x + this.size && mouseY > this.y && mouseY < this.y + this.size) {
      if (this.size > 8) {
        this.size /= 2;
        bubbles.push(new Bubble(this.x + this.size, this.y + this.size, this.size));
        bubbles.push(new Bubble(this.x + this.size, this.y, this.size));
        bubbles.push(new Bubble(this.x, this.y + this.size, this.size));
      }
    }
  }
}

function allSmallCircles() {
  for (var i = 0; i < bubbles.length; i++) {
    if (bubbles[i].size > 8) {
      return false;
    }
  }
  return true;
}