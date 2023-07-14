import { Car, Winner } from '../types';
import { BASE_URL } from '../constants';

export const getAllWinners = async ():Promise<Winner[]> => {
  const winners = `${BASE_URL}/winners`;
  const response = await fetch(`${winners}`, { method: 'GET' });
  return response.json();
};

export const getCarById = async (id: number): Promise<Car> =>
  (await fetch(`${BASE_URL}/garage/${id}`)).json();

export const getAllCars = async (page = 1, limit = 7): Promise<Car[]> => {
  const response = await fetch(`${BASE_URL}/garage?_page=${page}&_limit=${limit}`);
  return response.json();
};
