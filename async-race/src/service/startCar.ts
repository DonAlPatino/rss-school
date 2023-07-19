import { driveMotor, startMotor } from './api';
import animateCar from '../util/animateCar';
import State from '../state';

export const startCar = async (idCar: number, state: State):Promise<void> => {

  const { velocity, distance } = await startMotor(idCar);
  const time:number = distance / velocity;
  const car = <HTMLDivElement>document.getElementById(`car-${idCar}`);
  const btnStart = <HTMLButtonElement>document.getElementById(`start-${idCar}`);
  const btnStop = <HTMLButtonElement>document.getElementById(`stop-${idCar}`);

  btnStart.setAttribute('disabled', 'disabled');
  btnStop.removeAttribute('disabled');

  state.setIdAnimation(idCar, animateCar(time, car, btnStart, btnStop));

  driveMotor(idCar).then((drive) => {
    if (!drive.success) {
      state.getIdAnimation(idCar).cancel();
      btnStop.setAttribute('disabled', 'disabled');
      btnStart.removeAttribute('disabled');
    }
  });
};
