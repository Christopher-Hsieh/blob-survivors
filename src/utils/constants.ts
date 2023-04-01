export const BPM = 181;
export const BPS = BPM / 60;
export const BPMS = 1000 / BPS; 
export const GAME_WIDTH = 1200;
export const GAME_HEIGHT = 360;
export const SPAWN_ZONE = GAME_WIDTH + 100;
export const SCENES = {
    MAIN_SCENE: 'MainScene',
    GAME_OVER: 'GameOver',
    START: 'Start'
  } as const;

export const SHAPES = {
    TRIANGLE: 'triangle',
    SQUARE: 'square',
    BLUE: 'blue',
    YELLOW: 'yellow',
    ORANGE: 'orange'
  } as const;