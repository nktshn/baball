import {Physics} from './Physics.es6'
import {Drawer} from './Drawer.es6'
import {Canvas} from './Canvas.es6'
import {Player} from "./GameObjects/Player.es6";
import {MouseHelper} from "./Core/MouseHelper.es6";
import {Border} from "./GameObjects/Border.es6";
import {AimSprite} from "./GameObjects/Aim.es6";
import {Ball} from "./GameObjects/Ball.es6";
import {Field} from "./GameObjects/Field.es6";
import {FieldMarking} from "./GameObjects/FieldMarking.es6";
import {Target} from "./GameObjects/Target.es6";
import {Background} from "./GameObjects/Background.es6";
import {Match} from './Core/Match.es6';

const canvas = new Canvas('canvas');
const backgroundCanvas = new Canvas('backgroundCanvas');
const player = new Player(canvas);
const ball = new Ball(canvas);
const topBorder = new Border(canvas, 'top');
const leftTarget = new Target(topBorder, 'left');
const rightTarget = new Target(topBorder, 'right');

const staticGameObjects = [
    new Background(),
    new Field(topBorder),
    new FieldMarking(topBorder),
    new Border(canvas, 'bot'),
    topBorder,
    leftTarget,
    rightTarget
];

const dynamicGameObjects = [
    new Match([player], ball, [leftTarget, rightTarget], canvas),
    player,
    ball,
    new AimSprite(player, ball)
];

const gameObjects = staticGameObjects.concat(dynamicGameObjects);

const physics = new Physics(Physics.GAME_SPEED, gameObjects); //8.3 is time for 120 fps
const drawer = new Drawer(canvas, dynamicGameObjects); //fps

physics.run();
drawer.run();
drawer.drawStaticBackground(backgroundCanvas, staticGameObjects);



// new MouseHelper(canvas.getCanvasObject()); //displays coordinates of mouse