import State from "../state";
import {levels} from "../data/data";

export class EditorHtmlPanelComponent {
    private currentLevel: number;
    constructor(state: State) {
        this.currentLevel = state.getCurrentLevel();
    }

    render(): HTMLDivElement {
        const editorHtmlPanel = document.createElement('div');
        editorHtmlPanel.classList.add('html-panel');

        const editorHtmlWindow = document.createElement('div');
        editorHtmlWindow.classList.add('html-panel__window');
        editorHtmlWindow.innerHTML = '<div class="html-panel__line-numbers">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20</div>';

        editorHtmlPanel.innerHTML = '<div class="html-panel__header"><span>HTML Viewer</span><span>table.html</span></div>';

        const tableTag = document.createElement('div');
        // tableTag.classList.add('html-table');

        this.generateFullHtml(tableTag, levels[this.currentLevel-1].boardMarkup);

        editorHtmlWindow.append(tableTag);
        editorHtmlPanel.append(editorHtmlWindow);

        return editorHtmlPanel;
    }

    private generateFullHtml(tableTag: HTMLDivElement, boardMarkup: string):void {
        // tableTag.insertAdjacentHTML("afterend", boardMarkup)
        console.log(this.currentLevel)
        tableTag.innerText= `<div class="table">${boardMarkup}</div>`;
    }
}
