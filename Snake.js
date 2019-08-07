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


  this.draw = function() {
    ctx.fillStyle = SNAKE_COLOR;
    for (var i = 0; i < this.posx.length; i++) {
      ctx.fillRect(this.posx[i],this.posy[i],DOT_SIZE,DOT_SIZE);
    }
  }
}


function loop(game) {
  var eat = game.checkCollisions();

  if (gameRunning == true) {
    game.move();
    game.draw();
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
  this.onFood = false;

  this.draw = function() {
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0,0,WIDTH,HEIGHT);

    this.food.drawFood();
    this.snake.draw();
  }

  this.move = function() {
    if (this.onFood == true) {
      this.snake.posx.push(this.snake.posx[this.snake.posx.length - 1]);
      this.snake.posy.push(this.snake.posy[this.snake.posy.length - 1]);

      for (var i = (this.snake.posx.length - 2); i > 0; i--) {
        this.snake.posx[i] = this.snake.posx[i - 1];
        this.snake.posy[i] = this.snake.posy[i - 1];
      }
      console.log("eat", this.snake.posx, "\n", this.snake.posy);
    } else {
      for (var i = (this.snake.posx.length - 1); i > 0; i--) {
        this.snake.posx[i] = this.snake.posx[i - 1];
        this.snake.posy[i] = this.snake.posy[i - 1];
      }
    }
    this.snake.posx[0] += direction[0] * DOT_SIZE;
    this.snake.posy[0] += direction[1] * DOT_SIZE;
    console.log(this.snake.posx, "\n", this.snake.posy);
  }

  this.checkCollisions = function() {
    if (this.food.posx == this.snake.posx[0] && this.food.posy == this.snake.posy[0]) {
      this.food.placeFood();
      this.onFood = true;
    } else if (this.snake.posx[0] < 0 || this.snake.posx[0] > WIDTH - DOT_SIZE ||
               this.snake.posy[0] < 0 || this.snake.posy[0] > HEIGHT - DOT_SIZE) {
      this.endGame();
      this.onFood = false;
    } else {
      this.onFood = false;
    }

    for (var i = 0; i < this.snake.posx.length; i++) {
      if (i < 4) {
        continue;
      } else {
        if (this.snake.posx[i] == this.snake.posx[0] && this.snake.posy[i] == this.snake.posy[0]) {
          this.endGame();
          this.onFood = false;
        }
      }
    }
  }

  this.endGame = function () {
    gameRunning = false;
    ctx.fillStyle = "FFF";
    ctx.fillText("GAME OVER", 380, 380);
  }
}


function gameStart() {
  var game = new Game();
  setInterval(function() { loop(game); }, 100);
}


window.addEventListener("keydown", function (e) {
  if (e.keyCode == DOWN_ARROW && direction[1] == 0) {
    direction = [0, 1];
  } else if (e.keyCode == UP_ARROW && direction[1] == 0) {
    direction = [0, -1];
  } else if (e.keyCode == LEFT_ARROW && direction[0] == 0) {
    direction = [-1, 0];
  } else if (e.keyCode == RIGHT_ARROW && direction[0] == 0) {
    direction = [1, 0];
  }
});


gameStart();
