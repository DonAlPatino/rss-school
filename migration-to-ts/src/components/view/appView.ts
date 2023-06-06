import News from './news/news';
import Sources from './sources/sources';
import {INewsApiResponse, INewsApiSourcesResponse} from "../../types";


export class AppView {
    private news: News;
    private sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data:INewsApiResponse):void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data:INewsApiSourcesResponse):void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
