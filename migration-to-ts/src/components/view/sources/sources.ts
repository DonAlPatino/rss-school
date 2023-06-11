import './sources.css';
import {INewsApiSourceItem} from "../../../types";
import {getElement,cloneNode} from "../util";
class Sources <T extends INewsApiSourceItem>{
    draw(data:T[]):void {
        const fragment:DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp:HTMLTemplateElement |null = document.querySelector('#sourceItemTemp');

        data.forEach((item:INewsApiSourceItem) => {
            if(sourceItemTemp) {
                const sourceClone:DocumentFragment = cloneNode(sourceItemTemp);
                /*const sourceClone: Node = sourceItemTemp.content.cloneNode(true);
                if (!(sourceClone instanceof DocumentFragment)) {
                    throw new TypeError(`Error - can't clone template`)
                }
                const sourceItemName = sourceClone.querySelector('.source__item-name');
                if (sourceItemName) sourceItemName.textContent = item.name*/
                getElement<HTMLSpanElement>(sourceClone, '.source__item-name').textContent = item.name;

                sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);

                fragment.append(sourceClone);
            }
        });

        document.querySelector('.sources')?.append(fragment);

    }
}

export default Sources;
