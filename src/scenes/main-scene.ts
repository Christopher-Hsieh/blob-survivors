import Phaser from "phaser";

import { GAME_HEIGHT, GAME_WIDTH, SCENES, SPAWN_ZONE } from "../utils/constants";
import { Square } from "../game-objects/square";
import { Triangle } from "../game-objects/triangle";

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
    this.rose.stop();
    this.physics.pause();
    this.scene.pause();
    // this.physics.add.group
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
    this.player = this.physics.add.image(400, 300, 'player').setScale(.4).setCircle(38);
    this.player.setCollideWorldBounds(true);


    this.shapes = this.physics.add.group();
  
    this.physics.add.collider(this.player, this.shapes, this.hitShape, null, this);

    // Spawn Squares every 1 second after 7.5 seconds
    this.time.addEvent({
      delay: 6500, // Trigger at 7.5 sec
      callbackScope: this,
      callback: function() { 
        this.time.addEvent({
          delay: 500, // spawn each .5 second
          loop: true,
          callbackScope: this,
          callback: this.spawnSquare
        });
      }
    });

    // Spawn 10 triangles at the start with crazy tween
    this.time.addEvent({
      startAt: 500,
      delay: 620,
      repeat: 10,
      callbackScope: this,
      callback: this.spawnTriangle
    });

    // Start spamming triangles at 18 secs
    this.time.addEvent({
      delay: 18500,
      callbackScope: this,
      callback: function() { 
        this.time.addEvent({
          delay: 300, // spawn each .5 second
          loop: true,
          callbackScope: this,
          callback: this.spawnTriangle
        });
      }
    });
    
    this.rose = this.sound.add('rose') as Phaser.Sound.HTML5AudioSound;
    this.rose.play();

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
    const square = new Square(this, SPAWN_ZONE, Phaser.Math.Between(0, GAME_HEIGHT));
    this.shapes.add(square);
    square.spawn();
    // TODO figure out how to sync tweens. likely using groups wrong.
    this.tweens.add({
      targets: square,
      scaleX: .5,
      scaleY: .5,
      ease: 'Sine.easeInOut',
      duration: 100,
      // delay: i * 50,
      repeat: -1,
      yoyo: false,
      repeatDelay: 200
    });
  }

  spawnTriangle() {
    const triangle = new Triangle(this, SPAWN_ZONE, Phaser.Math.Between(GAME_HEIGHT / 4, GAME_HEIGHT*3/4 ));
    this.shapes.add(triangle);
    triangle.spawn();
    this.tweens.add({
      targets: triangle,
      x: -50,
      duration: Phaser.Math.Between(3000, 5000),
      // repeat: 4,
      ease: 'Linear',
      // completeDelay: 3000
      angle: {

        getEnd: function (target, key, value)
        {
            var a = 90;

            if (Math.random() > 0.5)
            {
                a = 180;
            }

            if (Math.random() > 0.5)
            {
                return target.angle + a;
            }
            else
            {
                return target.angle - a;
            }
        },

        getStart: function (target, key, value)
        {
            return target.angle;
        }

    }
  });
  }
}

