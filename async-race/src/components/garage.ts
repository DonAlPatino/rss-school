export default class Garage {
  private readonly template:string;

  private container: HTMLDivElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'page garage-page';
    this.template = `
      <div class="generate-cars">
        <div class="field-create">
          <input class="text-input" type="text" autocomplete placeholder="Enter name сar...">
          <input class="color-input" type="color" value="#e66465" >
          <button class="buttons btn-create">create</button>
        </div>
        <div class="field-update">
          <input class="text-input" type="text" autocomplete disabled="true" placeholder="Enter new name сar...">
          <input class="color-input" type="color" value="#f6b73c" disabled="true">
          <button class="buttons btn-update" disabled="true">update</button>
        </div>
        <div class="field-control">
          <button class="buttons btn-race">race</button>
          <button class="buttons btn-reset" disabled>reset</button>
          <button class="buttons btn-generate_cars">generate cars</button>
        </div>
      </div>

      <div class="container-garage">
        <h1 class="title">Garage <span class="count-garage"></span></h1>
        <h3 class="title">Page #<span class="count-page">1</span></h3>
   
        <div class="container-car"></div>
      </div>

      <div class="pagination">
        <button class="buttons btn-prev">Prev</button>
        <button class="buttons btn-next">Next</button>
      </div>
  `;
  }

  render():HTMLDivElement {
    this.container.innerHTML = this.template;
    return this.container;
  }
}
