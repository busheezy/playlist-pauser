"use strict";

// src/index.ts
var import_sdk = require("@telemetrytv/sdk");
var timeoutTime = 600;
var timeout = null;
function log(message) {
  console.log(`[Pause Timeout]: ${message}`);
}
function handleTouchEvent() {
  if (timeout) {
    clearTimeout(timeout);
    log("Reset timeout.");
  } else {
    (0, import_sdk.pause)();
    log("Paused due to touch event.");
  }
  timeout = setTimeout(() => {
    (0, import_sdk.play)();
    log("Resumed after timeout.");
    timeout = null;
  }, timeoutTime);
}
document.addEventListener("touchstart", handleTouchEvent);
document.addEventListener("touchmove", handleTouchEvent);
document.addEventListener("touchend", handleTouchEvent);
document.addEventListener("touchcancel", handleTouchEvent);
