import { getAllCars } from './api';
import State from '../state';
import { stopCar } from './stopCar';

export const stopRace = async (state: State):Promise<void> => {
  getAllCars(state.getCurGaragePage(), 7).then(({ cars, count }) => {
    cars.forEach((elem) => stopCar(elem.id, state));
  });
  //resultRace = [];
  //noticeWinner.innerHTML = '';
};
