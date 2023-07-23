import { Pages } from '../types';
import State from '../state';

export default class Header {
  private readonly container: HTMLElement;

  private btnToGarage: HTMLButtonElement;

  private btnToWinners: HTMLButtonElement;

  updateView: (activePage: Pages) => void;

  private state: State;

  private activePage: Pages;

  constructor(state: State, update: (activePage: Pages) => void) {
    this.state = state;
    this.activePage = this.state.getActivePage();
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
    this.btnToGarage.addEventListener('click', () => this.togglePage(Pages.GARAGE));
    this.btnToWinners.addEventListener('click', () => this.togglePage(Pages.WINNERS));
    this.buttonsManagement(this.activePage);
    return this.container;
  }

  togglePage(activePage:Pages):void {
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
