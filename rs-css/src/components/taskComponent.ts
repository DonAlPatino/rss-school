export default class TaskComponent {
  private readonly taskTitle: string;
  constructor(taskTitle:string) {
    this.taskTitle = taskTitle;
  }

  render():HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('container');

    const task = document.createElement('div');
    task.classList.add('task');
    task.innerText = this.taskTitle;

    container.append(task);

    return container;
  }
}
