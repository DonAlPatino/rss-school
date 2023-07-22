import { getElementOfDocument } from '../util';
import { getCarById, getWinners } from '../service/api';
import { createCarImage } from '../util/createCarImage';
import State from '../state';
import { winnerPerPage } from '../constants';

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

  private state: State;

  private curWinnersPage: number;

  constructor(state: State) {
    this.state = state;
    this.curWinnersPage = this.state.getCurWinnersPage();
    this.container = document.createElement('div');
    this.container.className = 'page winners-page';
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
    this.curWinnersPage = this.state.getCurWinnersPage();
    const containerWinners = getElementOfDocument('.container-win');
    const countWinners = getElementOfDocument('.count-winners');
    const btnPrevWinners = <HTMLButtonElement>document.querySelector('.btn-prev-win');
    const btnNextWinners = <HTMLButtonElement>document.querySelector('.btn-next-win');
    containerWinners.innerHTML = '';
    const { winners, count } = await getWinners(this.state.getCurWinnersPage());
    let num = 0;
    for (const car of winners) {
      const currentCar = await getCarById(car.id);
      num += 1;
      const oneWinner = `${createWinnerTable(num, currentCar.color, currentCar.name, car.wins, car.time)}`;
      containerWinners.innerHTML += oneWinner;
    }
    countWinners.innerText = ` (${count.toString()} winner(s))`;
    //countWinners.innerText = ` (${winners.length.toString()} winner(s))`;
    if (this.curWinnersPage === 1) {
      btnPrevWinners.setAttribute('disabled', 'disabled');
    } else if (this.curWinnersPage  * winnerPerPage >= count) {
      btnNextWinners.setAttribute('disabled', 'disabled');
    } else {
      btnPrevWinners.removeAttribute('disabled');
    }
  };
}


