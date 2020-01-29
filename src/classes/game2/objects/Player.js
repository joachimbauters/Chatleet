export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "bike");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(0.2);

    this.setCollideWorldBounds(true);
  }
}
