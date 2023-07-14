import { getElementOfDocument } from '../util';
import { getAllCars } from '../service/api';
import { createCarImage } from '../util/createCarImage';


export const createCarTable = (id: number, name: string, color: string):string =>
  `<div class="car">
    <div class="car-options">
      <button class="buttons car-options_select" data-select=${id}>Select</button>
      <button class="buttons car-options_remove" data-remove=${id}>Remove</button>
      <h4 class="car-options_title">${name}</h4>
    </div>
    <div class="car-control">
      <button class="buttons car-control_start" id="start-${id}" data-start=${id} >Start</button>
      <button class="buttons car-control_stop" id="stop-${id}" data-stop=${id} disabled="true">Stop</button>
      <div class="car-img" id="car-${id}" data-car=${id}>${createCarImage(color)}</div>
      <div class="flag"></div>
    </div>
  </div>
`;


export default class GaragePage {
  private readonly template:string;

  private readonly container: HTMLDivElement;

  private containerCars: HTMLDivElement;

  constructor() {
    this.containerCars = document.createElement('div');
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

  updateGarage = async (): Promise<void> => {
    this.containerCars = getElementOfDocument('.container-car');
    const countGarage = getElementOfDocument('.count-garage');
    this.containerCars.innerHTML = '';
    const cars = await getAllCars();
    for (const car of cars) {
      const oneCar = `${createCarTable(car.id, car.name, car.color)}`;
      this.containerCars.innerHTML += oneCar;
    }
    countGarage.innerText = ` (${cars.length.toString()} cars)`;
  };
}
