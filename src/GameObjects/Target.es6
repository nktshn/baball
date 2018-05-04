import {GameObject} from './GameObject.es6';

class Target extends GameObject {
    constructor(borders, side) {
        /*
         @side: 'left' of 'right'
         */
        super();

        const posPoints = {
            left: {
                x0: borders.getCollisionLines('top').left.x0,
                y0: borders.getCollisionLines('top').left.y1 - borders.offset / 2,
                x1: borders.getCollisionLines('top').left.x0 - borders.offset,
                y1: borders.getCollisionLines('top').left.y1 - borders.offset / 2,
                x2: borders.getCollisionLines('bot').left.x0 - borders.offset,
                y2: borders.getCollisionLines('bot').left.y0 + borders.offset / 2,
                x3: borders.getCollisionLines('top').left.x0,
                y3: borders.getCollisionLines('bot').left.y0 + borders.offset / 2,
            },
            right: {
                x0: borders.getCollisionLines('top').right.x0,
                y0: borders.getCollisionLines('top').right.y1 - borders.offset / 2,
                x1: borders.getCollisionLines('top').right.x0 + borders.offset,
                y1: borders.getCollisionLines('top').right.y1 - borders.offset / 2,
                x2: borders.getCollisionLines('bot').right.x0 + borders.offset,
                y2: borders.getCollisionLines('bot').right.y0,
                x3: borders.getCollisionLines('top').right.x0,
                y3: borders.getCollisionLines('bot').right.y0,
            }
        };

        this.draw = (canvas) => {
            let ctx = canvas.getContext();
            let s = canvas.getSizes();
            ctx.strokeStyle = '#43555f';
            ctx.lineCap = 'square';
            ctx.lineWidth = 5;
            ctx.lineJoin = "round";

            if (side === 'left') {
                //left target:
                ctx.beginPath();
                ctx.moveTo(posPoints.left.x0, posPoints.left.y0);
                ctx.lineTo(posPoints.left.x1, posPoints.left.y1);
                ctx.lineTo(posPoints.left.x2, posPoints.left.y2);
                ctx.lineTo(posPoints.left.x3, posPoints.left.y3);
                ctx.stroke();
            } else {
                //right target:
                ctx.beginPath();
                ctx.moveTo(posPoints.right.x0, posPoints.right.y0);
                ctx.lineTo(posPoints.right.x1, posPoints.right.y1);
                ctx.lineTo(posPoints.right.x2, posPoints.right.y2);
                ctx.lineTo(posPoints.right.x3, posPoints.right.y3);
                ctx.stroke();
            }

            this.getCollisionLines = (side) => {
                if (side === 'left') {
                    return {
                        top: {
                            x0: posPoints.left.x1,
                            y0: posPoints.left.y1 + 5,
                            x1: posPoints.left.x0,
                            y1: posPoints.left.y0 + 5
                        },
                        left: {
                            x0: posPoints.left.x1,
                            x1: posPoints.left.x2,
                            y0: posPoints.left.y1,
                            y1: posPoints.left.y2
                        },
                        bottom: {
                            x0: posPoints.left.x2,
                            x1: posPoints.left.x3,
                            y0: posPoints.left.y2,
                            y1: posPoints.left.y3
                        },
                        right: {},
                    };
                } else {
                    return {
                        top: {
                            x0: posPoints.right.x0,
                            y0: posPoints.right.y0,
                            x1: posPoints.right.x1,
                            y1: posPoints.right.y1
                        },
                        left: {},
                        bottom: {
                            x0: posPoints.right.x3,
                            x1: posPoints.right.x2,
                            y0: posPoints.right.y3,
                            y1: posPoints.right.y2
                        },
                        right: {
                            x0: posPoints.right.x1,
                            x1: posPoints.right.x2,
                            y0: posPoints.right.y1,
                            y1: posPoints.right.y2
                        },
                    };
                }
            };

            this.collisionLines = this.getCollisionLines(side);
        };
    }
}

export {Target}