const formPromises = document.querySelector('.form');
// const inpDelay = document.querySelector('input[name="delay"]');
// const inpStep = document.querySelector('input[name="step"]');
// const inpAmount = document.querySelector('input[name="amount"]');
const btnPromises = document.querySelector('button[type="submit"]');

//console.dir(formPromises);
// console.log(inpDelay);
// console.log(inpStep);
// console.log(inpAmount);11
// console.log(btnPromises);

formPromises.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  //console.log(evt.currentTarget.elements);
  const { delay, step, amount } = evt.currentTarget.elements;
  //console.log(Number(amount.value), Number(delay.value), Number(step.value));
  let delyStep = Number(delay.value);
  for (let i = 1; i <= Number(amount.value); i += 1) {
    //console.log(i, delyStep);

    createPromise(i, delyStep)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
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
