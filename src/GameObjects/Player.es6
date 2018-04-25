import {Physics} from '../Physics.es6';
import {GameObject} from './GameObject.es6';

class Player extends GameObject{
    constructor() {
        super();
        // console.log();
        this.x = 150;
        this.y = 150;
        this.dx = 0.1;
        this.dy = 0.1;
        this.height = 30;
        this.width = 30;
        this.radius = 20;
        this.speed = 0.4;
        this.draw = canvas => {
            let ctx = canvas.getContext();
            ctx.fillStyle = '#587bff';
            ctx.strokeStyle = '#273340';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();

        };
        this.countPhysics = () => {
            this.x += this.dx;
            this.y += this.dy;
        };

        this.detectCollisions = objects => {
            //collision border: x;y x+2;y+2 x+2;y x;y+2
            //o1.rightY == 02.leftY -> o1.rightCollision == true //if square
            objects.forEach(e => {
                if (!(e instanceof Player) && e.collisionLines) {
                    if (this.y - this.radius <= e.collisionLines.top.y0 && this.x - this.radius >= e.collisionLines.top.x0
                        && this.x + this.radius < e.collisionLines.top.x1) { //top border
                        this.y++;
                        this.dy = -this.dy;

                    }
                    if (this.x - this.radius <= e.collisionLines.left.x0 && this.y - this.radius >= e.collisionLines.left.y0
                        && this.y + this.radius < e.collisionLines.left.y1) { //left border
                        this.x++;
                        this.dx = -this.dx;
                    }
                    if (this.y + this.radius >= e.collisionLines.bottom.y0 && this.x - this.radius >= e.collisionLines.bottom.x0
                        && this.x + this.radius < e.collisionLines.bottom.x1) { //bottom border
                        this.dy = -this.dy;
                        this.y--;
                    }
                    if (this.x + this.radius >= e.collisionLines.right.x0 && this.y + this.radius >= e.collisionLines.right.y0
                        && this.y + this.radius < e.collisionLines.right.y1) { //right border
                        this.dx = -this.dx;
                        this.x--;
                    }
                }
            })
        };


        //controls:

        //keyPress map
        // let keyMap = {
        //     115: false,
        //     100: false,
        //     97: false,
        //     119: false
        // };

        //keyDown map:
        let keyMap = {
            83: false, //down
            68: false, //right
            65: false, //left
            87: false  //up
        };

        this.applyMovement = e => {
            // console.log(e.keyCode);
            //create interval for apply, clear interval in keyup
            clearInterval(breakIntervalID);
            if (e.keyCode === 32) { //space
                this.decreaseSpeed('x');
                this.decreaseSpeed('y');
            }
            if (e.keyCode in keyMap) {
                keyMap[e.keyCode] = true;
                // if (keyMap[83] && keyMap[68]) { //down & right
                //     this.dy = this.speed * 3 / Math.sqrt(2);
                //     this.dx = this.speed * 3 / Math.sqrt(2);
                //     return;
                // }
                // if (keyMap[83] && keyMap[65]) { //down & left
                //     this.dy = this.speed * 3 / Math.sqrt(2);
                //     this.dx = this.speed * -3 / Math.sqrt(2);
                //     return;
                // }
                // if (keyMap[87] && keyMap[68]) { //up & right
                //     this.dy = this.speed * -3 / Math.sqrt(2);
                //     this.dx = this.speed * 3 / Math.sqrt(2);
                //     return;
                // }
                // if (keyMap[87] && keyMap[65]) { //up & left
                //     this.dy = this.speed * -3 / Math.sqrt(2);
                //     this.dx = this.speed * -3 / Math.sqrt(2);
                //     return;
                // }
                if (keyMap[83]) { //down
                    this.dy = this.speed * 3;
                    this.decreaseSpeed('x');
                    return;
                }
                if (keyMap[68]) { //right
                    this.dx = this.speed * 3;
                    this.decreaseSpeed('y');
                    return;
                }
                if (keyMap[65]) { //left
                    this.dx = this.speed * -3;
                    this.decreaseSpeed('y');
                    return;
                }
                if (keyMap[87]) { //up
                    this.dy = this.speed * -3;
                    this.decreaseSpeed('x');
                }

            }
        };

        let breakIntervalID;

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
            // console.log('stopping triggered');
            clearInterval(breakIntervalID);
            for (let key in keyMap) {
                if (keyMap.hasOwnProperty(key)) {
                    keyMap[key] = false;
                }
            }
            // smooth stopping:
            breakIntervalID = setInterval(() => {
                let breaksMultiplier = 0.9;
                let minimalSpeed = 0.2;
                this.dy *= breaksMultiplier;
                this.dx *= breaksMultiplier;
                if (Math.abs(this.dy) < minimalSpeed && Math.abs(this.dx) < minimalSpeed) {
                    this.dy = 0;
                    this.dx = 0;
                    clearInterval(breakIntervalID);
                    // console.log("CLEARED");
                }
            }, Physics.GAME_SPEED()*4);
        };

        // e => {console.log(e.keyCode)}
        this.initController = () => {
            // document.addEventListener('keypress', this.applyMovement);
            document.addEventListener('keydown', this.applyMovement);
            document.addEventListener('keyup', this.stopMovement);
        };

        this.initController();

    }
}


export {Player}