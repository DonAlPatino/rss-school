import { getAllCars } from './api';
import { startCar } from './startCar';
import State from '../state';

export const startRace = async (state: State):Promise<void> => {
  getAllCars(state.getCurGaragePage(), 7).then(({ cars, count }) =>
    cars.forEach((elem) => startCar(elem.id, state)));
};
