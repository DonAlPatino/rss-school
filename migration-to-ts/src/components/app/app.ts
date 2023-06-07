import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { INewsApiResponse, INewsApiSourcesResponse} from "../../types";

class App {
    private controller: AppController;
    private view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start():void {
        document.querySelector('.sources')?.addEventListener('click', (e) => this.controller.getNews(e, (data:INewsApiResponse) => this.view.drawNews(data)));


        this.controller.getSources((data:INewsApiSourcesResponse) => this.view.drawSources(data));
    }
}

export default App;
