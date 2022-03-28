var map = [ //地圖
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [2, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 2, 2],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 6, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 7, 7, 7, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [2, 2, 2, 0, 1, 0, 1, 1, 1, 5, 1, 1, 1, 0, 1, 0, 2, 2, 2],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
    [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

let ghostImage = [
    ['sound/Asset1.png', 'sound/Asset2.png'],
    ['sound/Asset3.png', 'sound/Asset4.png'],
    ['sound/Asset5.png', 'sound/Asset6.png'],
];
let wait = [4, 1, 6];

var row = 0;
var colum = 0;
var blockWidth = 0;
var blockHeight = 0;

function setMap() {
    let count = getLevel();
    elf = null;
    ghost = [];


    row = map[0].length;
    colum = map.length;

    blockWidth = canvas.width / row;
    blockHeight = canvas.height / colum;

    map.forEach((element, y) => {
        let temp = [];
        element.forEach((element, x) => {
            if (element == 5) {
                elf = new Elf(5, ['sound/Asset7.png', 'sound/Asset8.png'], x, y);
                game.addObject(elf);
            }

            if (element == 7 && count.ghost > 0) {
                ghost.push(new Ghost(3, ghostImage[ghost.length], x, y, wait[ghost.length]));
                game.addObject(ghost[ghost.length - 1]);
                count.ghost--;
            }

            temp.push(element);
        });

        game.map.push(temp);
    });

    for (let i = 0; i < count.star; i++) {
        let tf = true;
        while (tf) {
            let x = Math.floor(Math.random() * row)
            let y = Math.floor(Math.random() * colum)

            if (game.map[y][x] == 1) {
                game.positionChange(y, x, 4);
                tf = false;
            }
        }
    }
}

function getLevel() {
    if (level == 'EASY') return { ghost: 1, star: 10 };
    if (level == 'NORMAL') return { ghost: 2, star: 8 };
    if (level == 'HARD') return { ghost: 3, star: 6 };
}