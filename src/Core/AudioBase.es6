import {s1} from './../Audio/shoot.mp3';
import {s2} from './../Audio/catching.mp3';
import {s3} from './../Audio/crowd.ogg';
import {s4} from './../Audio/borderTouch.mp3';
import {s5} from './../Audio/soundtrack.mp3';
import {s6} from './../Audio/powershot.ogg';

class AudioBase {
    static playPowershot() {
        const powershot = new Audio('./build/audio/powershot.ogg');
        powershot.play();
    }

    static playShoot() {
        const shoot = new Audio('./build/audio/shoot.mp3');
        shoot.play();
    };

    static playCatching() {
        const catching = new Audio('./build/audio/catching.mp3');
        catching.volume = 0.6;
        catching.play();
    };

    static playCrowd() {
        const crowd = new Audio('./build/audio/crowd.ogg');
        crowd.loop = true;
        crowd.volume = 0.1;
        crowd.play();
        crowd.addEventListener('timeupdate', function () {
            let buffer = 1;
            if (this.currentTime > this.duration - buffer) {
                this.currentTime = 1;
                this.play()
            }
        }, false);

    };

    static playBorderTouch() {
        const borderTouch = new Audio('./build/audio/borderTouch.mp3');
        borderTouch.play();
    };

    static playSoundtrack() {
        const soundtrack = new Audio('./build/audio/soundtrack.mp3');
        soundtrack.loop = true;
        soundtrack.volume = 0.5;
        soundtrack.play();
    };

}


export {AudioBase}