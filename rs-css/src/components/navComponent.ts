import LevelDescComponent from "./levelDescComponent";
import LevelListComponent from "./levelListComponent";
import State from "../state";
import {levels} from "../data/data";
import {getElementOfDocument} from "../util";
import TaskComponent from "./taskComponent";

export class NavComponent {
    private currentLevel: number;
    private isDone: boolean;
    private isWithHelp: boolean;
    private levelListButton: HTMLButtonElement;
    private maxLevel: number;
    private menuToggleButton: HTMLDivElement;
    private _levelDescComponent: LevelDescComponent;
    private _levelListComponent: LevelListComponent;
    private state: State;
    private readonly template:string = '';
    private _taskComponent: TaskComponent;

    constructor(state: State, levelDescComponent: LevelDescComponent, levelListComponent: LevelListComponent, taskComponent: TaskComponent) {
        this.state = state;
        this._levelDescComponent = levelDescComponent;
        this._levelListComponent = levelListComponent;
        this._taskComponent = taskComponent;
        this.currentLevel = state.getCurrentLevel();
        this.maxLevel = levels.length;
        this.levelListButton = document.createElement('button');
        this.isDone=false;
        this.isWithHelp=false;
        this.menuToggleButton = document.createElement('div');
        this.template = `<span>Level ${this.currentLevel} of ${this.maxLevel}</span>
                                    <span class="level__check ${this.isDone ? 'done' : ''} material-icons">
                                        done
                                    </span>
                                    <span class="level__with-help ${this.isWithHelp ? 'active' : ''} material-icons">
                                        remove_red_eye
                                    </span>`;
    }



    render(): HTMLDivElement {
        const navigation = document.createElement('div');
        navigation.classList.add('navigation');
        const navigationTop = document.createElement('div');
        navigationTop.classList.add('navigation__top');
        navigationTop.innerHTML = `<h2 class="navigation__level"> ${this.template}</h2>`;

        const navigationArrows = document.createElement('div');
        navigationArrows.classList.add('navigation__arrows');

        const buttonPrev = document.createElement('button');
        buttonPrev.classList.add('navigation__arrow');
        buttonPrev.innerHTML = '<span class="material-icons">arrow_back_ios</span>';
        this.bindNavButtonListener('prev', buttonPrev);

        const buttonNext = document.createElement('button');
        buttonNext.classList.add('navigation__arrow');
        buttonNext.innerHTML = '<span class="material-icons">arrow_forward_ios</span>';
        this.bindNavButtonListener('next', buttonNext);


        this.menuToggleButton.classList.add('navigation__menu-toggle');
        this.menuToggleButton.innerHTML = '<span></span>';
        this.menuToggleButton.addEventListener('click', () => this.toggleMenu());

        navigationArrows.append(buttonPrev);
        navigationArrows.append(buttonNext);

        navigationTop.append(navigationArrows);

        navigation.append(navigationTop);
        navigation.append(this.menuToggleButton);

        return navigation;
    }
    updateNavLevel(): void {
        //TODO надо позвать обновление levelDesck
        this.state.setCurrentLevel(this.currentLevel);
        const navigationLevel = getElementOfDocument('.navigation__level');
        navigationLevel.innerHTML = `<span>Level ${this.currentLevel} of ${this.maxLevel}</span>
                                        <span class="level__check ${this.isDone ? 'done' : ''} material-icons">
                                            done
                                        </span>
                                        <span class="level__with-help ${this.isWithHelp ? 'active' : ''} material-icons">
                                            remove_red_eye
                                        </span>`;
        this._levelDescComponent.updateLevelDesc(levels[this.currentLevel])
        this._taskComponent.updateTask(levels[this.currentLevel])

    }
    private toggleMenu():void {
        this.menuToggleButton.classList.toggle('active');
        this._levelDescComponent.toggle();
        this._levelListComponent.toggle();
        //TODO адаптивность?
        /*
        if (windowSize <= 768 && rightContainer.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        } */
    }
    bindNavButtonListener(value:string, buttonElement:HTMLButtonElement): void {
        switch (value) {
            case 'prev':
                buttonElement.addEventListener('click', () => {
                    if (this.currentLevel > 1) {
                        this.currentLevel -= 1;
                        //this.changeLevel(this.currentLevel);
                        this.updateNavLevel();
                    }
                });
                break;
            case 'next':
                buttonElement.addEventListener('click', () => {
                    if (this.currentLevel < this.maxLevel) {
                        this.currentLevel += 1;
                        //this.changeLevel(this.currentLevel);
                        this.updateNavLevel();
                    }
                });
                break;
            default:
                break;
        }
    }
}
