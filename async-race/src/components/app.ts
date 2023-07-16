import GaragePage from './garagePage';
import Header from './header';
import Footer from './footer';
import WinnersPage from './winnersPage';
import { getElementOfDocument } from '../util';
import { Pages, Winner } from '../types';
import { create100Cars } from '../util/createRandomCars';
import { createCarAPI, deleteCar, deleteWinner, getAllWinners, getCarById, updateCarAPI } from '../service/api';
import State from '../state';
import { DEFAULT_COLOR_UPDATE } from '../constants';
export default class App {
  private garage: GaragePage;

  private header: Header;

  private footer: Footer;

  private winners: WinnersPage;

  private activePage: string;

  state: State;

  constructor() {
    this.activePage = Pages.GARAGE;
    this.state = new State();
    this.garage = new GaragePage(this.state);
    this.header = new Header((activePage: Pages) => this.update(activePage));
    this.footer = new Footer();
    this.winners = new WinnersPage();

  }

  start(): void {
    const appContainer = getElementOfDocument('.app-container');
    appContainer.append(this.header.render());
    appContainer.append(this.garage.render());
    this.header.buttonsManagement('Garage');
    this.garage.updateGarage();
    appContainer.append(this.footer.render());
    this.btnLoad();
  }

  update(activePage: Pages): void {
    const appContainer = getElementOfDocument('.app-container');
    switch (activePage) {
      case 'Garage': {
        const winnersContainer = getElementOfDocument('.winners-page');
        appContainer.insertBefore(this.garage.render(), winnersContainer);
        winnersContainer.remove();
        this.garage.updateGarage();
        this.btnLoad();
        break;
      }
      case 'Winners': {
        const garageContainer = getElementOfDocument('.garage-page');
        appContainer.insertBefore(this.winners.render(), garageContainer);
        garageContainer.remove();
        this.winners.updateWinners();
        break;
      }
    }
  }

  btnLoad(): void {
    const btnGenerateCards = getElementOfDocument('.btn-generate_cars');
    const generateNewCarBtn = getElementOfDocument('.btn-create');
    const updateCarBtn = <HTMLButtonElement>getElementOfDocument('.btn-update');
    //100 new cars
    btnGenerateCards.addEventListener('click', async () => {
      await create100Cars();
      await this.garage.updateGarage();
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
    document.addEventListener('click', async (e) => {
      const btn = e.target as HTMLElement;

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
        const arrAllWin = await getAllWinners();
        arrAllWin.forEach((item: Winner) => {
          if (Number(item.id) === idButton) deleteWinner(idButton);
        });
        await this.garage.updateGarage();
      }
    });

  }
}
