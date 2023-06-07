import News from './news/news';
import Sources from './sources/sources';
import {INewsApiArticle, INewsApiResponse, INewsApiSourceItem, INewsApiSourcesResponse} from "../../types";


export class AppView {
    private readonly news: News;
    private readonly sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data:INewsApiResponse):void {
        const values:INewsApiArticle[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data:INewsApiSourcesResponse):void {
        const values:INewsApiSourceItem[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
