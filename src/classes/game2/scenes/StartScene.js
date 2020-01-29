import Player from "../objects/Player.js";

class StartScene extends Phaser.Scene {
  constructor() {
    super({
      key: `start`
    });

    this.levelSpeed = 5;
    this.pointerSpeed = 1000;
  }

  create() {
    this.background = this.add.tileSprite(150, 305, 290, 610, "background");
    this.addDividers();
    this.createPlayer();

    this.pointerTween = this.tweens.add({
      targets: this.r3,
      x: this.game.config.width,
      yoyo: true,
      duration: this.pointerSpeed,
      repeat: -1,
      ease: "Sine.easeInOut"
    });

    this.input.on("pointerdown", pointer => {
      if (Math.floor(this.r3.x) >= 120 && Math.floor(this.r3.x) <= 170) {
        console.log("hit");
        this.levelSpeed += 2;
      } else {
        console.log("mis");
        if (this.levelSpeed >= 0.5) {
          this.levelSpeed -= 0.5;
        } else {
          return;
        }
      }
    });

    // this.time.addEvent({
    //   delay: 2500,
    //   callback: this.resetR3,
    //   callbackScope: this,
    //   loop: true
    // });
  }

  addDividers() {
    this.add.rectangle(
      this.game.config.width / 2,
      this.game.config.height,
      this.game.config.width,
      100,
      0x000
    );

    this.r2 = this.add.rectangle(
      this.game.config.width / 2,
      this.game.config.height,
      30,
      100,
      0x363636
    );

    this.r3 = this.add.rectangle(0, this.game.config.height, 15, 100, 0x84ff00);
  }

  createPlayer() {
    this.player = new Player(this, 80, 450);
    this.player.body.setAllowGravity(false);

    this.tweens.add({
      targets: this.player,
      y: { from: 350, to: 480 },
      yoyo: true,
      duration: 10000,
      repeat: -1,
      ease: "Sine.easeInOut"
    });

    this.tweens.add({
      targets: this.player,
      x: { from: 80, to: 150 },
      yoyo: true,
      duration: 10000,
      repeat: -1,
      ease: "Sine.easeInOut"
    });
  }

  gameOver() {
    this.scene.start(`gameOver`);
  }

  update() {
    this.background.tilePositionX += this.levelSpeed;

    this.levelSpeed -= 0.02;
    this.pointerSpeed -= 0.02;

    console.log(this.levelSpeed);

    this.pointerSpeed += 2000;
    this.pointerTween.updateTo("duration", this.pointerSpeed, true);

    if (Math.floor(this.levelSpeed) === 0) {
      console.log("gameover");

      this.gameOver();
    }
  }
}

export default StartScene;
