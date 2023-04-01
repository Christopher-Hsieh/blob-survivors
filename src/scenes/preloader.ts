import Phaser from "phaser";
import player_image from '../assets/circle.png';
import square_image from '../assets/square.png';
import triangle_image from '../assets/triangle.png';
import blue_image from '../assets/blue.png';
import yellow_image from '../assets/yellow.png';
import orange_image from '../assets/orange.png';
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
        this.load.image('yellow', yellow_image);
        this.load.image('orange', orange_image);
        this.load.audio('rose', [ rose_song_ogg, rose_song_mp3]);
      }

      create() {
        this.add.text(GAME_WIDTH/2, GAME_HEIGHT/2, "~ Press R or Right Click to Start. WASD or Mouse to Play. ~", { color: '#F2DC23' });
        this.keys = this.input.keyboard.addKeys("R");
        this.input.once('pointerdown', function () {
          this.scene.start(SCENES.MAIN_SCENE);
      }, this);
      }

      update(time: number, delta: number): void {
        if (this.keys.R.isDown) {
            this.scene.start(SCENES.MAIN_SCENE);
        }
    }

}