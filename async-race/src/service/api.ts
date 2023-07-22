import { Car, CarApiResponse, Winner, WinnerApiResponse } from '../types';
import { carPerPage, engine, garage, winnerPerPage, winners } from '../constants';

export const updateWinner = async (body: object, id: number):Promise<void>  => {
  await fetch(`${winners}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
export const createWinner = async (body: object):Promise<void>  => {
  await fetch(winners, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
export const stopMotor = async (id: number):Promise<void> => (await fetch(`${engine}?id=${id}&status=stopped`, { method: 'PATCH' })).json();
export const driveMotor = async (id: number):Promise<boolean> => {
  const res = await fetch(`${engine}?id=${id}&status=drive`, { method: 'PATCH' }).catch();
  // return res.status !== 200 ? { success: false } : { ...(await res.json()) };
  return res.status === 200;
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
    count: winners.length,
  };
  return data;
};

export const getWinners = async (page = 1, limit = winnerPerPage):Promise<WinnerApiResponse> => {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}`, { method: 'GET' });
  const data = {
    winners: (await response.json()) as Winner[],
    count: Number(response.headers.get('X-Total-Count')) || 0,
  };
  return data;
};
export const getCarById = async (id: number): Promise<Car> =>
  (await fetch(`${garage}/${id}`)).json();

export const getAllCars = async (page = 1, limit = carPerPage): Promise<CarApiResponse> => {
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
