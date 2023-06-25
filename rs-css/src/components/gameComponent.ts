import State from "../state";
import {levels} from "../data/data";
import {IData} from "../types";
import {getElements} from "../util";

export default class GameComponent {
    private currentLevel: number;
    private readonly table: HTMLDivElement;
    constructor(state: State) {
        this.currentLevel = state.getCurrentLevel();
       this.table = document.createElement('div');
    }

    render(): HTMLDivElement {
        const game = document.createElement('div');
        game.classList.add('game');
        const tableWrapper = document.createElement('div');
        tableWrapper.classList.add('table-wrapper');
        const tableSurface = document.createElement('div');
        tableSurface.classList.add('table-surface');
        tableWrapper.append(tableSurface);

        this.table.classList.add('table');

        this.generateHTML(this.table, levels[this.currentLevel]);
        /*const highlightedCode = hljs.highlight(`${levels[this.currentLevel].boardMarkup}`,
            {
                language: 'xml'
            }
        ).value;
        table.insertAdjacentHTML("afterbegin", `${levels[this.currentLevel].boardMarkup}`)*/
        tableWrapper.append(this.table);
        const tableEdge =document.createElement('div');
        tableEdge.classList.add('table-edge');
        tableEdge.innerHTML =`
        <div class="table-leg"></div>
            <div class="table-leg"></div>`
        game.append(tableWrapper);
        game.append(tableEdge);
        return game;
    }

    update(levelDescription:IData): void {
        while (this.table.firstChild) {
            this.table.firstChild.remove()
        }
        this.generateHTML(this.table, levelDescription);
    }
    private generateHTML(table: HTMLDivElement, levelDescription:IData):void {
        const parser = new DOMParser();
        const doc = parser.parseFromString(`<div>${levelDescription.boardMarkup}</div>`, "application/xml");

// функция для рекурсивного добавления элементов в дерево
        function addToTree(parent:Node, node:Node):void {

            //const element = node.cloneNode(true);
            const element = document.createElement(node.nodeName.toLowerCase());
            const node2 = node as HTMLElement
            for (const attribute of node2.attributes) {
                element.setAttribute(attribute.name, attribute.value);
            }
            parent.appendChild(element);
            for(const child of node.childNodes){
                if(child.nodeType === Node.ELEMENT_NODE){
                    addToTree(element, child);
                }
            }
        }

        //const root = document.createElement("div"); // корневой элемент

// добавление дочерних элементов в дерево
        for (const node of doc.documentElement.childNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                console.log("Adding node: ", node); // отладочный вывод
                addToTree(table, node);
            }
        }
        //table.append(root)
        const ourThings = getElements( table, levelDescription.selector);
        ourThings.forEach(
            x => {
                x.classList.add("dance");
            })

    }
    private generateHTML2(table: HTMLDivElement, levelDescription:IData):void {
        const tagList:string[]=[];
        const regex = new RegExp(/<(.*)\/>/);
        const str = levelDescription.boardMarkup.split('\n');
        let newHTML = '';
        for (let i = 0; i < str.length; i++)
        if (str[i] !== '') {
            const fullTag = str[i].match(regex);

            if (fullTag !== null && fullTag.length > 0) {
                const smallTag = fullTag[1].split(' ');
                if (smallTag.length > 1) {
                    newHTML = newHTML + `<${fullTag[1]}></${smallTag[0]}>`;
                } else {
                    newHTML = newHTML + `<${fullTag[1]}></${fullTag[1]}>`;
                }
                tagList.push(fullTag[1]);
            }
            else {
                newHTML = newHTML + str[i];
                tagList.push(str[i]);
            }
        }
        console.log(tagList);
        table.innerHTML = newHTML;
        /*table.addEventListener("mousemove", (event) => {
            //debugger
            const tar = event?.target as HTMLElement;
            console.log(tar.closest('bento'));
        });*/

        const ourThings = getElements( table, levelDescription.selector);
        ourThings.forEach(
            x => {x.classList.add("dance");
        })

    }
}
