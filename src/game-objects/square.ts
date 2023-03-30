import { GAME_WIDTH, GAME_HEIGHT } from "../utils/constants";

export class Square extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'square');
        this.scene = scene;
    }

    spawn() {
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
        this.setScale(.4);
        this.setAngle(Phaser.Math.Between(-30, 30)); // Angle in degrees
        this.setVelocity(Phaser.Math.Between(-400, -200), 0); // Setup dynamic velocity
    }
}