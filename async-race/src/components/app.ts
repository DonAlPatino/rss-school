import GaragePage from './garagePage';
import Header from './header';
import Footer from './footer';
import WinnersPage from './winnersPage';
import { getElementOfDocument } from '../util';
import { Pages } from '../types';
import { create100Cars } from '../util/createRandomCars';
import { createCarAPI } from '../service/api';
export default class App {
  private garage: GaragePage;

  private header: Header;

  private footer: Footer;

  private winners: WinnersPage;

  private activePage: string;

  constructor() {
    this.activePage = Pages.GARAGE;
    this.garage = new GaragePage();
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

    //100 new cars
    btnGenerateCards.addEventListener('click', async () => {
      await create100Cars();
      await this.garage.updateGarage();
    });
    // new car
    generateNewCarBtn.addEventListener('click', () => {
      const nameNewCar = (<HTMLInputElement>getElementOfDocument('.text-input')).value;
      const colorNewCar = (<HTMLInputElement>getElementOfDocument('.color-input')).value;
      if (nameNewCar == '') {
        alert('Please, enter name car!');
      } else {
        (createCarAPI({ 'name': nameNewCar, 'color': colorNewCar })).then(() => this.garage.updateGarage());
      }
    });
  }
}
