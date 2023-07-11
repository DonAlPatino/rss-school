export default class Garage {
  private readonly template:string;

  private container: HTMLDivElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'page garage-page';
    this.template = `
  `;
  }

  render():HTMLDivElement {
    this.container.innerHTML = this.template;
    return this.container;
  }
}
