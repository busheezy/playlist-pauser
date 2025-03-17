import { pause, play, log as ttvLog } from '@telemetrytv/sdk';

const timeoutTime = 5;
let timeout: number | null = null;

function log(message: string) {
  ttvLog(`[Touch Timeout] ${message}`);
}

function handleTouchEvent() {
  if (timeout) {
    clearTimeout(timeout);
  } else {
    pause();
  }

  timeout = setTimeout(() => {
    play();
    timeout = null;
  }, timeoutTime * 1_000);
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

document.addEventListener('click', () => {
  log('Click.');
  handleTouchEvent();
});

const iframes = document.getElementsByTagName('iframe');

for (let i = 0; i < iframes.length; i++) {
  iframes[i].addEventListener('load', function () {
    const iframeWindow = iframes[i].contentWindow;

    if (!iframeWindow) {
      return;
    }

    iframeWindow.addEventListener('scroll', function () {
      log('Iframe scrolled.');
      handleTouchEvent();
    });
  });
}

window.onload = () => {
  log('Loaded.');
};
