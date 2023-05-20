function playSound(soundFile, soundOn) {
  // new Audio(soundFile).play().then(() => {});
  if (!soundOn) return;
  let music = new Audio();
  music.pause();
  music = new Audio(soundFile);
  music.volume = 0.5;
  music.play();
}
export default playSound;
