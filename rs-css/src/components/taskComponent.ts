import {levels} from "../data/data";
import State from "../state";
import {IData} from "../types";

export default class TaskComponent {
  private readonly taskTitle: string;
  private container: HTMLDivElement;
  private task: HTMLDivElement;
  private currentLevel: number;
  constructor(state:State) {
    this.currentLevel = state.getCurrentLevel()
    this.taskTitle = levels[this.currentLevel].helpTitle;
    this.container = document.createElement('div');
    this.task = document.createElement('div');
  }
  render():HTMLDivElement {
    this.container.classList.add('container_task');
    this.task.classList.add('task');
    this.task.innerText = this.taskTitle;
    this.container.append(this.task);
    return this.container;
  }
  updateTask(levelDescription:IData):void {
    this.task.innerText = levelDescription.helpTitle;
  }
}
