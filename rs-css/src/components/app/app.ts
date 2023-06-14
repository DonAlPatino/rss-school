import {getElementOfDocument} from "../../util";
import TaskComponent from "../taskComponent";
import GameComponent from "../gameComponent";
import EditorComponent from "../editorComponent";

class App {
    private taskComponent: TaskComponent;
    private gameComponent: GameComponent;
    private editorComponent: EditorComponent;
    constructor() {
        this.taskComponent = new TaskComponent(`Select the apple on the plate`);
        this.gameComponent = new GameComponent(`Как я это сделаю - я не знаю`);
        this.editorComponent = new EditorComponent(`Тут будет редактор`);
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
    }
}

export default App;
