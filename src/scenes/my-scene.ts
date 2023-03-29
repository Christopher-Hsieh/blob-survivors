import Phaser from "phaser";
import player_image from '../assets/circle.png';
import square_image from '../assets/square.png';
import triangle_image from '../assets/triangle.png';
import rose_song_mp3 from '../assets/rose.mp3';
import rose_song_ogg from '../assets/rose.ogg';
import { GAME_HEIGHT, GAME_WIDTH } from "./constants";

export class MainScene extends Phaser.Scene {
  keys: any;
  wasd_debug_text: Phaser.GameObjects.Text;
  hit_debug_text: Phaser.GameObjects.Text;
  player: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  canvas: HTMLCanvasElement;
  shapes: Phaser.Physics.Arcade.Group;
  rose: Phaser.Sound.HTML5AudioSound;
  // sound: Phaser.Sound.HTML5AudioSound;

  // var score = 0;
  // var gameOver = false;
  // var scoreText;

  hitShape() {
    this.physics.pause();
    this.physics.add.group
    this.hit_debug_text.setText("Player Hit!");
  }
  

  constructor() {
    super("MyScene");
  }

  preload() {
    this.load.image('player', player_image);
    this.load.image('square', square_image);
    this.load.image('triangle', triangle_image);
    this.load.audio('rose', [ rose_song_ogg, rose_song_mp3]);
    // this.canvas = this.sys.game.canvas;
  }

  create() {
    this.keys = this.input.keyboard.addKeys("W,A,S,D");
    this.wasd_debug_text = this.add.text(20, 40, "", { color: '#F2DC23' });
    this.hit_debug_text = this.add.text(10, 10, "", { color: '#F2DC23' });


    this.player = this.physics.add.image(400, 300, 'player');
    this.player.setCollideWorldBounds(true).setScale(.2);

    this.shapes = this.physics.add.group();
  
    this.physics.add.collider(this.player, this.shapes, this.hitShape, null, this);

    this.time.addEvent({
      delay: 1000, // spawn each second
      loop: true,
      callbackScope: this,
      callback: this.spawnSquare
    });
    
    this.rose = this.sound.add('rose') as Phaser.Sound.HTML5AudioSound;
    this.rose.play();
    // this.spawnShape('triangle');
  }

  update(time: number, delta: number): void {

    this.player.setVelocity(0);
    if (this.keys.A.isDown) {
      this.player.setVelocityX(-300);
    } else if (this.keys.D.isDown) {
      this.player.setVelocityX(300);
    }

    if (this.keys.W.isDown) {
      this.player.setVelocityY(-300);
    } else if (this.keys.S.isDown) {
      this.player.setVelocityY(300);
    }

    this.wasd_debug_text.setText(
      // @ts-ignore
      Object.entries(this.keys).map(([name, key]) => `${name}: keyCode=${key.keyCode} isDown=${key.isDown} isUp=${key.isUp} timeDown=${key.timeDown} timeUp=${key.timeUp}`)
    );
  }

  spawnSquare() {
    // const { x, y } = randomSpawn(sys.canvas.);
    const x = GAME_WIDTH;
    const y = Phaser.Math.Between(0, GAME_HEIGHT);
    const shape: Phaser.Physics.Arcade.Sprite = this.shapes.create(x, y, 'square');
    shape.setScale(.2);
    shape.setAngle(Phaser.Math.Between(0, 360)); // Angle in degrees
    shape.setVelocity(Phaser.Math.Between(-250, -120), 0); // Setup dynamic velocity
  }
}

