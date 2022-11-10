window.addEventListener('load', function() {
  // canvas setup
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class InputHandler {
    constructor(game) {
      this.game = game;
      window.addEventListener('keydown', e => {
        if (((e.keyCode === 38) ||
          (e.keyCode === 40)
        ) && this.game.keys.indexOf(e.keyCode) === -1) {
          this.game.keys.push(e.keyCode);
        } else if (e.keyCode === +1){
          this.game.player.shootTop();
        }
        console.log(e.keyCode);
      })
      window.addEventListener('key', e => {
        if (this.game.keys.indexOf(e.key) > -1) {
          this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
        }
        console.log(this.game.keys);
      })
    }
  }

  class Projectile {
    constructor(game, x, y) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.width = 10;
      this.height = 3;
      this.speed = 3;
      this.markedForDeletion = false;
    }
    update() {
      this.x += this.speed;
      if (this.x > this.game.width * 0.8) this.markedForDeletion = true;
    }
    draw(context) {
      context.fillStyle = "yellow";
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  class Particle {
  
  }

  class Player {
    constructor(game) {
      this.game = game;
      this.width = 120;
      this.height = 190;
      this.x = 100;
      this.y = 100;
      this.speedY = -1;
      this.maxSpeed = 4;
      this.projectiles = [];
    }
    update() {
      //Arrow key functions
      if (this.game.keys.includes('ArrowKeyUp')) this.speedY = -this.maxSpeed;
      else if (this.game.keys.includes('ArrowKeyDown')) this.speedY = this.maxSpeed;
      else this.speedY = 0;
      this.y += this.speedY;
      //handle projectiles
      this.projectiles.forEach(projectile => {
        projectile.update();
      this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);
        
      });
    }
    draw(context) {
      context.fillStyle = "black";
      context.fillRect(this.x, this.y, this.width, this.height);
      this.projectiles.forEach(projectile => {
        projectile.draw(context);

      });
    }
    shootTop(){
      if (this.game.ammo > 0){
      this.projectiles.push(new Projectile(this.game, this.x + 80, this.y));
        //this is where you left oof
        //time stamp: 33:10
        this.game.ammo--;
      console.log(this.projectiles);
    }
  }

  //class Enemey {

  }
  
  class Layer {

  }

  class Background {

  }

  class UserInterface {

  }

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.keys = [];
      this.ammo = 20;
    }
    update() {
      this.player.update();
    }
    draw(context) {
      this.player.draw(context);
    }
  }
  const game = new Game(canvas.width, canvas.height);
  //animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate();
})