import State from '../state';
import {getElementOfDocument} from "./index";

const animateCar = (time: number, idCar: number, state:State, btnStart: HTMLButtonElement, btnStop: HTMLButtonElement): Animation => {
  const carImage = <HTMLDivElement>document.getElementById(`car-${idCar}`);
  const carStyle = getComputedStyle(carImage);
  const parentStyle = getComputedStyle(carImage.parentElement as HTMLDivElement);
  const carWidth = parseInt(carStyle.width);
  const parentWidth = parseInt(parentStyle.width);

  const animation = carImage.animate(
    [
      { transform: 'translateX(0px)' },
      { transform: `translateX(calc(${parentWidth}px - ${carWidth}px))` },
    ],
    {
      duration: time,
      easing: 'ease-in-out',
    },
  );

  animation.play();
  animation.onfinish = (): void => {
    carImage.style.transform = 'translateX(0px))';
    btnStop.setAttribute('disabled', 'disabled');
    btnStart.removeAttribute('disabled');
    if (state.startRace !== 0) {
      const millis = Date.now() - state.startRace;
      state.startRace = 0;
      console.log(`${idCar} win in ${millis / 1000}`);
    }
    const index = state.raceArr.indexOf(idCar);
    state.raceArr.splice(index, 1);
    if (state.raceArr.length == 0) {
      const raceBtn = <HTMLButtonElement>getElementOfDocument('.btn-race');
      const rasetBtn = <HTMLButtonElement>getElementOfDocument('.btn-reset');
      raceBtn.disabled = false;
      rasetBtn.disabled = true;
    }
  };

  return animation;
};

export default animateCar;
