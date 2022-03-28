class Ghost extends Compoent {
    constructor(id, imageSrc, x, y, wait) {
        super(id, imageSrc, 547 / (blockWidth / 1.5), 631 / (blockHeight / 1.5), x, y);

        this.animated = 0;
        this.inHome = true;
        this.start = 0;
        this.wait = wait;
    };
    update() {
        if (this.animated % 30 == 0) {
            if (this.start >= this.wait) {
                this.getDirection();
            } else {
                this.start++;
            }
            this.animated = 0
        }

        this.animation();
        this.animated++
    };
    getDirection() {
        let canMove = [];
        let temp = [1, 2, 3, 0];

        temp.forEach(element => {
            let next = this.getNext(element);
            if (next != 0 && next != 3 && (next != 6 || this.inHome))
                canMove.push(element);
        });

        let direction = canMove[0];
        if (canMove.length > 1) {
            let chk = -1
            let back = this.direction + (this.direction >= 2 ? -2 : 2);
            while (chk == -1) {
                chk = canMove[Math.floor(Math.random() * canMove.length)];
                if (chk == back) chk = -1;
            }
            direction = chk;
        }
        this.move(direction);
    };

    contact(obj) {
        if (obj == 5) {
            game.damage();
            return;
        }

        if (obj == 6 && this.inHome)
            this.inHome = false;

        this.oldGrid = obj;
    };

    reset() {
        game.positionChange(this.now.y, this.now.x, this.oldGrid);
        this.now = this.re;
        this.inHome = true;
        this.start = 0;
        this.oldGrid = 2
        game.positionChange(this.now.y, this.now.x, this.id);
    }
}