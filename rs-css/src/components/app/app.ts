import {getElementOfDocument} from "../../util";
class App {
    constructor() {}

    start():void {console.log("Starting");
        const appContainer = getElementOfDocument('.app-container');

        const leftContainer = document.createElement('div');
        leftContainer.classList.add('left-container');

        const rightContainer = document.createElement('div');
        rightContainer.classList.add('right-container');

        appContainer.append(leftContainer);
        appContainer.append(rightContainer);
    }
}

export default App;
