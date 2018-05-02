import {GameObject} from './GameObject.es6';
import {AudioBase} from "../Core/AudioBase.es6";

class Border extends GameObject{
    constructor(canvas) {
        super();
        let s = canvas.getSizes();

        this.offset = 30;
        this.draw = (canvas) => {
            let ctx = canvas.getContext();
            ctx.strokeStyle = '#292929';
            ctx.lineWidth = 5;
            ctx.strokeRect(this.offset, this.offset, s.width - this.offset*2, s.height - this.offset*2);
            ctx.fillStyle = '#7cc57a'; //field background color
            ctx.fillRect(this.offset, this.offset, s.width - this.offset*2, s.height - this.offset*2);
        };
        this.countPhysics = () => {

        };

        this.detectCollisions = objects => {};

        this.collisionLines = {
            top: {x0: this.offset, x1: s.width - this.offset, y0: this.offset, y1: 0},
            left: {x0: this.offset, x1: this.offset, y0: this.offset, y1: s.height - this.offset},
            bottom: {x0: this.offset, x1: s.width - this.offset, y0: s.height - this.offset, y1: s.height - this.offset},
            right: {x0: s.width - this.offset, x1: s.width - this.offset, y0: this.offset, y1: s.height - this.offset},
        };
        AudioBase.playCrowd();
        // AudioBase.playSoundtrack();
    }
}

export {Border}