import {Physics} from '../Physics.es6';
import {GameObject} from './GameObject.es6';
import {FieldMarking} from "./FieldMarking.es6";
import {Border} from './Border.es6';
import {Target} from './Target.es6';

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
        this.speed = 0.4;
        this.hasBall = false;
        this.isStopping = true;
        this.nickname = 'Player 1';

        let breaksMultiplier = 0.9;

        this.isAnyPressed = () => {
            for (let i in keyMap) {
                if (keyMap[i] === true) return true
            }
            return false;
        };

        this.draw = canvas => {
            //player:
            let ctx = canvas.getContext();
            ctx.fillStyle = '#587bff';
            ctx.strokeStyle = '#273340';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc((this.x), (this.y), this.radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            //nickname:
            ctx.font = '16px Calibri';
            ctx.fillStyle = `rgba(40, 40, 40, 0.9)`;
            ctx.textAlign = 'center';
            ctx.fillText(this.nickname, (this.x), (this.y) - 30);
            ctx.strokeStyle = `rgba(40, 40, 40, 0.7)`;
            ctx.lineWidth = 0.5;
            ctx.strokeText(this.nickname, this.x, this.y - 30);
        };
        this.countPhysics = () => {
            if (!this.isAnyPressed()) {
                this.dy *= breaksMultiplier;
                this.dx *= breaksMultiplier;
            }

            if (keyMap[83]) { //down
                this.dy = this.speed;
                this.dx *= breaksMultiplier;
            }
            if (keyMap[87]) { //up
                this.dy = -this.speed;
                this.dx *= breaksMultiplier;
            }

            if (keyMap[68]) { //right
                this.dx = this.speed;
                this.dy *= breaksMultiplier;
            }

            if (keyMap[65]) { //left
                this.dx = -this.speed;
                this.dy *= breaksMultiplier;
            }

            if (keyMap[65] && keyMap[87]) { //left & up
                this.dx = -this.speed / Math.sqrt(2);
                this.dy = -this.speed / Math.sqrt(2);
            }

            if (keyMap[65] && keyMap[83]) { //left & down
                this.dx = -this.speed / Math.sqrt(2);
                this.dy = this.speed / Math.sqrt(2);
            }

            if (keyMap[68] && keyMap[87]) { //right & up
                this.dx = this.speed / Math.sqrt(2);
                this.dy = -this.speed / Math.sqrt(2);
            }

            if (keyMap[68] && keyMap[83]) { //right & down
                this.dx = this.speed / Math.sqrt(2);
                this.dy = this.speed / Math.sqrt(2);
            }


            this.x += (this.dx);
            this.y += (this.dy);
            // if (this.isStopping) {
            //     this.dy *= breaksMultiplier;
            //     this.dx *= breaksMultiplier;
            // }
        };

        this.detectCollisions = objects => {
            objects.forEach(e => {
                if ((e instanceof Border || e instanceof Target)) {
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
            87: false,  //up
        };


        this.applyMovement = e => {
            // this.isStopping = false;
            if (e.keyCode === 32) { //space
                for (let i of keyMap) {
                    keyMap[i] = false;
                }
            }
            if (e.keyCode in keyMap) {
                if (e.keyCode === 83) { //down
                    keyMap[e.keyCode] = true;
                }
                if (e.keyCode === 68) { //right
                    keyMap[e.keyCode] = true;
                }
                if (e.keyCode === 65) { //left
                    keyMap[e.keyCode] = true;
                }
                if (e.keyCode === 87) { //up
                    keyMap[e.keyCode] = true;
                }

            }
        };


        // this.decreaseSpeed = mark => {
        //     let breaksMultiplier = 0.7;
        //     if (mark === 'x') {
        //         let intervalID = setInterval(() => {
        //             this.dx *= breaksMultiplier;
        //             if (Math.abs(this.dx) < 0.1) {
        //                 this.dx = 0;
        //                 clearInterval(intervalID);
        //             }
        //         }, Physics.GAME_SPEED());
        //     }
        //     if (mark === 'y') {
        //         let intervalID = setInterval(() => {
        //             this.dy *= breaksMultiplier;
        //             if (Math.abs(this.dy) < 0.1) {
        //                 this.dy = 0;
        //                 clearInterval(intervalID);
        //             }
        //         }, Physics.GAME_SPEED());
        //     }
        // };

        this.stopMovement = (e) => {
            if (e.keyCode in keyMap) {
                if (e.keyCode === 83) { //down
                    keyMap[e.keyCode] = false;
                }
                if (e.keyCode === 68) { //right
                    keyMap[e.keyCode] = false;
                }
                if (e.keyCode === 65) { //left
                    keyMap[e.keyCode] = false;
                }
                if (e.keyCode === 87) { //up
                    keyMap[e.keyCode] = false;
                }

            }
            // this.isStopping = true;
        };

        this.initController = () => {
            document.addEventListener('keydown', this.applyMovement);
            document.addEventListener('keyup', this.stopMovement);
        };

        this.initController();

    }
}


export {Player}