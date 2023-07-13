import { getElementOfDocument } from '../util';
import { BASE_URL, createCarImage } from '../constants';
import { DescriptionCar } from '../types';

export default class WinnersPage {
  private readonly template: string;

  private container: HTMLDivElement;

  private containerWinners: HTMLDivElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'page winners-page';
    this.containerWinners = document.createElement('div');
    this.template = `
      <h1 class="title title-winners">Winners <span class="count-winners"></span></h1>
      <h3 class="title title-winners">Page #<span class="count-page_winners">1</span></h3>

      <div class="container-winners">
        <table class="table-winners">
          <thead>
            <tr>
              <th>Number</th>
              <th>Car</th>
              <th>Name</th>
              <th>Wins</th>
              <th>Best time (seconds)</th>
            </tr>
          </thead>
          <tbody class="container-win">
          </tbody>
        </table>
      </div>

      <div class="pagination pagination-win">
        <button class="buttons btn-prev-win">Prev</button>
        <button class="buttons btn-next-win">Next</button>
      </div>
  `;
  }

  render(): HTMLDivElement {
    this.container.innerHTML = this.template;
    this.containerWinners = getElementOfDocument('.container-win');
    return this.container;
  }

}
