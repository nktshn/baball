import {GameObject} from "./GameObject.es6";
import {Player} from "./Player.es6";
import {Border} from "./Border.es6";
import {AudioBase} from "../Core/AudioBase.es6";

class Ball extends GameObject {
    constructor() {
        super();
        this.x = 350;
        this.y = 350;
        this.dx = 0.0001;
        this.dy = 0.0001;
        this.radius = 15;
        this.isAttached = false;
        this.draw = canvas => {
            let ctx = canvas.getContext();
            ctx.fillStyle = '#d6d5d4';
            ctx.strokeStyle = '#343131';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        };
        this.countPhysics = () => {
            this.x += this.dx;
            this.y += this.dy;
            this.dx /= 1.0015;
            this.dy /= 1.0015;
        };
        this.detectCollisions = objects => {

            objects.forEach(e => {
                //with player:
                if (e instanceof Player) {
                    if (Math.abs(this.x - e.x) < e.radius/2 && Math.abs(this.y - e.y) < e.radius/2) {
                        this.x = e.x;
                        this.y = e.y;
                        if (!this.isAttached) {
                            AudioBase.playCatching();
                        }
                        this.isAttached = true;
                        e.hasBall = true;
                    }
                }
                // with border:
                if ((e instanceof Border) && e.collisionLines) {
                    let borderTouchMultiplier = 0.85;
                    if (this.y - this.radius <= e.collisionLines.top.y0 && this.x - this.radius >= e.collisionLines.top.x0
                        && this.x + this.radius < e.collisionLines.top.x1) { //top border
                        this.y++;
                        this.dy = -this.dy;
                        this.dx *= borderTouchMultiplier;
                        this.dy *= borderTouchMultiplier;
                        AudioBase.playBorderTouch();
                    }
                    if (this.x - this.radius <= e.collisionLines.left.x0 && this.y - this.radius >= e.collisionLines.left.y0
                        && this.y + this.radius < e.collisionLines.left.y1) { //left border
                        this.x++;
                        this.dx = -this.dx;
                        this.dx *= borderTouchMultiplier;
                        this.dy *= borderTouchMultiplier;
                        AudioBase.playBorderTouch();
                    }
                    if (this.y + this.radius >= e.collisionLines.bottom.y0 && this.x - this.radius >= e.collisionLines.bottom.x0
                        && this.x + this.radius < e.collisionLines.bottom.x1) { //bottom border
                        this.dy = -this.dy;
                        this.y--;
                        this.dx *= borderTouchMultiplier;
                        this.dy *= borderTouchMultiplier;
                        AudioBase.playBorderTouch();
                    }
                    if (this.x + this.radius >= e.collisionLines.right.x0 && this.y + this.radius >= e.collisionLines.right.y0
                        && this.y + this.radius < e.collisionLines.right.y1) { //right border
                        this.dx = -this.dx;
                        this.x--;
                        this.dx *= borderTouchMultiplier;
                        this.dy *= borderTouchMultiplier;
                        AudioBase.playBorderTouch();
                    }

                }
            })
        };
    }
}

export {Ball}