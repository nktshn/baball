import {Physics} from './Physics.es6'
import {Drawer} from './Drawer.es6'
import {Canvas} from './Canvas.es6'
import {Player} from "./GameObjects/Player.es6";
import {MouseHelper} from "./Core/MouseHelper.es6";
import {Border} from "./GameObjects/Border.es6";
import {AimSprite} from "./GameObjects/Aim.es6";
import {Ball} from "./GameObjects/Ball.es6";
import {AudioBase} from "./Core/AudioBase.es6";
import {Field} from "./GameObjects/Field.es6";
import {FieldMarking} from "./GameObjects/FieldMarking.es6";
import {Target} from "./GameObjects/Target.es6";


const canvas = new Canvas('canvas');
const player = new Player(canvas);
const ball = new Ball(canvas);
const topBorder = new Border(canvas, 'top');
const botBorder = new Border(canvas, 'bot');

const gameObjects = [
    new Field(topBorder),
    new FieldMarking(topBorder),
    topBorder,
    botBorder,
    new Target(),
    player,
    ball,
    new AimSprite(player, ball)
];

const physics = new Physics(Physics.GAME_SPEED, gameObjects); //8.3 is time for 120 fps
const drawer = new Drawer(60, canvas, gameObjects); //fps
// new MouseHelper(canvas.getCanvasObject()); //displays coordinates of mouse

physics.run();
drawer.run();
AudioBase.playCrowd();


