// import 'phaser';
// import particleUrl from '../assets/particle.png';
// import gaspUrl from '../assets/gasp.mp3';

// export const menuSceneKey = 'MenuScene';

// export function menu(): Phaser.Types.Scenes.SettingsConfig | Phaser.Types.Scenes.CreateSceneFromObjectConfig {
//   // let startKey: Phaser.Input.Keyboard.Key;
//   // let sprites: {s: Phaser.GameObjects.Image, r: number }[];
//   player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

//   return {
//     // key: menuSceneKey,
//     preload() {
//       this.load.spritesheet('player', old_man, { frameWidth: 48, frameHeight: 48 });

//       // sprites = [];
//       // startKey = this.input.keyboard.addKey(
//       //   Phaser.Input.Keyboard.KeyCodes.S,
//       // );
//       // startKey.isDown = false;
//       // this.load.image('particle', particleUrl);
//       // this.load.audio('gasp', gaspUrl);
//     },
//     create() {
//       // The player and its settings
//       this.player = this.physics.add.sprite(400, 300, 'player');
//       player.setCollideWorldBounds(true).setScale(1);
//       player.update()
//       this.anims.create({
//           key: 'left',
//           frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
//           frameRate: 10,
//           repeat: -1
//       });

//       this.anims.create({
//           key: 'turn',
//           frames: [ { key: 'player', frame: 4 } ],
//           frameRate: 20
//       });

//       this.anims.create({
//           key: 'right',
//           frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
//           frameRate: 10,
//           repeat: -1
//       });

//       // this.add.text(0, 0, 'Press S to restart scene', {
//       //   fontSize: '60px',
//       //   fontFamily: "Helvetica",
//       // });
  
//       // this.add.image(100, 100, 'particle');
  
//       // for (let i = 0; i < 300; i++) {
//       //     const x = Phaser.Math.Between(-64, 800);
//       //     const y = Phaser.Math.Between(-64, 600);
  
//       //     const image = this.add.image(x, y, 'particle');
//       //     image.setBlendMode(Phaser.BlendModes.ADD);
//       //     sprites.push({ s: image, r: 2 + Math.random() * 6 });
//       // }
//     },
//     update() {
//       // if (startKey.isDown) {
//       //   this.sound.play('gasp');
//       //   this.scene.start(menuSceneKey);
//       // }
  
//       // for (let i = 0; i < sprites.length; i++) {
//       //     const sprite = sprites[i].s;
  
//       //     sprite.y -= sprites[i].r;
  
//       //     if (sprite.y < -256)
//       //     {
//       //         sprite.y = 700;
//       //     }
//       // }
//     },
//   }
// }