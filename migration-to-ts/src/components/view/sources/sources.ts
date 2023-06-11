import './sources.css';
import {INewsApiSourceItem} from "../../../types";
import {getElement,cloneNode,getElementOfDocument} from "../util";
class Sources <T extends INewsApiSourceItem>{
    draw(data:T[]):void {
        const fragment:DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp:HTMLTemplateElement = getElementOfDocument('#sourceItemTemp');
        data.forEach((item:INewsApiSourceItem) => {
                const sourceClone:DocumentFragment = cloneNode(sourceItemTemp);
                getElement<HTMLSpanElement>(sourceClone, '.source__item-name').textContent = item.name;
                sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);
                fragment.append(sourceClone);
        });
        getElementOfDocument('.sources').appendChild(fragment);
    }
}

export default Sources;
