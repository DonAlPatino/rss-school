import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'd030673bb6a44819857a36af4aca6eb9', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
