import { stopMotor } from './api';
import State from '../state';

export const stopCar = async (idStop: number, state: State):Promise<void> => {
  stopMotor(idStop).then(() => {
    state.getIdAnimation(idStop).cancel();
    const car = <HTMLElement>document.getElementById(`car-${idStop}`);
    car.style.transform = 'translateX(0px)';
  });
};
