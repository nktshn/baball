import {GameObject} from './GameObject.es6';
import {AudioBase} from '../Core/AudioBase.es6';
import {img} from './../Sprites/aim.png';

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
        this.currentPower = 0.1; //ball pushing power
        this.minPower = 0.1;
        this.maxPower = 1.5;
        this.isCountingPower = false;
        this.currentDirection = true; //direction of powerbar (true means right, false - left)
        this.isPowershot = false;
        this.powershotTreshold = 0.07;

        let alpha = 0.9; //for text

        this.draw = canvas => {
            let ctx = canvas.getContext();
            if (player.hasBall) { //aim drawing
                ctx.drawImage(this.sprite, this.drawX, this.drawY, this.width, this.height);
            }
            if (this.isCountingPower && player.hasBall) { //powerbar drawing
                ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
                ctx.fillStyle = "rgba(212, 193, 3, 0.5)";
                let widthMultiplier = 100 / this.maxPower;
                ctx.fillRect(player.x - 50, player.y + 20, this.currentPower * widthMultiplier, 10);
                ctx.strokeRect(player.x - 50, player.y + 20, 100, 10);
            }
            //powershot msg:
            if (this.isPowershot) {
                ctx.font = '24px calibri';
                ctx.textAlign = 'center';
                ctx.fillStyle = `rgba(251, 217, 80, ${alpha})`;
                ctx.fillText('POWERSHOT!', player.x, player.y + 50);
                ctx.strokeStyle = `rgba(134, 102, 8, ${alpha})`;
                ctx.lineWidth = 3;
                ctx.strokeText('POWERSHOT!', player.x, player.y + 50);
                alpha *= 0.975;
                console.log(alpha);
                if (alpha < 0.1) {
                    this.isPowershot = false;
                    alpha = 0.9;
                }
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

            if (this.isCountingPower) {
                this.countPower();
            }
        };
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX - this.width / 2;
            this.mouseY = e.clientY - this.height / 2;
        });
        document.addEventListener('mouseup', e => {
            this.pushBall();
            this.isCountingPower = false;
        });
        document.addEventListener('mousedown', e => {
            this.drawPowerBar();
        });

        this.drawPowerBar = () => {
            this.isCountingPower = true;
        };

        this.countPower = () => {
            // console.log(this.currentPower);
            let dp = 0.025 / this.maxPower;
            if (this.currentDirection) {
                this.currentPower += dp;
                if (this.currentPower >= this.maxPower) {
                    this.currentDirection = false;
                }
            } else {
                this.currentPower -= dp;
                if (this.currentPower <= this.minPower) {
                    this.currentDirection = true;
                }
            }
        };


        this.pushBall = () => {
            if (ball.isAttached) {
                AudioBase.playShoot();
                let vx = (this.x - player.x);
                let vy = (this.y - player.y);
                let ratio = vx >= vy ? vy / vx : vx / vy;
                //powershot:
                if (this.currentPower > this.maxPower - this.powershotTreshold) {
                    this.currentPower *= 2;
                    console.log('POWERSHOT!');
                    this.isPowershot = true;
                }
                if (vx >= 0 && vy <= 0) { //right-top direction
                    if (Math.abs(vx) >= Math.abs(vy)) { //vx longer
                        ball.dx = this.currentPower;
                        ball.dy = this.currentPower * ratio;
                        ball.x += ball.radius + player.radius;
                        ball.y += (ball.radius + player.radius) * ratio;
                    } else { //vx shorter
                        ball.dx = -this.currentPower / ratio;
                        ball.dy = -this.currentPower;
                        ball.x -= (ball.radius + player.radius) / ratio;
                        ball.y -= (ball.radius + player.radius);
                    }
                }
                if (vx < 0 && vy < 0) { //left-top direction
                    if (Math.abs(vx) >= Math.abs(vy)) { //vx longer
                        ball.dx = -this.currentPower;
                        ball.dy = -this.currentPower / ratio;
                        ball.x -= ball.radius + player.radius;
                        ball.y -= (ball.radius + player.radius) / ratio;
                    } else { //vx shorter
                        ball.dx = -this.currentPower / ratio;
                        ball.dy = -this.currentPower;
                        ball.x -= (ball.radius + player.radius) / ratio;
                        ball.y -= (ball.radius + player.radius);
                    }
                }
                if (vx > 0 && vy > 0) { //right-down direction
                    if (Math.abs(vx) >= Math.abs(vy)) { //vx longer
                        ball.dx = this.currentPower;
                        ball.dy = this.currentPower * ratio;
                        ball.x += ball.radius + player.radius;
                        ball.y += (ball.radius + player.radius) * ratio;
                    } else { //vx shorter
                        ball.dx = this.currentPower * ratio;
                        ball.dy = this.currentPower;
                        ball.x += (ball.radius + player.radius) * ratio;
                        ball.y += (ball.radius + player.radius);
                    }
                }
                if (vx < 0 && vy > 0) { //left-down direction
                    if (Math.abs(vx) >= Math.abs(vy)) { //vx longer
                        ball.dx = -this.currentPower;
                        ball.dy = -this.currentPower / ratio;
                        ball.x -= ball.radius + player.radius;
                        ball.y -= (ball.radius + player.radius) / ratio;
                    } else { //vx shorter
                        ball.dx = this.currentPower * ratio;
                        ball.dy = this.currentPower;
                        ball.x += (ball.radius + player.radius) * ratio;
                        ball.y += (ball.radius + player.radius);
                    }
                }

            }
            ball.isAttached = false;
            player.hasBall = false;
            this.currentPower = this.minPower;
        }
    }
}

export {AimSprite}