let star = new Image();
star.src = "sound/Asset11.png";

class Game {
    constructor() {
        this.animated = -1;
        this.map = [];
        this.array = [];

        this.isTest = false;
        this.isPause = false;
        this.lives = 3;
        this.score = 0;
        this.time = 0;

        this.animation = 0;
    }
    start() {
        this.update();
        this.createLeves();
        this.createScore();
    }
    update() {
        if (!this.isPause) {
            this.clear();
            this.createTimer();
            this.check();

            this.array.forEach(element => {
                element.update();
            });
        }

        let self = this;
        this.animated = requestAnimationFrame(self.update.bind(self));
    }
    clear() {
        ctx.clearRect(0, 0, 700, 800);
        this.draw();
    }
    draw() {
        this.map.forEach((element, y) => {
            element.forEach((element, x) => {
                let _x = x * blockWidth;
                let _y = y * blockHeight;

                if (element == 0)
                    ctx.fillRect(_x, _y, blockWidth, blockHeight);

                if (element == 1) {
                    ctx.beginPath();
                    ctx.arc(_x + (blockWidth / 2), _y + (blockHeight / 2), 2, 0, 2 * Math.PI);
                    ctx.fill();
                }

                if (element == 4)
                    ctx.drawImage(star, _x, _y, 1205 / blockHeight, 1155 / blockWidth);

                if (element == 6)
                    ctx.fillRect(_x, _y + (blockHeight / 4), (blockWidth), (blockHeight / 2));
            });
        });
    }

    positionChange(y, x, value) {
        this.map[y][x] = value;
    }
    addObject(obj) {
        this.array.push(obj)
    }
    addScore(score) {
        this.score += score;
        this.createScore();
    }

    pause() {
        this.isPause = !this.isPause;
    }
    reset() {
        cancelAnimationFrame(this.animated);
        this.animated = -1
        this.map = [];
        this.array = [];

        this.isPause = false;
        this.lives = 3;
        this.score = 0;
        this.time = 0;

        this.animation = 0
    }
    damage() {
        this.lives--;
        this.createLeves();
        this.array.forEach(element => {
            element.reset();
        });
    }
    check() {
        let win = true;
        this.map.forEach(element => {
            element.forEach(element => {
                if (element == 1 || element == 4)
                    win = false;
            });
        });

        if (win || this.lives == 0) ajax();
    }

    createTimer() {
        this.animation++;
        if (this.animation % 60 == 0) {
            this.time++;
            let m, s;
            m = Math.floor(this.time / 60).toString().padStart(2, '0');
            s = Math.floor(this.time % 60).toString().padStart(2, '0');
            document.getElementById('time').innerHTML = 'TIME： ' + m + ':' + s;
            this.animation = 0;
        }
    }
    createLeves() {
        let x = document.getElementById('lives').children
        for (let i = 1; i < x.length; i++) {
            x[i].style.display = i > this.lives ? 'none' : '';
        }
    }
    createScore() {
        document.getElementById('score').innerHTML = 'SCORE： ' + this.score;
    }
}