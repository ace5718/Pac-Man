class Elf extends Compoent {
    constructor(id, imageSrc, x, y) {
        super(id, imageSrc, 685 / (blockWidth / 1.4), 735 / (blockHeight / 1.4), x, y);
    };
    update() {
        this.animation();
    };
    checkNext(direction) {
        let obj = this.getNext(direction);
        if (obj != 0 && obj != 6) this.move(direction);
    };
    contact(obj) {
        this.oldGrid = 2;
        if (obj == 1) game.addScore(10);
        if (obj == 4) {
            game.addScore(50);
            if (game.isTest) endTest();
        }
        if (obj == 3) game.damage();
    }
    reset() {
        game.positionChange(this.now.y, this.now.x, this.oldGrid);
        this.now = this.re;
        game.positionChange(this.now.y, this.now.x, this.id);
    }
}