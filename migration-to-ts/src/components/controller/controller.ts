import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback:void):void {
        if (typeof callback === 'function' ) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }
    }

    getNews(e:Event, callback:void):void {
        let target: EventTarget | null = e.target;
        const newsContainer: EventTarget | null = e.currentTarget;
        if (typeof callback === 'function') {

            while (target !== newsContainer) {
                if (target && target instanceof HTMLElement && newsContainer && newsContainer instanceof HTMLElement) {
                    if (target.classList.contains('source__item')) {
                        const sourceId: string | null = target.getAttribute('data-source-id');
                        if (newsContainer.getAttribute('data-source') !== sourceId && sourceId) {
                            newsContainer.setAttribute('data-source', sourceId);
                            super.getResp(
                                {
                                    endpoint: 'everything',
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
}

export default AppController;
