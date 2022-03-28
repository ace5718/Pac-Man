class Compoent {
    constructor(id, img, width, height, x, y) {
        this.id = id;

        this.imageSrc = img;
        this.image = new Image();
        this.image.src = this.imageSrc[0];

        this.width = width;
        this.height = height;

        this.now = { x, y }
        this.re = { x, y }

        this.index = 0
        this.oldGrid = 2
        this.direction = 0
    };
    animation() {
        this.draw();
        if (this.index == 19) this.index = 0

        this.index++;
        this.image.src = this.imageSrc[Math.floor(this.index / 10)];
    };
    draw() {
        let x = this.now.x * blockWidth + 5
        let y = this.now.y * blockHeight + 5

        let xOffset = x + (this.width / 2);
        let yOffset = y + (this.height / 2);

        ctx.translate(xOffset, yOffset);
        ctx.rotate((this.direction * 90) * Math.PI / 180);
        ctx.translate(-xOffset, -yOffset)

        ctx.drawImage(this.image, x, y, this.width, this.height);

        ctx.translate(xOffset, yOffset);
        ctx.rotate(-(this.direction * 90) * Math.PI / 180);
        ctx.translate(-xOffset, -yOffset)
    };
    getNext(direction) {
        let point = this.getNewPoint(this.now.y, this.now.x, direction);
        return game.map[point.y][point.x];
    };
    move(direction) {
        this.direction = direction;
        game.positionChange(this.now.y, this.now.x, this.oldGrid);
        this.now = this.getNewPoint(this.now.y, this.now.x, this.direction);
        this.contact(game.map[this.now.y][this.now.x]);
        game.positionChange(this.now.y, this.now.x, this.id);
    };
    getNewPoint(y, x, direction) {
        x += (direction == 0 ? 1 : (direction == 2 ? -1 : 0));
        y += (direction == 1 ? 1 : (direction == 3 ? -1 : 0));

        if (x >= row) x = 0;
        if (y >= colum) x = 0;

        if (x < 0) x = row - 1;
        if (y < 0) y = colum - 1;

        return { x, y };
    };
}