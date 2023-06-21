import {EditorCssPanelComponent} from "./editorCssPanelComponent";
import {EditorHtmlPanelComponent} from "./editorHtmlPanelComponent";
import State from "../state";
import {IData} from "../types";

export default class  EditorComponent {
    private editorCssPanelComponent: EditorCssPanelComponent;
    private editorHtmlPanelComponent: EditorHtmlPanelComponent;

    constructor(state: State) {
        this.editorCssPanelComponent = new EditorCssPanelComponent(state);
        this.editorHtmlPanelComponent = new EditorHtmlPanelComponent(state);
    }

    render():HTMLDivElement {
        const container = document.createElement('div');
        container.classList.add('container_editor');
        const editor = document.createElement('div');
        editor.classList.add('editor');

        editor.append(this.editorCssPanelComponent.render());
        editor.append(this.editorHtmlPanelComponent.render());

        container.append(editor);

        return container;
    }
    update(levelDescription:IData):void {
        this.editorHtmlPanelComponent.update(levelDescription);
    }
}
