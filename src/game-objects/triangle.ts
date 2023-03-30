import { GAME_WIDTH, GAME_HEIGHT } from "../utils/constants";

export class Triangle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'triangle');
        this.scene = scene;
    }

    spawn() {
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
        this.setScale(.4);
        this.setAngle(Phaser.Math.Between(0, 360)); // Angle in degrees
    }
    
}