class Canvas {
    constructor(canvasID) {
        let _c = null;
        let canvas = document.getElementById(canvasID);
        let canvasWrapper = document.getElementById('canvasWrapper');
        canvas.width = 1270;
        canvas.height = 650;
        canvasWrapper.style.width = '1200px';
        canvasWrapper.style.height = '500px';
        // canvasWrapper.style.margin = 'auto';
        canvas.style.border = '1px black solid';
        _c = canvas.getContext('2d', { alpha: false });

        this.width = canvas.width;
        this.height = canvas.height;
        this.getContext = () => _c;
        this.getSizes = () => {
            return {
                width: canvas.width,
                height: canvas.height
            }
        };
        this.getCanvasObject = () => {
            return canvas;
        }

    }
}

export {
    Canvas
}