import AppLoader from './appLoader';
import {NewsResp, Endpoints} from "../../types";

class AppController extends AppLoader {
    getSources(callback:(data:NewsResp)=>void):void {
        super.getResp(
            {
                endpoint: Endpoints.SOURCES,
            },
            callback
        );
    }

    getNews(e:Event, callback:(data:NewsResp)=>void):void {
        let target: EventTarget | null = e.target;
        const newsContainer: EventTarget | null = e.currentTarget;
            while (target !== newsContainer) {
                if (target && target instanceof HTMLElement && newsContainer && newsContainer instanceof HTMLElement) {
                    if (target.classList.contains('source__item')) {
                        const sourceId: string | null = target.getAttribute('data-source-id');
                        if (newsContainer.getAttribute('data-source') !== sourceId && sourceId) {
                            newsContainer.setAttribute('data-source', sourceId);
                            super.getResp(
                                {
                                    endpoint: Endpoints.NEWS,
                                    options: {
                                        sources: sourceId,
                                    },
                                },
                                callback
                            );
                        }
                        return;
                    }
                    target = target.parentNode;
                }
            }
        }
}

export default AppController;
