"use strict";
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x2) => x2.done ? resolve(x2.value) : Promise.resolve(x2.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// node_modules/.pnpm/@telemetrytv+sdk@1.0.0-alpha1/node_modules/@telemetrytv/sdk/dist/index.js
var f = Object.defineProperty;
var _ = (n, e, t) => e in n ? f(n, e, { enumerable: true, configurable: true, writable: true, value: t }) : n[e] = t;
var d = (n, e, t) => (_(n, typeof e != "symbol" ? e + "" : e, t), t);
var p = [
  "deviceProperties",
  "playerProperties",
  "allPlaylists",
  "currentPlaylist",
  "playlistById",
  "allPages",
  "currentPage",
  "playlistPages",
  "playbackState",
  "mediaById",
  "mediaByTags",
  "mediaInFolder",
  "argumentValue"
];
var w = p;
function h() {
  return `${(Math.random() * 0.9 + 0.1).toString(36).substring(2, 11)}-${Date.now()}`;
}
var v = 2;
var y = "ttv-";
var T = 15e3;
var R = class {
  constructor() {
    d(this, "id", h());
    d(this, "requestTimeout", T);
    d(this, "_eventHandlerSet", /* @__PURE__ */ new Set());
    d(this, "_eventHandlers", /* @__PURE__ */ new Map());
    d(this, "_pendingResponses", /* @__PURE__ */ new Map());
    if (window.__TTV_SDK__)
      return window.__TTV_SDK__;
    this._installGlobals();
  }
  /**
   * on listens for an event from the player.
   * @param eventName an event name to listen for
   * @param handler a handler function that will be called upon the event
   */
  on(e, t) {
    if (this._eventHandlerSet.has(t))
      return;
    this._eventHandlerSet.add(t);
    let a = this._eventHandlers.get(e);
    a || (a = /* @__PURE__ */ new Set(), this._eventHandlers.set(e, a)), a.add(t), this._sendMessage({
      type: "event",
      name: "watchersUpdate",
      data: Array.from(this._eventHandlers.keys())
    });
  }
  /**
   * off releases a previously bound event handler from an event, after which
   * the handler will no longer be called.
   * @param eventName an event name previously bound from which we want to
   * release a handler
   * @param handler a handler function previously bound we want to release
   */
  off(e, t) {
    if (!this._eventHandlerSet.has(t))
      return;
    this._eventHandlerSet.delete(t);
    const a = this._eventHandlers.get(e);
    a && (a.delete(t), a.size === 0 && this._eventHandlers.delete(e), this._sendMessage({
      type: "event",
      name: "watchersUpdate",
      data: Array.from(this._eventHandlers.keys())
    }));
  }
  sendRequest(e, t, a) {
    return __async(this, null, function* () {
      const i = a || e;
      this._pendingResponses.has(i) || this._sendMessage({ type: "getData", name: e, dataKey: i, data: t });
      let r;
      const u = new Promise((l, o) => {
        r = setTimeout(() => {
          clearTimeout(r), this._pendingResponses.delete(i), o(new Error(`SDK: Request timeout for "${i}"`));
        }, this.requestTimeout);
      }), g = new Promise((l) => {
        let o = this._pendingResponses.get(i);
        o || (o = /* @__PURE__ */ new Set(), this._pendingResponses.set(i, o));
        const c = (m) => {
          clearTimeout(r), o == null || o.delete(c), (o == null ? void 0 : o.size) === 0 && this._pendingResponses.delete(i), l(m);
        };
        o.add(c);
      });
      return Promise.race([u, g]);
    });
  }
  sendCommand(e, t) {
    this._sendMessage({ type: "command", name: e, data: t });
  }
  _handleMessage(e) {
    if (!C(this.id, e.data))
      return;
    const { name: t, data: a, dataKey: i } = e.data, r = e.data.type.replace(y, "");
    if (r === "data")
      return this._handleDataResponse(t, i, a);
    if (r === "event")
      return this._handleEvent(t, a);
  }
  _sendMessage(e) {
    window.parent.postMessage({
      type: `ttvSDK-${e.type.trim()}`,
      source: "ttv_npm_sdk",
      windowId: this.id,
      iframeKey: window.__TTV_IFRAME_KEY,
      name: e.name,
      dataKey: e.dataKey,
      data: e.data
    }, "*");
  }
  _handleDataResponse(e, t = "", a) {
    if (!w.includes(e))
      return console.debug(`SDK: Unknown data name "${e}"`, a);
    const i = t || e, r = this._pendingResponses.get(i);
    if (r)
      for (const u of r)
        u(a);
  }
  _handleEvent(e, t) {
    const a = this._eventHandlers.get(e);
    if (a)
      for (const i of a)
        t === void 0 ? i() : i(t);
  }
  _installGlobals() {
    window.__TTV_SDK_VERSION = v, window.__TTV_SDK_WINDOW_ID = this.id, window.__TTV_SDK__ = this, window.addEventListener("message", (e) => this._handleMessage(e), true), this._sendMessage({ type: "event", name: "ready" });
  }
};
function C(n, e) {
  return !!e && typeof e == "object" && "windowId" in e && "type" in e && "name" in e && "data" in e && typeof e.windowId == "string" && e.windowId === n && typeof e.type == "string" && e.type.startsWith(y) && typeof e.name == "string" && (!("dataKey" in e) || e.dataKey === void 0 || typeof e.dataKey == "string");
}
var s = new R();
function F() {
  s.sendCommand("pause");
}
function x() {
  s.sendCommand("play");
}
function J(n) {
  s.sendCommand("log", n);
}

// src/index.ts
var timeoutTime = 5;
var timeout = null;
function log(message) {
  J(`[Touch Timeout] ${message}`);
}
function handleTouchEvent() {
  if (timeout) {
    clearTimeout(timeout);
  } else {
    F();
  }
  timeout = setTimeout(() => {
    x();
    timeout = null;
  }, timeoutTime * 1e3);
}
document.addEventListener("touchstart", () => {
  log("Touch started.");
  handleTouchEvent();
});
document.addEventListener("touchmove", () => {
  log("Touch moved.");
  handleTouchEvent();
});
document.addEventListener("touchend", () => {
  log("Touch ended.");
  handleTouchEvent();
});
document.addEventListener("touchcancel", () => {
  log("Touch canceled.");
  handleTouchEvent();
});
document.addEventListener("click", () => {
  log("Click.");
  handleTouchEvent();
});
var _a;
(_a = document.getElementById("isi-iframe")) == null ? void 0 : _a.addEventListener("load", function() {
  const iframe = document.getElementById("isi-iframe");
  if (!iframe) {
    return;
  }
  const iframeWindow = iframe.contentWindow;
  iframeWindow == null ? void 0 : iframeWindow.addEventListener("scroll", function() {
    log("Iframe scrolled.");
  });
});
window.onload = () => {
  log("Loaded.");
};
