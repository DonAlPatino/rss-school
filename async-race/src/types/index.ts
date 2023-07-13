export enum Pages {
  GARAGE = 'Garage',
  WINNERS = 'Winners',
}

export type DescriptionCar = {
  [key: string | number]: number | string,
  id: number,
  name: string,
  color: string,
  wins: number,
  time: number
};

export type Car = {
  name: string;
  color: string;
  id: number;
};

export type Winners = {
  items: Array<{
    car: Car;
    id: number;
    time: number;
    wins: number;
  }>;
  count: string | null;
};
