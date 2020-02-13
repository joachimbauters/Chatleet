export default class SinkingBoei extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "sinkingBoei");

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.enableBody = true;
    this.body.allowGravity = false;
    this.setScale(0.4);

    this.createAnimations();
  }

  createAnimations() {
    this.scene.anims.create({
      key: `sinkingboei`,
      frames: this.scene.anims.generateFrameNumbers(`sinkingBoei`, {
        start: 0,
        end: 3
      }),
      frameRate: 8
    });
  }
}
