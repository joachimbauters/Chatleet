export default class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: "boot"
    });
  }
  preload() {
    this.load.spritesheet(`preloader`, `assets/preloader.png`, {
      frameWidth: 222,
      frameHeight: 21
    });
  }
  create() {
    this.scene.start(`preload`);
  }
}
