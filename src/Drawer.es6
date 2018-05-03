class Drawer {

    constructor(fps, canvas, gameObjects) {
        let ms = 1000 / fps;
        let loopID;
        let context = canvas.getContext();

        this.run = () => {
            loopID = setInterval(mainDrawLoop, ms);
        };

        this.drawStaticBackground = (staticCanvas, staticGameObjects) => {
            staticGameObjects.forEach(e => {
                e.draw(staticCanvas);
            })
        };

        function mainDrawLoop() {
            // console.log("Draw loop");
            //main draw loop:
            //background:
            context.fillStyle = '#9dc089'; //canvas background
            context.clearRect(0, 0, canvas.width, canvas.height);
            canvas.getCanvasObject().style.cursor = 'all-scroll';
            //objects:
            gameObjects.forEach(e => {
                e.draw(canvas);
            })
        }
    }
}

export {
    Drawer
}