class Drawer {
    constructor(canvas, gameObjects) {
        let context = canvas.getContext();

        this.run = () => {
            requestAnimationFrame(mainDrawLoop);
        };

        this.drawStaticBackground = (staticCanvas, staticGameObjects) => {
            staticGameObjects.forEach(e => {
                e.draw(staticCanvas);
            })
        };

        function mainDrawLoop() {
            //main draw loop:
            //background:
            // context.fillStyle = '#9dc089'; //canvas background
            context.clearRect(0, 0, canvas.width, canvas.height);
            canvas.getCanvasObject().style.cursor = 'all-scroll';
            //objects:
            gameObjects.forEach(e => {
                e.draw(canvas);
            });
            requestAnimationFrame(mainDrawLoop);
        }
    }
}

export {
    Drawer
}