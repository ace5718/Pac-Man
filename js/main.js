var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');

var game = null;
var elf = null;
var ghost = [];

var level = null;
var name = null;

function hidden(id, type) {
    document.getElementById(id).style.display = type ? '' : 'none';
}

function startTest(type) {
    if (type == 0) {
        hidden('start', false)
        hidden('test', true)
    }

    if (type == 1) {
        hidden('t1', false)
        hidden('t2', true)
    }

    if (type == 2) {
        hidden('test', false)
        hidden('t1', true)
        hidden('t2', false)
        startGame();
        game.isTest = true;
        document.getElementById('exit').style.display = '';
    }
}

function endTest() {
    game.pause();
    hidden('play', false);
    hidden('start', true);
    document.getElementById('startGame').style.backgroundColor = "red";
}

function startGame() {
    hidden('start', false)
    hidden('play', true)

    name = document.getElementById('playername').value;
    document.getElementById('name').innerHTML = name;

    level = document.getElementsByClassName('active')[0].children[0].innerHTML;
    document.getElementById('level').innerHTML = level;

    document.getElementById('exit').style.display = 'none';

    fetch('php/getscore.php')
        .then(function(response) {
            return response.json();
        })
        .then(function(myjson) {
            if (myjson.length > 0)
                document.getElementById('topScore').innerHTML = "TOP SCORE： " + myjson[0].score;
        })

    setGame();
    game.start();
}

function setGame() {
    game = new Game();
    setMap();
}

function changeLevel(type) {
    let x = document.getElementsByClassName('radio')
    for (let i = 0; i < x.length; i++) {
        x[i].classList.remove('active')

        if (x[i].children[0].innerHTML == type)
            x[i].classList.add('active')
    }
}

function changeSize(number) {
    let x = document.body.style.fontSize;
    x = parseInt(x) + number;
    if (x > 12 && x < 20)
        document.body.style.fontSize = x + 'px';
}

function pause() {
    game.pause();
    document.getElementById('pause').children[0].innerHTML = game.isPause ? "繼續" : "暫停";
}

function restart() {
    hidden('rank', false);
    game.reset();
    startGame();
}

function ajax() {
    pause();

    fetch('php/register.php', {
            method: 'post',
            body: JSON.stringify({
                'difficulty': level,
                'name': name,
                'time': game.time,
                'score': game.score,
            }),
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(myjson) {
            let my = myjson[myjson.length - 1];

            myjson.sort((a, b) => {
                if (parseInt(a['score']) == parseInt(b['score']))
                    return a['time'] - b['time'];
                else
                    return b['score'] - a['score'];
            })

            let rank = 1;
            let player = [];

            myjson.forEach((item, index) => {
                if (typeof(myjson[index - 1]) != 'undefined' &&
                    myjson[index]['time'] == myjson[index - 1]['time'] &&
                    myjson[index]['score'] == myjson[index - 1]['score'])
                    rank--;
                else
                    rank = index + 1;

                let m = Math.floor(item['time'] / 60).toString().padStart(2, '0');
                let s = Math.floor(item['time'] % 60).toString().padStart(2, '0');

                let user = [
                    rank,
                    item['difficulty'],
                    item['name'],
                    m + ":" + s,
                    item['score'],
                ];

                if (item['id'] == my['id'])
                    player.unshift(user)
                else
                    player.push(user)

                rank++;
            });

            document.getElementById('rankBody').innerHTML = '';
            player.forEach((element, index) => {
                if (index == 0 || element[0] <= 3) {
                    document.getElementById('rankBody').innerHTML += `
                    <tr>
                        <td>${ element[0] }</td>
                        <td>${ element[1] }</td>
                        <td>${ element[2] }</td>
                        <td>${ element[3] }</td>
                        <td>${ element[4] }</td>
                    </tr>
                    `;
                }
            });
        })

    hidden('rank', true);
}