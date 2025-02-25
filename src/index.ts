import { pause, play } from '@telemetrytv/sdk';

const timeoutTime = 600;
let timeout: number | null = null;

function log(message: string) {
  console.log(`[Pause Timeout]: ${message}`);
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

document.addEventListener('touchstart', handleTouchEvent);
document.addEventListener('touchmove', handleTouchEvent);
document.addEventListener('touchend', handleTouchEvent);
document.addEventListener('touchcancel', handleTouchEvent);
