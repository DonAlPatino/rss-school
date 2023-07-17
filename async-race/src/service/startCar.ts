import { startMotor } from './api';

export const startCar = async (idCar: number):Promise<void> => {
  const { velocity, distance } = await startMotor(idCar);
  const time:number = distance / velocity;
};
