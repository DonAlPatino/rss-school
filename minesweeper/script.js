import Cell from './cell.js';
import playSound from './playsound.js';

const rows = 10; // number of rows in the grid
const cols = 10; // number of columns in the grid
const mines = 10; // number of mines in the grid
let moveCount = 0;
let openCells = 0;

const data = [];
let gameStatus = 'stop';
let gameDuration = 0;

const { body } = document;

const container = document.createElement('div');
container.className = 'container';
body.appendChild(container);

const header = document.createElement('header');
header.className = 'header';
header.innerHTML = '<h1>Minesweeper</h1>';
container.appendChild(header);

const statusContainer = document.createElement('div');
statusContainer.className = 'status';
statusContainer.innerHTML = 'Статус игры: <span id="idStatus"></span>';
container.appendChild(statusContainer);

const moveCountContainer = document.createElement('div');
moveCountContainer.className = 'moveCount';
moveCountContainer.innerHTML = 'Количество кликов: <span id="idMovesCount"></span>';
container.appendChild(moveCountContainer);

const timerContainer = document.createElement('div');
timerContainer.className = 'timer';
timerContainer.innerHTML = '<span id="hour">00</span>:<span id="minute">00</span>:<span id="second">00</span>:<span id="millisecond">00</span>';
container.appendChild(timerContainer);

const gameContainer = document.createElement('div');
gameContainer.className = 'gameContainer';

function win() {
  gameStatus = 'Win';
  document.getElementById('idStatus').textContent = gameStatus;
  playSound('sounds/win.wav');
  window.clearInterval(window.timerId);
}
function lost() {
  playSound('sounds/lose_flowergarden_long.wav');
  gameStatus = 'lost';
  document.getElementById('idStatus').textContent = gameStatus;
  window.clearInterval(window.timerId);
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

function render() {
  let content = '';
  for (let r = 0; r < rows; r += 1) {
    content += '<div class="row">';
    for (let c = 0; c < cols; c += 1) {
      const addClass = '';
      /*
            Load data from localStore
            let addClass = '';
            const cell = data[r][c];
            console.log(cell);
            // assign proper text and class to cells (needed when loading a game)
            let add_class = '';
                  let txt = '';
                  if (cell.isFlagged) {
                    add_class = 'flagged';
                  } else if (cell.isRevealed) {
                    add_class = `revealed}`;
                    txt = (!cellObj.isMine ? cellObj.value || '' : '');
                  } */
      content += `<div class="cell ${addClass}" data-xpos="${c}" data-ypos="${r}"></div>`;
    }
    content += '</div>';
  }

  gameContainer.innerHTML = content;
  container.appendChild(gameContainer);
}

function initData() {
  for (let r = 0; r < rows; r++) {
    data[r] = [];
    for (let c = 0; c < cols; c++) {
      data[r].push(new Cell(c, r));
    }
  }
}

function minedData(y, x) {
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

render();
initData();

function openCell(cell) {
  if (!cell.isOpen) {
    openCells++;
    cell.isOpen = true;
    const target = cell.getElement();
    target.classList.remove('cell__flagged');
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
}

function pad(val) {
  return val > 9 ? val : `0${val}`;
}

// left click to reveal
gameContainer.addEventListener('click', (e) => {
  const { target } = e;

  if (target.classList.contains('cell')) {
    playSound('sounds/click.wav');
    if (gameStatus === 'stop') {
      gameStatus = 'play';
      minedData([target.getAttribute('data-ypos')], [target.getAttribute('data-xpos')]);
      window.timerId = setInterval(() => {
        gameDuration++;
        document.getElementById('hour').innerHTML = pad(parseInt(gameDuration / 3600, 10));
        document.getElementById('minute').innerHTML = pad(parseInt(gameDuration / 60, 10));
        document.getElementById('second').innerHTML = pad(gameDuration % 60);
        // document.getElementById('millisecond').innerHTML = pad(parseInt(gameDuration % 10, 10) * 10);
      }, 1000);
    }
    if (gameStatus !== 'lost') {
      const cell = data[target.getAttribute('data-ypos')][target.getAttribute('data-xpos')];
      document.getElementById('idStatus').textContent = gameStatus;
      document.getElementById('idMovesCount').textContent = (moveCount += 1).toString();
      if (cell.isMine) {
        target.classList.add('cell__mined');
        lost();
      } else {
        openCell(cell);
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
    if (gameStatus !== 'lost') {
      target.classList.toggle('cell__flagged');
      const cell = data[target.getAttribute('data-xpos')][target.getAttribute('data-ypos')];
      if (!cell.isFlagged) cell.isFlagged = true;
      else cell.isFlagged = false;
    }
    if (openCells + mines === rows * cols) {
      win();
    }
  }
});
