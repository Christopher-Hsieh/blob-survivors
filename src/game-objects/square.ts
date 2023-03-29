import { GAME_WIDTH, GAME_HEIGHT } from "../utils/constants";

export class Square extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'square');
        this.scene = scene;
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
    }

    spawn() {
        this.setScale(.2);
        this.setAngle(Phaser.Math.Between(0, 360)); // Angle in degrees
        this.setVelocity(Phaser.Math.Between(-250, -120), 0); // Setup dynamic velocity
    }
    
}