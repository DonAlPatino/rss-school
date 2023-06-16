import {IData} from "../types";

export default class LevelListComponent {
    private levelsData: IData[];
    private levelsList: HTMLDivElement;
    private levelsListContainer: HTMLDivElement;
    private isDone: boolean;
    private isWithHelp: boolean;
    private isActive: boolean;
    constructor(levelsData:IData[]) {
        this.levelsData = levelsData;
        this.isDone=false;
        this.isWithHelp=false;
        this.isActive = false;
        this.levelsList = document.createElement('div');
        this.levelsListContainer = document.createElement('div');
    }
    toggle():void{
        this.levelsList.classList.toggle('active');
    }
    render():HTMLDivElement {
        this.levelsList.classList.add('levels-navigation');
        this.levelsList.append(this.generateLevelsList());
        //TODO reset button

        return this.levelsList;
    }
    generateLevelsList(): HTMLDivElement {

        this.levelsListContainer.classList.add('levels-navigation__container');
        this.levelsListContainer.classList.add('scroll');
        let index = 0;
        this.levelsData.forEach((level) => {
            //const isDone = this.checkIsLevelDone(level.level);
            //const isWithHelp = this.checkIsUsedHelp(level.level);
            //const isActive = level.level === this.level;

            index++;
            const levelsNavigationItem = document.createElement('div');
            levelsNavigationItem.classList.add('levels-navigation__item');

            if (this.isActive) {
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

            /*levelsNavigationItem.addEventListener('click', () => {
                this.changeLevel(level.level);
                this.toggleLevelNavigation();
            });*/

            this.levelsListContainer.append(levelsNavigationItem);
        });

        return this.levelsListContainer;
    }

}
