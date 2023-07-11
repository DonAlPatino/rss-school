export default class Header {
  private readonly container: HTMLElement;

  private btnToGarage: HTMLButtonElement;

  private btnToWinners: HTMLButtonElement;

  constructor() {
    this.container = document.createElement('header');
    this.container.className = 'header';
    this.btnToGarage = document.createElement('button');
    this.btnToWinners = document.createElement('button');
  }

  render():HTMLElement {
    this.btnToGarage.className = 'buttons btn-to_garage';
    this.btnToGarage.textContent = 'To garage';
    this.container.append(this.btnToGarage);
    this.btnToWinners.className = 'buttons btn-to_winners';
    this.btnToWinners.textContent = 'To winners';
    this.container.append(this.btnToWinners);
    this.btnToGarage.addEventListener('click', () => this.togglePage());
    this.btnToWinners.addEventListener('click', () => this.togglePage());
    return this.container;
  }

  togglePage():void {

  }
}
