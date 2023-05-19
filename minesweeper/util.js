export function pad(val) {
  return val > 9 ? val : `0${val}`;
}

export function getElement(cell) {
  return document.querySelector(`.cell[data-xpos="${cell.xpos}"][data-ypos="${cell.ypos}"]`);
}
