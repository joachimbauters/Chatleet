export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, `boat`);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(0.1);

    this.setCollideWorldBounds(true);
  }
}
