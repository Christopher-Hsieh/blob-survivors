import { SCENES } from "../utils/constants";

export class GameOver extends Phaser.Scene {
    keys: any;
    constructor() {
        super(SCENES.GAME_OVER);
      }
    create() {
        this.keys = this.input.keyboard.addKeys("R");
        this.scene.setVisible(false, SCENES.GAME_OVER);
        this.input.once('pointerdown', function () {
            this.scene.start(SCENES.MAIN_SCENE);
        }, this);
    }
    update(time: number, delta: number): void {
        if (this.keys.R.isDown) {
            this.scene.start(SCENES.MAIN_SCENE);
        }
    }

}