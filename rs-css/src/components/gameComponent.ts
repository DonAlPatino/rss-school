import State from "../state";
import {levels} from "../data/data";
import {IData} from "../types";
import {getElementOfDocument, getElements} from "../util";

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
        const tableEdge = document.createElement('div');
        tableEdge.classList.add('table-edge');
        tableEdge.innerHTML = `
        <div class="table-leg"></div>
            <div class="table-leg"></div>`
        game.append(tableWrapper);
        game.append(tableEdge);
        return game;
    }

    update(levelDescription: IData): void {
        while (this.table.firstChild) {
            this.table.firstChild.remove()
        }
        this.generateHTML(this.table, levelDescription);
    }

    private generateHTML(table: HTMLDivElement, levelDescription: IData): void {
        const parser = new DOMParser();
        const doc = parser.parseFromString(`<div>${levelDescription.boardMarkup}</div>`, "application/xml");

// функция для рекурсивного добавления элементов в дерево
        function addToTree(parent: Node, node: Node): void {

            //const element = node.cloneNode(true);
            const element = document.createElement(node.nodeName.toLowerCase());
            const node2 = node as HTMLElement
            for (const attribute of node2.attributes) {
                element.setAttribute(attribute.name, attribute.value);
            }
            element.addEventListener("mousemove", (event) => {
                event.stopPropagation();
                const target = event?.target as HTMLElement;
                showTooltip(target)
            });
            element.addEventListener("mouseout", (event) => {
                event.stopPropagation();
                hideTooltip()
            });
            parent.appendChild(element);
            for (const child of node.childNodes) {
                if (child.nodeType === Node.ELEMENT_NODE) {
                    addToTree(element, child);
                }
            }
        }
        for (const node of doc.documentElement.childNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                console.log("Adding node: ", node); // отладочный вывод
                addToTree(table, node);
            }
        }
        const ourThings = getElements(table, levelDescription.selector);
        ourThings.forEach(
            x => {
                x.classList.add("dance");
            })

    }
    private generateHTML2(table: HTMLDivElement, levelDescription: IData): void {
        const tagList: string[] = [];
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
                } else {
                    newHTML = newHTML + str[i];
                    tagList.push(str[i]);
                }
            }
        console.log(tagList);
        table.innerHTML = newHTML;
        const ourThings = getElements(table, levelDescription.selector);
        ourThings.forEach(
            x => {
                x.classList.add("dance");
            })

    }
}

function showTooltip(element:HTMLElement /*, node*/):void {
    const popup = getElementOfDocument('.tooltip');
    popup.classList.add('.tooltip')
    popup.style.display = 'block';
    popup.innerText = element.outerHTML.replace(` class="dance"`,'');
    console.log(popup.innerText)
    const coords = element.getBoundingClientRect();
    const tooltipTop = `${coords.top - 50}px`;
    const tooltipLeft = `${coords.left}px`;
    popup.style.top = tooltipTop;
    popup.style.left = tooltipLeft;
}

function hideTooltip():void {
    const popup = getElementOfDocument('.tooltip');
    popup.style.display = 'none';
}
