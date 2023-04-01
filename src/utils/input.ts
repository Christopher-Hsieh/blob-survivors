import Phaser from "phaser";
import { GAME_WIDTH, GAME_HEIGHT, SCENES } from "./constants";

export function setupMouseControl(input: Phaser.Input.InputPlugin, player:  Phaser.Types.Physics.Arcade.ImageWithDynamicBody): void {
     input.mouse.requestPointerLock();
     // When locked, you will have to use the movementX and movementY properties of the pointer
     // (since a locked cursor's xy position does not update)
     input.on('pointermove', function (pointer: { movementX: any; movementY: any; })
     {
       if (input.mouse.locked)
             {
                 player.x += pointer.movementX;
                 player.y += pointer.movementY;
 
                 // Force the player to stay on screen
                 if (player.x < 0) {
                   player.x = 0;
                 }
                 if (player.x > GAME_WIDTH) {
                   player.x = GAME_WIDTH;
                 }
                 if (player.y < 0) {
                   player.y = 0;
                 }
                 if (player.y > GAME_HEIGHT) {
                   player.y = GAME_HEIGHT;
                 }
             }
         }, this);
}