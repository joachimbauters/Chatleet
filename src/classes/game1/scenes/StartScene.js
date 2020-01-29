import Player from "../objects/Player.js";
import Item from "../objects/Item.js";

class StartScene extends Phaser.Scene {
  constructor() {
    super({
      key: `start`
    });

    this.value = 2500;
    this.speed = 2500;
    this.score = 0;
    this.schade = 100;
    this.levelSpeed = 5;
  }

  create() {
    this.background = this.add.tileSprite(150, 305, 290, 610, "background");

    this.scoreTextField = this.add.text(20, 35, `Afstand: 0m`, {
      fontSize: `16px`,
      fill: `#FFFFFF`
    });

    this.schadeTextField = this.add.text(20, 55, `Leven: 100%`, {
      fontSize: `16px`,
      fill: `#FFFFFF`
    });

    this.items = this.physics.add.staticGroup();
    this.items.createIfNull = false;

    this.createPlayer();
    this.initItems();

    this.timedEvent = this.time.addEvent({
      delay: this.value,
      callback: this.addItem,
      callbackScope: this,
      loop: true
    });

    this.createCollideItem();
  }

  createPlayer() {
    this.player = new Player(this, this.sys.game.canvas.width / 2, 500);
    this.player.body.setAllowGravity(false);

    this.input.on("pointermove", pointer => {
      this.player.x = pointer.x;
    });

    this.input.on("drag", dragX => {
      this.player.x = dragX;
    });
  }

  addItem() {
    this.item = this.items.getFirstDead();
    this.item.enableBody(
      true,
      Phaser.Math.Between(0, this.game.config.width),
      -200,
      true,
      true
    );

    this.timedEvent.reset({
      delay: this.speed,
      callback: this.addItem,
      callbackScope: this,
      repeat: 1
    });

    this.createCollideItem();
  }

  initItems() {
    for (let i = 0; i < 100; i++) {
      const scale = Math.random() * 0.1 + 0.07;

      const sprite = new Item(
        this,
        Phaser.Math.Between(0, this.game.config.width),
        -200,
        scale
      );
      this.items.add(sprite);
    }
    this.items.runChildUpdate = true;
  }

  createCollideItem() {
    this.physics.add.overlap(this.player, this.item, this.hitItem, null, this);
  }

  hitItem(obj1, obj2) {
    obj2.disableBody(true, true);

    this.schade -= 20;
  }

  checkDamage() {
    if (this.schade <= 0) {
      this.gameOver();
    }
  }

  gameOver() {
    this.scene.start(`gameOver`);
  }

  update() {
    this.value += 1;

    this.score += 0.05;

    this.levelSpeed += 0.001;
    this.speed -= 0.1;

    this.background.tilePositionY -= this.levelSpeed;

    this.scoreTextField.setText(`Afstand: ${Math.round(this.score)}m`);
    this.schadeTextField.setText(`Leven: ${Math.round(this.schade)}%`);

    this.checkDamage();
  }
}

export default StartScene;
