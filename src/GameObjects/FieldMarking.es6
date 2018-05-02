import {GameObject} from './GameObject.es6';

class FieldMarking extends GameObject {
    static get centerCircleRadius() {return 120};
    constructor(border) {
        super();
        this.draw = (canvas) => {
            let ctx = canvas.getContext();
            ctx.strokeStyle = '#f0f0f0';
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            //central vertical line:
            ctx.beginPath();
            ctx.moveTo(canvas.width/2, border.offset);
            ctx.lineTo(canvas.width/2, border.getCollisionLines('bot').bottom.y0);
            ctx.stroke();

            //central circle:
            ctx.beginPath();
            ctx.arc(canvas.width/2, canvas.height/2, FieldMarking.centerCircleRadius, 0, 2 * Math.PI);
            ctx.stroke();

            //near of targets:
            //left:
            ctx.beginPath();
            ctx.moveTo(border.offset, border.getCollisionLines('top').left.y1 - border.offset/2);
            ctx.lineTo(border.offset, border.getCollisionLines('bot').left.y0 + border.offset/2);
            ctx.stroke();
            //right:
            ctx.beginPath();
            ctx.moveTo(canvas.width - border.offset, border.getCollisionLines('top').right.y1 - border.offset/2);
            ctx.lineTo(canvas.width - border.offset, border.getCollisionLines('bot').right.y0 + border.offset/2);
            ctx.stroke();
        };
    }
}

export {FieldMarking}