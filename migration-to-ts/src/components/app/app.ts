import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { INewsApiResponse, INewsApiSourcesResponse, NewsResp } from "../../types";

class App {
    private readonly controller: AppController;
    private readonly view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start():void {
        document.querySelector('.sources')?.addEventListener('click', (e:Event) => this.controller.getNews(e, (data:NewsResp) => this.view.drawNews(<INewsApiResponse>data)));
        this.controller.getSources((data:NewsResp) => this.view.drawSources(data as INewsApiSourcesResponse));
    }
}

export default App;
