import {Physics} from './Physics.es6'
import {Drawer} from './Drawer.es6'
import {Canvas} from './Canvas.es6'
import {Player} from "./GameObjects/Player.es6";
import {MouseHelper} from "./Core/MouseHelper.es6";
import {Border} from "./GameObjects/Border.es6";
import {AimSprite} from "./GameObjects/Aim.es6";
import {Ball} from "./GameObjects/Ball.es6";


const canvas = new Canvas('canvas');
const player = new Player();
const ball = new Ball();

const gameObjects = [
    new Border(canvas),
    player,
    ball,
    new AimSprite(player, ball)
];

const physics = new Physics(Physics.GAME_SPEED, gameObjects); //8.3 is time for 120 fps
const drawer = new Drawer(60, canvas, gameObjects); //fps
// new MouseHelper(canvas.getCanvasObject()); //displays coordinates of mouse

physics.run();
drawer.run();


