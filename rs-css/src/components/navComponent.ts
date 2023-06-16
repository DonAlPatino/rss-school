import LevelDescComponent from "./levelDescComponent";
import LevelListComponent from "./levelListComponent";

export class NavComponent {
    private level: number;
    private isDone: boolean;
    private isWithHelp: boolean;
    private levelListButton: HTMLButtonElement;
    private maxLevel: number;
    private menuToggleButton: HTMLDivElement;
    private _levelDescComponent: LevelDescComponent;
    private _levelListComponent: LevelListComponent;

    constructor(levelDescComponent: LevelDescComponent, levelListComponent: LevelListComponent) {
        this._levelDescComponent = levelDescComponent;
        this._levelListComponent = levelListComponent;
        this.level = 1;
        this.maxLevel = 10;
        this.levelListButton = document.createElement('button');
        this.isDone=false;
        this.isWithHelp=false;
        this.menuToggleButton = document.createElement('div');
    }
    render(): HTMLDivElement {
        const navigation = document.createElement('div');
        navigation.classList.add('navigation');
        const navigationTop = document.createElement('div');
        navigationTop.classList.add('navigation__top');
        navigationTop.innerHTML = `<h2 class="navigation__level">
                                        <span>Level ${this.level} of ${this.maxLevel}</span>
                                        <span class="level__check ${this.isDone ? 'done' : ''} material-icons">
                                            done
                                        </span>
                                        <span class="level__with-help ${this.isWithHelp ? 'active' : ''} material-icons">
                                            remove_red_eye
                                        </span>
                                    </h2>`;

        const navigationArrows = document.createElement('div');
        navigationArrows.classList.add('navigation__arrows');

        const buttonPrev = document.createElement('button');
        buttonPrev.classList.add('navigation__arrow');
        buttonPrev.innerHTML = '<span class="material-icons">arrow_back_ios</span>';
        //this.bindNavButtonListener('prev', buttonPrev);

        const buttonNext = document.createElement('button');
        buttonNext.classList.add('navigation__arrow');
        buttonNext.innerHTML = '<span class="material-icons">arrow_forward_ios</span>';
        //this.bindNavButtonListener('next', buttonNext);


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

    private toggleMenu():void {
        this.menuToggleButton.classList.toggle('active');
        this._levelDescComponent.toggle();
        this._levelListComponent.toggle();
        /*this.rightContainer.classList.toggle('active');

        if (this.windowSize <= 768 && this.rightContainer.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        } */
    }
}
