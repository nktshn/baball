import {Physics} from '../Physics.es6';
import {GameObject} from './GameObject.es6';
import {FieldMarking} from "./FieldMarking.es6";
import {Border} from './Border.es6';

class Player extends GameObject {
    constructor(canvas) {
        super();
        this.x = canvas.width / 2 - FieldMarking.centerCircleRadius;
        this.y = canvas.height / 2;
        this.dx = 0.00001;
        this.dy = 0.00001;
        this.height = 30;
        this.width = 30;
        this.radius = 12;
        this.speed = 0.3;
        this.hasBall = false;
        this.isStopping = true;
        this.nickname = 'Player 1';

        let breaksMultiplier = 0.99;

        this.draw = canvas => {
            //player:
            let ctx = canvas.getContext();
            ctx.fillStyle = '#587bff';
            ctx.strokeStyle = '#273340';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            //nickname:
            ctx.font = '16px Calibri';
            ctx.fillStyle = `rgba(255, 255, 255, 0.7)`;
            ctx.textAlign = 'center';
            ctx.fillText(this.nickname, this.x, this.y - 30);
            // ctx.strokeStyle = `rgba(11, 11, 11, 0.7)`;
            // ctx.lineWidth = 2;
            // ctx.strokeText(this.nickname, this.x, this.y - 30);
        };
        this.countPhysics = () => {
            this.x += this.dx;
            this.y += this.dy;
            if (this.isStopping) {
                this.dy *= breaksMultiplier;
                this.dx *= breaksMultiplier;
            }
        };

        this.detectCollisions = objects => {
            objects.forEach(e => {
                if ((e instanceof Border)) {
                    if (this.y - this.radius <= e.collisionLines.top.y0 && this.x - this.radius >= e.collisionLines.top.x0
                        && this.x + this.radius < e.collisionLines.top.x1) { //top border
                        this.y++;
                        this.dy = 0;
                    }
                    if (this.x - this.radius <= e.collisionLines.left.x0 && this.y - this.radius >= e.collisionLines.left.y0
                        && this.y + this.radius < e.collisionLines.left.y1) { //left border
                        this.x++;
                        this.dx = 0;
                    }
                    if (this.y + this.radius >= e.collisionLines.bottom.y0 && this.x - this.radius >= e.collisionLines.bottom.x0
                        && this.x + this.radius < e.collisionLines.bottom.x1) { //bottom border
                        this.dy = 0;
                        this.y--;
                    }
                    if (this.x + this.radius >= e.collisionLines.right.x0 && this.y + this.radius >= e.collisionLines.right.y0
                        && this.y + this.radius < e.collisionLines.right.y1) { //right border
                        this.dx = 0;
                        this.x--;
                    }
                }
            })
        };

        //controls:

        //keyDown map:
        let keyMap = {
            83: false, //down
            68: false, //right
            65: false, //left
            87: false  //up
        };

        this.applyMovement = e => {
            this.isStopping = false;
            if (e.keyCode === 32) { //space
                this.decreaseSpeed('x');
                this.decreaseSpeed('y');
            }
            if (e.keyCode in keyMap) {
                keyMap[e.keyCode] = true;
                if (keyMap[83]) { //down
                    this.dy = this.speed * 2;
                    this.decreaseSpeed('x');
                    return;
                }
                if (keyMap[68]) { //right
                    this.dx = this.speed * 2;
                    this.decreaseSpeed('y');
                    return;
                }
                if (keyMap[65]) { //left
                    this.dx = this.speed * -2;
                    this.decreaseSpeed('y');
                    return;
                }
                if (keyMap[87]) { //up
                    this.dy = this.speed * -2;
                    this.decreaseSpeed('x');
                }

            }
        };


        this.decreaseSpeed = mark => {
            let breaksMultiplier = 0.7;
            if (mark === 'x') {
                let intervalID = setInterval(() => {
                    this.dx *= breaksMultiplier;
                    if (Math.abs(this.dx) < 0.1) {
                        this.dx = 0;
                        clearInterval(intervalID);
                    }
                }, Physics.GAME_SPEED());
            }
            if (mark === 'y') {
                let intervalID = setInterval(() => {
                    this.dy *= breaksMultiplier;
                    if (Math.abs(this.dy) < 0.1) {
                        this.dy = 0;
                        clearInterval(intervalID);
                    }
                }, Physics.GAME_SPEED());
            }
        };

        this.stopMovement = (e) => {
            for (let key in keyMap) {
                if (keyMap.hasOwnProperty(key)) {
                    keyMap[key] = false;
                }
            }
            this.isStopping = true;
        };

        this.initController = () => {
            document.addEventListener('keydown', this.applyMovement);
            document.addEventListener('keyup', this.stopMovement);
        };

        this.initController();

    }
}


export {Player}