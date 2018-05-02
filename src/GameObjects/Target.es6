import {GameObject} from './GameObject.es6';

class Target extends GameObject {
    constructor(borders) {
        super();

        this.draw = (canvas) => {
            let ctx = canvas.getContext();
        };
    }
}

export {Target}