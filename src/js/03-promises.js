import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formPromises = document.querySelector('.form');
const btnPromises = document.querySelector('button[type="submit"]');

formPromises.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.currentTarget.elements;
  let delyStep = Number(delay.value);
  for (let i = 1; i <= Number(amount.value); i += 1) {
    createPromise(i, delyStep)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });

    delyStep += Number(step.value);
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      }
      // Reject
      reject({ position, delay });
    }, delay);
  });
  return promise;
}
