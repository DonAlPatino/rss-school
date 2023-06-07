import './sources.css';
import '../../../types'
import {INewsApiSourceItem} from "../../../types";

class Sources {
    draw(data:INewsApiSourceItem[]):void {
        const fragment:DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp:HTMLTemplateElement |null = document.querySelector('#sourceItemTemp');

        data.forEach((item:INewsApiSourceItem) => {
            if(sourceItemTemp) {
                const sourceClone: HTMLElement = sourceItemTemp.content.cloneNode(true) as HTMLElement;

                sourceClone.querySelector('.source__item-name')!.textContent = item.name;
                sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);

                fragment.append(sourceClone);
            }
        });

        document.querySelector('.sources')?.append(fragment);

    }
}

export default Sources;
