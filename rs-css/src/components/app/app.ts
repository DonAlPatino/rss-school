import {getElementOfDocument} from "../../util";
import TaskComponent from "../taskComponent";
import GameComponent from "../gameComponent";
import EditorComponent from "../editorComponent";
import {NavComponent} from "../navComponent";
import LevelListComponent from "../levelListComponent";
import LevelDescComponent from "../levelDescComponent";
import {levels} from "../../data/data";

class App {
    private taskComponent: TaskComponent;
    private gameComponent: GameComponent;
    private editorComponent: EditorComponent;
    private navComponent: NavComponent;
    private levelDescComponent: LevelDescComponent;
    private levelListComponent: LevelListComponent;
    constructor() {
        this.taskComponent = new TaskComponent(levels[0].helpTitle);
        this.gameComponent = new GameComponent(`Как я это сделаю - я не знаю`);
        this.editorComponent = new EditorComponent(`Тут будет редактор`);
        this.levelDescComponent = new LevelDescComponent(levels[0]);
        this.levelListComponent = new LevelListComponent(levels);
        this.navComponent = new NavComponent(this.levelDescComponent,this.levelListComponent );
    }

    start():void {console.log("Starting");
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
