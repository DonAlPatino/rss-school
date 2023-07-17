import { driveMotor, startMotor } from './api';
import animateCar from '../util/animateCar';
import State from '../state';

export const startCar = async (idCar: number, state: State):Promise<void> => {

  const { velocity, distance } = await startMotor(idCar);
  const time:number = distance / velocity;
  const car = <HTMLDivElement>document.getElementById(`car-${idCar}`);

  state.setIdAnimation(idCar, animateCar(time, car));

  driveMotor(idCar).then((drive) => {
    if (!drive.success) {
      state.getIdAnimation(idCar).cancel();
    }
  });
};
