// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const inputCalendar = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
//console.log(startBtn);
const leftDay = document.querySelector('span[data-days]');
const leftHours = document.querySelector('span[data-hours]');
const leftMinutes = document.querySelector('span[data-minutes]');
const leftSeconds = document.querySelector('span[data-seconds]');
console.log(leftDay);

leftDay.textContent = '01';
leftHours.textContent = '02';
leftMinutes.textContent = '03';
leftSeconds.textContent = '04';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

//const selectDate = flatpickr('input#datetime-picker', options);
//console.log(selectDate);
//flatpickr('input#datetime-picker', options);
flatpickr(inputCalendar, options);
