import State from "../state";
import {levels} from "../data/data";
import App from "./app/app";

export class EditorCssPanelComponent {
    private input: HTMLTextAreaElement;
    private currentLevel: number;
    private state: State;
    private shakeEditorWindow: () => void;
    private _app: App;

    constructor(state: State, shakeEditorWindow: () => void, app: App) {
        this.state = state;
        this._app = app;
        this.currentLevel = state.getCurrentLevel();
        this.input = document.createElement('textarea');
        this.shakeEditorWindow = shakeEditorWindow;
    }
    render(): HTMLDivElement {
        const editorCssPanel = document.createElement('div');
        editorCssPanel.classList.add('css-panel');

        editorCssPanel.addEventListener( 'keyup', event => {
            if( event.code === 'Enter' )
            {
                this.checkAnswer();
            }
        });

        const editorCssWindow = document.createElement('div');
        editorCssWindow.classList.add('css-panel__window');
        editorCssWindow.innerHTML = '<div class="css-panel__line-numbers">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20</div>';


        this.input.placeholder = "Type in a CSS selector";
        this.input.classList.add('css-panel__input');
        this.input.classList.add('css-panel__input_animation');

        editorCssPanel.innerHTML = '<div class="css-panel__header"><span>CSS Editor</span><span>style.css</span></div>';

        const editorCssButton = document.createElement('button');
        editorCssButton.classList.add('css-panel__button');
        editorCssButton.innerText = 'enter';

        editorCssButton.addEventListener('click', this.checkAnswer.bind(this));

        const help = document.createElement('div');
        const template = `<div>
            {<br>
            /* Styles would go here. */<br>
            }
            </div> <div class="help">
              <br>
              /* <br>
              Type a number to skip to a level.<br>
              Ex → "5" for level 5 <br>*/
            </div>`
        help.innerHTML = template;
        editorCssWindow.append(this.input);
        editorCssWindow.append(editorCssButton);
        editorCssWindow.append(help);
        editorCssPanel.append(editorCssWindow);
        return editorCssPanel;
    }

     private checkAnswer():void {
        this.currentLevel = this.state.getCurrentLevel();
        const input = this.input.value.replaceAll('\n','')
        if (input === levels[this.currentLevel].selector){
            console.log('Win!')
            this.state.setProgress(this.currentLevel);
            this._app.update(this.currentLevel + 1)
        }
        else {
        //if (!this.input.value) {
            this.shakeEditorWindow();
            this.input.value = '';
            this.input.focus();
            console.log('Mino!')
            return;
        }
        return;
    }
}
