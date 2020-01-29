export default class Preloader extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, `preloader`);
    scene.add.existing(this);
    this.createAnimation();
  }

  createAnimation() {
    this.scene.anims.create({
      key: `loading`,
      frames: this.scene.anims.generateFrameNumbers("preloader"),
      frameRate: 20,
      repeat: -1
    });
  }
}
