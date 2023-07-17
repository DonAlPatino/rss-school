import { Car, Winner } from '../types';
import { engine, garage, winners } from '../constants';

export const driveMotor = async (id: number):Promise<any> => {
  const res = await fetch(`${engine}?id=${id}&status=drive`, { method: 'PATCH' }).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};

export const startMotor = async (id: number):Promise<{ velocity:number, distance:number }>  => {
  const res = await fetch(`${engine}?id=${id}&status=started`, { method: 'PATCH' });
  return res.json();
};
export const deleteCar = async (id: number):Promise<void> => {
  await fetch(`${garage}/${id}`, {
    method: 'DELETE',
  });
};

export const deleteWinner = async (id: number):Promise<void>  => {
  await fetch(`${winners}/${id}`, {
    method: 'DELETE',
  });
};


export const getAllWinners = async ():Promise<Winner[]> => {
  const response = await fetch(`${winners}`, { method: 'GET' });
  return response.json();
};

export const getCarById = async (id: number): Promise<Car> =>
  (await fetch(`${garage}/${id}`)).json();

export const getAllCars = async (page = 1, limit = 7): Promise<Car[]> => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  return response.json();
};

export const createCarAPI = async (body: object):Promise<void> => {
  await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const updateCarAPI = async (body: object, id: number):Promise<void> => {
  await fetch(`${garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
