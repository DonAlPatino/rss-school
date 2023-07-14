export enum Pages {
  GARAGE = 'Garage',
  WINNERS = 'Winners',
}

export interface Car {
  name: string;
  color: string;
  id: number;
};

export interface Winner {
  id: number;
  time: number;
  wins: number;
};
