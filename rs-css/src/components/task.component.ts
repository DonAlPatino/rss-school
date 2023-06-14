export default class TaskComponent {
  private readonly task: string;
  constructor(task:string) {
    this.task = task;
  }

  render():HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('container');

    const task = document.createElement('div');
    task.classList.add('task');
    task.innerText = this.task;

    container.append(task);

    return container;
  }
}
