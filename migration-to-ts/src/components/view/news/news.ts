import './news.css';
import {INewsApiArticle} from "../../../types";
import {cloneNode, getElement} from "../util";


class News <T extends INewsApiArticle>{
    draw(data:T[]):void {

        const news:INewsApiArticle[] = data.length >= 10 ? data.filter((_item:INewsApiArticle, idx:number):boolean => idx < 10) : data;

        const fragment:DocumentFragment = document.createDocumentFragment();
        const newsItemTemp:HTMLTemplateElement |null = document.querySelector('#newsItemTemp');

        news.forEach((item:INewsApiArticle, idx:number):void => {
            if (newsItemTemp) {
                const newsClone:DocumentFragment = cloneNode(newsItemTemp);
                /*const newsClone:Node  = newsItemTemp.content.cloneNode(true);

                if (!(newsClone instanceof DocumentFragment)) {
                    throw new TypeError(`Error - can't clone template`)
                }*/
                if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

                /*newsClone.querySelector<HTMLElement>('.news__meta-photo')!.style.backgroundImage = `url(${
                    item.urlToImage || 'img/news_placeholder.jpg'
                })`;*/
                getElement<HTMLSpanElement>(newsClone, '.news__meta-photo').style.backgroundImage = `url(${
                    item.urlToImage || 'img/news_placeholder.jpg'
                })`;
                /*newsClone.querySelector('.news__meta-author')!.textContent = item.author || item.source.name;*/
                getElement<HTMLSpanElement>(newsClone, '.news__meta-author').textContent = item.author || item.source.name;
                /*newsClone.querySelector('.news__meta-date')!.textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');
*/
                getElement<HTMLSpanElement>(newsClone, '.news__meta-date').textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');

                /*newsClone.querySelector('.news__description-title')!.textContent = item.title;*/
                getElement<HTMLSpanElement>(newsClone, '.news__description-title').textContent = item.title;
                /*newsClone.querySelector('.news__description-source')!.textContent = item.source.name;*/
                getElement<HTMLSpanElement>(newsClone, '.news__description-source').textContent = item.source.name;
                /*newsClone.querySelector('.news__description-content')!.textContent = item.description;*/
                getElement<HTMLSpanElement>(newsClone, '.news__description-content').textContent = item.description;
                /*newsClone.querySelector('.news__read-more a')?.setAttribute('href', item.url);*/
                getElement<HTMLSpanElement>(newsClone, '.news__read-more a').setAttribute('href', item.url);
                fragment.append(newsClone);
            }
        });

            document.querySelector('.news')!.innerHTML = '';
            document.querySelector('.news')?.appendChild(fragment);

    }
}

export default News;
