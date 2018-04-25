import {GameObject} from './GameObject.es6';

class AimSprite extends GameObject{
    constructor(player) {
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
            ctx.drawImage(this.sprite, this.drawX, this.drawY, this.width, this.height);
        };
        this.countPhysics = () => {
            if (!(this.mouseY >= player.y)) {
                let vx = this.mouseX - player.x;
                let vy = this.mouseY - player.y;
                let ratio = vx / vy;
                let m1 = 1, m2 = Math.pow(ratio, 2); //multipliers
                let mSum = m1 + m2;
                let aSquared = Math.pow(this.radius, 2) / mSum;
                let a = Math.sqrt(aSquared);
                let b = a * ratio;
                this.x = Math.floor(player.x + b);
                this.y = Math.floor(player.y + a);
                this.drawX = this.x - this.width/2;
                this.drawY = this.y - this.height/2;
            } else {
                let vx = this.mouseX - player.x;
                let vy = player.y - this.mouseY;
                let ratio = vx / vy;
                let m1 = 1, m2 = Math.pow(ratio, 2); //multipliers
                let mSum = m1 + m2;
                let aSquared = Math.pow(this.radius, 2) / mSum;
                let a = Math.sqrt(aSquared);
                let b = a * ratio;
                this.x = Math.floor(player.x + b);
                this.y = Math.floor(player.y - a);
                this.drawX = this.x - this.width / 2;
                this.drawY = this.y - this.height / 2;
            }
        };
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX - this.width/2;
            this.mouseY = e.clientY - this.height/2;
        });

    }
}

export {AimSprite}