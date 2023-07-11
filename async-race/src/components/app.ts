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

  constructor() {
    this.garage = new Garage();
    this.header = new Header();
    this.footer = new Footer();
    this.winners = new Winners();
  }

  start(): void {
    const appContainer = getElementOfDocument('.app-container');
    appContainer.append(this.header.render());
    appContainer.append(this.garage.render());
    //appContainer.append(this.winners.render());
    appContainer.append(this.footer.render());
  }
}
