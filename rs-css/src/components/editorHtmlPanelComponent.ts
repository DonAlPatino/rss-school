import State from "../state";
import {levels} from "../data/data";
import {IData} from "../types";
import hljs from 'highlight.js';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));

export class EditorHtmlPanelComponent {
    private currentLevel: number;
    private tableTag: HTMLDivElement;
    constructor(state: State) {
        this.currentLevel = state.getCurrentLevel();
        this.tableTag = document.createElement('div');
    }

    render(): HTMLDivElement {
        const editorHtmlPanel = document.createElement('div');
        editorHtmlPanel.classList.add('html-panel');

        const editorHtmlWindow = document.createElement('div');
        editorHtmlWindow.classList.add('html-panel__window');
        editorHtmlWindow.innerHTML = '<div class="html-panel__line-numbers">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20</div>';

        editorHtmlPanel.innerHTML = '<div class="html-panel__header"><span>HTML Viewer</span><span>table.html</span></div>';

        this.tableTag.classList.add('html-table');
        this.generateFullHtml(this.tableTag, levels[this.currentLevel].boardMarkup);
        editorHtmlWindow.append(this.tableTag);
        editorHtmlPanel.append(editorHtmlWindow);
        return editorHtmlPanel;
    }

    update(levelDescription:IData): void {
        this.generateFullHtml(this.tableTag, levelDescription.boardMarkup);
    }
    private generateFullHtml(tableTag: HTMLDivElement, boardMarkup: string):void {
        // tableTag.insertAdjacentHTML("afterend", boardMarkup)
        //const sanitize = ('<div class="table">' + boardMarkup + '</div>').replaceAll('>', '&gt').replaceAll('<', '&lt');
        const highlightedCode = hljs.highlight(`<div class="table">${boardMarkup}
</div>`,
            {
                language: 'xml'
            }
        ).value;
        console.log(highlightedCode)
        tableTag.innerHTML= `<pre><code>${highlightedCode}</code></pre>`;
    }
}
