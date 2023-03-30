import Phaser from "phaser";
import player_image from '../assets/circle.png';
import square_image from '../assets/square.png';
import triangle_image from '../assets/triangle.png';
import blue_image from '../assets/blue.png';
import rose_song_mp3 from '../assets/rose.mp3';
import rose_song_ogg from '../assets/rose.ogg';
import { GAME_HEIGHT, GAME_WIDTH, SCENES } from "../utils/constants";

export class Preloader extends Phaser.Scene {
  keys: any;

    preload() {
        this.load.image('player', player_image);
        this.load.image('square', square_image);
        this.load.image('triangle', triangle_image);
        this.load.image('blue', blue_image);
        this.load.audio('rose', [ rose_song_ogg, rose_song_mp3]);
        // this.canvas = this.sys.game.canvas;
      }

      create() {
        this.keys = this.input.keyboard.addKeys("W,A,S,D");
        this.add.text(GAME_WIDTH/2, GAME_HEIGHT/2, "~ Click to start. WASD to Play. ~", { color: '#F2DC23' });
        this.input.once('pointerdown', function () {
          this.scene.start(SCENES.MAIN_SCENE);

      }, this);
      }

}