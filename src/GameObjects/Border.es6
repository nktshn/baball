import {GameObject} from './GameObject.es6';
import {AudioBase} from "../Core/AudioBase.es6";

class Border extends GameObject{
    constructor(canvas) {
        super();
        let s = canvas.getSizes();
        this.draw = (canvas) => {
            let ctx = canvas.getContext();
            ctx.strokeStyle = '#292929';
            ctx.lineWidth = 5;
            ctx.strokeRect(0, 0, s.width, s.height);
        };
        this.countPhysics = () => {

        };

        this.detectCollisions = objects => {};

        this.collisionLines = {
            top: {x0: 0, x1: s.width, y0: 0, y1: 0},
            left: {x0: 0, x1: 0, y0: 0, y1: s.height},
            bottom: {x0: 0, x1: s.width, y0: s.height, y1: s.height},
            right: {x0: s.width, x1: s.width, y0: 0, y1: s.height},
        };
        AudioBase.playCrowd();
    }
}

export {Border}