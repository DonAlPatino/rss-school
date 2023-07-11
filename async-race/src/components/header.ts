export default class Header {
  private readonly template:string;

  private readonly container: HTMLElement;

  constructor() {
    this.container = document.createElement('header');
    this.container.className = 'header';
    this.template = `
       <div class="nav">
        <button class="buttons btn-to_garage">To garage</button>
        <button class="buttons btn-to_winners">To winners</button>
      </div>
  `;
  }

  render():HTMLElement {
    this.container.innerHTML = this.template;
    return this.container;
  }
}
