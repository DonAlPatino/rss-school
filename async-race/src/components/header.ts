export default class Header {
  private readonly container: HTMLElement;

  private btnToGarage: HTMLButtonElement;

  private btnToWinners: HTMLButtonElement;

  updateView: (activePage: string) => void;

  constructor(update: (activePage: string) => void) {
    this.container = document.createElement('header');
    this.container.className = 'header';
    this.btnToGarage = document.createElement('button');
    this.btnToWinners = document.createElement('button');
    this.updateView = update;
  }

  render():HTMLElement {
    this.btnToGarage.className = 'buttons btn-to_garage';
    this.btnToGarage.textContent = 'To garage';
    this.container.append(this.btnToGarage);
    this.btnToWinners.className = 'buttons btn-to_winners';
    this.btnToWinners.textContent = 'To winners';
    this.container.append(this.btnToWinners);
    this.btnToGarage.addEventListener('click', () => this.togglePage('Garage'));
    this.btnToWinners.addEventListener('click', () => this.togglePage('Winners'));
    return this.container;
  }

  togglePage(activePage:string):void {
    this.buttonsManagement(activePage);
    this.updateView(activePage);
  }

  buttonsManagement(activePage:string):void {
    switch (activePage) {
      case 'Garage': { this.btnToWinners.disabled = false;this.btnToGarage.disabled = true; break;}
      case 'Winners': { this.btnToWinners.disabled = true;this.btnToGarage.disabled = false;break;}
    }
  }
}
