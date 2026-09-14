const splash = document.querySelector('#animate-splash');
const copy = document.querySelector('#copy');
const counter = document.querySelector('#counter');
const fidelity = document.querySelector('#fidelity');
const headline = document.querySelector('#splash-heading');

const HOME_URL = '/pages/home/home.html';

const steps = [
  {
    phase: 1,
    counter: '01 / 03',
    fidelity: 'lo-fi',
    headline: 'Think in products.'
  },
  {
    phase: 2,
    counter: '02 / 03',
    fidelity: 'mid-fi',
    headline: 'Design experiences.'
  },
  {
    phase: 3,
    counter: '03 / 03',
    fidelity: 'hi-fi',
    headline: 'Build in code.'
  }
];


function updateStep(step) {
  copy.classList.add('changing');

  window.setTimeout(() => {
    splash.dataset.phase = step.phase;

    counter.textContent = step.counter;
    fidelity.textContent = step.fidelity;
    headline.textContent = step.headline;

    copy.classList.remove('changing');
  }, 220);
}

function exitSplash() {
  splash.classList.add('exiting');

  window.setTimeout(() => {
    window.location.href = HOME_URL;
  }, 1200);
}

function runIntro() {
  updateStep(steps[0]);

  window.setTimeout(() => {
    updateStep(steps[1]);
  }, 2000);

  window.setTimeout(() => {
    updateStep(steps[2]);
  }, 3500);

  window.setTimeout(() => {
    exitSplash();
  }, 4500);
}

runIntro();