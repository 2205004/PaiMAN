function drawPacmanLetter(){//Отрисовка пакмана для заголовка
  var canvas = document.getElementById('pacman-letter'),
  ctx = canvas.getContext("2d"),
  center = {x: canvas.width / 2, y: canvas.width / 2};

  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(center.x, center.y, canvas.width / 2, Math.PI * 0 / 2 - Math.PI * 0.05 * 5, Math.PI * 0 / 2 + Math.PI * 0.05 * 5, true);
  ctx.lineTo(center.x, center.y);
  ctx.closePath();
  ctx.fill();
}
drawPacmanLetter();

/* Основные переменные */
var elem = {
  canvas: document.getElementById("canvas"),
  start: document.getElementById('start'),
  pause: document.getElementById('pause'),
  win: document.getElementById('win'),
  lose: document.getElementById('lose'),
  desc: document.getElementById('desc'),
  level: document.getElementById('level'),
  currentPointsAmount: document.getElementById('currentPointsAmount'),
  pointsAmount: document.getElementById('pointsAmount'),
  currentScore: document.getElementById('currentScore'),
  currentLifes: document.getElementById('currentLives')
}, 
  state = "start",
  ctx = elem.canvas.getContext("2d"),
  cellAmount = 21, 
  cellSize = elem.canvas.width / cellAmount,
  levels = [{
    obstaclesMap: [
      [1, 6], [1, 16],
      [2, 2], [2, 4], [2, 6], [2, 8], [2, 9], [2, 11], [2, 13], [2, 14], [2, 16], [2, 18], [2, 20],
      [3, 6], [3, 8], [3, 11], [3, 14], [3, 16],
      [4, 2], [4, 3], [4, 4], [4, 8], [4, 10], [4, 11], [4, 12], [4, 14], [4, 18], [4, 19], [4, 20],
      [5, 6], [5, 8], [5, 10], [5, 11], [5, 12], [5, 14], [5, 16],
      [6, 2], [6, 4], [6, 6], [6, 11], [6, 16], [6, 18], [6, 20],
      [7, 6], [7, 8], [7, 9], [7, 11], [7, 13], [7, 14], [7, 16],
      [8, 2], [8, 3], [8, 4], [8, 8], [8, 14], [8, 18], [8, 19], [8, 20],
      [9, 6], [9, 10], [9, 11], [9, 8], [9, 12], [9, 14], [9, 16],
      [10, 2], [10, 4], [10, 6], [10, 10], [10, 12], [10, 16], [10, 18], [10, 20],
      [11, 6], [11, 8], [11, 12], [11, 14], [11, 16],
      [12, 2], [12, 4], [12, 6], [12, 10], [12, 12], [12, 16], [12, 18], [12, 20],
      [13, 6], [13, 8], [13, 10], [13, 11], [13, 12], [13, 14], [13, 16], 
      [14, 2], [14, 3], [14, 4], [14, 8], [14, 14], [14, 18], [14, 19], [14, 20],
      [15, 6], [15, 8], [15, 9], [15, 11], [15, 13], [15, 14], [15, 16],
      [16, 2], [16, 4], [16, 6], [16, 11], [16, 16], [16, 18], [16, 20],
      [17, 6], [17, 8], [17, 10], [17, 11], [17, 12], [17, 14], [17, 16],
      [18, 2], [18, 3], [18, 4], [18, 8], [18, 10], [18, 11], [18, 12], [18, 14], [18, 18], [18, 19], [18, 20],
      [19, 6], [19, 8], [19, 11], [19, 14], [19, 16],
      [20, 2], [20, 4], [20, 6], [20, 8], [20, 9], [20, 11], [20, 13], [20, 14], [20, 16], [20, 18], [20, 20],
      [21, 6], [21, 16]
    ], 
    specialObstaclesMap: [[11, 10]],
    pointsMap: [
      [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 7], [1, 8], [1, 9], [1, 10], [1, 11], [1, 12], [1, 13], [1, 14], [1, 15], [1, 17], [1, 18], [1, 19], [1, 20], [1, 21],
      [2, 1], [2, 5], [2, 7], [2, 10], [2, 12], [2, 15], [2, 17], [2, 21],
      [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 7], [3, 9], [3, 10], [3, 12], [3, 13], [3, 15], [3, 17], [3, 18], [3, 19], [3, 20], [3, 21],
      [4, 1], [4, 5], [4, 6], [4, 7], [4, 9], [4, 13], [4, 15], [4, 16], [4, 17], [4, 21],
      [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 7], [5, 9], [5, 13], [5, 15], [5, 17], [5, 18], [5, 19], [5, 20], [5, 21],
      [6, 1], [6, 5], [6, 7], [6, 8], [6, 9], [6, 10], [6, 12], [6, 13], [6, 14], [6, 15], [6, 17], [6, 21],
      [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 7], [7, 15], [7, 17], [7, 18], [7, 19], [7, 20], [7, 21],
      [8, 1], [8, 5], [8, 6], [8, 7], [8, 15], [8, 16], [8, 17], [8, 21],
      [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 7], [9, 15], [9, 17], [9, 18], [9, 19], [9, 20], [9, 21],
      [10, 1], [10, 3], [10, 5], [10, 7], [10, 15], [10, 17], [10, 19], [10, 21],
      [11, 1], [11, 2], [11, 3], [11, 4], [11, 5], [11, 7], [11, 17], [11, 18], [11, 19], [11, 20], [11, 21],
      [12, 1], [12, 3], [12, 5], [12, 7], [12, 15], [12, 17], [12, 19], [12, 21],
      [13, 1], [13, 2], [13, 3], [13, 4], [13, 5], [13, 7], [13, 15], [13, 17], [13, 18], [13, 19], [13, 20], [13, 21],
      [14, 1], [14, 5], [14, 6], [14, 7], [14, 15], [14, 16], [14, 17], [14, 21],
      [15, 1], [15, 2], [15, 3], [15, 4], [15, 5], [15, 7], [15, 15], [15, 17], [15, 18], [15, 19], [15, 20], [15, 21],
      [16, 1], [16, 5], [16, 7], [16, 8], [16, 9], [16, 10], [16, 12], [16, 13], [16, 14], [16, 15], [16, 17], [16, 21],
      [17, 1], [17, 2], [17, 3], [17, 4], [17, 5], [17, 7], [17, 9], [17, 13], [17, 15], [17, 17], [17, 18], [17, 19], [17, 20], [17, 21],
      [18, 1], [18, 5], [18, 6], [18, 7], [18, 9], [18, 13], [18, 15], [18, 16], [18, 17], [18, 21],
      [19, 1], [19, 2], [19, 3], [19, 4], [19, 5], [19, 7], [19, 9], [19, 10], [19, 12], [19, 13], [19, 15], [19, 17], [19, 18], [19, 19], [19, 20], [19, 21],
      [20, 1], [20, 5], [20, 7], [20, 10], [20, 12], [20, 15], [20, 17], [20, 21],
      [21, 1], [21,2], [21,3], [21, 4], [21, 5], [21, 7], [21, 8], [21, 9], [21, 10], [21, 11], [21, 12], [21, 13], [21, 14], [21, 15], [21, 17], [21, 18], [21, 19], [21, 20], [21, 21]
    ],
    energyMap: [[2, 3],   [20, 19]]
  }, 
  {/*level 2*/}, {/*level 3*/}],
  defaults = {
    level: 0,
    score: 0,
    lives: 3,
    pacman: {x:11, y:15, dir: 3, angle: 5, phase: 1, stack: [], timeLastMove: 0, animateMouthId: 0, animateMoveId: 0,},
    ghosts: [
      {type: 'Blinky', x: 11, y: 11, dir: 0, stack: []},
      {type: 'Pinky', x: 10, y: 11, dir: 0, stack: []},
      {type: 'Inky', x: 12, y: 11, dir: 0, stack: []}
    ]
  },
  map = {},
  level = 0,
  points = 0,
  score = 0,
  lives = 0,
  pacman = {},
  animateGhostsId = 0,
  moveDelay = 250,
  ghosts = [],
  ghostsMoveDelay = 500,
  energy = 0;
/* Конец основных переменных */

/* Блок обрабтки действий пользователя */
elem.start.onclick = function(){
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

document.onkeydown = function(e) {//реакция на нажиние клавиш
  if(e.keyCode == 32){//если пробел
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

  if(e.keyCode < 37 || e.keyCode > 40 || state != 'play'){//если не клавиши движения
    return;
  }

  var dir;
  switch(e.keyCode){// 0 - вправо, 1 - вниз, 2 - влево, 3 - вверх
    case 38: dir = 3;
      break;
    case 39: dir = 0;
      break;
    case 40: dir = 1;
      break;
    case 37: dir = 2;
      break;
  }

  if(Date.now() - pacman.timeLastMove > moveDelay){//
      pacman.stack.push(dir);
      return;
  }

  cleanObject(pacman);
  movePacman(dir);

  e.preventDefault();
}
/* Конец блока обработки действий пользователя */

/* Блок фукнций по изменению состояния игры */
function start(){
  state = "play";
  elem.start.style.display = 'none';
  elem.desc.style.display = 'block';
  elem.currentPointsAmount.textContent = 0
  elem.pointsAmount.textContent = levels[level].pointsMap.length;//указание общего количества точек на уровне
  
  checkMap();
  createMap();
  drawMap();
  drawPacman();//Начальная отрисовка пакмана
  for(var i = 0; i < ghosts.length; i++){
    drawGhost(i);
  }

  animateMouth();
  animateMove();
  animateGhosts();
}

function pause(){
  state = 'pause';
  elem.pause.style.display = 'block';

  stopAnimateMouth();
  stopAnimateMove();
  stopAnimateGhosts();
}

function continuation(){
  state = 'play';
  elem.pause.style.display = 'none';

  animateMouth();
  animateMove();
  animateGhosts();
}

function win() {
  state = 'end';
  elem.win.style.display = 'block';
  document.getElementsByClassName('allScores')[0].textContent = score;

  stopAnimateMouth();
  stopAnimateMove();
  stopAnimateGhosts();
}

function lose() {
  state = 'end';
  elem.lose.style.display = 'block';
  document.getElementsByClassName('allScores')[1].textContent = score;

  stopAnimateMouth();
  stopAnimateMove();
  stopAnimateGhosts();
}
/* Конец блока фукнций по изменению состояния игры */

function reset(){// Восстановление начальных показателей
  ctx.clearRect(0, 0, elem.canvas.width, elem.canvas.height);
  elem.win.style.display = 'none';
  elem.lose.style.display = 'none';
  level = defaults.level, points = 0, score = defaults.score, lives = defaults.lives, pacman.stack = []; 
  for(var key in defaults.pacman){
    pacman[key] = defaults.pacman[key];
  }
  for(var i = 0; i < defaults.ghosts.length; i++){
    ghosts[i] = {};
    for(var key in defaults.ghosts[i]){
      ghosts[i][key] = defaults.ghosts[i][key];
    }
  }
}

/* Блок функций для работы с картой */
function checkMap(){
  var map = levels[level].obstaclesMap.concat(levels[level].pointsMap);
  for(var i = 0; i < map.length; i++){
    if(!isFinite(map[i][0]) || !isFinite(map[i][1]) || map[i][0] <= 0 || map[i][1] <= 0 || map[i][0] % 1 != 0 || map[i][1] % 1 != 0){
      throw new Error('Map Error: incorrect coordinates ' + map[i][0] + ', ' + map[i][1]);
    }
    for(var j = 0; j < map.length; j++){
      if(map[i][0] == map[j][0] && map[i][1] == map[j][1] && map[i] != map[j]){
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
    }
    else{
      map[key] = levels[level][key];
    }
  }
}

function drawMap(){
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
/* Конец блока функций для работы с картой */



function cleanObject(object) {//Стирание объекта
	ctx.clearRect((object.x - 1) * cellSize, (object.y - 1) * cellSize, cellSize, cellSize);
}

/* Блок фукнций для работы пакмана */
function drawPacman() {//Отрисовка пакмана
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

function movePacman(dir) {
  var x = pacman.x, y = pacman.y;
  
  switch(dir){
    case 3: y--;
      break;
    case 0: x++;
      break;
    case 1: y++;
      break;
    case 2: x--;
      break;
  }
  
  if(x < 1 || y < 1 || x > cellAmount || y > cellAmount){
    if(dir != pacman.dir){
      movePacman(pacman.dir);
    }
    return;
  }
  for(var i = 0; i < levels[level].obstaclesMap.length; i++){
    if(x == levels[level].obstaclesMap[i][0] && y == levels[level].obstaclesMap[i][1]){
      if(dir != pacman.dir){
        movePacman(pacman.dir);
      }
      return;
    }
  }
  for(var i = 0; i < levels[level].specialObstaclesMap.length; i++){
    if(x == levels[level].specialObstaclesMap[i][0] && y == levels[level].specialObstaclesMap[i][1]){
      if(dir != pacman.dir){
        movePacman(pacman.dir);
      }
      return;
    }
  }
  
  cleanObject(pacman);
  pacman.x = x, pacman.y = y, pacman.dir = dir;
  isMeetGhost();
  drawPacman();
  eatPoint();
  eatEnergy();

  if(energy > 0){
    energy--;
    if(energy == 0){
      dontHaveEnergy();
    }
  }
}

function eatPoint(){
  for(var i = 0; i < map.pointsMap.length; i++){
    if(pacman.x == map.pointsMap[i][0] && pacman.y == map.pointsMap[i][1]){
      score += 100;
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

function eatEnergy(){
  for(var i = 0; i< map.energyMap.length; i++){
    if(pacman.x == map.energyMap[i][0] && pacman.y == map.energyMap[i][1]){
      energy += 40;
      map.energyMap.splice(i, 1);
      haveEnergy();
      console.log(energy)
      break;
    }
  }
}

function haveEnergy(){
  stopAnimateMove();
  stopAnimateMouth();
  stopAnimateGhosts();

  moveDelay = 100;
  ghostsMoveDelay = 1000;

  for(var i = 0; i < ghosts.length; i++){
    cleanObject(ghosts[i]);
    drawGhost(i);
  }

  animateMove();
  animateMouth();
  animateGhosts();
}

function dontHaveEnergy(){
  stopAnimateMove();
  stopAnimateMouth();
  stopAnimateGhosts();

  moveDelay = 250;
  ghostsMoveDelay = 500;

  for(var i = 0; i < ghosts.length; i++){
    cleanObject(ghosts[i]);
    drawGhost(i);
  }

  animateMove();
  animateMouth();
  animateGhosts();
}

function animateMouth(){//анимация рта
  pacman.animateMouthId = setInterval(function() {//анимация рта
    cleanObject(pacman);
    if(pacman.phase == 1){
      if(pacman.angle == 5){
        pacman.phase = 0;
      } else {
        pacman.angle++;
      } 
    } else {
      if(pacman.phase == 0){
        if(pacman.angle == 0){
          pacman.angle++;
          pacman.phase = 1
        } else {
          pacman.angle--;
        }
      }
    }
    drawPacman();
  }, moveDelay / 4)
}

function stopAnimateMouth(){
  clearInterval(pacman.animateMouthId);
}

function animateMove(){
  pacman.animateMoveId = setInterval(function() {
    if(pacman.stack.length > 0){
      movePacman(pacman.stack.shift());
    } else {
      movePacman(pacman.dir);
    }
  }, moveDelay)
}

function stopAnimateMove(){
  clearInterval(pacman.animateMoveId);
}
/* Конец блока фукнций для работы пакмана */

/* Блок функций для работы приведений */
function drawGhost(number){   
  var lbcorner = [ghosts[number].x - 1, ghosts[number].y];
  
  if (energy > 0){
    ctx.fillStyle = "blue";
  } else {
    switch(ghosts[number].type){
      case 'Blinky': ctx.fillStyle = "red";
        break;
      case 'Pinky': ctx.fillStyle = "pink";
        break;
      case 'Inky': ctx.fillStyle = '#b1d6e5';
        break;
    }
  }
  
  ctx.beginPath();
  ctx.moveTo((lbcorner[0] + 0.05) * cellSize, (lbcorner[1] - 0.05) * cellSize);
  ctx.lineTo((lbcorner[0] + 0.05) * cellSize, (lbcorner[1] - 0.4) * cellSize);
  ctx.bezierCurveTo(lbcorner[0] * cellSize, (lbcorner[1] - 1.1) * cellSize, (lbcorner[0] + 1) * cellSize, (lbcorner[1] - 1.1) * cellSize, (lbcorner[0] + 0.95) * cellSize, (lbcorner[1] - 0.4) * cellSize);
  ctx.lineTo((lbcorner[0] + 1 - 0.05) * cellSize, (lbcorner[1] - 0.05) * cellSize);
  ctx.lineTo((lbcorner[0] + 0.85 - 0.05) * cellSize, (lbcorner[1] - 0.25) * cellSize);
  ctx.lineTo((lbcorner[0] + 0.7 - 0.05) * cellSize, (lbcorner[1] - 0.05) * cellSize);
  ctx.lineTo((lbcorner[0] + 0.55 - 0.05) * cellSize, (lbcorner[1] - 0.25) * cellSize);
  ctx.lineTo((lbcorner[0] + 0.40 - 0.05) * cellSize, (lbcorner[1] - 0.05) * cellSize);
  ctx.lineTo((lbcorner[0] + 0.25 - 0.05) * cellSize, (lbcorner[1] - 0.25) * cellSize);
  ctx.closePath();
  ctx.fill();
  
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc((lbcorner[0] + 0.3) * cellSize, (lbcorner[1] - 0.55) * cellSize, cellSize / 7, Math.PI * 2, false);
  ctx.arc((lbcorner[0] + 0.7) * cellSize, (lbcorner[1] - 0.55) * cellSize, cellSize / 7, Math.PI * 2, false);  
  ctx.fill();
  
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc((lbcorner[0] + 0.3) * cellSize, (lbcorner[1] - 0.55) * cellSize, cellSize / 14, Math.PI * 2, false);
  ctx.arc((lbcorner[0] + 0.7) * cellSize, (lbcorner[1] - 0.55) * cellSize, cellSize / 14, Math.PI * 2, false);  
  ctx.fill();
}

function AI(){
  for(var i = 0; i < ghosts.length; i++){
    if(ghosts[i].stack.length > 0){
      moveGhost(i);
      return;
    }
    if((ghosts[i].x == 10 || ghosts[i].x == 11 || ghosts[i].x == 12) && ghosts[i].y == 11){
      switch(ghosts[i].x){
        case 10:
          ghosts[i].stack.push('wait');
          ghosts[i].stack.push(0);
          ghosts[i].stack.push(3);
          break;
        case 11:
          ghosts[i].stack.push(3);
          break;
        case 12:
          ghosts[i].stack.push('wait');
          ghosts[i].stack.push('wait');
          ghosts[i].stack.push(2);
          ghosts[i].stack.push(3);
          break;
      }
      moveGhost(i);
      return;
    }

    var emptyCells = [];
    addEmptySell(ghosts[i].x - 1, ghosts[i].y, 2);
    addEmptySell(ghosts[i].x + 1, ghosts[i].y, 0);
    addEmptySell(ghosts[i].x, ghosts[i].y - 1, 3);
    addEmptySell(ghosts[i].x, ghosts[i].y + 1, 1);

    function addEmptySell(x, y, dir){//проверка доступности клетки для движения приведения
      if(x == 11 && y == 10){
        return;
      }
      if(x == 0 || x == 22 || y == 0 || y == 22){
        return;
      }
      if(Math.max(ghosts[i].dir, dir) - Math.min(ghosts[i].dir, dir) == 2){
        return;
      }
      for(var j = 0; j < levels[level].obstaclesMap.length; j++){
        if(levels[level].obstaclesMap[j][0] == x && levels[level].obstaclesMap[j][1] == y){
          return;
        }
      }
      for(var k = 0; k < ghosts.length; k++){
        if(k == i){
          continue;
        }
        if(ghosts[k].x == x && ghosts[k].y == y){
          emptyCells.push([x, y, dir, Infinity]);
          return;
        }
      }
      emptyCells.push([x, y, dir]);
    }

    if(emptyCells.length == 0 || emptyCells.length > 3){
      throw new Error('AI error');
    }
    for(var j = 0; j < emptyCells.length; j++){
      if(emptyCells[j][3] == Infinity){
        break;
      }
      switch(ghosts[i].type){
        case 'Blinky': 
          emptyCells[j][3] = Math.sqrt(Math.pow(pacman.x - emptyCells[j][0], 2) + Math.pow(pacman.y - emptyCells[j][1], 2));
          break;
        case 'Pinky':
          emptyCells[j][3] = Math.sqrt(Math.pow(pacman.x - emptyCells[j][0] + 3, 2) + Math.pow(pacman.y - emptyCells[j][1] + 3, 2));
          break;
        case 'Inky':
          emptyCells[j][3] = Math.sqrt(Math.pow(pacman.x - emptyCells[j][0] - 3, 2) + Math.pow(pacman.y - emptyCells[j][1] - 3, 2));
          break;
      }
      
    }

    emptyCells.sort(function(a, b){
      if(a[3] - b[3] == 0){
        return Math.random() > 0.5 ? 1 : 0;
      }
      return pacman.energy > 0 ? b[3] - a[3] : a[3] - b[3];
    })

    ghosts[i].dir = emptyCells[0][2];
    moveGhost(i);
    isMeetGhost();
  }
}

function moveGhost(number){
  if( ghosts[number].stack.length > 0){
    ghosts[number].dir = ghosts[number].stack.shift();

    if(ghosts[number].dir == 'wait'){
      return;
    }
  }

  cleanObject(ghosts[number]);

  for(var i = 0; i < map.pointsMap.length; i++){
    if(ghosts[number].x == map.pointsMap[i][0] && ghosts[number].y == map.pointsMap[i][1]){
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc((map.pointsMap[i][0] - 0.5) * cellSize, (map.pointsMap[i][1] - 0.5) * cellSize, 0.1 *cellSize, 0, Math.PI * 2, true);
      ctx.fill();
      break;
    }
  }

  for(var i = 0; i < map.energyMap.length; i++){
    if(ghosts[number].x == map.energyMap[i][0] && ghosts[number].y == map.energyMap[i][1]){
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc((map.energyMap[i][0] - 0.5) * cellSize, (map.energyMap[i][1] - 0.5) * cellSize, 0.25 *cellSize, 0, Math.PI * 2, true);
      ctx.fill();
      break;
    }
  }

  for(var i = 0; i < map.specialObstaclesMap.length; i++){
    if(ghosts[number].x == map.specialObstaclesMap[i][0] && ghosts[number].y == map.specialObstaclesMap[i][1]){
      ctx.fillStyle = '#b9b7b9';
      ctx.fillRect((map.specialObstaclesMap[i][0] - 1) * cellSize, (map.specialObstaclesMap[i][1] - 1) * cellSize, cellSize, cellSize);
      break;
    }
  }

  switch(ghosts[number].dir){
    case 3: ghosts[number].y--;
      break;
    case 0: ghosts[number].x++;
      break;
    case 1: ghosts[number].y++;
      break;
    case 2: ghosts[number].x--;
      break;
  }

  drawGhost(number);
}

function isMeetGhost(){//проверка встречи приведения и пакмана
  for(var i = 0; i < ghosts.length; i++){
    if(pacman.x == ghosts[i].x && pacman.y == ghosts[i].y){
      if(energy > 0){
        for(var j = 0; j < ghosts.length; j++){
          if(j == i){
            continue;
          }
          if(ghosts[j].x != 11 && ghosts[j].y != 11){
            ghosts[i].x = 11;
            ghosts[i].y = 11;
          } else if(ghosts[j].x != 10 && ghosts[j].y != 11){
            ghosts[i].x = 10;
            ghosts[i].y = 11;
          }else {
            ghosts[i].x = 12;
            ghosts[i].y = 11;
          }

          drawGhost(i);
          ghosts[i].stack.unshift('wait');
          ghosts[i].stack.unshift('wait');
          ghosts[i].stack.unshift('wait');
          ghosts[i].stack.unshift('wait');
          ghosts[i].stack.unshift('wait'); 

          score += 400;
          elem.currentScore.textContent = score;

          return;
        }
      } else {
        lose();
      }
    }
  }
}

function animateGhosts(){
  animateGhostsId = setInterval(function() {
    AI();
  }, ghostsMoveDelay)
}

function stopAnimateGhosts(){
  clearInterval(animateGhostsId);
}
/* Конец блока функций для работы приведений */

function lostLife(){

}