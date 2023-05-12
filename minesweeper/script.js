const rows = 10; // number of rows in the grid
const cols = 10; // number of columns in the grid
const mines = 10; // number of mines in the grid
let moveCount = 0;
const data = [];

const { body } = document;

const container = document.createElement('div');
container.className = 'container';
body.appendChild(container);

const header = document.createElement('header');
header.className = 'header';
header.innerHTML = '<h1>Minesweeper</h1>';
container.appendChild(header);

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

class Cell {
  constructor(xpos, ypos) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.value = 0;
    this.isMine = false;
    this.isRevealed = false;
    this.isFlagged = false;
  }
}
function render() {
  let content = '';
  for (let r = 0; r < rows; r += 1) {
    content += '<div class="row">';
    for (let c = 0; c < cols; c += 1) {

      content += `<div class="cell" data-xpos="${c}" data-ypos="${r}"></div>`;
    }
    content += '</div>';
  }

  gameContainer.innerHTML = content;
  container.appendChild(gameContainer);
}

function init(y, x) {
  console.log(y, x);
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
    if (rowIndex === y && colIndex === x) continue;
    const cell = data[rowIndex][colIndex];
    if (!cell.isMine) {
      cell.isMine = true;
      cell.value = 'M';
      assignedMines++;
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
    document.getElementById('idMovesCount').textContent = (moveCount += 1).toString();
    target.classList.add('cell__revealed');
    init([target.getAttribute('data-ypos')], [target.getAttribute('data-xpos')]);
    console.log(data);
  }
});

// right click to flag
gameContainer.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  const { target } = e;

  if (target.classList.contains('cell')) {
    document.getElementById('idMovesCount').textContent = (moveCount += 1).toString();
    target.classList.add('cell__flagged');
    // target.textContent = (! cell.isMine ? cell.value || "" : "");
  }
});
