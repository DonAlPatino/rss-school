import GaragePage from './garagePage';
import Header from './header';
import Footer from './footer';
import WinnersPage from './winnersPage';
import { getElementOfDocument } from '../util';
import { Pages } from '../types';
export default class App {
  private garage: GaragePage;

  private header: Header;

  private footer: Footer;

  private winners: WinnersPage;

  private activePage: string;

  constructor() {
    this.activePage = Pages.GARAGE;
    this.garage = new GaragePage();
    this.header = new Header( (activePage:Pages) => this.update(activePage));
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
  }

  update(activePage:Pages): void {
    const appContainer = getElementOfDocument('.app-container');
    switch (activePage) {
      case 'Garage': {
        const winnersContainer = getElementOfDocument('.winners-page');
        appContainer.insertBefore(this.garage.render(), winnersContainer);
        winnersContainer.remove();
        this.garage.updateGarage();
        break;
      }
      case 'Winners': {
        const garageContainer = getElementOfDocument('.garage-page');
        appContainer.insertBefore(this.winners.render(), garageContainer );
        garageContainer.remove();
        this.winners.updateWinners();
        break;
      }
    }
  }
}
