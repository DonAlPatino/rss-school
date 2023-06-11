import Loader from './loader';
// const API = ' http://127.0.0.1:8075/' //'https://newsapi.org/v2/'
const API = 'https://rss-news-api.onrender.com/'
class AppLoader extends Loader {
    constructor() {
        super(API, {
            apiKey: 'd030673bb6a44819857a36af4aca6eb9', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
