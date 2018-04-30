import {GameObject} from './GameObject.es6';

class AimSprite extends GameObject {
    constructor(player, ball) {
        let sprite = document.createElement('img');
        sprite.src = './build/images/aim.png';
        super();
        this.sprite = sprite;
        this.x = 110;
        this.y = 110;
        this.drawX = 110;
        this.drawY = 110;
        this.mouseX = 150;
        this.mouseY = 150;
        this.width = 50;
        this.height = 50;
        this.radius = 150; //from player

        this.draw = canvas => {
            let ctx = canvas.getContext();
            if (player.hasBall) {
                ctx.drawImage(this.sprite, this.drawX, this.drawY, this.width, this.height);
            }
        };
        this.countPhysics = () => {
            let vx = this.mouseX - player.x;
            let vy;
            vy = !(this.mouseY >= player.y) ? this.mouseY - player.y : player.y - this.mouseY;
            let ratio = vx / vy;
            let m1 = 1, m2 = Math.pow(ratio, 2); //multipliers
            let mSum = m1 + m2;
            let aSquared = Math.pow(this.radius, 2) / mSum;
            let a = Math.sqrt(aSquared);
            let b = a * ratio;
            this.x = Math.floor(player.x + b) - player.radius / 2;
            this.y = Math.floor(player.y + a) - player.radius / 2;
            this.y = !(this.mouseY >= player.y) ? Math.floor(player.y + a) : Math.floor(player.y - a);
            this.drawX = this.x - (this.width / 2);
            this.drawY = this.y - (this.height / 2);
        };
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX - this.width / 2;
            this.mouseY = e.clientY - this.height / 2;
        });
        document.addEventListener('mouseup', e => {
            this.pushBall();
        });

        this.pushBall = () => {
            if (ball.isAttached) {
                let power = 3;
                let vx = (this.x - player.x);
                let vy = (this.y - player.y);
                let ratio = vx >= vy ? vy / vx : vx / vy;
                if (vx >= 0 && vy <= 0) { //right-top direction
                    if (Math.abs(vx) >= Math.abs(vy)) { //vx longer
                        ball.dx = power;
                        ball.dy = power * ratio;
                        ball.x += ball.radius + player.radius;
                        ball.y += (ball.radius + player.radius) * ratio;
                    } else { //vx shorter
                        ball.dx = -power / ratio;
                        ball.dy = -power;
                        ball.x -= (ball.radius + player.radius) / ratio;
                        ball.y -= (ball.radius + player.radius);
                    }
                }
                if (vx < 0 && vy < 0) { //left-top direction
                    if (Math.abs(vx) >= Math.abs(vy)) { //vx longer
                        ball.dx = -power;
                        ball.dy = -power / ratio;
                        ball.x -= ball.radius + player.radius;
                        ball.y -= (ball.radius + player.radius) / ratio;
                    } else { //vx shorter
                        ball.dx = -power / ratio;
                        ball.dy = -power;
                        ball.x -= (ball.radius + player.radius) / ratio;
                        ball.y -= (ball.radius + player.radius);
                    }
                }
                if (vx > 0 && vy > 0) { //right-down direction
                    if (Math.abs(vx) >= Math.abs(vy)) { //vx longer
                        ball.dx = power;
                        ball.dy = power * ratio;
                        ball.x += ball.radius + player.radius;
                        ball.y += (ball.radius + player.radius) * ratio;
                    } else { //vx shorter
                        ball.dx = power * ratio;
                        ball.dy = power;
                        ball.x += (ball.radius + player.radius) * ratio;
                        ball.y += (ball.radius + player.radius);
                    }
                }
                if (vx < 0 && vy > 0) { //left-down direction
                    if (Math.abs(vx) >= Math.abs(vy)) { //vx longer
                        ball.dx = -power;
                        ball.dy = -power / ratio;
                        ball.x -= ball.radius + player.radius;
                        ball.y -= (ball.radius + player.radius) / ratio;
                    } else { //vx shorter
                        ball.dx = power * ratio;
                        ball.dy = power;
                        ball.x += (ball.radius + player.radius) * ratio;
                        ball.y += (ball.radius + player.radius);
                    }
                }

            }
            ball.isAttached = false;
            player.hasBall = false;
        }
    }
}

export {AimSprite}