let direction = -1;
let movingTimeout = -1;

document.oncontextmenu = function() {
    window.event.returnValue = false;
}

document.addEventListener('keydown', function(event) {
    direction = getDirction(event.keyCode);

    if (direction != -1)
        startMoving();
})

document.addEventListener('keyup', function(event) {
    stopMoving()
})

document.addEventListener('touchstart', function(event) {
    if (game != null && game.isPause)
        return;

    direction = getDirction(event.target.id);

    if (direction != -1)
        startMoving();
})

document.addEventListener('touchend', function(event) {
    stopMoving()
})

function getDirction(key) {
    if (key == 39 || key == 'right') return 0;
    if (key == 40 || key == 'down') return 1;
    if (key == 37 || key == 'left') return 2;
    if (key == 38 || key == 'up') return 3;
    return -1;
}

function startMoving() {
    if (movingTimeout == -1) move();
}

function move() {
    if (game != null && !game.isPause) {
        elf.checkNext(direction);
        movingTimeout = setTimeout(move, 500);
    }
}

function stopMoving() {
    clearTimeout(movingTimeout);
    movingTimeout = -1;
}