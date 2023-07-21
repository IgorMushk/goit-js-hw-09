// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputCalendar = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const leftDay = document.querySelector('span[data-days]');
const leftHours = document.querySelector('span[data-hours]');
const leftMinutes = document.querySelector('span[data-minutes]');
const leftSeconds = document.querySelector('span[data-seconds]');

let timeId = 0;
startBtn.disabled = true;
let selectDate;
let delayTime;
let carentTime;

Notify.init({
  position: 'center-center',
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const carentDate = new Date();
    const deltaTime = new Date(selectedDates[0] - carentDate).getTime();
    console.log(deltaTime);
    if (deltaTime > 0) {
      startBtn.disabled = false;
      selectedTime = selectedDates[0];
      startBtn.addEventListener('click', onClickStart);
    } else {
      Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr(inputCalendar, options);

function onClickStart() {
  timeId = setInterval(() => {
    startBtn.disabled = true;
    carentTime = new Date();
    delayTime = selectedTime - carentTime;
    if (delayTime < 0) {
      Notify.success('Time is over');
      startBtn.disabled = true;
      clearInterval(timeId);
      return;
    }
    leftDay.textContent = convertMs(delayTime).days.toString().padStart(2, '0');
    leftHours.textContent = convertMs(delayTime)
      .hours.toString()
      .padStart(2, '0');
    leftMinutes.textContent = convertMs(delayTime)
      .minutes.toString()
      .padStart(2, '0');
    leftSeconds.textContent = convertMs(delayTime)
      .seconds.toString()
      .padStart(2, '0');
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
