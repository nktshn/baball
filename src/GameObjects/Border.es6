import {GameObject} from './GameObject.es6';

class Border extends GameObject {
    constructor(canvas, side) {
        /*
         @side: 'top' or 'bot'
         */
        super();
        let s = canvas.getSizes();

        this.offset = 40;
        this.draw = (canvas) => {
            let ctx = canvas.getContext();
            ctx.strokeStyle = '#292929';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.lineCap = 'round';
            if (side === 'top') {
                ctx.moveTo(this.offset, this.offset);
                ctx.lineTo(s.width - this.offset, this.offset); //top line
                ctx.moveTo(this.offset, this.offset);
                ctx.lineTo(this.offset, this.getCollisionLines('top').left.y1 - this.offset / 2); //left border
                ctx.moveTo(s.width - this.offset, this.offset);
                ctx.lineTo(s.width - this.offset, this.getCollisionLines('top').right.y1 - this.offset / 2); //right border
                ctx.stroke();
            } else {
                ctx.moveTo(this.offset, s.height - this.offset);
                ctx.lineTo(s.width - this.offset, s.height - this.offset); //bottom line
                ctx.moveTo(this.offset, s.height - this.offset);
                ctx.lineTo(this.offset, this.getCollisionLines('bot').left.y0 + this.offset / 2); //left border
                ctx.moveTo(s.width - this.offset, s.height - this.offset);
                ctx.lineTo(s.width - this.offset, this.getCollisionLines('bot').right.y0); //right border
                ctx.stroke();
            }
        };
        this.countPhysics = () => {

        };

        this.detectCollisions = objects => {
        };

        this.getCollisionLines = (side) => {
            if (side === 'top') {
                return {
                    top: {
                        x0: this.offset,
                        x1: s.width - this.offset,
                        y0: this.offset,
                        y1: 0
                    },
                    left: {
                        x0: this.offset,
                        x1: this.offset,
                        y0: this.offset,
                        y1: (s.height - this.offset) / 3 + this.offset
                    },
                    bottom: {},
                    right: {
                        x0: s.width - this.offset,
                        x1: s.width - this.offset,
                        y0: this.offset,
                        y1: (s.height - this.offset) / 3 + this.offset
                    },
                };
            } else {
                return {
                    top: {},
                    left: {
                        x0: this.offset,
                        x1: this.offset,
                        y0: 2 * ((s.height - this.offset) / 3),
                        y1: (s.height - this.offset)
                    },
                    bottom: {
                        x0: this.offset,
                        x1: s.width - this.offset,
                        y0: s.height - this.offset,
                        y1: s.height - this.offset
                    },
                    right: {
                        x0: s.width - this.offset,
                        x1: s.width - this.offset,
                        y0: 2 * ((s.height - this.offset) / 3) + this.offset/2,
                        y1: (s.height - this.offset)
                    },
                };
            }
        };

        this.collisionLines = this.getCollisionLines(side);
    }
}


export {Border}