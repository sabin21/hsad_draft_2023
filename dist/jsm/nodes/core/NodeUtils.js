import{Color,Matrix3,Matrix4,Vector2,Vector3,Vector4}from"three";export function getCacheKey(e){let o="{";!0===e.isNode&&(o+=`uuid:"${e.uuid}"`);for(const{property:r,index:t,childNode:n}of getNodeChildren(e)){let e=getCacheKey(n);e.includes(",")||(e=e.slice(e.indexOf('"'),e.indexOf("}"))),o+=`,${r}${void 0!==t?"/"+t:""}:${e}`}return o+="}",o}export function*getNodeChildren(e,o=!1){for(const r in e){if(!0===r.startsWith("_"))continue;const t=e[r];if(!0===Array.isArray(t))for(let e=0;e<t.length;e++){const n=t[e];n&&(!0===n.isNode||o&&"function"==typeof n.toJSON)&&(yield{property:r,index:e,childNode:n})}else if(t&&!0===t.isNode)yield{property:r,childNode:t};else if("object"==typeof t)for(const e in t){const n=t[e];n&&(!0===n.isNode||o&&"function"==typeof n.toJSON)&&(yield{property:r,index:e,childNode:n})}}}export function getValueType(e){if(null==e)return null;const o=typeof e;return!0===e.isNode?"node":"number"===o?"float":"boolean"===o?"bool":"string"===o?"string":!0===e.isVector2?"vec2":!0===e.isVector3?"vec3":!0===e.isVector4?"vec4":!0===e.isMatrix3?"mat3":!0===e.isMatrix4?"mat4":!0===e.isColor?"color":e instanceof ArrayBuffer?"ArrayBuffer":null}export function getValueFromType(e,...o){const r=e?e.slice(-4):void 0;return"color"===e?new Color(...o):"vec2"===r?new Vector2(...o):"vec3"===r?new Vector3(...o):"vec4"===r?new Vector4(...o):"mat3"===r?new Matrix3(...o):"mat4"===r?new Matrix4(...o):"bool"===e?o[0]||!1:"float"===e||"int"===e||"uint"===e?o[0]||0:"string"===e?o[0]||"":"ArrayBuffer"===e?base64ToArrayBuffer(o[0]):null}export function arrayBufferToBase64(e){let o="";const r=new Uint8Array(e);for(let e=0;e<r.length;e++)o+=String.fromCharCode(r[e]);return btoa(o)}export function base64ToArrayBuffer(e){return Uint8Array.from(atob(e),(e=>e.charCodeAt(0))).buffer}