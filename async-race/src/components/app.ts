import Garage from './garage';
import Header from './header';
import Footer from './footer';
import Winners from './winners';
import { getElementOfDocument } from '../util';
export default class App {
  private garage: Garage;

  private header: Header;

  private footer: Footer;

  private winners: Winners;

  private activePage: string;

  constructor() {
    this.activePage = 'Garage';
    this.garage = new Garage();
    this.header = new Header( (activePage:string) => this.update(activePage));
    this.footer = new Footer();
    this.winners = new Winners();
  }

  start(): void {
    const appContainer = getElementOfDocument('.app-container');
    appContainer.append(this.header.render());
    appContainer.append(this.garage.render());
    this.header.buttonsManagement('Garage');
    appContainer.append(this.footer.render());
  }

  update(activePage:string): void {
    const appContainer = getElementOfDocument('.app-container');
    //    appContainer.append(this.header.render());
    switch (activePage) {
      case 'Garage': {
        const winnersContainer = getElementOfDocument('.winners-page');
        appContainer.insertBefore(this.garage.render(), winnersContainer);
        winnersContainer.remove();
        break;
      }
      case 'Winners': {
        const garageContainer = getElementOfDocument('.garage-page');
        appContainer.insertBefore(this.winners.render(), garageContainer );
        garageContainer.remove();
        break;
      }
    }
    //    appContainer.append(this.footer.render());
  }
}
