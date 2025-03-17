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

document.getElementById('isi-iframe')?.addEventListener('load', function () {
  const iframe = document.getElementById('isi-iframe') as HTMLIFrameElement;

  if (!iframe) {
    return;
  }

  const iframeWindow = iframe.contentWindow;

  iframeWindow?.addEventListener('scroll', function () {
    log('Iframe scrolled.');
  });
});

window.onload = () => {
  log('Loaded.');
};
