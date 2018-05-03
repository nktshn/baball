class Physics {
    /**
     * @return {number}
     */
    static GAME_SPEED() {return 8.3} ;
    constructor(ms, gameObjects) {

        let loopID;
        this.run = () => {
            loopID = setInterval(mainPhysicsLoop, ms);
        };
        function mainPhysicsLoop() {
            // console.log("Main physics loop");
            //main physics loop:
            //objects:
            gameObjects.forEach(e => {
                e.countPhysics();
                //pass objects here to detect collisions
                e.detectCollisions(gameObjects);
            })
        }
    }
}

export {
    Physics
}