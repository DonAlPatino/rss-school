import { Car, CarApiResponse, Winner, WinnerApiResponse } from '../types';
import { engine, garage, winners } from '../constants';

export const stopMotor = async (id: number):Promise<any> => (await fetch(`${engine}?id=${id}&status=stopped`, { method: 'PATCH' })).json();
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


export const getAllWinners = async ():Promise<WinnerApiResponse> => {
  const response = await fetch(`${winners}`, { method: 'GET' });
  const data = {
    winners: (await response.json()) as Winner[],
    count: Number(response.headers.get('X-Total-Count')) || 0,
  };
  return data;
};

export const getCarById = async (id: number): Promise<Car> =>
  (await fetch(`${garage}/${id}`)).json();

export const getAllCars = async (page = 1, limit = 7): Promise<CarApiResponse> => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  const data = {
    cars: (await response.json()) as Car[],
    count: Number(response.headers.get('X-Total-Count')) || 0,
  };
  return data;
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
