import { getAllCars } from './api';
import { startCar } from './startCar';
import State from '../state';
import { getElementOfDocument } from '../util';

export const startRace = async (state: State):Promise<void> => {
  await getAllCars(state.getCurGaragePage(), 7).then(({ cars, count }) =>
    cars.forEach((elem) => startCar(elem.id, state)));
};
