import Phaser from "phaser";

import { GAME_HEIGHT, GAME_WIDTH, SCENES } from "../utils/constants";
import { Square } from "../game-objects/square";

export class MainScene extends Phaser.Scene {
  keys: any;
  wasd_debug_text: Phaser.GameObjects.Text;
  hit_debug_text: Phaser.GameObjects.Text;
  score_text: Phaser.GameObjects.Text;
  score: number;
  player: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  canvas: HTMLCanvasElement;
  shapes: Phaser.Physics.Arcade.Group;
  rose: Phaser.Sound.HTML5AudioSound;

  hitShape() {
    this.physics.pause();
    this.physics.add.group
    this.hit_debug_text.setText("You Suck!");
  }
  

  constructor() {
    super(SCENES.MAIN_SCENE);
  }

  create() {
    this.keys = this.input.keyboard.addKeys("W,A,S,D");
    this.score_text = this.add.text(20, 80, "Score: 0", { color: '#F2DC23' });
    this.hit_debug_text = this.add.text(10, 10, "", { color: '#F2DC23' });
    this.score = 0;

    this.player = this.physics.add.image(400, 300, 'player');
    this.player.setCollideWorldBounds(true).setScale(.4);

    this.shapes = this.physics.add.group();
  
    this.physics.add.collider(this.player, this.shapes, this.hitShape, null, this);

    this.time.addEvent({
      delay: 1000, // spawn each second
      loop: true,
      callbackScope: this,
      callback: this.spawnSquare
    });
    
    this.rose = this.sound.add('rose') as Phaser.Sound.HTML5AudioSound;
    // this.rose.play();


    
    // this.spawnShape('triangle');
  }

  update(time: number, delta: number): void {
    this.shapes.children.entries.forEach(shape=> {
      //@ts-ignore
      if (shape.x < -50) {
        shape.destroy();
        this.score = this.score + 10;
        this.score_text.setText("Score: " + this.score.toString());
          // this.shapes.killAndHide(shape);
      }
  });
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


  }

  spawnSquare() {
    const x = GAME_WIDTH;
    const y = Phaser.Math.Between(0, GAME_HEIGHT);
    const square = new Square(this, x, y);
    this.shapes.add(square);
    square.spawn();
  }
}

