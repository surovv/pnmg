!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.library=t():e.library=t()}(window,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=2)}([function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=t.DefinedType=function e(){n(this,e)},u=(t.Defined=new o,t.isDefined=function(e){return void 0!==e},t.GuardType=function e(){n(this,e)});t.Guard=function(e){return Object.assign(function(t){return e(t)},{constructor:u})}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.match=void 0;var n=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,o=!1,u=void 0;try{for(var c,i=e[Symbol.iterator]();!(n=(c=i.next()).done)&&(r.push(c.value),!t||r.length!==t);n=!0);}catch(e){o=!0,u=e}finally{try{!n&&i.return&&i.return()}finally{if(o)throw u}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),o=r(0);var u=function(e,t){return 0===t.length&&0===e.length||t.length<=e.length&&0!==t.length&&t.every(function(t,r){return i(e[r],t)})},c=function(e,t){var r=[t,e].map(Object.keys),o=n(r,2),u=o[0],c=o[1];return 0===u.length&&0===c.length||u.length<=c.length&&0!==u.length&&u.every(function(r){return c.includes(r)&&i(e[r],t[r])})},i=function(e,t){return e===t||e.constructor===t||t.constructor===o.DefinedType&&(0,o.isDefined)(e)||t.constructor===o.GuardType&&t(e)||e.constructor===Array&&t.constructor===Array&&u(e,t)||e.constructor===Object&&t.constructor===Object&&c(e,t)};t.match=function e(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return{when:function(n,o){return e(t,[].concat(function(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}(r),[[n,o]]))},default:function(e){var o=r.find(function(e){var r=n(e,2),o=r[0];r[1];return i(t,o)});return(o?o[1]:e)(t)}}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(1);Object.defineProperty(t,"match",{enumerable:!0,get:function(){return n.match}});var o=r(0);Object.defineProperty(t,"Defined",{enumerable:!0,get:function(){return o.Defined}}),Object.defineProperty(t,"Guard",{enumerable:!0,get:function(){return o.Guard}})}])});