import Phaser from "phaser";
import particle from '../assets/particle.png';
import old_man from '../assets/old_man/48x48.png';

export class MyScene extends Phaser.Scene {
  keys: any;
  text: Phaser.GameObjects.Text;
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  constructor() {
    super("MyScene");
  }

  preload() {
    this.load.spritesheet('player', old_man, { frameWidth: 48, frameHeight: 48 });
  }

  create() {
    this.keys = this.input.keyboard.addKeys("W,A,S,D");
    // Same:
    // this.keys = this.input.keyboard.addKeys({ W: 'W', A: 'A', S: 'S', D: 'D' });

    // Named keys:
    // this.keys = this.input.keyboard.addKeys({ up: 'W', left: 'A', down: 'S', right: 'D' });

    console.log("keys", this.keys);

    this.player = this.physics.add.sprite(400, 300, 'player');

    this.player.setCollideWorldBounds(true);

    this.text = this.add.text(20, 40, "", { color: '#F2DC23' });

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
