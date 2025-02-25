import { pause, play } from '@telemetrytv/sdk';

const timeoutTime = 600;
let timeout: number | null = null;

function handleTouchEvent() {
  if (timeout) {
    clearTimeout(timeout);
  } else {
    pause();
  }

  timeout = setTimeout(() => {
    play();
    timeout = null;
  }, timeoutTime);
}

document.addEventListener('touchstart', handleTouchEvent);
document.addEventListener('touchmove', handleTouchEvent);
document.addEventListener('touchend', handleTouchEvent);
document.addEventListener('touchcancel', handleTouchEvent);
