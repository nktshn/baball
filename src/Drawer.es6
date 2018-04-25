class Drawer {
    constructor(fps, canvas, gameObjects) {
        let ms = 1000 / fps;
        let loopID;
        let context = canvas.getContext();

        this.run = () => {
            loopID = setInterval(mainDrawLoop, ms);
        };

        function mainDrawLoop() {
            // console.log("Draw loop");
            //main draw loop:
            //background:
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = '#64c372';
            context.fillRect(0, 0, canvas.width, canvas.height);
            // canvas.getCanvasObject().style.cursor = 'none'; //anti-cheat ;)
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