class Physics {
    /**
     * @return {number}
     */
    static GAME_SPEED() {return 16.6} ;
    constructor(ms, gameObjects) {

        let loopID;
        this.run = () => {
            loopID = setInterval(mainPhysicsLoop, ms);
        };
        function mainPhysicsLoop() {
            //main physics loop:
            //objects:
            gameObjects.forEach(e => {
                e.countPhysics();
                e.detectCollisions(gameObjects);
            })
        }
    }
}

export {
    Physics
}