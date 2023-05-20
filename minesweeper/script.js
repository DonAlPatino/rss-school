import Cell from './cell.js';
import playSound from './playsound.js';
import { pad, getElement } from './util.js';

let rows = 10; // number of rows in the grid
let cols = 10; // number of columns in the grid
let mines = 10; // number of mines in the grid

let data = [];

let gameStatus = 'Stop';
let gameDuration = 0;
let moveCount = 0;
let openCells = 0;
let usedFlag = 0;
let mineRemain = mines - usedFlag;

let soundOn = true;
let darkTheme = false;

const { body } = document;

const container = document.createElement('div');
container.className = 'container';
body.appendChild(container);

let content = '';

content += '<header class="header"><h1>Minesweeper</h1></header>';
content += '<div class = menu__block>';
if (localStorage['minesweeper.data']) {
  content += '<button class = "btn">Load</button>';
}
content += '<input id="idMines" class = "input" type="text" value="10" size="2" maxlength="2">';
/* content += '<button class = "btn">Easy</button>';
content += '<button class = "btn">Medium</button>';
content += '<button class = "btn">Hard</button>'; */
content += '<select class = "btn" name="level" id="idLevel">';
content += '<option class = "btn" selected value="Easy">Easy</option>';
content += '<option value="Medium">Medium</option>';
content += '<option value="Hard">Hard</option>';
content += '</select>';
content += '<button class = "btn">Start</button>';
content += '</div>';
content += '<div class = menu__block>';
content += '<span>Click: <span id="idMovesCount">0</span></span>';
content += '<span>Status: <span id="idStatus">Stop</span></span>';
content += '<span>Time:<span id = "hour">00</span>:<span id="minute">00</span >:<span id="second">00</span>:<span id="millisecond">00</span></span>';
content += '</div>';
content += '<div class = menu__block>';
content += '<span>Used Flag: <span id="idUsedFlag">0</span></span>';
content += '<span>Remain Mines: <span id="idMineRemain">10</span></span>';
content += '</div>';
content += '<div class = menu__block>';
content += '<div class = swtContainer><span>Sound on/off  </span><span id="idSndBtn" class="switch-btn switch-on"></span></div>';
content += '<div class = swtContainer><span>Light</span><span id="idThemeBtn" class="switch-btn"></span><span>Dark</span></div>';
content += '</div>';
container.innerHTML = content;

const sndBtn = document.getElementById('idSndBtn');
sndBtn.addEventListener('click', (e) => {
  const { target } = e;
  target.classList.toggle('switch-on');
  soundOn = !soundOn;
});

const themeBtn = document.getElementById('idThemeBtn');
themeBtn.addEventListener('click', (e) => {
  const { target } = e;
  target.classList.toggle('switch-on');
});

function startGame() {
  window.clearInterval(window.timerId);
  gameStatus = 'Start';
  gameDuration = 0;
  moveCount = 0;
  openCells = 0;
  usedFlag = 0;
  mineRemain = mines - usedFlag;
  render(false);
  document.getElementById('idStatus').textContent = gameStatus;
  document.getElementById('idMovesCount').textContent = moveCount;
  document.getElementById('idUsedFlag').textContent = usedFlag.toString();
  document.getElementById('idMineRemain').textContent = mineRemain.toString();
  startTimer();
}

const btnLevel = document.querySelectorAll('.btn');
btnLevel.forEach((element) => element.addEventListener('click', (e) => {
  const { target } = e;
  const minesInput = document.getElementById('idMines');
  mines = parseInt(minesInput.value, 10);
  switch (target.innerHTML) {
    case 'Load': loadGame(); break;
    case 'Start': startGame(); break;
    default: break;
  }
}));

const selectLevel = document.getElementById('idLevel');
selectLevel.addEventListener('click', (e) => {
  const { target } = e;
  const level = target.value;
  switch (level) {
    case 'Medium':
      rows = 15;
      cols = 15;
      break;
    case 'Hard':
      rows = 25;
      cols = 25;
      break;
    default:
      rows = 10;
      cols = 10;
      break;
  }
});

const gameContainer = document.createElement('div');
gameContainer.className = 'gameContainer';

function render(loadData) {
  content = '';
  for (let r = 0; r < rows; r += 1) {
    content += '<div class="row">';
    for (let c = 0; c < cols; c += 1) {
      let addClass = '';
      let txt = '';
      if (loadData) {
        const cell = data[r][c];
        if (cell.isFlagged) {
          addClass = 'cell__flagged';
        } else if (cell.isOpen) {
          addClass = (cell.value > 0) ? `cell__${cell.value}` : 'cell__opened';
          txt = (!cell.isMine ? cell.value || '' : '');
        }
      } else {
        for (let r = 0; r < rows; r++) {
          data[r] = [];
          for (let c = 0; c < cols; c++) {
            data[r].push(new Cell(c, r));
          }
        }
      }
      content += `<div class="cell ${addClass}" data-xpos="${c}" data-ypos="${r}">${txt}</div>`;
    }
    content += '</div>';
  }

  gameContainer.innerHTML = content;
  container.appendChild(gameContainer);
}

render(false);

function win() {
  let winners = [];
  localStorage.removeItem('minesweeper.data');
  gameStatus = 'Win';
  document.getElementById('idStatus').textContent = gameStatus;
  playSound('sounds/win.wav', soundOn);
  window.clearInterval(window.timerId);
  const winner = { moveCount, gameDuration };
  if (localStorage['minesweeper.winner']) {
    winners = JSON.parse(localStorage['minesweeper.winner']);
    if (winners.length > 9) winners.shift();
  }
  winners.push(winner);
  localStorage['minesweeper.winner'] = JSON.stringify(winners);
}
function lost() {
  localStorage.removeItem('minesweeper.data');
  playSound('sounds/lose_flowergarden_long.wav', soundOn);
  gameStatus = 'Lost';
  document.getElementById('idStatus').textContent = gameStatus;
  window.clearInterval(window.timerId);
}
function saveGame() {
  const stateData = {
    data,
    rows,
    cols,
    mines,
    moveCount,
    openCells,
    gameStatus,
    gameDuration,
    usedFlag,
    mineRemain,
    soundOn,
    darkTheme,
  };
  localStorage['minesweeper.data'] = JSON.stringify(stateData);
}
function startTimer() {
  window.timerId = setInterval(() => {
    gameDuration++;
    const milliseconds = (gameDuration % 10) * 10;
    const hours = Math.floor(gameDuration / 36000);
    const minutes = Math.floor((gameDuration - hours * 36000) / 600);
    const seconds = Math.floor((gameDuration - (hours * 36000 + minutes * 600)) / 10);
    document.getElementById('hour').innerHTML = pad(hours);
    document.getElementById('minute').innerHTML = pad(minutes);
    document.getElementById('second').innerHTML = pad(seconds);
    document.getElementById('millisecond').innerHTML = pad(milliseconds);
  }, 100);
}
function loadGame() {
  if (localStorage['minesweeper.data']) {
    const stateData = JSON.parse(localStorage['minesweeper.data']);
    ({
      data, rows, cols, mines, moveCount, openCells, gameStatus,
      gameDuration, usedFlag, mineRemain, soundOn, darkTheme,
    } = stateData);
    render(true);
    document.getElementById('idStatus').textContent = gameStatus;
    document.getElementById('idMovesCount').textContent = moveCount;
    document.getElementById('idUsedFlag').textContent = usedFlag.toString();
    document.getElementById('idMineRemain').textContent = mineRemain.toString();
    if (themeBtn) document.getElementsByClassName('switch-btn')[0].className = 'switch-btn switch-on';
    else document.getElementsByClassName('switch-btn')[0].className = 'switch-btn';
    if (soundOn) document.getElementsByClassName('switch-btn')[0].className = 'switch-btn switch-on';
    else document.getElementsByClassName('switch-btn')[0].className = 'switch-btn';
    startTimer();
  }
}
function getAdjacentCells(r, c) {
  const results = [];
  for (
    let rowPos = r > 0 ? -1 : 0;
    rowPos <= (r < rows - 1 ? 1 : 0);
    rowPos++
  ) {
    for (
      let colPos = c > 0 ? -1 : 0;
      colPos <= (c < cols - 1 ? 1 : 0);
      colPos++
    ) {
      results.push(data[r + rowPos][c + colPos]);
    }
  }
  return results;
}

function mineData(y, x) {
  let assignedMines = 0;
  while (assignedMines < mines) {
    const rowIndex = Math.floor(Math.random() * rows);
    const colIndex = Math.floor(Math.random() * cols);
    /* const rowIndex = 0;
     const colIndex = 3; */
    if (!(rowIndex === parseInt(y, 10) && colIndex === parseInt(x, 10))) {
      const cell = data[rowIndex][colIndex];
      if (!cell.isMine) {
        cell.isMine = true;
        cell.value = 'M';
        assignedMines++;
      }
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!data[r][c].isMine) {
        let adjCells = 0;
        let mineCount = 0;
        adjCells = getAdjacentCells(r, c);
        for (let i = adjCells.length; i--;) {
          if (adjCells[i].isMine) {
            mineCount++;
          }
        }
        data[r][c].value = mineCount;
      }
    }
  }
}

function openCell(cell) {
  if (!cell.isOpen && !cell.isFlagged) {
    const target = getElement(cell);
    /* if (cell.isFlagged) {
      const adjCells = getAdjacentCells(cell.ypos, cell.xpos);
      for (let i = 0, len = adjCells.length; i < len; i++) {
        openCell(adjCells[i], target);
      }
    } else { */
    openCells++;
    cell.isOpen = true;
    if (cell.value > 0) {
      target.textContent = cell.value;
      target.classList.add(`cell__${cell.value}`);
    } else if (cell.value === 0) {
      target.classList.add('cell__opened');
      const adjCells = getAdjacentCells(cell.ypos, cell.xpos);
      for (let i = 0, len = adjCells.length; i < len; i++) {
        openCell(adjCells[i], target);
      }
    }
  }
//  }
}

// left click to reveal
gameContainer.addEventListener('click', (e) => {
  const { target } = e;

  if (target.classList.contains('cell')) {
    playSound('sounds/click.wav', soundOn);
    if (gameStatus === 'Start') {
      gameStatus = 'Play';
      mineData([target.getAttribute('data-ypos')], [target.getAttribute('data-xpos')]);
    }
    if (gameStatus === 'Play') {
      const cell = data[target.getAttribute('data-ypos')][target.getAttribute('data-xpos')];
      if (!cell.isFlagged) {
        document.getElementById('idStatus').textContent = gameStatus;
        document.getElementById('idMovesCount').textContent = (moveCount += 1).toString();
        if (cell.isMine) {
          target.classList.add('cell__mined');
          lost();
        } else {
          openCell(cell);
          saveGame();
        }
      }
      if (openCells + mines === rows * cols) {
        win();
      }
    }
  }
});

// right click to flag
gameContainer.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  const { target } = e;
  // TODO
  // До инита данных нет и все крэшится
  if (target.classList.contains('cell')) {
    if (gameStatus === 'Start' || gameStatus === 'Play') {
      const cell = data[target.getAttribute('data-ypos')][target.getAttribute('data-xpos')];
      if (!cell.isOpen) {
        target.classList.toggle('cell__flagged');
        if (cell.isFlagged) {
          cell.isFlagged = false;
          usedFlag--;
          mineRemain = mines - usedFlag;
        } else {
          cell.isFlagged = true;
          usedFlag++;
          mineRemain = mines - usedFlag;
        }
        document.getElementById('idUsedFlag').textContent = usedFlag.toString();
        document.getElementById('idMineRemain').textContent = mineRemain.toString();
        saveGame();
      }
    }
    if (openCells + mines === rows * cols) {
      win();
    }
  }
});
