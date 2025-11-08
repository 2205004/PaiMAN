// game.js - Логіка гри та відображення

/* Основні змінні гри */
var elem = {
    canvas: document.getElementById("canvas"),
    start: document.getElementById('start'),
    startbutton: document.getElementById('startbutton'),
    pause: document.getElementById('pause'),
    win: document.getElementById('win'),
    lose: document.getElementById('lose'),
    desc: document.getElementById('desc'),
    gen: document.getElementById('gen'),
    move: document.getElementById('move'),
    currentPointsAmount: document.getElementById('currentPointsAmount'),
    pointsAmount: document.getElementById('pointsAmount'),
    currentScore: document.getElementById('currentScore'),
    input: document.getElementById('input'),
    output: document.getElementById('output'),
    ghosteat: document.getElementById('ghosteat'),
    persent: document.getElementById('persent'),
    exportData: document.getElementById('exportData')
};

var state = "start";
var ctx = elem.canvas.getContext("2d");
var cellAmount = 21;
var cellSize = elem.canvas.width / cellAmount;

var levels = [{
    obstaclesMap: [
        [1, 6], [1, 16],[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 7], [1, 8], [1, 9], [1, 10], [1, 11], [1, 12], [1, 13], [1, 14], [1, 15], [1, 17], [1, 18], [1, 19], [1, 20], [1, 21],
        [2, 1], [2, 21],
        [3, 1], [3, 6], [3, 8], [3, 11], [3, 14], [3, 16], [3, 21],
        [4, 1], [4, 3], [4, 4], [4, 8], [4, 10], [4, 11], [4, 12], [4, 14], [4, 18], [4, 19], [4, 21],
        [5, 1], [5, 6], [5, 8], [5, 10], [5, 11], [5, 12], [5, 14], [5, 16], [5, 21],
        [6, 1],  [6, 4], [6, 6], [6, 11], [6, 16], [6, 18], [6, 21], [7, 21],
        [7, 1], [7, 6], [7, 8], [7, 9], [7, 11], [7, 13], [7, 14], [7, 16],
        [8, 1], [8, 3], [8, 4], [8, 8], [8, 14], [8, 18], [8, 19], [8, 21],
        [9, 1], [9, 6], [9, 10], [9, 11], [9, 8], [9, 12], [9, 14], [9, 16], [9, 21],
        [10, 1], [10, 4], [10, 6], [10, 10], [10, 12], [10, 16], [10, 18], [10, 21],
        [11, 1], [11, 6], [11, 8], [11, 12], [11, 14], [11, 16], [11, 21],
        [12, 1], [12, 4], [12, 6], [12, 10], [12, 12], [12, 16], [12, 18], [12, 21],
        [13, 1], [13, 6], [13, 8], [13, 10], [13, 11], [13, 12], [13, 14], [13, 16],  [13, 21],
        [14, 1], [14, 3], [14, 4], [14, 8], [14, 14], [14, 18], [14, 19], [14, 21],
        [15, 1], [15, 6], [15, 8], [15, 9], [15, 11], [15, 13], [15, 14], [15, 16], [15, 21],
        [16, 1], [16, 4], [16, 6], [16, 11], [16, 16], [16, 18], [16, 21],
        [17, 1], [17, 6], [17, 8], [17, 10], [17, 11], [17, 12], [17, 14], [17, 16], [17, 21],
        [18, 1], [18, 3], [18, 4], [18, 8], [18, 10], [18, 11], [18, 12], [18, 14], [18, 18], [18, 19], [18, 21],
        [19, 1], [19, 6], [19, 8], [19, 11], [19, 14], [19, 16], [19, 21],
        [20, 1], [20, 21],
        [21, 6], [21, 16],
        [21, 1], [21,2], [21,3], [21, 4], [21, 5], [21, 7], [21, 8], [21, 9], [21, 10], [21, 11], [21, 12], [21, 13], [21, 14], [21, 15], [21, 17], [21, 18], [21, 19], [21, 20], [21, 21]
    ],
    specialObstaclesMap: [[11, 10]],
    pointsMap: [
        [2, 4], [2, 5], [2, 7], [2, 10], [2, 12], [2, 15], [2, 17],  [2, 2], [2, 3], [2, 6], [2, 8], [2, 9], [2, 13], [2, 14], [2, 16], [2, 18], [2, 19], [2, 20],
        [3, 2], [3, 3], [3, 4], [3, 5], [3, 7], [3, 9], [3, 10], [3, 12], [3, 13], [3, 15], [3, 17], [3, 18], [3, 19], [3, 20],
        [4, 2], [4, 5], [4, 6], [4, 7], [4, 9], [4, 13], [4, 15], [4, 16], [4, 17], [4, 20],
        [5, 2], [5, 3], [5, 4], [5, 5], [5, 7], [5, 9], [5, 13], [5, 15], [5, 17], [5, 18], [5, 19], [5, 20],
        [6, 2], [6, 3], [6, 5], [6, 7], [6, 8], [6, 9], [6, 10], [6, 12], [6, 13], [6, 14], [6, 15], [6, 17], [6, 19], [6, 20],
        [7, 2], [7, 3], [7, 4], [7, 5], [7, 7], [7, 15], [7, 17], [7, 18], [7, 19], [7, 20],
        [8, 2], [8, 5], [8, 6], [8, 7], [8, 15], [8, 16], [8, 17], [8, 20],
        [9, 2], [9, 3], [9, 4], [9, 5], [9, 7], [9, 15], [9, 17], [9, 18], [9, 19], [9, 20],
        [10, 2], [10, 3], [10, 5], [10, 7], [10, 15], [10, 17], [10, 19], [10, 20],
        [11, 2], [11, 3], [11, 4], [11, 5], [11, 7], [11, 17], [11, 18], [11, 19], [11, 20],
        [12, 2], [12, 3], [12, 5], [12, 7], [12, 15], [12, 17], [12, 19], [12, 20],
        [13, 2], [13, 3], [13, 4], [13, 5], [13, 7], [13, 15], [13, 17], [13, 18], [13, 19], [13, 20],
        [14, 2], [14, 5], [14, 6], [14, 7], [14, 15], [14, 16], [14, 17], [14, 20],
        [15, 2], [15, 3], [15, 4], [15, 5], [15, 7], [15, 15], [15, 17], [15, 18], [15, 19], [15, 20],
        [16, 2], [16, 3], [16, 5], [16, 7], [16, 8], [16, 9], [16, 10], [16, 12], [16, 13], [16, 14], [16, 15], [16, 17], [16, 19], [16, 20],
        [17, 2], [17, 3], [17, 4], [17, 5], [17, 7], [17, 9], [17, 13], [17, 15], [17, 17], [17, 18], [17, 19], [17, 20],
        [18, 2], [18, 5], [18, 6], [18, 7], [18, 9], [18, 13], [18, 15], [18, 16], [18, 17], [18, 20],
        [19, 2], [19, 3], [19, 4], [19, 5], [19, 7], [19, 9], [19, 10], [19, 12], [19, 13], [19, 15], [19, 17], [19, 18], [19, 19], [19, 20],
        [20, 2], [20, 3], [20, 6], [20, 8], [20, 9], [20, 11], [20, 13], [20, 14], [20, 16], [20, 18], [20, 20], [20, 4], [20, 5], [20, 7], [20, 10], [20, 12], [20, 15], [20, 17], [20, 19],
    ],
    energyMap: [[11, 11]]
}];

var defaults = {
    level: 0,
    score: 0,
    lives: 3,
    pacman: {x:11, y:2, dir: 1, angle: 5, phase: 1, stack: [], timeLastMove: 0,  animateMoveId: 0,},
    ghosts: []
};

// Змінні стану гри
var map = {};
var level = 0;
var points = 0;
var score = 0;
var ghosteat = 0;
var lives = 0;
var pacman = {};
var moveCount = 0;
var moveDelay = 0;
var energy = 0;
var grafics = 1;

// Змінні для ГА
var gen = 0;
var restartCount = 0;
var unitsInGeneration = 10;
var maxScore = 0;
var desigionCounter = 0;
var stack = 0;
var avgPointsByGen = 0;
var avgPointsByGenPrew = 0;
var subavaragePointsByGen = 0;

// Сенсори
var sensors = {};
var sensorsCount = 0;
var turns = ["Right", "Down", "Left", "Up"];

// Графік
var genHistory = [];
var topResultHistory = [];
var genChart;

/* Блок обробки дій користувача */
elem.startbutton.onclick = function(){
    reset();
    start();
}

elem.pause.onclick = function(){
    continuation();
}

elem.win.onclick = function(){
    reset();
    start();
}

elem.lose.onclick = function(){
    reset();
    start();
}

document.onkeydown = function(e) {
    if(e.keyCode == 32){
        switch(state){
            case 'end':
            case 'start':
                reset();
                start();
                break;
            case 'play':
                pause();
                break;
            case 'pause':
                continuation();
                break;
        }
        return;
    }

    if(e.keyCode < 37 || e.keyCode > 40 || state != 'play'){
        return;
    }

    var dir;
    switch(e.keyCode){
        case 38: dir = 3; break;
        case 39: dir = 0; break;
        case 40: dir = 1; break;
        case 37: dir = 2; break;
    }

    if(Date.now() - pacman.timeLastMove > moveDelay){
        pacman.stack.push(dir);
        console.log("> move "+turns[dir]);
        return;
    }

    cleanObject(pacman);
    movePacman(dir);
    e.preventDefault();
}

/* Функції зміни стану гри */
function start(){
    state = "play";
    elem.start.style.display = 'none';
    elem.desc.style.display = 'block';
    elem.currentPointsAmount.textContent = 0;
    elem.pointsAmount.textContent = levels[level].pointsMap.length;

    checkMap();
    createMap();
    drawMap();
    drawPacman();

    // Ініціалізуємо нейромережу, якщо потрібно
    if (!NN.weights.length) {
        NN.initWeights();
    }

    animateMove();
}

function restart(){
    if (score > maxScore){
        NN.updateBestWeights(NN.weights, score);
        maxScore = score;
        console.log('Новий рекорд '+score+' points');
        elem.output.textContent = score;
        elem.persent.textContent = NN.persent;

        // Оновлюємо графік
        genHistory.push(gen);
        topResultHistory.push(score);
        if (genChart) {
            genChart.data.labels = genHistory;
            genChart.data.datasets[0].data = topResultHistory;
            genChart.update();
        }
    }

    restartCount++;
    console.log("restartCount "+restartCount);

    if(restartCount >= unitsInGeneration) {
        avgPointsByGen = avgPointsByGen / unitsInGeneration;
        restartCount = 0;
        gen++;

        if(avgPointsByGenPrew < avgPointsByGen){
            avgPointsByGenPrew = avgPointsByGen;
        }

        var subavarage = 100;
        subavaragePointsByGen = subavaragePointsByGen + avgPointsByGen;
        if(gen % subavarage == 0){
            subavaragePointsByGen = subavaragePointsByGen / subavarage;
            elem.exportData.textContent = elem.exportData.textContent + '\n === середнє за '+subavarage+' поколень: '+subavaragePointsByGen+'; ';
            subavaragePointsByGen = 0;
        }
        avgPointsByGen = 0;
    } else {
        avgPointsByGen = avgPointsByGen + score;
        reset();
        start();
    }

    elem.gen.textContent = gen + ' ' + restartCount;
}

function pause(){
    state = 'pause';
    elem.pause.style.display = 'block';
    stopAnimateMove();
}

function continuation(){
    state = 'play';
    elem.pause.style.display = 'none';
    animateMove();
}

function win() {
    state = 'end';
    elem.win.style.display = 'block';
    document.getElementsByClassName('allScores')[0].textContent = score;
    stopAnimateMove();
}

function lose() {
    state = 'end';
    elem.lose.style.display = 'block';
    document.getElementsByClassName('allScores')[1].textContent = score;
    stopAnimateMove();
}

/* Функції для роботи з картою */
function reset(){
    stopAnimateMove();
    desigionCounter = 0;
    stack = moveCount;
    ctx.clearRect(0, 0, elem.canvas.width, elem.canvas.height);
    elem.win.style.display = 'none';
    elem.lose.style.display = 'none';
    level = defaults.level;
    points = 0;
    moveCount = 0;
    score = defaults.score;
    lives = defaults.lives;
    pacman.stack = [];

    for(var key in defaults.pacman){
        pacman[key] = defaults.pacman[key];
    }
}

function checkMap(){
    var mapData = levels[level].obstaclesMap.concat(levels[level].pointsMap);
    for(var i = 0; i < mapData.length; i++){
        if(!isFinite(mapData[i][0]) || !isFinite(mapData[i][1]) || mapData[i][0] <= 0 || mapData[i][1] <= 0 || mapData[i][0] % 1 != 0 || mapData[i][1] % 1 != 0){
            throw new Error('Map Error: incorrect coordinates ' + mapData[i][0] + ', ' + mapData[i][1]);
        }
        for(var j = 0; j < mapData.length; j++){
            if(mapData[i][0] == mapData[j][0] && mapData[i][1] == mapData[j][1] && mapData[i] != mapData[j]){
                throw new Error('Map Error: intersection objects');
            }
        }
    }
}

function createMap(){
    for(var key in levels[level]){
        if(typeof(levels[level][key]) == 'object'){
            map[key] = [];
            map[key] = levels[level][key].slice();
        } else {
            map[key] = levels[level][key];
        }
    }
}

function drawMap(){
    if(grafics == 1){
        ctx.fillStyle = '#000232';
        for(var i = 0; i < levels[level].obstaclesMap.length; i++){
            ctx.fillRect((levels[level].obstaclesMap[i][0] - 1) * cellSize, (levels[level].obstaclesMap[i][1] - 1) * cellSize, cellSize, cellSize);
        }

        ctx.fillStyle = '#a7a6a7';
        for(var i = 0; i < levels[level].specialObstaclesMap.length; i++){
            ctx.fillRect((levels[level].specialObstaclesMap[i][0] - 1) * cellSize, (levels[level].specialObstaclesMap[i][1] - 1) * cellSize, cellSize, cellSize);
        }

        ctx.fillStyle = '#ffffff';
        for(var i = 0; i < levels[level].pointsMap.length; i++){
            ctx.beginPath();
            ctx.arc((levels[level].pointsMap[i][0] - 0.5) * cellSize, (levels[level].pointsMap[i][1] - 0.5) * cellSize, 0.1 *cellSize, 0, Math.PI * 2, true);
            ctx.fill();
        }

        for(var i = 0; i < levels[level].energyMap.length; i++){
            ctx.beginPath();
            ctx.arc((levels[level].energyMap[i][0] - 0.5) * cellSize, (levels[level].energyMap[i][1] - 0.5) * cellSize, 0.25 *cellSize, 0, Math.PI * 2, true);
            ctx.fill();
        }
    }
}

function cleanObject(object) {
    ctx.clearRect((object.x - 1) * cellSize, (object.y - 1) * cellSize, cellSize, cellSize);
}

/* Функції для роботи з пакменом */
function drawPacman() {
    if(grafics==1){
        var center = {x: (pacman.x - 0.5) * cellSize, y: (pacman.y - 0.5) * cellSize}
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        if(pacman.angle == 0){
            ctx.arc(center.x, center.y, cellSize / 2.25, Math.PI * pacman.dir / 2, Math.PI * pacman.dir / 2 + Math.PI * 2, false);
        } else {
            ctx.arc(center.x, center.y, cellSize / 2.25, Math.PI * pacman.dir / 2 - Math.PI * 0.05 * pacman.angle, Math.PI * pacman.dir / 2 + Math.PI * 0.05 * pacman.angle, true);
        }
        ctx.lineTo(center.x, center.y);
        ctx.closePath();
        ctx.fill();
    }
}

function movePacman(dir) {
    if(typeof(dir) == "undefined"){
        dir = makeDesigion();
    }
    console.log('function movePacman '+dir);

    var x = pacman.x, y = pacman.y;

    switch(dir){
        case 3: y--; break;
        case 0: x++; break;
        case 1: y++; break;
        case 2: x--; break;
    }

    if(x < 1 || y < 1 || x > cellAmount || y > cellAmount){
        if(dir != pacman.dir){
            // movePacman(pacman.dir);
        } else {
            console.log('error moving to cellAmount');
        }
        return;
    }

    for(var i = 0; i < levels[level].obstaclesMap.length; i++){
        if(x == levels[level].obstaclesMap[i][0] && y == levels[level].obstaclesMap[i][1]){
            if(dir != pacman.dir){
                // movePacman(pacman.dir);
            } else {
                console.log('error moving to obstaclesMap dir'+dir+' != pacman.dir'+pacman.dir);
            }
            return;
        }
    }

    for(var i = 0; i < levels[level].specialObstaclesMap.length; i++){
        if(x == levels[level].specialObstaclesMap[i][0] && y == levels[level].specialObstaclesMap[i][1]){
            if(dir != pacman.dir){
                // movePacman(pacman.dir);
            }
            return;
        }
    }

    cleanObject(pacman);
    pacman.x = x;
    pacman.y = y;
    pacman.dir = dir;
    drawPacman();
    eatPoint();

    console.log(">>>> next move");
    elem.move.textContent = moveCount++;
}

function eatPoint(){
    for(var i = 0; i < map.pointsMap.length; i++){
        if(pacman.x == map.pointsMap[i][0] && pacman.y == map.pointsMap[i][1]){
            score++;
            elem.currentScore.textContent = score;
            map.pointsMap.splice(i, 1);

            elem.currentPointsAmount.textContent = (levels[level].pointsMap.length - map.pointsMap.length);
            if(map.pointsMap.length == 0){
                win();
            }
            break;
        }
    }
}

function animateMove(){
    pacman.animateMoveId = setInterval(function() {
        if(pacman.stack.length > 0){
            movePacman(pacman.stack.shift());
        } else {
            movePacman();
        }
        checkIfstack();
        console.log('animateMove'+moveDelay)
    }, moveDelay);
}

function stopAnimateMove(){
    clearInterval(pacman.animateMoveId);
}

/* Функції для сенсорів */
function setSensors(){
    sensorsCount = 0;

    const dirs = [
        {dx: -1, dy: 0, o: "oLeft", p: "pLeft"},
        {dx: 1, dy: 0, o: "oRight", p: "pRight"},
        {dx: 0, dy: -1, o: "oUp", p: "pUp"},
        {dx: 0, dy: 1, o: "oDown", p: "pDown"}
    ];

    dirs.forEach(dir => {
        sensors[dir.o] = hasObstacle(pacman.x + dir.dx, pacman.y + dir.dy) ? 1 : 0;
        sensors[dir.p] = hasPoint(pacman.x + dir.dx, pacman.y + dir.dy) ? 1 : 0;
        sensorsCount += 2;

        if(grafics == 1 && sensors[dir.o]) {
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc((pacman.x + dir.dx - 0.5) * cellSize, (pacman.y + dir.dy - 0.5) * cellSize, cellSize / 7, 0, Math.PI * 2, false);
            ctx.fill();
        }

        if(grafics == 1 && sensors[dir.p]) {
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc((pacman.x + dir.dx - 0.5) * cellSize, (pacman.y + dir.dy - 0.5) * cellSize, cellSize / 20, 0, Math.PI * 2, false);
            ctx.fill();
        }
    });

    if(grafics == 1){
        let input = Object.entries(sensors).map(([k, v]) => `${k} = ${v}`).join("; ");
        elem.input.textContent = input;
    }
}

function hasObstacle(x, y) {
    return map.obstaclesMap.some(([ox, oy]) => ox === x && oy === y);
}

function hasPoint(x, y) {
    return map.pointsMap.some(([px, py]) => px === x && py === y);
}

/* Функція прийняття рішення */
function makeDesigion(){
    setSensors();
    let dir = NN.chooseDirection(sensors, pacman.dir);

    let output = NN.getLastOutput();
    elem.exportData.textContent = turns.map((t, i) => `${t} = ${output[i]}`).join('\n');

    pacman.stack.push(dir);
    console.log("> i think " + turns[dir] + dir);

    desigionCounter++;
    return dir;
}

/* Перевірка зациклення */
function checkIfstack(){
    if(desigionCounter > 1){
        stack++;
        if(stack - moveCount > 10){
            restart();
        }
    }
    if(moveCount > 400){
        restart();
    }
}

/* Ініціалізація */
window.onload = function() {
    // Ініціалізація графіка
    var ctxChart = document.getElementById('genChart').getContext('2d');
    genChart = new Chart(ctxChart, {
        type: 'line',
        data: {
            labels: genHistory,
            datasets: [{
                label: 'Top Result (output)',
                data: topResultHistory,
                borderColor: 'rgba(255, 205, 86, 1)',
                backgroundColor: 'rgba(255, 205, 86, 0.2)',
                fill: true,
                tension: 0.2,
                pointRadius: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: 'Generation' } },
                y: { title: { display: true, text: 'Top Result (output)' } }
            }
        }
    });
};
