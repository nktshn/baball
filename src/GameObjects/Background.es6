import {GameObject} from './GameObject.es6';

class Background extends GameObject {
    constructor() {
        super();

        this.draw = (canvas) => {
            let context = canvas.getContext();
            context.fillStyle = '#9dc089'; //canvas background
            context.fillRect(0, 0, canvas.width, canvas.height);
            console.log('background drew');
        };

    }
}

export {Background}