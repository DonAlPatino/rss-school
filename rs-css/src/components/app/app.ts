import {getElementOfDocument} from "../../util";
import TaskComponent from "../task.component";
class App {
    private taskComponent: TaskComponent;
    constructor() {
        this.taskComponent = new TaskComponent(`Select the apple on the plate`);
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
    }
}

export default App;
