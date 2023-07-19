export enum Pages {
  GARAGE = 'Garage',
  WINNERS = 'Winners',
}

export interface Car {
  name: string;
  color: string;
  id: number;
}

export interface CarApiResponse {
  cars: Car[];
  count: number;
}

export interface Winner {
  id: number;
  time: number;
  wins: number;
}

export interface WinnerApiResponse {
  winners: Winner[];
  count: number;
}
