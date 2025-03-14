import { pause, play, log as ttvLog } from '@telemetrytv/sdk';

const timeoutTime = 30;
let timeout: number | null = null;

function log(message: string) {
  ttvLog(`[Touch Timeout] ${message}`);
}

function handleTouchEvent() {
  if (timeout) {
    clearTimeout(timeout);
    log('Reset timeout.');
  } else {
    pause();
    log('Paused due to touch event.');
  }

  timeout = setTimeout(() => {
    play();
    log('Resumed after timeout.');
    timeout = null;
  }, timeoutTime);
}

document.addEventListener('touchstart', () => {
  log('Touch started.');
  handleTouchEvent();
});

document.addEventListener('touchmove', () => {
  log('Touch moved.');
  handleTouchEvent();
});

document.addEventListener('touchend', () => {
  log('Touch ended.');
  handleTouchEvent();
});

document.addEventListener('touchcancel', () => {
  log('Touch canceled.');
  handleTouchEvent();
});

window.onload = () => {
  log('Loaded.');
};
