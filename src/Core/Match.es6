import {FieldMarking} from "../GameObjects/FieldMarking.es6";

class Match {
    constructor(players, ball, targets, canvas) {
        this.matchTime = 600; //sec
        this.matchTimeRemaining = this.matchTime;
        this.leftTeamScore = 0;
        this.rightTeamScore = 0;
        this.isGoal = false;
        this.isMatchPaused = false;
        this.isMatchEnded = false;
        this.playersArrangeMap = {
            leftTeam: [
                {x: canvas.width / 2 - FieldMarking.centerCircleRadius, y: canvas.height / 2},
                {x: canvas.width / 2 - FieldMarking.centerCircleRadius/2, y: canvas.height / 2 - FieldMarking.centerCircleRadius},
                {x: canvas.width / 2 - FieldMarking.centerCircleRadius/2, y: canvas.height / 2 + FieldMarking.centerCircleRadius},
                ],
            rightTeam: [
                {x: canvas.width / 2 + FieldMarking.centerCircleRadius, y: canvas.height / 2},
                {x: canvas.width / 2 + FieldMarking.centerCircleRadius/2, y: canvas.height / 2 + FieldMarking.centerCircleRadius},
                {x: canvas.width / 2 + FieldMarking.centerCircleRadius/2, y: canvas.height / 2 - FieldMarking.centerCircleRadius},
            ],
        };

        let timerIntervalID;

        this.countPhysics = () => {
            this.checkMatchEnd();
            this.detectGoal();
        };
        this.detectCollisions = (e) => {
        }; //mock

        this.draw = (canvas) => {
            let ctx = canvas.getContext();
            //score:
            let x = canvas.width / 2;
            let y = 32;
            ctx.font = '40px Calibri';
            ctx.fillStyle = `rgba(255, 255, 255, 0.9)`;
            ctx.textAlign = 'center';
            ctx.fillText(`${this.leftTeamScore} : ${this.rightTeamScore}`, x, y);
            ctx.strokeStyle = `rgba(255, 255, 255, 0.9)`;
            ctx.lineWidth = 2;
            ctx.strokeText(`${this.leftTeamScore} : ${this.rightTeamScore}`, x, y);
            //timer:
            ctx.font = '26px Calibri';
            ctx.lineWidth = 1;
            ctx.fillText(`Time remaining: ${this.matchTimeRemaining}`, x - 300, y - 5);
            ctx.strokeText(`Time remaining: ${this.matchTimeRemaining}`, x - 300, y - 5);
        };

        this.startTimer = () => {
            timerIntervalID = setInterval(() => {
                this.matchTimeRemaining--;
            }, 1000);
        };

        this.startNewMatch = () => {
            players.forEach(e => {
                e.initController();
            });
            ball.initPosition();
            this.matchTimeRemaining = this.matchTime;
            this.leftTeamScore = 0;
            this.rightTeamScore = 0;
            this.startTimer();
        };

        this.pauseMatch = () => {
            clearInterval(timerIntervalID);
            players.forEach(e => {
                e.disableControllers();
            });
            setTimeout(this.continueMatch, 3000);
        };

        this.continueMatch = () => {
            this.rearrangePlayers();
            ball.initPosition();
            this.startTimer();
            players.forEach(e => {
                e.initController();
            });
            this.isGoal = false;
        };

        this.detectGoal = () => {
            if (!this.isGoal) {
                //left team goals:
                if (ball.x - ball.radius > targets[0].getCollisionLines('right').top.x0) {
                    this.leftTeamScore++;
                    this.isGoal = true;
                    this.isMatchPaused = true;
                }
                //right team goals:
                if (ball.x + ball.radius < targets[1].getCollisionLines('left').top.x1) {
                    this.rightTeamScore++;
                    this.isGoal = true;
                    this.isMatchPaused = true;
                }
            }
            if (this.isMatchPaused) {
                this.pauseMatch();
                this.isMatchPaused = false;
            }
        };

        this.rearrangePlayers = () => {
            players.forEach((e, i) => {
                e.x = this.playersArrangeMap.leftTeam[i].x;
                e.y = this.playersArrangeMap.leftTeam[i].y
            })
        };

        this.stopMatch = () => {
            clearInterval(timerIntervalID);
            players.forEach(e => {
                e.disableControllers();
            });
        };

        this.checkMatchEnd = () => {
            if (this.matchTimeRemaining === 0) {
                this.isMatchEnded = true;
                this.stopMatch();
            }
        };


        //match starting:
        this.matchInit = () => {
            this.rearrangePlayers();
            setTimeout(this.startNewMatch, 2000);
        };
        this.matchInit();
    }
}

export {Match}