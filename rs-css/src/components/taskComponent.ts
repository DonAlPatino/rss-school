import {levels} from "../data/data";
import State from "../state";
import {getElementOfDocument} from "../util";

export default class TaskComponent {
  private readonly taskTitle: string;
  private container: HTMLDivElement;
  private task: HTMLDivElement;
  private currentLevel: number;
  private help: HTMLDivElement;
  private checkAnswer: () => void;

  constructor(state: State, checkAnswer: () => void) {
    this.currentLevel = state.getCurrentLevel()
    this.taskTitle = levels[this.currentLevel].helpTitle;
    this.container = document.createElement('div');
    this.task = document.createElement('div');
    this.help = document.createElement('div');
    this.checkAnswer = checkAnswer;
  }

  render(): HTMLDivElement {
    this.container.classList.add('container_task');
    this.task.classList.add('task');
    this.task.innerText = this.taskTitle;
    this.container.append(this.task);
    this.help.innerHTML = `<a class="help_link" href="#" style="display: inline-block;">Help, I'm stuck!</a>`;

    this.help.addEventListener('click', () => {
      this.writeAnswer();
    });

    this.container.append(this.help);
    return this.container;
  }

  updateTask(currentLevel: number): void {
    this.currentLevel = currentLevel;
    this.task.innerText = levels[this.currentLevel].helpTitle;
  }

  async writeAnswer(): Promise<void> {
    const input = getElementOfDocument('.css-panel__input') as HTMLTextAreaElement;

    this.slowlyInsertText(input, levels[this.currentLevel].selector).then(() => this.checkAnswer());
  }

  slowlyInsertText(textarea: HTMLTextAreaElement, text: string): Promise<Awaited<unknown>[]> {
    const promises = [...text].map((letter, i) => new Promise(
        (resolve) => {
          setTimeout(() => {
            textarea.value = textarea.value + letter;
            resolve(true);
          }, 100 * i);
        },
    ));
    return Promise.all(promises);
  }
}
