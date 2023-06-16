import {IData} from "../types";

export default class LevelDescComponent {
    private levelDescription: IData;
    private levelPanel: HTMLDivElement;
    constructor(levelDescription:IData) {
        this.levelDescription = levelDescription;
        this.levelPanel = document.createElement('div');
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
    generateLevelDescriptionView(): HTMLDivElement {
        const examples = document.createElement('div');
        examples.classList.add('description__examples');
        this.levelDescription.examples.forEach((example) => {
            examples.innerHTML += `<div class="description__example">${example}</div>`;
        });

        const levelPanelDescription = document.createElement('div');
        levelPanelDescription.classList.add('level-panel__description');
        levelPanelDescription.classList.add('scroll');

        levelPanelDescription.innerHTML = `<h3>${this.levelDescription.selectorName}</h3>
                                            <span class="description__title">${this.levelDescription.helpTitle}</span>
                                            <span class="description__syntax"><tag>${this.levelDescription.syntax}</tag></span>
                                            <div class="description__hint">${this.levelDescription.help}</div>
                                            <h4>Examples</h4>`;
        levelPanelDescription.append(examples);
        return levelPanelDescription;
    }
}
