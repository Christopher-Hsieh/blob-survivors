// <reference types="Phaser" path=”../node_modules/phaser/types/phaser.d.ts”/>
import Phaser from 'phaser';
import { MainScene } from './scenes/main-scene';
import { GAME_HEIGHT, GAME_WIDTH } from './utils/constants';
import { Preloader } from './scenes/preloader';

const GameConfig: Phaser.Types.Core.GameConfig = {
  title: '{Rose}',
  version: '1.0',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  type: Phaser.AUTO,
  parent: 'app',
  // `as as Phaser.Types.Scenes.SettingsConfig[]` is required until https://github.com/photonstorm/phaser/pull/6235
  // scene: [menu()] as Phaser.Types.Scenes.SettingsConfig[],
  scene: [
    Preloader, MainScene
  ],
  input: {
    keyboard: true,
    mouse: true
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
  render: { pixelArt: false, antialias: true },
  scale: {
    // mode: Phaser.Scale.FIT,
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