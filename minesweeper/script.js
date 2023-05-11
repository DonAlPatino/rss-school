const rows = 10; // number of rows in the grid
const cols = 10; // number of columns in the grid
const mines = 10; // number of mines in the grid
const { body } = document;

const container = document.createElement('div');
container.className = 'container';
body.appendChild(container);

const header = document.createElement('header');
header.className = 'header';
header.innerHTML = '<h1>Minesweeper</h1>';
container.appendChild(header);
function render() {
  const gameContainer = document.createElement('div');
  gameContainer.className = 'gameContainer';

  let content = '';
  for (let r = 0; r < rows; r++) {
    content += '<div class="row">';
    for (let c = 0; c < cols; c++) {
      content += `<div class="cell data-xpos="${c}" data-ypos="${r}"></div>`;
    }
    content += '</div>';
  }

  gameContainer.innerHTML = content;
  container.appendChild(gameContainer);
}
render();
