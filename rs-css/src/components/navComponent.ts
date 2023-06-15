export class NavComponent {
    private level: number;
    private isDone: boolean;
    private isWithHelp: boolean;
    private levelListButton: HTMLButtonElement;
    private maxLevel: number;
    constructor() {
        this.level = 1;
        this.maxLevel = 10;
        this.levelListButton = document.createElement('button');
        this.isDone=false;
        this.isWithHelp=false;
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

        navigationArrows.append(buttonPrev);
        navigationArrows.append(buttonNext);

        navigationTop.append(navigationArrows);

        navigation.append(navigationTop);
        navigation.append(this.levelListButton);

        return navigation;
    }
}
