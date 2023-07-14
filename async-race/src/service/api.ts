import { Car, Winner } from '../types';
import { BASE_URL, garage } from '../constants';

export const getAllWinners = async ():Promise<Winner[]> => {
  const winners = `${BASE_URL}/winners`;
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
