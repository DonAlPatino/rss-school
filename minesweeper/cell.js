class Cell {
  constructor(xpos, ypos) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.value = 0;
    this.isMine = false;
    this.isOpen = false;
    this.isFlagged = false;
  }

  getElement() {
    return document.querySelector(`.cell[data-xpos="${this.xpos}"][data-ypos="${this.ypos}"]`);
  }
}
export default Cell;
