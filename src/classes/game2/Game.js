import PreloadScene from "./scenes/PreloadScene.js";
import BootScene from "./scenes/BootScene.js";
import StartScene from "./scenes/StartScene.js";

class Game extends Phaser.Game {
  constructor() {
    super({
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      title: `games`,
      scene: [BootScene, PreloadScene, StartScene],
      url: `http://www.devine.be`,
      version: `1.0`,
      parent: document.querySelector(".game_container"),
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
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
