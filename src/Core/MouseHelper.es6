class MouseHelper {
    constructor(canvas) {
        let div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.top = 0 + 'px';
        div.style.left = 0 + 'px';
        // div.style.height = '100px';
        div.style.width = '60px';
        div.style.backgroundColor = 'white';
        div.style.border = '1px grey solid';
        div.style.borderRadius = '7px';
        let parent = document.getElementById('canvasWrapper');
        parent.appendChild(div);

        let text = document.createElement('span');
        div.appendChild(text);


        parent.addEventListener('mousemove', (e) => {
            div.style.left = (e.clientX + 20) + 'px';
            div.style.top = (e.clientY + 20) + 'px';
            text.innerHTML = `X: ${e.clientX} Y: ${e.clientY} y/x: ${e.clientX/e.clientY}`;
        });



    }
}

export {MouseHelper}