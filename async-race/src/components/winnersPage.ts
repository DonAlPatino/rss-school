import { getElementOfDocument } from '../util';
import { createCarImage } from '../constants';
import { getAllWinners, getCarById } from '../service/api';

export const createWinnerTable = (num: number, color: string, name: string, wins: number, bestTime: number):string =>
  `<tr">
    <td>${num}</td>
    <td>${createCarImage(color)}</td>
    <td>${name}</td>
    <td>${wins}</td>
    <td>${bestTime}</td>
  </tr>
`;

export default class WinnersPage {
  private readonly template:string;

  private readonly container: HTMLDivElement;

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

  render():HTMLDivElement {
    this.container.innerHTML = this.template;
    return this.container;
  }

  updateWinners = async (): Promise<void> => {
    this.containerWinners = getElementOfDocument('.container-win');
    this.containerWinners.innerHTML = '';
    const winners = await getAllWinners();
    let num = 0;
    for (const car of winners) {
      let name = '';
      let color = '';
      const currentCar = await getCarById(car.id);
      name = currentCar.name;
      color = currentCar.color;
      num += 1;
      const oneWinner = `${createWinnerTable(num, color, name, car.wins, car.time)}`;
      this.containerWinners.innerHTML += oneWinner;
    }
  };
}


