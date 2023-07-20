const bodyColor = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
// console.log(startBtn);
// console.log(stopBtn);

let timeId = null;

startBtn.addEventListener('click', () => {
  timeId = setInterval(() => {
    //console.log('color :', getRandomHexColor());
    bodyColor.style.backgroundColor = getRandomHexColor();
    startBtn.disabled = true;
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timeId);
  startBtn.disabled = false;
  //console.log('stop', timeId);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
