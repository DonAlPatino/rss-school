const animateCar = (time: number, carImage: HTMLDivElement, btnStart: HTMLButtonElement, btnStop: HTMLButtonElement): Animation => {
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
  };

  return animation;
};

export default animateCar;
