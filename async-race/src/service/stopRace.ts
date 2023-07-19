import { getAllCars } from './api';
import State from '../state';
import { stopCar } from './stopCar';
import { getElementOfDocument } from '../util';

export const stopRace = async (state: State):Promise<void> => {
  await getAllCars(state.getCurGaragePage(), 7).then(({ cars, count }) => {
    cars.forEach((elem) => stopCar(elem.id, state));
  });
  const raceBtn = <HTMLButtonElement>getElementOfDocument('.btn-race');
  const rasetBtn = <HTMLButtonElement>getElementOfDocument('.btn-reset');
  raceBtn.disabled = false;
  rasetBtn.disabled = true;
};
