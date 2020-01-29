import PreloadScene from "./scenes/PreloadScene.js";
import BootScene from "./scenes/BootScene.js";
import StartScene from "./scenes/StartScene.js";

class Game extends Phaser.Game {
  constructor() {
    super({
      type: Phaser.AUTO,
      width: 290,
      height: 610,
      title: `games`,
      scene: [BootScene, PreloadScene, StartScene],
      url: `http://www.devine.be`,
      version: `1.0`,
      parent: "devicePhaser2",
      physics: {
        default: `arcade`,
        arcade: {
          debug: false,
          gravity: { y: 100 }
        }
      }
    });
  }
}

export default Game;
