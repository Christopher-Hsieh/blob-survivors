import Phaser from 'phaser';
import { MyScene } from './scenes/my-scene';

const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'ExampleGame',
  version: '1.0',
  width: 1200,
  height: 800,
  type: Phaser.AUTO,
  parent: 'app',
  // `as as Phaser.Types.Scenes.SettingsConfig[]` is required until https://github.com/photonstorm/phaser/pull/6235
  // scene: [menu()] as Phaser.Types.Scenes.SettingsConfig[],
  scene: [
    MyScene
  ],
  input: {
    keyboard: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true,
      debugShowBody: true,
      debugShowStaticBody: true,
      debugShowVelocity: true,
      debugVelocityColor: 0xffff00,
      debugBodyColor: 0x0000ff,
      debugStaticBodyColor: 0xffffff
    }
  },
  backgroundColor: '#1B1C22',
  render: { pixelArt: true },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    // `fullscreenTarget` must be defined for phones to not have
    // a small margin during fullscreen.
    fullscreenTarget: 'app',
    expandParent: false,
  },
};


export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener('load', () => {
  // Expose `_game` to allow debugging, mute button and fullscreen button
  (window as any)._game = new Game(GameConfig);
});