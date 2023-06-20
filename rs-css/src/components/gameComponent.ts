import State from "../state";
import {levels} from "../data/data";
import {IData} from "../types";
import hljs from "highlight.js";

export default class GameComponent {
    private currentLevel: number;
    constructor(state: State) {
        this.currentLevel = state.getCurrentLevel();
    }

    render(): HTMLDivElement {
        const game = document.createElement('div');
        game.classList.add('game');
        const tableWrapper = document.createElement('div');
        tableWrapper.classList.add('table-wrapper');
        const tableSurface = document.createElement('div');
        tableSurface.classList.add('table-surface');
        tableWrapper.append(tableSurface);
        const table = document.createElement('div');
        table.classList.add('table');

        this.generateHTML(table, levels[this.currentLevel].boardMarkup);
        /*const highlightedCode = hljs.highlight(`${levels[this.currentLevel].boardMarkup}`,
            {
                language: 'xml'
            }
        ).value;
        table.insertAdjacentHTML("afterbegin", `${levels[this.currentLevel].boardMarkup}`)*/
        tableWrapper.append(table);

        const tableEdge =document.createElement('div');
        tableEdge.classList.add('table-edge');
        tableEdge.innerHTML =`
        <div class="table-leg"></div>
            <div class="table-leg"></div>`
        game.append(tableWrapper);
        game.append(tableEdge);
        return game;
    }

    private generateHTML(table: HTMLDivElement, boardMarkup: string) {
        const regex = new RegExp(`<(.*)\/>/g`);
        const str = boardMarkup.split('\n');
        for (let i = 0; i < str.length; i++)
        if (str[i] !== '') {
            const newstr = str[i].match(regex);
            if (newstr !== null && newstr.length > 0) {
                console.log(newstr[0])
            }
        }
    }
}
