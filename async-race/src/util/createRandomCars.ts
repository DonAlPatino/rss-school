import { createCarAPI } from '../service/api';
import { brandsCars, modelsCars } from './cars_example';

const getRandomCarName =  ():string => {
  const randomNumBrand = Math.floor(Math.random() * 50);
  const randomNumModel = Math.floor(Math.random() * 50);
  return brandsCars[randomNumBrand] + ' ' + modelsCars[randomNumModel];
};

const getRandomCarColor =  ():string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const create100Cars = ():void => {
  const promises:Array<Promise<void>> = [];
  for (let i = 0; i < 100; i++) {
    const name = getRandomCarName();
    const color = getRandomCarColor();
    promises.push(createCarAPI({ 'name': `${name}`, 'color': `${color}` }));
  }
  Promise.allSettled(promises);
};
