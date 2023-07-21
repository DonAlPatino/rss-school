import State from '../state';
import {getElementOfDocument} from "./index";
import {createWinner, getAllWinners, getCarById, updateWinner} from "../service/api";

const animateCar = (time: number, idCar: number, state:State, btnStart: HTMLButtonElement, btnStop: HTMLButtonElement): Animation => {
  const carImage = <HTMLDivElement>document.getElementById(`car-${idCar}`);
  const noticeWinner = <HTMLElement>document.querySelector('.winner-notice');
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
  animation.onfinish = async (): Promise<void> => {
    carImage.style.transform = 'translateX(0px))';
    btnStop.setAttribute('disabled', 'disabled');
    btnStart.removeAttribute('disabled');
    if (state.startRace !== 0) {
      let wins = 1;
      const millis = ((Date.now() - state.startRace)/1000).toFixed(2);
      let timeWin = millis.toString()
      state.startRace = 0;
      const winner = await getCarById(idCar);
      noticeWinner.innerHTML = `${winner.name} win in ${millis} ms !`;
      //update winners table
      getAllWinners().then((winnerApiResponse) => {
        const {winners, count} = winnerApiResponse;
        winners.forEach((item) => {
          if (Number(item.id) === idCar) {
            wins = item.wins + 1;
            timeWin = (Number(item.time) < Number(millis) ? item.time : millis).toString();
          }
        });
      }).then(() => {
        if (wins > 1) {
          updateWinner({ 'wins': wins, 'time': timeWin }, idCar);
        } else {
          createWinner({ 'id': idCar, 'wins': wins, 'time': timeWin });
        }
      });

      console.log(`${winner} win in ${millis} ms`);
    }
    const index = state.raceArr.indexOf(idCar);
    state.raceArr.splice(index, 1);
    if (state.raceArr.length == 0) {
      const raceBtn = <HTMLButtonElement>getElementOfDocument('.btn-race');
      const rasetBtn = <HTMLButtonElement>getElementOfDocument('.btn-reset');
      raceBtn.disabled = false;
      rasetBtn.disabled = true;
      noticeWinner.innerHTML = '';
    }
  };

  return animation;
};

export default animateCar;
