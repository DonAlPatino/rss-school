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
    private levelDescComponent: LevelDescComponent;
    private levelListComponent: LevelListComponent;
    private currentLevel: number;

    constructor() {
        const state = new State();
        this.currentLevel = state.getCurrentLevel();
        this.taskComponent = new TaskComponent(state);
        this.gameComponent = new GameComponent(`Как я это сделаю - я не знаю`);
        this.editorComponent = new EditorComponent();
        this.levelDescComponent = new LevelDescComponent(levels[this.currentLevel]);
        this.levelListComponent = new LevelListComponent(levels);
        this.navComponent = new NavComponent(state, this.levelDescComponent,this.levelListComponent, this.taskComponent);
    }

    start():void {
        const appContainer = getElementOfDocument('.app-container');

        const leftContainer = document.createElement('div');
        leftContainer.classList.add('left-container');

        const rightContainer = document.createElement('div');
        rightContainer.classList.add('right-container');

        appContainer.append(leftContainer);
        appContainer.append(rightContainer);
        leftContainer.append(this.taskComponent.render());
        leftContainer.append(this.gameComponent.render());
        leftContainer.append(this.editorComponent.render());

        rightContainer.append(this.navComponent.render());
        rightContainer.append(this.levelListComponent.render());
        rightContainer.append(this.levelDescComponent.render());

    }
}

export default App;
