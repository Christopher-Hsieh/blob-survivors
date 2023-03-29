import Phaser from "phaser";
import player_image from '../assets/circle.png';
import square_image from '../assets/square.png';
import triangle_image from '../assets/triangle.png';
import rose_song_mp3 from '../assets/rose.mp3';
import rose_song_ogg from '../assets/rose.ogg';
import { SCENES } from "../utils/constants";

export class Preloader extends Phaser.Scene {
    preload() {
        this.load.image('player', player_image);
        this.load.image('square', square_image);
        this.load.image('triangle', triangle_image);
        this.load.audio('rose', [ rose_song_ogg, rose_song_mp3]);
        // this.canvas = this.sys.game.canvas;
      }

      create() {
        this.scene.launch(SCENES.MAIN_SCENE);
      }
}