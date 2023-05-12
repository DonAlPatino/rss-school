import Cell from './cell.js';

const rows = 10; // number of rows in the grid
const cols = 10; // number of columns in the grid
const mines = 10; // number of mines in the grid
let moveCount = 0;
const data = [];
let gameStatus = 'stop';

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
timerContainer.innerHTML = '<span id="hour">00</span>:<span id="minute">00</span>:<span id="second">00</span>:<span id="millisecond">000</span>';
container.appendChild(timerContainer);

const gameContainer = document.createElement('div');
gameContainer.className = 'gameContainer';

function playSound(soundFile) {
  new Audio(soundFile).play().then(() => {});
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

function initData(y, x) {
  for (let r = 0; r < rows; r++) {
    data[r] = [];
    for (let c = 0; c < cols; c++) {
      data[r].push(new Cell(c, r));
    }
  }

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
const sec = 0;

function pad(val) {
  return val > 9 ? val : `0${val}`;
}

/* setInterval(() => {
    document.getElementById('second').innerHTML = pad(++sec%60);
    document.getElementById('minute').innerHTML = pad(parseInt(sec/60,10));
  }, 1000); */

// left click to reveal
gameContainer.addEventListener('click', (e) => {
  const { target } = e;

  if (target.classList.contains('cell')) {
    playSound('sounds/click.wav');
    if (gameStatus === 'stop') {
      gameStatus = 'play';
      initData([target.getAttribute('data-ypos')], [target.getAttribute('data-xpos')]);
    }
    if (gameStatus !== 'lost') {
      document.getElementById('idStatus').textContent = gameStatus;
      document.getElementById('idMovesCount').textContent = (moveCount += 1).toString();
      target.classList.add('cell__revealed');

      const cell = data[target.getAttribute('data-ypos')][target.getAttribute('data-xpos')];
      if (cell.isMine) {
        playSound('sounds/lose_flowergarden_long.wav');
        target.classList.add('cell__mined');
        gameStatus = 'lost';
        document.getElementById('idStatus').textContent = gameStatus;
      } else {
        if (cell.value > 0) target.textContent = cell.value;
        target.classList.add(`cell__${cell.value}`);
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
      // document.getElementById('idMovesCount').textContent = (moveCount += 1).toString();
      target.classList.add('cell__flagged');
      const cell = data[target.getAttribute('data-xpos')][target.getAttribute('data-ypos')];
      cell.isFlagged = true;
    }
  }
});
