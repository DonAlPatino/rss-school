import { stopMotor } from './api';
import State from '../state';

export const stopCar = async (idStop: number, state: State):Promise<void> => {
  stopMotor(idStop).then(() => {
    state.getIdAnimation(idStop).cancel();
    const car = <HTMLElement>document.getElementById(`car-${idStop}`);
    const btnStart = <HTMLButtonElement>document.getElementById(`start-${idStop}`);
    const btnStop = <HTMLButtonElement>document.getElementById(`stop-${idStop}`);
    btnStop.setAttribute('disabled', 'disabled');
    btnStart.removeAttribute('disabled');
    car.style.transform = 'translateX(0px)';
  });
};
