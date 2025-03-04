"use strict";

// src/index.ts
var import_sdk = require("@telemetrytv/sdk");
var timeoutTime = 600;
var timeout = null;
function handleTouchEvent() {
  if (timeout) {
    clearTimeout(timeout);
    (0, import_sdk.log)("Reset timeout.");
  } else {
    (0, import_sdk.pause)();
    (0, import_sdk.log)("Paused due to touch event.");
  }
  timeout = setTimeout(() => {
    (0, import_sdk.play)();
    (0, import_sdk.log)("Resumed after timeout.");
    timeout = null;
  }, timeoutTime);
}
document.addEventListener("touchstart", handleTouchEvent);
document.addEventListener("touchmove", handleTouchEvent);
document.addEventListener("touchend", handleTouchEvent);
document.addEventListener("touchcancel", handleTouchEvent);
window.onload = () => {
  (0, import_sdk.log)("Loaded.");
};
