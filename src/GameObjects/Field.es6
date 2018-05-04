import {GameObject} from './GameObject.es6';
import {AudioBase} from "../Core/AudioBase.es6";

class Field extends GameObject {
    constructor(borders) {
        super();
        this.hasCustomTexture = false;

        this.draw = (canvas) => {
            let ctx = canvas.getContext();
            let s = canvas.getSizes();
            if (!this.hasCustomTexture) {
                ctx.fillStyle = '#89cb87'; //default color
            }
            ctx.fillRect(borders.offset, borders.offset, s.width - borders.offset * 2, s.height - borders.offset * 2);
        };
        AudioBase.playCrowd();
    }
}

export {Field}