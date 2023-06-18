import {EditorCssPanelComponent} from "./editorCssPanelComponent";
import {EditorHtmlPanelComponent} from "./editorHtmlPanelComponent";
import State from "../state";

export default class  EditorComponent {
    private editorCssPanelComponent: EditorCssPanelComponent;
    private editorHtmlPanelComponent: EditorHtmlPanelComponent;

    constructor(state: State) {
        this.editorCssPanelComponent = new EditorCssPanelComponent();
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
}
