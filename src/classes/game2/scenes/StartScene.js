import Player from "../objects/Player.js";
import Player2 from "../objects/Player2.js";

class StartScene extends Phaser.Scene {
  constructor() {
    super({
      key: `start`
    });

    this.levelSpeed = 0;
    this.pointerSpeed = 1500;
    this.startScene = false;
  }

  create() {
    this.background = this.add.tileSprite(
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerWidth,
      window.innerHeight,
      "background"
    );

    this.background.setTileScale(0.5);

    this.speed = this.add.text(20, 35 / 2, `Snelheid: 0 km/h`, {
      fontSize: `18px`,
      fill: `#FFFFFF`,
      fontFamily: "sfprodisplay"
    });

    this.afstand = this.add.text(20, 85 / 2, `Afstand 0 Km`, {
      fontSize: `18px`,
      fill: `#FFFFFF`,
      fontFamily: "sfprodisplay"
    });

    this.addDividers();
    this.createPlayer2();
    this.createPlayer();
    this.countdown();

    setTimeout(() => {
      this.pointerTween = this.tweens.add({
        targets: this.r3,
        x: this.game.config.width,
        yoyo: true,
        duration: this.pointerSpeed,
        repeat: -1,
        ease: "Sine.easeInOut"
      });

      setInterval(() => {
        this.pointerTween.data[0].duration -= 25;
      }, 5000);
    }, 4000);

    this.input.on("pointerdown", pointer => {
      if (
        Math.floor(this.r3.x) >= this.game.config.width / 2 - 25 &&
        Math.floor(this.r3.x) <= this.game.config.width / 2 + 25
      ) {
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
  }

  countdown() {
    //this.scene.pause();

    this.three = this.add
      .text(window.innerWidth / 2, window.innerHeight / 2, `3`, {
        fontSize: `200px`,
        fill: `#FFFFFF`,
        fontFamily: "sfprodisplay"
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: this.three,
      alpha: { from: 0, to: 1 },
      y: { from: window.innerHeight / 2 + 20, to: window.innerHeight / 2 },
      yoyo: false,
      duration: 1000,
      repeat: -1,
      ease: "Power2"
    });

    setTimeout(() => {
      this.three.destroy();
      this.two = this.add
        .text(window.innerWidth / 2, window.innerHeight / 2, `2`, {
          fontSize: `200px`,
          fill: `#FFFFFF`,
          fontFamily: "sfprodisplay"
        })
        .setOrigin(0.5);

      this.tweens.add({
        targets: this.two,
        alpha: { from: 0, to: 1 },
        y: { from: window.innerHeight / 2 + 20, to: window.innerHeight / 2 },
        yoyo: false,
        duration: 1000,
        repeat: -1,
        ease: "Power2"
      });
    }, 1000);
    setTimeout(() => {
      this.two.destroy();
      this.one = this.add
        .text(window.innerWidth / 2, window.innerHeight / 2, `1`, {
          fontSize: `200px`,
          fill: `#FFFFFF`,
          fontFamily: "sfprodisplay"
        })
        .setOrigin(0.5);

      this.tweens.add({
        targets: this.one,
        alpha: { from: 0, to: 1 },
        y: { from: window.innerHeight / 2 + 20, to: window.innerHeight / 2 },
        yoyo: false,
        duration: 1000,
        repeat: -1,
        ease: "Power2"
      });
    }, 2000);
    setTimeout(() => {
      this.one.destroy();
      this.go = this.add
        .text(window.innerWidth / 2, window.innerHeight / 2, `Go!`, {
          fontSize: `200px`,
          fill: `#FFFFFF`,
          fontFamily: "sfprodisplay"
        })
        .setOrigin(0.5);

      this.tweens.add({
        targets: this.go,
        alpha: { from: 0, to: 1 },
        y: { from: window.innerHeight / 2 + 20, to: window.innerHeight / 2 },
        yoyo: false,
        duration: 600,
        repeat: -1,
        ease: "Power2"
      });
    }, 3000);

    setTimeout(() => {
      this.go.destroy();
      this.startScene = true;
      this.levelSpeed = 7;
    }, 4000);
  }

  addDividers() {
    this.add.rectangle(
      this.game.config.width / 2,
      this.game.config.height,
      this.game.config.width,
      150,
      0x000
    );

    this.r2 = this.add.rectangle(
      this.game.config.width / 2,
      this.game.config.height,
      50,
      150,
      0xffffff
    );

    this.r3 = this.add.rectangle(0, this.game.config.height, 20, 150, 0x84ff00);
  }

  createPlayer() {
    this.player = new Player(this, 80, 450);
    this.player.body.setAllowGravity(false);

    setTimeout(() => {
      this.tweens.add({
        targets: this.player,
        y: { from: 450, to: 350 },
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
    }, 4000);
  }

  createPlayer2() {
    this.player2 = new Player2(this, 80, window.innerHeight / 2 - 100);
    this.player2.body.setAllowGravity(false);

    setTimeout(() => {
      this.tweens.add({
        targets: this.player2,
        x: { from: 80, to: window.innerWidth - 100 },
        yoyo: true,
        duration: 12000,
        repeat: -1,
        ease: "Sine.easeInOut"
      });
    }, 4000);

    this.player3 = new Player2(this, 80, window.innerHeight / 2 + 200);
    this.player3.body.setAllowGravity(false);

    setTimeout(() => {
      this.tweens.add({
        targets: this.player3,
        x: { from: 80, to: window.innerWidth - 100 },
        yoyo: true,
        duration: 8000,
        repeat: -1,
        ease: "Sine.easeInOut"
      });
    }, 4000);
  }

  gameOver() {
    this.scene.start(`gameOver`);
  }

  update() {
    this.background.tilePositionX += this.levelSpeed;

    if (this.startScene === true) {
      this.levelSpeed -= 0.02;
      this.pointerSpeed -= 0.02;
      this.player.anims.play("bikeforward", true);
      this.player2.anims.play("bikeforward2", true);
      this.player3.anims.play("bikeforward2", true);
    }

    if (Math.floor(this.levelSpeed) === 0 && this.startScene === true) {
      console.log("gameover");

      this.gameOver();
    }
  }
}

export default StartScene;
