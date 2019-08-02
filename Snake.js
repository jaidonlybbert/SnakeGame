// Jaidon Lybbert
// August 1, 2019
// My version of the Snake game in the beautiful beast that is javascript

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var DOT_SIZE = 20;
var DOWN_ARROW = 
var UP_ARROW =
var LEFT_ARROW =
var RIGHT_ARROW =


function snake() { // classes are functions now, thanks javascript
  this.posx = 0;
  this.posy = 0;
  this.speedx = 1;
  this.speedy = 0;

  this.update = function() {
    this.posx += this.speedx * DOT_SIZE;
    this.posy += this.speedy * DOT_SIZE;
  }

  this.draw = function() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0,0,800,800);

    ctx.fillStyle = "#FFF";
    ctx.fillRect(this.posx,this.posy,20,20);
  }
}


function loop(s) {
  s.update();
  s.draw();
  console.log("yeet");
}


var s = new snake();

// Oh javascript...
// You cannot pass a function with an argument to setInterval(), you must
// encapsulate it in an un-named function
setInterval( function() { loop(s); }, 100);
