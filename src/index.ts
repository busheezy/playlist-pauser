import { pause, play, log as ttvLog } from '@telemetrytv/sdk';

const timeoutTime = 5;
let timeout: number | null = null;

function log(message: string) {
  ttvLog(`[Touch Timeout] ${message}`);
}

function resetPlaylistTimer() {
  if (timeout) {
    clearTimeout(timeout);
  } else {
    log('pausing');
    pause();
  }

  timeout = setTimeout(() => {
    log('playing');
    play();
    timeout = null;
  }, timeoutTime * 1_000);
}

document.addEventListener('touchstart', () => {
  log('Touch started.');
  resetPlaylistTimer();
});

document.addEventListener('touchmove', () => {
  log('Touch moved.');
  resetPlaylistTimer();
});

document.addEventListener('touchend', () => {
  log('Touch ended.');
  resetPlaylistTimer();
});

document.addEventListener('touchcancel', () => {
  log('Touch canceled.');
  resetPlaylistTimer();
});

document.addEventListener('click', () => {
  log('Click.');
  resetPlaylistTimer();
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
      resetPlaylistTimer();
    });
  });
}

window.onload = () => {
  log('Loaded.');
  resetPlaylistTimer();
};
