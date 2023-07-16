import { Car, Winner } from '../types';
import { garage, winners } from '../constants';

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
