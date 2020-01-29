export default class Item extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, scale) {
    super(scene, x, y, `boat`);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.sys.arcadePhysics.world.enableBody(this, 0);
    this.setCollideWorldBounds(false);
    this.onWorldBounds = false;
    this.setScale(scale);
    this.body.onWorldBounds = false;
    this.disableBody(true, true);
  }

  update() {
    if (this.body.y > this.scene.game.config.height) {
      this.disableBody(true, true);
    }
  }
}
