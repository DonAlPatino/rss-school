import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { INewsApiResponse, INewsApiSourcesResponse} from "../../types";

class App {
    private readonly controller: AppController;
    private readonly view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start():void {
        document.querySelector('.sources')?.addEventListener('click', (e:Event) => this.controller.getNews(e, (data:INewsApiSourcesResponse|INewsApiResponse) => this.view.drawNews(data as INewsApiResponse)));
        this.controller.getSources((data:INewsApiSourcesResponse|INewsApiResponse) => this.view.drawSources(data as INewsApiSourcesResponse));
    }
}

export default App;
