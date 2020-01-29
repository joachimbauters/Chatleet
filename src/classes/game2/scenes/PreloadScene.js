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
    this.load.image("bike", "./assets/bike.png");
    this.load.image("background", "./assets/background2.png");
  }

  create() {
    this.scene.start(`start`);
  }

  update() {}
}

export default PreloadScene;
