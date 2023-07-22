import GaragePage from './garagePage';
import Header from './header';
import Footer from './footer';
import WinnersPage from './winnersPage';
import { getElementOfDocument }  from '../util';
import { Pages, Winner } from '../types';
import { create100Cars } from '../util/createRandomCars';
import {
  createCarAPI,
  deleteCar,
  deleteWinner,
  getAllCars,
  getAllWinners,
  getCarById,
  updateCarAPI,
} from '../service/api';
import State from '../state';
import { DEFAULT_COLOR_UPDATE } from '../constants';
import { startCar } from '../service/startCar';
import { stopCar } from '../service/stopCar';
import { startRace } from '../service/startRace';
import { stopRace } from '../service/stopRace';

export default class App {
  private garage: GaragePage;

  private header: Header;

  private footer: Footer;

  private winners: WinnersPage;

  private activePage: string;

  state: State;

  private curGaragePage: number;

  constructor() {

    this.state = new State();
    this.activePage = this.state.getActivePage();
    this.garage = new GaragePage(this.state);
    this.header = new Header((activePage: Pages) => this.update(activePage));
    this.footer = new Footer();
    this.winners = new WinnersPage();
    this.curGaragePage = this.state.getCurGaragePage();

  }

  start(): void {
    const appContainer = getElementOfDocument('.app-container');
    appContainer.append(this.header.render());
    switch (this.activePage) {
      case Pages.GARAGE: {
        appContainer.append(this.garage.render());
        this.header.buttonsManagement(Pages.GARAGE);
        this.garage.updateGarage();
        this.btnLoadGarage();
        this.btnLoad();
        break;
      }
      case Pages.WINNERS: {
        appContainer.append(this.winners.render());
        this.winners.updateWinners();
        break;
      }
    }
    appContainer.append(this.footer.render());
  }

  update(activePage: Pages): void {
    const appContainer = getElementOfDocument('.app-container');
    switch (activePage) {
      case Pages.GARAGE: {
        this.state.setActivePage(Pages.GARAGE);
        const winnersContainer = getElementOfDocument('.winners-page');
        appContainer.insertBefore(this.garage.render(), winnersContainer);
        winnersContainer.remove();
        this.garage.updateGarage();
        this.btnLoadGarage();
        break;
      }
      case Pages.WINNERS: {
        this.state.setActivePage(Pages.WINNERS);
        const garageContainer = getElementOfDocument('.garage-page');
        appContainer.insertBefore(this.winners.render(), garageContainer);
        garageContainer.remove();
        this.winners.updateWinners();
        break;
      }
    }
  }

  btnLoadGarage(): void {
    const btnGenerateCards = getElementOfDocument('.btn-generate_cars');
    const generateNewCarBtn = getElementOfDocument('.btn-create');
    const updateCarBtn = <HTMLButtonElement>getElementOfDocument('.btn-update');
    const raceBtn = <HTMLButtonElement>getElementOfDocument('.btn-race');
    const rasetBtn = <HTMLButtonElement>getElementOfDocument('.btn-reset');
    const btnPrevCars = <HTMLButtonElement>document.querySelector('.btn-prev');
    const btnNextCars = <HTMLButtonElement>document.querySelector('.btn-next');
    const curPage = <HTMLSpanElement>document.querySelector('.count-page');

    btnPrevCars.addEventListener('click', () => {
      if (this.curGaragePage  === 1) {
        btnPrevCars.setAttribute('disabled', 'disabled');
      } else {
        btnNextCars.removeAttribute('disabled');
        this.curGaragePage--;
        this.state.setCurGaragePage(this.curGaragePage);
        curPage.textContent = `${this.curGaragePage}`;
      }
      this.garage.updateGarage();
      stopRace(this.state);
    });

    btnNextCars.addEventListener('click', async () => {
      const { cars, count } = await getAllCars();
      if (this.curGaragePage * 7 >= count) {
        btnNextCars.setAttribute('disabled', 'disabled');
      } else {
        btnPrevCars.removeAttribute('disabled');
        this.curGaragePage++;
        this.state.setCurGaragePage(this.curGaragePage);
        curPage.textContent = `${this.curGaragePage}`;
      }
      this.garage.updateGarage();
      stopRace(this.state);
    });

    //100 new cars
    btnGenerateCards.addEventListener('click', async () => {
      await create100Cars();
      await this.garage.updateGarage();
    });
    raceBtn.addEventListener('click', () => {
      startRace(this.state).then(()=>{
        /*raceBtn.disabled = false;
        rasetBtn.disabled = true;*/
      });
      raceBtn.disabled = true;
      rasetBtn.disabled = false;
    });
    rasetBtn.addEventListener('click', () => {
      stopRace(this.state).then(()=>{
        /*raceBtn.disabled = true;
        rasetBtn.disabled = false;*/
      });
      raceBtn.disabled = false;
      rasetBtn.disabled = true;
    });
    // new car
    generateNewCarBtn.addEventListener('click', () => {
      const nameNewCar = (<HTMLInputElement>getElementOfDocument('.field-create > .text-input')).value;
      const colorNewCar = (<HTMLInputElement>getElementOfDocument('.field-create > .color-input')).value;
      if (nameNewCar == '') {
        alert('Please, enter name car!');
      } else {
        (createCarAPI({ 'name': nameNewCar, 'color': colorNewCar })).then(() => this.garage.updateGarage());
      }
    });
    updateCarBtn.addEventListener('click', async () => {
      const nameUpdateCar = <HTMLInputElement>getElementOfDocument('.field-update > .text-input');
      const colorUpdateCar = <HTMLInputElement>getElementOfDocument('.field-update > .color-input');
      if (nameUpdateCar.value == '') {
        alert('Please, enter name car!');
      } else {
        await updateCarAPI({ 'name': nameUpdateCar.value, 'color': colorUpdateCar.value }, this.state.getIdUpdateCar());
        await this.garage.updateGarage();
        nameUpdateCar.value = '';
        colorUpdateCar.value = DEFAULT_COLOR_UPDATE;
        this.state.setIdUpdateCar(0);
        updateCarBtn.disabled = true;
      }
    });
  }

  btnLoad():void {
    document.addEventListener('click', async (e) => {
      const btn = e.target as HTMLElement;

      if (btn.classList.contains('car-control_start')) {
        const idCar = Number(btn.dataset.start);
        await startCar(idCar, this.state);
      }

      if (btn.classList.contains('car-control_stop')) {
        const idCar = Number(btn.dataset.stop);
        await stopCar(idCar, this.state);
      }

      if (btn.classList.contains('car-options_select')) {
        const idUpdateCar = Number(btn.dataset.select);
        this.state.setIdUpdateCar(idUpdateCar);
        const inputTextUpdate = <HTMLInputElement>getElementOfDocument('.field-update > .text-input');
        const inputColorUpdate = <HTMLInputElement>getElementOfDocument('.field-update > .color-input');

        inputTextUpdate.disabled = false;
        inputColorUpdate.disabled = false;
        (<HTMLInputElement>document.querySelector('.btn-update')).disabled = false;

        getCarById(idUpdateCar).then((item) => {
          inputTextUpdate.value = item.name;
          inputColorUpdate.value = item.color;
        });
      }

      if (btn.classList.contains('car-options_remove')) {
        const idButton = Number(btn.dataset.remove);
        await deleteCar(idButton);
        const { winners } = await getAllWinners();
        winners.forEach((item: Winner) => {
          if (Number(item.id) === idButton) deleteWinner(idButton);
        });
        await this.garage.updateGarage();
      }
    });
  }
}
