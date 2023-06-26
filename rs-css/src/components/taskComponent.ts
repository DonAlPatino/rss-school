import {levels} from "../data/data";
import State from "../state";
import {IData} from "../types";
import {getElementOfDocument} from "../util";

export default class TaskComponent {
  private readonly taskTitle: string;
  private container: HTMLDivElement;
  private task: HTMLDivElement;
  private currentLevel: number;
  private help: HTMLDivElement;

  constructor(state: State) {
    this.currentLevel = state.getCurrentLevel()
    this.taskTitle = levels[this.currentLevel].helpTitle;
    this.container = document.createElement('div');
    this.task = document.createElement('div');
    this.help = document.createElement('div');
  }
  render():HTMLDivElement {
    this.container.classList.add('container_task');
    this.task.classList.add('task');
    this.task.innerText = this.taskTitle;
    this.container.append(this.task);
    this.help.innerHTML = `<a class="help_link" href="#" style="display: inline-block;">Help, I'm stuck!</a>`;

    this.help.addEventListener('click', (e) => {
      this.writeAnswer();
    });

    this.container.append(this.help);
    return this.container;
  }
  updateTask(currentLevel:number):void {
    this.currentLevel = currentLevel;
    this.task.innerText = levels[this.currentLevel].helpTitle;
  }
   writeAnswer():void {
    const input = getElementOfDocument('.css-panel__input') as HTMLTextAreaElement;
    input.value = levels[this.currentLevel].selector;
    input.focus();
  }

  /*private async writeAnswer():Promise<void> {
    await this.editorComponent.writeAnswer();

    const isWithHelp = true;
    let isDone = false;
    const levelData = this.getLevelInProgress();

    if (levelData.length) {
      isDone = levelData[0].isDone;
    }

    if (!isDone) {
      this.updateProgress(this.level, isDone, isWithHelp);
    }
  }*/
}
