import Phaser from "phaser";

import {
  BPMS,
  GAME_HEIGHT,
  GAME_WIDTH,
  SCENES,
  SHAPES,
  SPAWN_ZONE,
} from "../utils/constants";
import { Blue } from "../game-objects/blue";
import { setupMouseControl } from "../utils/input";

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
  x: number;
  tri_one_group: Phaser.GameObjects.Group;
  tri_two_group: Phaser.GameObjects.Group;
  tri_three_group: Phaser.GameObjects.Group;
  squares_group: Phaser.GameObjects.Group;
  squares_group_two: Phaser.GameObjects.Group;
  blue_group: Phaser.GameObjects.Group;
  yel_group: Phaser.GameObjects.Group;
  oj_group: Phaser.GameObjects.Group;
  square_timer: Phaser.Time.TimerEvent;
  time_text: Phaser.GameObjects.Text;

  constructor() {
    super(SCENES.MAIN_SCENE);
  }

  create() {
    // Setup scoreboard
    this.score_text = this.add.text(20, 80, "Score: 0", { color: "#F2DC23" });
    this.hit_debug_text = this.add.text(10, 10, "", { color: "#F2DC23" });
    this.score = 0;

    // Setup Player
    this.player = this.physics.add
      .image(400, 300, "player")
      .setScale(0.4)
      .setCircle(38);
    this.player.setCollideWorldBounds(true);

    // Setup Input
    this.keys = this.input.keyboard.addKeys("W,A,S,D");
    setupMouseControl(this.input, this.player);

    // Setup triangles
    this.tri_one_group = this.physics.add.group({
      defaultKey: SHAPES.TRIANGLE,
      createCallback: function (triangle: Phaser.Physics.Arcade.Sprite) {
        triangle.setScale(0.4).setSize(50, 50);
      },
    });

    this.tri_two_group = this.physics.add.group({
      defaultKey: SHAPES.TRIANGLE,
      createCallback: function (triangle: Phaser.Physics.Arcade.Sprite) {
        triangle.setScale(0.4).setSize(50, 50);
      },
    });

    // Spawn first group on start
    this.time.addEvent({
      delay: 600,
      startAt: 500,
      repeat: 11,
      callbackScope: this,
      callback: this.addTriangleOne,
    });

    // Setup the Square's group
    this.squares_group = this.physics.add.group({
      defaultKey: SHAPES.SQUARE,
      createCallback: function (square: Phaser.Physics.Arcade.Sprite) {
        square.setScale(0.4).setSize(60, 60);
        square.setAngle(Phaser.Math.Between(-26, 26)); // Angle in degrees, slightly random
        square.setVelocity(Phaser.Math.Between(-400, -200), 0); // Setup dynamic velocity
      },
    });

    // Spawn Squares every beat after 6.8 seconds
    this.time.addEvent({
      delay: 6800,
      callbackScope: this,
      callback: function () {
        this.time.addEvent({
          delay: BPMS,
          repeat: 96,
          callbackScope: this,
          callback: this.addSquare,
        });
      },
    });

    // Spawn Triangles at 18.4 seconds
    this.time.addEvent({
      delay: 18400,
      callbackScope: this,
      callback: function () {
        this.time.addEvent({
          delay: BPMS,
          repeat: 75,
          callbackScope: this,
          callback: this.addTriangleTwo,
        });
      },
    });

    // Setup Blue's group
    this.blue_group = this.physics.add.group({
      defaultKey: SHAPES.BLUE,
      createCallback: function (square: Phaser.Physics.Arcade.Sprite) {
        square.setScale(0.4).setSize(60, 60);
        square.setAngle(Phaser.Math.Between(-26, 26)); // Angle in degrees, slightly random
        square.setVelocity(Phaser.Math.Between(-400, -200), 0); // Setup dynamic velocity
      },
    });
    // Spawn Blue at 30 second claps
    this.time.addEvent({
      delay: 28000,
      callbackScope: this,
      callback: function () {
        this.time.addEvent({
          delay: 700,
          startAt: 600,
          repeat: 14,
          callbackScope: this,
          callback: this.addBlue,
        });
      },
    });
    // Second round of squares
    this.squares_group_two = this.physics.add.group({
      defaultKey: SHAPES.SQUARE,
      createCallback: function (square: Phaser.Physics.Arcade.Sprite) {
        square.setScale(0.4).setSize(60, 60);
        square.setAngle(Phaser.Math.Between(-26, 26)); // Angle in degrees, slightly random
        square.setVelocity(Phaser.Math.Between(-450, -250), 0); // Setup dynamic velocity
      },
    });
    this.time.addEvent({
      delay: 48000,
      callbackScope: this,
      callback: function () {
        this.time.addEvent({
          delay: BPMS,
          repeat: -1,
          callbackScope: this,
          callback: this.addSquare_two,
        });
      },
    });
    // Second round triangles
    this.time.addEvent({
      delay: 46500,
      callbackScope: this,
      callback: function () {
        this.time.addEvent({
          delay: 1800,
          callbackScope: this,
          repeat: -1,
          callback: function () {
            this.time.addEvent({
              delay: 500,
              // startAt: 500,
              repeat: 3,
              callbackScope: this,
              callback: this.addTriangleOne,
            });
          },
        });
      },
    });

    // Go nuts w/ yellow at 46 sec drop
    this.time.addEvent({
      delay: 45800,
      callbackScope: this,
      callback: function () {
        this.time.addEvent({
          delay: 275,
          loop: true,
          callbackScope: this,
          callback: this.addYellow,
        });
      },
    });
    this.yel_group = this.physics.add.group({
      defaultKey: SHAPES.YELLOW,
      createCallback: function (square: Phaser.Physics.Arcade.Sprite) {
        square.setScale(0.4).setSize(60, 60);
        square.setAngle(Phaser.Math.Between(-10, 10)); // Angle in degrees, slightly random
        square.setVelocity(Phaser.Math.Between(-800, -450), 0); // Setup dynamic velocity
      },
    });

    // Still Alive. Kill them.
    this.time.addEvent({
      delay: 51000,
      callbackScope: this,
      callback: function () {
        this.time.addEvent({
          delay: 400,
          loop: true,
          callbackScope: this,
          callback: this.addOJ,
        });
      },
    });
    this.oj_group = this.physics.add.group({
      defaultKey: SHAPES.ORANGE,
      createCallback: function (circle: Phaser.Physics.Arcade.Sprite) {
        circle.setScale(0.4).setCircle(38);
      },
    });

    // Setup Colliders
    this.physics.add.collider(
      this.player,
      this.tri_one_group,
      this.hitShape,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      this.tri_two_group,
      this.hitShape,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      this.squares_group,
      this.hitShape,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      this.squares_group_two,
      this.hitShape,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      this.blue_group,
      this.hitShape,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      this.yel_group,
      this.hitShape,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      this.oj_group,
      this.hitShape,
      null,
      this
    );
    // Setup and Play song
    this.rose = this.sound.add("rose", {
      volume: 0.75,
    }) as Phaser.Sound.HTML5AudioSound;
    this.rose.play();
  }

  update(time: number, delta: number): void {
    Phaser.Actions.Angle(this.tri_one_group.getChildren(), -0.25);
    Phaser.Actions.Angle(this.tri_two_group.getChildren(), -0.25);
    Phaser.Actions.IncX(this.tri_one_group.getChildren(), -4);
    Phaser.Actions.IncX(this.tri_two_group.getChildren(), -4);

    for (const child of this.tri_one_group.getChildren()) {
      //@ts-ignore
      if (child.x < -50 && child.active) {
        this.tri_one_group.kill(child);
        this.incrementScore(50);
      }
    }

    for (const child of this.tri_two_group.getChildren()) {
      //@ts-ignore
      if (child.x < -50 && child.active) {
        this.tri_two_group.kill(child);
        this.incrementScore(200);
      }
    }

    for (const child of this.squares_group.getChildren()) {
      //@ts-ignore
      if (child.x < -50 && child.active) {
        child.destroy();
        this.incrementScore(100);
      }
    }
    for (const child of this.squares_group_two.getChildren()) {
      //@ts-ignore
      if (child.x < -50 && child.active) {
        child.destroy();
        this.incrementScore(100);
      }
    }

    for (const child of this.blue_group.getChildren()) {
      //@ts-ignore
      if (child.x < -50 && child.active) {
        child.destroy();
        this.incrementScore(250);
      }
    }

    this.player.setVelocity(0);
    if (this.keys.A.isDown) {
      this.player.setVelocityX(-260);
    } else if (this.keys.D.isDown) {
      this.player.setVelocityX(260);
    }

    if (this.keys.W.isDown) {
      this.player.setVelocityY(-260);
    } else if (this.keys.S.isDown) {
      this.player.setVelocityY(260);
    }
  }

  incrementScore(num: number) {
    this.score = this.score + num;
    this.score_text.setText("Score: " + this.score.toString());
  }
  activateObj(obj: any) {
    obj.setActive(true).setVisible(true);
  }

  addTriangleOne() {
    // Find first inactive sprite in group or add new sprite, and set position
    const triangle = this.tri_one_group.get(
      SPAWN_ZONE,
      Phaser.Math.Between(GAME_HEIGHT / 7, (GAME_HEIGHT * 6) / 7)
    );

    // None free or already at maximum amount of sprites in group
    if (!triangle) return;

    this.activateObj(triangle);

    const children = this.tri_one_group.getChildren();
    this.tweens.add({
      targets: children,
      props: {
        x: {
          getEnd: function (target, key, value) {
            return target.x - 120;
          },

          getStart: function (target, key, value) {
            return target.x;
          },
          ease: "Sine.easeInOut",
        },
        angle: {
          getEnd: function (target, key, value) {
            return target.angle - 100;
          },

          getStart: function (target, key, value) {
            return target.angle;
          },
        },
      },
      duration: 250,
    });
  }

  addTriangleTwo() {
    // Find first inactive sprite in group or add new sprite, and set position
    const triangle = this.tri_two_group.get(
      SPAWN_ZONE,
      Phaser.Math.Between(GAME_HEIGHT / 8, (GAME_HEIGHT * 7) / 8)
    );

    // None free or already at maximum amount of sprites in group
    if (!triangle) return;
    this.activateObj(triangle);
    const children = this.tri_two_group.getChildren();
    this.tweens.add({
      targets: children,
      props: {
        x: {
          getEnd: function (target, key, value) {
            return target.x - 160;
          },

          getStart: function (target, key, value) {
            return target.x;
          },
          ease: "Sine.easeInOut",
        },
        angle: {
          getEnd: function (target, key, value) {
            return target.angle - 140;
          },

          getStart: function (target, key, value) {
            return target.angle;
          },
        },
      },
      duration: 300,
    });
  }

  addSquare() {
    // Find first inactive sprite in group or add new sprite, and set position
    const square = this.squares_group.get(
      SPAWN_ZONE,
      Phaser.Math.Between(0, GAME_HEIGHT)
    );

    // None free or already at maximum amount of sprites in group
    if (!square) return;

    this.activateObj(square);
    this.tweens.add({
      targets: square,
      props: {
        scaleX: 0.5,
        scaleY: 0.5,
      },
      ease: "Linear",
      duration: BPMS / 3,
      repeat: -1,
      repeatDelay: (BPMS * 2) / 3,
    });
  }
  addSquare_two() {
    if (Math.random() < 0.3) return;
    // Find first inactive sprite in group or add new sprite, and set position
    const square = this.squares_group_two.get(
      SPAWN_ZONE,
      Phaser.Math.Between(0, GAME_HEIGHT)
    );

    // None free or already at maximum amount of sprites in group
    if (!square) return;

    this.activateObj(square);
    this.tweens.add({
      targets: square,
      props: {
        scaleX: 0.52,
        scaleY: 0.52,
      },
      ease: "Linear",
      duration: BPMS / 3,
      repeat: -1,
      repeatDelay: (BPMS * 2) / 3,
    });
  }
  addYellow() {
    // Find first inactive sprite in group or add new sprite, and set position
    const square = this.yel_group.get(
      SPAWN_ZONE,
      Phaser.Math.Between(0, GAME_HEIGHT)
    );

    // None free or already at maximum amount of sprites in group
    if (!square) return;

    this.activateObj(square);
    this.tweens.add({
      targets: square,
      ease: "Power1.easeIn",
      props: {
        y: Phaser.Math.Between(-50, GAME_HEIGHT + 50),
        x: -200,
      },
      duration: Phaser.Math.Between(2000, 3000),
    });
  }
  addOJ() {
    // Find first inactive sprite in group or add new sprite, and set position
    const square = this.oj_group.get(
      SPAWN_ZONE,
      Phaser.Math.Between(0, GAME_HEIGHT)
    );

    // None free or already at maximum amount of sprites in group
    if (!square) return;

    this.activateObj(square);
    this.tweens.add({
      targets: square,
      ease: "Linear",
      props: {
        y: {
          getEnd: function (target, key, value) {
            return target.y + Phaser.Math.Between(-150, 150);
          },

          getStart: function (target, key, value) {
            return target.y;
          },
        },
        x: {
          getEnd: function (target, key, value) {
            return target.x - 400;
          },

          getStart: function (target, key, value) {
            return target.x;
          },
        },
      },
      repeat: -1,
    });
  }
  addBlue() {
    // Find first inactive sprite in group or add new sprite, and set position
    const height = Phaser.Math.Between(GAME_HEIGHT / 5, (GAME_HEIGHT * 4) / 5);
    const square_1 = this.blue_group.get(
      SPAWN_ZONE,
      Phaser.Math.Between(0, GAME_HEIGHT / 3)
    );
    const square_2 = this.blue_group.get(
      SPAWN_ZONE,
      Phaser.Math.Between(GAME_HEIGHT / 3, (GAME_HEIGHT * 2) / 3)
    );
    const square_3 = this.blue_group.get(
      SPAWN_ZONE,
      Phaser.Math.Between((GAME_HEIGHT * 2) / 3, GAME_HEIGHT)
    );

    // None free or already at maximum amount of sprites in group
    if (!square_1 || !square_2 || !square_3) return;

    this.activateObj(square_1);
    this.activateObj(square_2);
    this.activateObj(square_3);
    this.tweens.add({
      targets: [square_1, square_2, square_3],
      props: {
        x: { value: -100, duration: 2500, ease: "Quad.easeIn" },
        y: {
          getEnd: function (target, key, value) {
            return target.y + Phaser.Math.Between(-300, 300);
          },

          getStart: function (target, key, value) {
            return target.y;
          },
          duration: 2500,
          ease: "Quad.easeIn",
        },
      },
    });
  }
  spawnBlue() {
    const square = new Blue(
      this,
      SPAWN_ZONE,
      Phaser.Math.Between(GAME_HEIGHT / 12, (GAME_HEIGHT * 11) / 12)
    );
    this.shapes.add(square);
    square.spawn();
  }

  hitShape() {
    this.rose.stop();
    this.physics.pause();
    this.scene.pause();
    this.input.mouse.releasePointerLock();
    this.hit_debug_text.setText("- Press r to retry. -");
    this.scene.launch(SCENES.GAME_OVER);
  }
}
