import Phaser from "phaser";
import player_sprite from '../assets/old_man/16x16.png';

export class MyScene extends Phaser.Scene {
  keys: any;
  text: Phaser.GameObjects.Text;
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  constructor() {
    super("MyScene");
  }

  preload() {
    //  16x16 is the size of each frame
    //  There are 18 frames in the PNG - you can leave this value blank if the frames fill up the entire PNG, but in this case there are some
    //  blank frames at the end, so we tell the loader how many to load
    this.load.spritesheet('player', player_sprite, { frameWidth: 16, frameHeight: 16 });
  }

  create() {
    // Same:
    // this.keys = this.input.keyboard.addKeys({ W: 'W', A: 'A', S: 'S', D: 'D' });

    // Named keys:
    // this.keys = this.input.keyboard.addKeys({ up: 'W', left: 'A', down: 'S', right: 'D' });
    this.keys = this.input.keyboard.addKeys("W,A,S,D");
    this.text = this.add.text(20, 40, "", { color: '#F2DC23' });
    console.log("keys", this.keys);


    this.player = this.physics.add.sprite(400, 300, 'player');
    this.player.setCollideWorldBounds(true).setScale(5);
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('player', { start: 1, end: 4 }),
        frameRate: 5,
        repeat: -1
        // hideOnComplete: false,
      });
    this.player.anims.play('walk');


  }

  update(time: number, delta: number): void {
    this.player.setVelocity(0);
    // console.log(this.anims);
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
    
    this.text.setText(
        // @ts-ignore
      Object.entries(this.keys).map(([name, key]) => `${name}: keyCode=${key.keyCode} isDown=${key.isDown} isUp=${key.isUp} timeDown=${key.timeDown} timeUp=${key.timeUp}`)
    );
  }
}
