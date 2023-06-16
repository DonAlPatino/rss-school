import {IData} from "../types";

export default class LevelDescComponent {
    private levelDescription: IData;
    private levelPanel: HTMLDivElement;
    private levelPanelDescription: HTMLDivElement;
    constructor(levelDescription:IData) {
        this.levelDescription = levelDescription;
        this.levelPanel = document.createElement('div');
        this.levelPanelDescription = document.createElement('div');
    }
    toggle():void{
        this.levelPanel.classList.toggle('active');
    }
    render(): HTMLDivElement {

        this.levelPanel.classList.add('level-panel');
        this.levelPanel.classList.add('active');
        this.levelPanel.append(this.generateLevelDescriptionView());
        // this.levelPanel.append(this.generateHelpButton());

        return this.levelPanel;
    }

    updateLevelDesc(levelDescription:IData):void {
        this.levelDescription = levelDescription;
        this.levelPanelDescription.remove();
        this.levelPanel.insertBefore(this.generateLevelDescriptionView(), this.levelPanel.lastChild);
    }
    generateLevelDescriptionView(): HTMLDivElement {
        const examples = document.createElement('div');
        examples.classList.add('description__examples');
        this.levelDescription.examples.forEach((example) => {
            examples.innerHTML += `<div class="description__example">${example}</div>`;
        });

        // const levelPanelDescription = document.createElement('div');
        this.levelPanelDescription.classList.add('level-panel__description');
        this.levelPanelDescription.classList.add('scroll');

        this.levelPanelDescription.innerHTML = `<h3>${this.levelDescription.selectorName}</h3>
                                            <span class="description__title">${this.levelDescription.helpTitle}</span>
                                            <span class="description__syntax"><tag>${this.levelDescription.syntax}</tag></span>
                                            <div class="description__hint">${this.levelDescription.help}</div>
                                            <h4>Examples</h4>`;
        this.levelPanelDescription.append(examples);
        return this.levelPanelDescription;
    }
}
