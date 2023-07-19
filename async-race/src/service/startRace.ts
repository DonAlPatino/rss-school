import { getAllCars } from './api';
import { startCar } from './startCar';
import State from '../state';

export const startRace = async (state: State):Promise<void> => {
  state.startRace = Date.now();
  await getAllCars(state.getCurGaragePage(), 7).then(({ cars, count }) =>
    cars.forEach((elem) => {
      state.raceArr.push(elem.id);
      startCar(elem.id, state);
    }));
};
