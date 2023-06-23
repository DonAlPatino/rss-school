import {EditorCssPanelComponent} from "./editorCssPanelComponent";
import {EditorHtmlPanelComponent} from "./editorHtmlPanelComponent";
import State from "../state";
import {IData} from "../types";
import App from "./app/app";

export default class  EditorComponent {
    private editorCssPanelComponent: EditorCssPanelComponent;
    private editorHtmlPanelComponent: EditorHtmlPanelComponent;
    private editor: HTMLDivElement;
    private _app: App;

    constructor(state: State, app: App) {
        this._app = app;
        this.editorCssPanelComponent = new EditorCssPanelComponent(state, () => this.shakeEditorWindow(),this._app);
        this.editorHtmlPanelComponent = new EditorHtmlPanelComponent(state);
        this.editor = document.createElement('div');
    }

    render():HTMLDivElement {
        const container = document.createElement('div');
        container.classList.add('container_editor');

        this.editor.classList.add('editor');

        this.editor.append(this.editorCssPanelComponent.render());
        this.editor.append(this.editorHtmlPanelComponent.render());

        container.append(this.editor);

        return container;
    }
    update(levelDescription:IData):void {
        this.editorHtmlPanelComponent.update(levelDescription);
    }

    shakeEditorWindow():void {
        this.editor.classList.add('shake');
        setTimeout(() => {
            this.editor.classList.remove('shake');
        }, 520);
    }
}
