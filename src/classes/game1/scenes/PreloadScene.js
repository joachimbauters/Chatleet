import Preloader from "../objects/Preloader";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: `preload`
    });
  }

  preload() {
    this.preloader = new Preloader(
      this,
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2,
      `preloader`
    );
    this.preloader.anims.play(`loading`);

    this.load.image("boat", "./assets/boat.png");
    this.load.image("background", "./assets/background.png");
  }

  create() {
    this.scene.start(`start`);
  }

  update() {}
}

export default PreloadScene;
