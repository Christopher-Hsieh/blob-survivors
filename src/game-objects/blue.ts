export class Blue extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'blue');
        this.scene = scene;
    }

    spawn() {
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
        this.setScale(.4);
        this.setVelocity(Phaser.Math.Between(-900, -500), 0); // Setup dynamic velocity
    }
    
}