import {getElementOfDocument} from "../../util";
import TaskComponent from "../taskComponent";
import GameComponent from "../gameComponent";
import EditorComponent from "../editorComponent";
import {NavComponent} from "../navComponent";
import LevelListComponent from "../levelListComponent";
import LevelDescComponent from "../levelDescComponent";
import {levels} from "../../data/data";
import State from "../../state";

class App {
    private taskComponent: TaskComponent;
    private gameComponent: GameComponent;
    private editorComponent: EditorComponent;
    private navComponent: NavComponent;
    private readonly levelDescComponent: LevelDescComponent;
    private readonly levelListComponent: LevelListComponent;
    private readonly currentLevel: number;
    private readonly state: State;

    constructor() {
        this.state = new State();
        this.currentLevel = this.state.getCurrentLevel();
        this.gameComponent = new GameComponent(this.state);
        this.editorComponent = new EditorComponent(this.state ,this);
        this.levelDescComponent = new LevelDescComponent(levels[this.currentLevel]);
        this.levelListComponent = new LevelListComponent(this.state,levels,(currentLevel: number) => this.update(currentLevel));
        this.navComponent = new NavComponent(this.state, this.levelDescComponent,this.levelListComponent,(currentLevel: number) => this.update(currentLevel));
        this.taskComponent = new TaskComponent(this.state, () => this.editorComponent.checkAnswer());
    }

    start():void {
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        document.body.append(tooltip);
        const appContainer = getElementOfDocument('.app-container');

        const leftContainer = document.createElement('div');
        leftContainer.classList.add('left-container');

        const rightContainer = document.createElement('div');
        rightContainer.classList.add('right-container');

        const footer = document.createElement('footer');
        footer.classList.add('footer');
        footer.innerHTML = `<p class="copyright">
        <a href="https://rs.school/js/"><img src="https://rs.school/images/rs_school_js.svg" alt="Logotype"></a>
            <a href="https://github.com/DonAlPatino">Don Al Patino 2023</a>
        </p>`;

        appContainer.append(leftContainer);
        appContainer.append(rightContainer);
        leftContainer.append(this.taskComponent.render());
        leftContainer.append(this.gameComponent.render());
        leftContainer.append(this.editorComponent.render());
        leftContainer.append(footer);

        rightContainer.append(this.navComponent.render());
        rightContainer.append(this.levelListComponent.render());
        rightContainer.append(this.levelDescComponent.render());

    }

    update(currentLevel: number):void {
        this.state.setCurrentLevel(currentLevel);
        this.levelDescComponent.updateLevelDesc(levels[currentLevel]);
        this.taskComponent.updateTask(currentLevel);
        this.navComponent.updateNavLevel(currentLevel);
        this.editorComponent.update(levels[currentLevel]);
        this.gameComponent.update(levels[currentLevel]);
        this.levelListComponent.update(currentLevel)
    }
}

export default App;
