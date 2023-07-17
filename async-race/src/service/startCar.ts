import { driveMotor, startMotor } from './api';
import animateCar from '../util/animateCar';
import { Car } from '../types';

export const startCar = async (idCar: number):Promise<void> => {
  const infoAnimation: { [id: number]:Car } = {};
  const { velocity, distance } = await startMotor(idCar);
  const time:number = distance / velocity;
  const car = <HTMLDivElement>document.getElementById(`car-${idCar}`);
  // @ts-ignore
  infoAnimation[idCar] = animateCar(time, car);


};
