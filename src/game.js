// game.js

import Snake from './snake';
import Food from './food';

/** @class Game
  * Represents a snake game
  */
export default class Game {
  constructor() {
    this.snake = new Snake(50, 50, 3);
    this.food = [];
    this.over = false;
    this.input = {
      direction: 'right'
    };
    // Create the back buffer canvas
    this.backBufferCanvas = document.createElement('canvas');
    this.backBufferCanvas.width = 100;
    this.backBufferCanvas.height = 100;
    this.backBufferContext = this.backBufferCanvas.getContext('2d');
    // Create the screen buffer canvas
    this.screenBufferCanvas = document.createElement('canvas');
    this.screenBufferCanvas.width = 100;
    this.screenBufferCanvas.height = 100;
    document.body.appendChild(this.screenBufferCanvas);
    this.screenBufferContext = this.screenBufferCanvas.getContext('2d');
    var message = document.createElement('div');
    message.id = "message";
    message.textContent = "";
    document.body.appendChild(message);
    // Bind class functions
    this.gameOver = this.gameOver.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.loop = this.loop.bind(this);

    window.onkeydown= this.handleKeyDown;
    // Start the game loop
    this.interval = setInterval(this.loop, 500);

  }

  gameOver(){
    var message = document.getElementById("message");
    message.innerHTML = "Game Over";
    this.over = true;
  }


  /** @method handleKeyDown
   *register when a key is pressed and change
   *our input
   */
   handleKeyDown(event){
     event.preventDefault();
     switch(event.key){
       case 'w':
       case 'ArrowUp':
         this.input.direction = 'up';
         break;
       case 'a':
       case 'ArrowLeft':
         this.input.direction = 'left';
         break;
       case 's':
       case 'ArrowDown':
         this.input.direction = 'down';
         break;
       case 'd':
       case 'ArrowRight':
         this.input.direction = 'right';
         break;
     }

   }


  /** @method update
    * Updates the game world.
    */
  update() {
    if(!this.over){


    var position = this.snake.getPosition();
    if(position.x < 0 || position.x >= 100 ||
       position.y < 0 || position.y >= 100){
         return this.gameOver();
       }
    this.food.forEach((food) => {
      food.update();
    });
    this.over = this.snake.update(this.input, this.gameOver);
  }
  }
  /** @method render
    * Renders the game world
    */
  render() {
    this.backBufferContext.fillStyle = '#ccc';
    this.backBufferContext.fillRect(0, 0, 100, 100);
    this.food.forEach((food) => {
      food.render(this.backBufferContext);
    })
    this.snake.render(this.backBufferContext);
    this.screenBufferContext.drawImage(this.backBufferCanvas,0,0)

  }
  loop() {
    this.update();
    this.render();
  }
}
