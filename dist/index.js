"use strict";var R=Object.defineProperty;var h=Object.getOwnPropertySymbols;var C=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable;var y=(s,t,e)=>t in s?R(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,p=(s,t)=>{for(var e in t||(t={}))C.call(t,e)&&y(s,e,t[e]);if(h)for(var e of h(t))I.call(t,e)&&y(s,e,t[e]);return s};var g=(s,t,e)=>new Promise((n,a)=>{var o=i=>{try{d(e.next(i))}catch(r){a(r)}},m=i=>{try{d(e.throw(i))}catch(r){a(r)}},d=i=>i.done?n(i.value):Promise.resolve(i.value).then(o,m);d((e=e.apply(s,t)).next())});function v(s){return!!s&&typeof s=="object"&&"source"in s&&s.source==="ttv"&&"sdkVersion"in s&&"clientId"in s&&!0&&"messageId"in s&&!0&&"type"in s&&typeof s.type=="string"&&"name"in s&&typeof s.name=="string"}function _(){return`${(Math.random()*.9+.1).toString(36).substring(2,11).padEnd(9,"0")}-${Date.now()}`}var E=15e3,f=class{get id(){return this._id}constructor(){if(this.requestTimeout=E,this._id=_(),this._eventHandlerSet=new Set,this._eventHandlers=new Map,this._pendingResponses=new Map,this._hasReceivedOnReady=!1,window.__TTV_SDK_CLIENT__)return window.__TTV_SDK_CLIENT__;this.initializeGlobals()}on(t,e){if(this._eventHandlerSet.has(e))return;this._eventHandlerSet.add(e);let n=this._eventHandlers.get(t);n||(n=new Set,this._eventHandlers.set(t,n)),n.add(e),this._sendMessage({type:"event",name:"watchersUpdate",data:Array.from(this._eventHandlers.keys())})}off(t,e){if(!this._eventHandlerSet.has(e))return;this._eventHandlerSet.delete(e);let n=this._eventHandlers.get(t);n&&(n.delete(e),n.size===0&&this._eventHandlers.delete(t),this._sendMessage({type:"event",name:"watchersUpdate",data:Array.from(this._eventHandlers.keys())}))}sendRequest(t,e){return g(this,null,function*(){let n=this._sendMessage({type:"request",name:t,data:e}),a,o=new Promise((d,i)=>{a=setTimeout(()=>{clearTimeout(a),this._pendingResponses.delete(n),i(new Error(`SDK: Request timeout for "${n}"`))},this.requestTimeout)}),m=new Promise(d=>{let i=r=>{clearTimeout(a),this._pendingResponses.delete(n),d(r)};this._pendingResponses.set(n,i)});return Promise.race([o,m])})}sendCommand(t,e){this._sendMessage({type:"command",name:t,data:e})}initializeGlobals(){window.__TTV_SDK_CLIENT__!==this&&(window.__TTV_SDK_VERSION=2,window.__TTV_SDK_CLIENT_ID=this._id,window.__TTV_SDK_CLIENT__=this,window.addEventListener("message",t=>this._handleMessage(t),!0),g(this,null,function*(){for(;!this._hasReceivedOnReady;)this._sendMessage({type:"command",name:"ready"}),yield new Promise(t=>setTimeout(t,200))}))}_sendMessage(t){let e=_(),n=p({source:"ttv",sdkVersion:2,clientId:this._id,messageId:e},t);return window.parent.postMessage(n,"*"),e}_handleMessage(t){if(!v(t.data)||t.data.clientId!==this._id)return;let{type:e,messageId:n,name:a,data:o}=t.data;if(e==="event"&&a==="onReady"&&(this._hasReceivedOnReady=!0),e==="response")return this._handleDataResponse(n,o);if(e==="event")return this._handleEvent(a,o)}_handleDataResponse(t,e){let n=this._pendingResponses.get(t);n&&n(e)}_handleEvent(t,e){let n=this._eventHandlers.get(t);if(n)for(let a of n)e===void 0?a():a(e)}},w=new f;function T(){w.sendCommand("pause")}function P(){w.sendCommand("play")}var q=600,u=null;function c(s){console.log(`[Pause Timeout]: ${s}`)}function l(){u?(clearTimeout(u),c("Reset timeout.")):(T(),c("Paused due to touch event.")),u=setTimeout(()=>{P(),c("Resumed after timeout."),u=null},q)}document.addEventListener("touchstart",l);document.addEventListener("touchmove",l);document.addEventListener("touchend",l);document.addEventListener("touchcancel",l);window.onload=()=>{c("Loaded.")};
