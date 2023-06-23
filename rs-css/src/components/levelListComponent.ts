import {IData} from "../types";
import State from "../state";

export default class LevelListComponent {
    private levelsData: IData[];
    private levelsList: HTMLDivElement;
    private levelsListContainer: HTMLDivElement;
    private isDone: boolean;
    private isWithHelp: boolean;
    private state: State;
    private currentLevel: number;
    private readonly _update: (currentLevel: number) => void;

    constructor(state: State, levelsData: IData[], update: (currentLevel: number) => void) {
        this.state = state;
        this.levelsData = levelsData;
        this.currentLevel = state.getCurrentLevel();
        this._update = update;
        this.isDone = false;
        this.isWithHelp = false;
        this.levelsList = document.createElement('div');
        this.levelsListContainer = document.createElement('div');
    }

    toggle(): void {
        this.levelsList.classList.toggle('active');
    }

    render(): HTMLDivElement {
        this.levelsList.classList.add('levels-navigation');
        this.levelsList.append(this.generateLevelsList());
        this.levelsList.append(this.generateResetProgressButton());
        //TODO reset button

        return this.levelsList;
    }

    update(currentLevel: number): void {
        this.currentLevel = currentLevel;
        while (this.levelsListContainer.firstChild) {
            this.levelsListContainer.firstChild.remove()
        }
        this.levelsList.before(this.generateLevelsList());
    }

    generateLevelsList(): HTMLDivElement {

        this.levelsListContainer.classList.add('levels-navigation__container');
        this.levelsListContainer.classList.add('scroll');
        let index = 0;
        this.levelsData.forEach((level) => {

            //const isWithHelp = this.checkIsUsedHelp(level.level);
            index++;
            this.isDone = this.state.getProgress()[index];
            const levelsNavigationItem = document.createElement('div');
            levelsNavigationItem.classList.add('levels-navigation__item');
            levelsNavigationItem.dataset.level = index.toString();
            if (this.currentLevel === index) {
                levelsNavigationItem.classList.add('active');
            }

            levelsNavigationItem.innerHTML += `<span class="level__check ${this.isDone ? 'done' : ''} material-icons">
                                            done
                                        </span>
                                        <span class="level__with-help ${this.isWithHelp ? 'active' : ''} material-icons">
                                            remove_red_eye
                                        </span>
                                        <span>${index}</span>
                                        <span>${level.syntax}</span>`;

            levelsNavigationItem.addEventListener('click', (event) => {
                const {currentTarget} = event
                if (currentTarget instanceof HTMLElement) {
                    const level = Number(currentTarget.dataset.level)
                    this._update(level);
            }
                //this.toggleLevelNavigation();
            });

            this.levelsListContainer.append(levelsNavigationItem);
        });

        return this.levelsListContainer;
    }

    generateResetProgressButton(): HTMLButtonElement {
        const resetProgressButton = document.createElement('button');
        resetProgressButton.classList.add('button');
        resetProgressButton.innerText = 'Reset Progress';

        resetProgressButton.addEventListener('click', () => {
            this.state.clearData();
            this.update(1);
            this._update(1);
        });
        return resetProgressButton;
    }
}
