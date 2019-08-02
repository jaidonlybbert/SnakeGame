// Jaidon Lybbert
// August 1, 2019
// My version of the Snake game in the beautiful beast that is javascript

const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
const WIDTH = 800;
const HEIGHT = 800;
const DOT_SIZE = 20;
const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;
const DOTS_HORIZONTAL = WIDTH / DOT_SIZE;
const DOTS_VERTICAL = HEIGHT / DOT_SIZE;
const BG_COLOR = "#000";
const SNAKE_COLOR = "#FFF";
const FOOD_COLOR = "#0F0";

var direction = [1, 0];
var gameRunning = true;


function Snake() {
  this.posx = [200];
  this.posy = [200];
  this.speedx = direction[0];
  this.speedy = direction[1];

  this.update = function() {
    this.posx[0] += direction[0] * DOT_SIZE;
    this.posy[0] += direction[1] * DOT_SIZE;
  }

  this.draw = function() {
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0,0,WIDTH,HEIGHT);

    ctx.fillStyle = SNAKE_COLOR;
    ctx.fillRect(this.posx,this.posy,DOT_SIZE,DOT_SIZE);
  }

  this.grow = function() {
    
  }
}


function loop(game) {
  game.checkCollisions();

  if (gameRunning == true) {
    game.snake.update();
    game.draw();
    console.log("yeet");
  }
}


function Food() {
  this.posx = 0;
  this.posy = 0;

  this.placeFood = function() {
    this.posx = Math.floor(Math.random() * DOTS_HORIZONTAL) * DOT_SIZE;
    this.posy = Math.floor(Math.random() * DOTS_VERTICAL) * DOT_SIZE;
    console.log(this.posx, this.posy);
  }

  this.drawFood = function() {
    ctx.fillStyle = FOOD_COLOR;
    ctx.fillRect(this.posx, this.posy, DOT_SIZE, DOT_SIZE);
  }
}


function Game() {
  this.snake = new Snake();
  this.food = new Food();

  this.food.placeFood();

  this.draw = function() {
    this.snake.draw();
    this.food.drawFood();
  }

  this.checkCollisions = function() {
    if (this.food.posx == this.snake.posx[0] && this.food.posy == this.snake.posy[0]) {
      this.snake.grow();
      this.food.placeFood();
    } else if (this.snake.posx[0] < 0 || this.snake.posx[0] > WIDTH - DOT_SIZE ||
               this.snake.posy[0] < 0 || this.snake.posy[0] > HEIGHT - DOT_SIZE) {
      this.endGame();
    }
  }

  this.endGame = function () {
    gameRunning = false;
    ctx.fillStyle = "FFF";
    ctx.fillText("GAME OVER", 380, 380)
  }
}


function gameStart() {
  var game = new Game();

  // OK... You cannot pass a function with an argument to setInterval(), you must
  // encapsulate it in an un-named function
  setInterval( function() { loop(game); }, 100);
}


window.addEventListener("keydown", function (e) {
  if (e.keyCode == DOWN_ARROW && direction[1] == 0) {
    console.log('down');
    direction = [0, 1];
  } else if (e.keyCode == UP_ARROW && direction[1] == 0) {
    console.log('up');
    direction = [0, -1];
  } else if (e.keyCode == LEFT_ARROW && direction[0] == 0) {
    console.log('left');
    direction = [-1, 0];
  } else if (e.keyCode == RIGHT_ARROW && direction[0] == 0) {
    console.log('right');
    direction = [1, 0];
  }
});


gameStart();
