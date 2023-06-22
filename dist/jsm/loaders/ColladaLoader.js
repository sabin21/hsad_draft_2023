import{AmbientLight,AnimationClip,Bone,BufferGeometry,ClampToEdgeWrapping,Color,DirectionalLight,DoubleSide,FileLoader,Float32BufferAttribute,FrontSide,Group,Line,LineBasicMaterial,LineSegments,Loader,LoaderUtils,MathUtils,Matrix4,Mesh,MeshBasicMaterial,MeshLambertMaterial,MeshPhongMaterial,OrthographicCamera,PerspectiveCamera,PointLight,Quaternion,QuaternionKeyframeTrack,RepeatWrapping,Scene,Skeleton,SkinnedMesh,SpotLight,TextureLoader,Vector2,Vector3,VectorKeyframeTrack,SRGBColorSpace}from"three";import{TGALoader}from"../loaders/TGALoader.js";class ColladaLoader extends Loader{constructor(e){super(e)}load(e,t,n,o){const s=this,r=""===s.path?LoaderUtils.extractUrlBase(e):s.path,i=new FileLoader(s.manager);i.setPath(s.path),i.setRequestHeader(s.requestHeader),i.setWithCredentials(s.withCredentials),i.load(e,(function(n){try{t(s.parse(n,r))}catch(t){o?o(t):console.error(t),s.manager.itemError(e)}}),n,o)}parse(e,t){function n(e,t){const n=[],o=e.childNodes;for(let e=0,s=o.length;e<s;e++){const s=o[e];s.nodeName===t&&n.push(s)}return n}function o(e){if(0===e.length)return[];const t=e.trim().split(/\s+/),n=new Array(t.length);for(let e=0,o=t.length;e<o;e++)n[e]=t[e];return n}function s(e){if(0===e.length)return[];const t=e.trim().split(/\s+/),n=new Array(t.length);for(let e=0,o=t.length;e<o;e++)n[e]=parseFloat(t[e]);return n}function r(e){if(0===e.length)return[];const t=e.trim().split(/\s+/),n=new Array(t.length);for(let e=0,o=t.length;e<o;e++)n[e]=parseInt(t[e]);return n}function i(e){return e.substring(1)}function a(e){return 0===Object.keys(e).length}function c(e){return void 0!==e&&!0===e.hasAttribute("meter")?parseFloat(e.getAttribute("meter")):1}function l(e){return void 0!==e?e.textContent:"Y_UP"}function d(e,t,o,s){const r=n(e,t)[0];if(void 0!==r){const e=n(r,o);for(let t=0;t<e.length;t++)s(e[t])}}function u(e,t){for(const n in e)e[n].build=t(e[n])}function f(e,t){return void 0!==e.build||(e.build=t(e)),e.build}function h(e){const t={inputs:{}};for(let n=0,o=e.childNodes.length;n<o;n++){const o=e.childNodes[n];if(1===o.nodeType&&"input"===o.nodeName){const e=i(o.getAttribute("source")),n=o.getAttribute("semantic");t.inputs[n]=e}}return t}function m(e){const t={};let n=e.getAttribute("target").split("/");const o=n.shift();let s=n.shift();const r=-1!==s.indexOf("("),a=-1!==s.indexOf(".");if(a)n=s.split("."),s=n.shift(),t.member=n.shift();else if(r){const e=s.split("(");s=e.shift();for(let t=0;t<e.length;t++)e[t]=parseInt(e[t].replace(/\)/,""));t.indices=e}return t.id=o,t.sid=s,t.arraySyntax=r,t.memberSyntax=a,t.sampler=i(e.getAttribute("source")),t}function p(e){const t=[],n=e.channels,o=e.samplers,s=e.sources;for(const e in n)if(n.hasOwnProperty(e)){const r=n[e],i=o[r.sampler],a=i.inputs.INPUT,c=i.inputs.OUTPUT;k(b(r,s[a],s[c]),t)}return t}function g(e){return f(Qe.animations[e],p)}function b(e,t,n){const o=Qe.nodes[e.id],s=Be(o.id),r=o.transforms[e.sid],i=o.matrix.clone().transpose();let a,c,l,d,u,f;const h={};switch(r){case"matrix":for(l=0,d=t.array.length;l<d;l++)if(a=t.array[l],c=l*n.stride,void 0===h[a]&&(h[a]={}),!0===e.arraySyntax){const t=n.array[c],o=e.indices[0]+4*e.indices[1];h[a][o]=t}else for(u=0,f=n.stride;u<f;u++)h[a][u]=n.array[c+u];break;case"translate":case"rotate":case"scale":console.warn('THREE.ColladaLoader: Animation transform type "%s" not yet implemented.',r)}const m=function(e,t){const n=[];for(const t in e)n.push({time:parseFloat(t),value:e[t]});n.sort((function(e,t){return e.time-t.time}));for(let e=0;e<16;e++)w(n,e,t.elements[e]);return n}(h,i);return{name:s.uuid,keyframes:m}}const y=new Vector3,N=new Vector3,x=new Quaternion;function k(e,t){const n=e.keyframes,o=e.name,s=[],r=[],i=[],a=[];for(let e=0,t=n.length;e<t;e++){const t=n[e],o=t.time,c=t.value;Te.fromArray(c).transpose(),Te.decompose(y,x,N),s.push(o),r.push(y.x,y.y,y.z),i.push(x.x,x.y,x.z,x.w),a.push(N.x,N.y,N.z)}return r.length>0&&t.push(new VectorKeyframeTrack(o+".position",s,r)),i.length>0&&t.push(new QuaternionKeyframeTrack(o+".quaternion",s,i)),a.length>0&&t.push(new VectorKeyframeTrack(o+".scale",s,a)),t}function w(e,t,n){let o,s,r,i=!0;for(s=0,r=e.length;s<r;s++)o=e[s],void 0===o.value[t]?o.value[t]=null:i=!1;if(!0===i)for(s=0,r=e.length;s<r;s++)o=e[s],o.value[t]=n;else!function(e,t){let n,o;for(let s=0,r=e.length;s<r;s++){const r=e[s];if(null===r.value[t]){if(n=A(e,s,t),o=v(e,s,t),null===n){r.value[t]=o.value[t];continue}if(null===o){r.value[t]=n.value[t];continue}T(r,n,o,t)}}}(e,t)}function A(e,t,n){for(;t>=0;){const o=e[t];if(null!==o.value[n])return o;t--}return null}function v(e,t,n){for(;t<e.length;){const o=e[t];if(null!==o.value[n])return o;t++}return null}function T(e,t,n,o){n.time-t.time!=0?e.value[o]=(e.time-t.time)*(n.value[o]-t.value[o])/(n.time-t.time)+t.value[o]:e.value[o]=t.value[o]}function C(e){const t=[],n=e.name,o=e.end-e.start||-1,s=e.animations;for(let e=0,n=s.length;e<n;e++){const n=g(s[e]);for(let e=0,o=n.length;e<o;e++)t.push(n[e])}return new AnimationClip(n,o,t)}function E(e){return f(Qe.clips[e],C)}function _(e){const t={sources:{}};for(let n=0,o=e.childNodes.length;n<o;n++){const o=e.childNodes[n];if(1===o.nodeType)switch(o.nodeName){case"bind_shape_matrix":t.bindShapeMatrix=s(o.textContent);break;case"source":const e=o.getAttribute("id");t.sources[e]=re(o);break;case"joints":t.joints=L(o);break;case"vertex_weights":t.vertexWeights=M(o)}}return t}function L(e){const t={inputs:{}};for(let n=0,o=e.childNodes.length;n<o;n++){const o=e.childNodes[n];if(1===o.nodeType&&"input"===o.nodeName){const e=o.getAttribute("semantic"),n=i(o.getAttribute("source"));t.inputs[e]=n}}return t}function M(e){const t={inputs:{}};for(let n=0,o=e.childNodes.length;n<o;n++){const o=e.childNodes[n];if(1===o.nodeType)switch(o.nodeName){case"input":const e=o.getAttribute("semantic"),n=i(o.getAttribute("source")),s=parseInt(o.getAttribute("offset"));t.inputs[e]={id:n,offset:s};break;case"vcount":t.vcount=r(o.textContent);break;case"v":t.v=r(o.textContent)}}return t}function R(e){const t={id:e.id},n=Qe.geometries[t.id];return void 0!==e.skin&&(t.skin=function(e){const t={joints:[],indices:{array:[],stride:4},weights:{array:[],stride:4}},n=e.sources,o=e.vertexWeights,s=o.vcount,r=o.v,i=o.inputs.JOINT.offset,a=o.inputs.WEIGHT.offset,c=e.sources[e.joints.inputs.JOINT],l=e.sources[e.joints.inputs.INV_BIND_MATRIX],d=n[o.inputs.WEIGHT.id].array;let u,f,h,m=0;for(u=0,h=s.length;u<h;u++){const e=s[u],n=[];for(f=0;f<e;f++){const e=r[m+i],t=d[r[m+a]];n.push({index:e,weight:t}),m+=2}for(n.sort(p),f=0;f<4;f++){const e=n[f];void 0!==e?(t.indices.array.push(e.index),t.weights.array.push(e.weight)):(t.indices.array.push(0),t.weights.array.push(0))}}for(e.bindShapeMatrix?t.bindMatrix=(new Matrix4).fromArray(e.bindShapeMatrix).transpose():t.bindMatrix=(new Matrix4).identity(),u=0,h=c.array.length;u<h;u++){const e=c.array[u],n=(new Matrix4).fromArray(l.array,u*l.stride).transpose();t.joints.push({name:e,boneInverse:n})}return t;function p(e,t){return t.weight-e.weight}}(e.skin),n.sources.skinIndices=t.skin.indices,n.sources.skinWeights=t.skin.weights),t}function S(e){return void 0!==e.build?e.build:e.init_from}function O(e){const t=Qe.images[e];return void 0!==t?f(t,S):(console.warn("THREE.ColladaLoader: Couldn't find image with ID:",e),null)}function j(e){const t={surfaces:{},samplers:{}};for(let n=0,o=e.childNodes.length;n<o;n++){const o=e.childNodes[n];if(1===o.nodeType)switch(o.nodeName){case"newparam":I(o,t);break;case"technique":t.technique=U(o);break;case"extra":t.extra=D(o)}}return t}function I(e,t){const n=e.getAttribute("sid");for(let o=0,s=e.childNodes.length;o<s;o++){const s=e.childNodes[o];if(1===s.nodeType)switch(s.nodeName){case"surface":t.surfaces[n]=B(s);break;case"sampler2D":t.samplers[n]=q(s)}}}function B(e){const t={};for(let n=0,o=e.childNodes.length;n<o;n++){const o=e.childNodes[n];1===o.nodeType&&"init_from"===o.nodeName&&(t.init_from=o.textContent)}return t}function q(e){const t={};for(let n=0,o=e.childNodes.length;n<o;n++){const o=e.childNodes[n];1===o.nodeType&&"source"===o.nodeName&&(t.source=o.textContent)}return t}function U(e){const t={};for(let n=0,o=e.childNodes.length;n<o;n++){const o=e.childNodes[n];if(1===o.nodeType)switch(o.nodeName){case"constant":case"lambert":case"blinn":case"phong":t.type=o.nodeName,t.parameters=F(o);break;case"extra":t.extra=D(o)}}return t}function F(e){const t={};for(let n=0,o=e.childNodes.length;n<o;n++){const o=e.childNodes[n];if(1===o.nodeType)switch(o.nodeName){case"emission":case"diffuse":case"specular":case"bump":case"ambient":case"shininess":case"transparency":t[o.nodeName]=P(o);break;case"transparent":t[o.nodeName]={opaque:o.hasAttribute("opaque")?o.getAttribute("opaque"):"A_ONE",data:P(o)}}}return t}function P(e){const t={};for(let n=0,o=e.childNodes.length;n<o;n++){const o=e.childNodes[n];if(1===o.nodeType)switch(o.nodeName){case"color":t[o.nodeName]=s(o.textContent);break;case"float":t[o.nodeName]=parseFloat(o.textContent);break;case"texture":t[o.nodeName]={id:o.getAttribute("texture"),extra:H(o)}}}return t}function H(e){const t={technique:{}};for(let n=0,o=e.childNodes.length;n<o;n++){const o=e.childNodes[n];1===o.nodeType&&"extra"===o.nodeName&&V(o,t)}return t}function V(e,t){for(let n=0,o=e.childNodes.length;n<o;n++){const o=e.childNodes[n];1===o.nodeType&&"technique"===o.nodeName&&G(o,t)}}function G(e,t){for(let n=0,o=e.childNodes.length;n<o;n++){const o=e.childNodes[n];if(1===o.nodeType)switch(o.nodeName){case"repeatU":case"repeatV":case"offsetU":case"offsetV":t.technique[o.nodeName]=parseFloat(o.textContent);break;case"wrapU":case"wrapV":"TRUE"===o.textContent.toUpperCase()?t.technique[o.nodeName]=1:"FALSE"===o.textContent.toUpperCase()?t.technique[o.nodeName]=0:t.technique[o.nodeName]=parseInt(o.textContent);break;case"bump":t[o.nodeName]=z(o)}}}function D(e){const t={};for(let n=0,o=e.childNodes.length;n<o;n++){const o=e.childNodes[n];1===o.nodeType&&"technique"===o.nodeName&&(t.technique=W(o))}return t}function W(e){const t={};for(let n=0,o=e.childNodes.length;n<o;n++){const o=e.childNodes[n];if(1===o.nodeType)switch(o.nodeName){case"double_sided":t[o.nodeName]=parseInt(o.textContent);break;case"bump":t[o.nodeName]=z(o)}}return t}function z(e){const t={};for(let n=0,o=e.childNodes.length;n<o;n++){const o=e.childNodes[n];1===o.nodeType&&"texture"===o.nodeName&&(t[o.nodeName]={id:o.getAttribute("texture"),texcoord:o.getAttribute("texcoord"),extra:H(o)})}return t}function J(e){return e}function X(e){const t=(n=e.url,f(Qe.effects[n],J));var n;const o=t.profile.technique;let s;switch(o.type){case"phong":case"blinn":s=new MeshPhongMaterial;break;case"lambert":s=new MeshLambertMaterial;break;default:s=new MeshBasicMaterial}function r(e,n=null){const o=t.profile.samplers[e.id];let s=null;if(void 0!==o?s=O(t.profile.surfaces[o.source].init_from):(console.warn("THREE.ColladaLoader: Undefined sampler. Access image directly (see #12530)."),s=O(e.id)),null!==s){const t=function(e){let t,n=e.slice(2+(e.lastIndexOf(".")-1>>>0));return n=n.toLowerCase(),t="tga"===n?We:De,t}(s);if(void 0!==t){const o=t.load(s),r=e.extra;if(void 0!==r&&void 0!==r.technique&&!1===a(r.technique)){const e=r.technique;o.wrapS=e.wrapU?RepeatWrapping:ClampToEdgeWrapping,o.wrapT=e.wrapV?RepeatWrapping:ClampToEdgeWrapping,o.offset.set(e.offsetU||0,e.offsetV||0),o.repeat.set(e.repeatU||1,e.repeatV||1)}else o.wrapS=RepeatWrapping,o.wrapT=RepeatWrapping;return null!==n&&(o.colorSpace=n),o}return console.warn("THREE.ColladaLoader: Loader for texture %s not found.",s),null}return console.warn("THREE.ColladaLoader: Couldn't create texture with ID:",e.id),null}s.name=e.name||"";const i=o.parameters;for(const e in i){const t=i[e];switch(e){case"diffuse":t.color&&s.color.fromArray(t.color),t.texture&&(s.map=r(t.texture,SRGBColorSpace));break;case"specular":t.color&&s.specular&&s.specular.fromArray(t.color),t.texture&&(s.specularMap=r(t.texture));break;case"bump":t.texture&&(s.normalMap=r(t.texture));break;case"ambient":t.texture&&(s.lightMap=r(t.texture,SRGBColorSpace));break;case"shininess":t.float&&s.shininess&&(s.shininess=t.float);break;case"emission":t.color&&s.emissive&&s.emissive.fromArray(t.color),t.texture&&(s.emissiveMap=r(t.texture,SRGBColorSpace))}}s.color.convertSRGBToLinear(),s.specular&&s.specular.convertSRGBToLinear(),s.emissive&&s.emissive.convertSRGBToLinear();let c=i.transparent,l=i.transparency;if(void 0===l&&c&&(l={float:1}),void 0===c&&l&&(c={opaque:"A_ONE",data:{color:[1,1,1,1]}}),c&&l)if(c.data.texture)s.transparent=!0;else{const e=c.data.color;switch(c.opaque){case"A_ONE":s.opacity=e[3]*l.float;break;case"RGB_ZERO":s.opacity=1-e[0]*l.float;break;case"A_ZERO":s.opacity=1-e[3]*l.float;break;case"RGB_ONE":s.opacity=e[0]*l.float;break;default:console.warn('THREE.ColladaLoader: Invalid opaque type "%s" of transparent tag.',c.opaque)}s.opacity<1&&(s.transparent=!0)}if(void 0!==o.extra&&void 0!==o.extra.technique){const e=o.extra.technique;for(const t in e){const n=e[t];switch(t){case"double_sided":s.side=1===n?DoubleSide:FrontSide;break;case"bump":s.normalMap=r(n.texture),s.normalScale=new Vector2(1,1)}}}return s}function K(e){return f(Qe.materials[e],X)}function Q(e){for(let t=0;t<e.childNodes.length;t++){const n=e.childNodes[t];if("technique_common"===n.nodeName)return Z(n)}return{}}function Z(e){const t={};for(let n=0;n<e.childNodes.length;n++){const o=e.childNodes[n];switch(o.nodeName){case"perspective":case"orthographic":t.technique=o.nodeName,t.parameters=Y(o)}}return t}function Y(e){const t={};for(let n=0;n<e.childNodes.length;n++){const o=e.childNodes[n];switch(o.nodeName){case"xfov":case"yfov":case"xmag":case"ymag":case"znear":case"zfar":case"aspect_ratio":t[o.nodeName]=parseFloat(o.textContent)}}return t}function $(e){let t;switch(e.optics.technique){case"perspective":t=new PerspectiveCamera(e.optics.parameters.yfov,e.optics.parameters.aspect_ratio,e.optics.parameters.znear,e.optics.parameters.zfar);break;case"orthographic":let n=e.optics.parameters.ymag,o=e.optics.parameters.xmag;const s=e.optics.parameters.aspect_ratio;o=void 0===o?n*s:o,n=void 0===n?o/s:n,o*=.5,n*=.5,t=new OrthographicCamera(-o,o,n,-n,e.optics.parameters.znear,e.optics.parameters.zfar);break;default:t=new PerspectiveCamera}return t.name=e.name||"",t}function ee(e){const t=Qe.cameras[e];return void 0!==t?f(t,$):(console.warn("THREE.ColladaLoader: Couldn't find camera with ID:",e),null)}function te(e){const t={};for(let n=0,o=e.childNodes.length;n<o;n++){const o=e.childNodes[n];if(1===o.nodeType)switch(o.nodeName){case"directional":case"point":case"spot":case"ambient":t.technique=o.nodeName,t.parameters=ne(o)}}return t}function ne(e){const t={};for(let n=0,o=e.childNodes.length;n<o;n++){const o=e.childNodes[n];if(1===o.nodeType)switch(o.nodeName){case"color":const e=s(o.textContent);t.color=(new Color).fromArray(e).convertSRGBToLinear();break;case"falloff_angle":t.falloffAngle=parseFloat(o.textContent);break;case"quadratic_attenuation":const n=parseFloat(o.textContent);t.distance=n?Math.sqrt(1/n):0}}return t}function oe(e){let t;switch(e.technique){case"directional":t=new DirectionalLight;break;case"point":t=new PointLight;break;case"spot":t=new SpotLight;break;case"ambient":t=new AmbientLight}return e.parameters.color&&t.color.copy(e.parameters.color),e.parameters.distance&&(t.distance=e.parameters.distance),t}function se(e){const t=Qe.lights[e];return void 0!==t?f(t,oe):(console.warn("THREE.ColladaLoader: Couldn't find light with ID:",e),null)}function re(e){const t={array:[],stride:3};for(let r=0;r<e.childNodes.length;r++){const i=e.childNodes[r];if(1===i.nodeType)switch(i.nodeName){case"float_array":t.array=s(i.textContent);break;case"Name_array":t.array=o(i.textContent);break;case"technique_common":const e=n(i,"accessor")[0];void 0!==e&&(t.stride=parseInt(e.getAttribute("stride")))}}return t}function ie(e){const t={};for(let n=0;n<e.childNodes.length;n++){const o=e.childNodes[n];1===o.nodeType&&(t[o.getAttribute("semantic")]=i(o.getAttribute("source")))}return t}function ae(e){const t={type:e.nodeName,material:e.getAttribute("material"),count:parseInt(e.getAttribute("count")),inputs:{},stride:0,hasUV:!1};for(let n=0,o=e.childNodes.length;n<o;n++){const o=e.childNodes[n];if(1===o.nodeType)switch(o.nodeName){case"input":const e=i(o.getAttribute("source")),n=o.getAttribute("semantic"),s=parseInt(o.getAttribute("offset")),a=parseInt(o.getAttribute("set")),c=a>0?n+a:n;t.inputs[c]={id:e,offset:s},t.stride=Math.max(t.stride,s+1),"TEXCOORD"===n&&(t.hasUV=!0);break;case"vcount":t.vcount=r(o.textContent);break;case"p":t.p=r(o.textContent)}}return t}function ce(e){let t=0;for(let n=0,o=e.length;n<o;n++)!0===e[n].hasUV&&t++;t>0&&t<e.length&&(e.uvsNeedsFix=!0)}function le(e){const t={},n=e.sources,o=e.vertices,s=e.primitives;if(0===s.length)return{};const r=function(e){const t={};for(let n=0;n<e.length;n++){const o=e[n];void 0===t[o.type]&&(t[o.type]=[]),t[o.type].push(o)}return t}(s);for(const e in r){const s=r[e];ce(s),t[e]=de(s,n,o)}return t}function de(e,t,n){const o={},s={array:[],stride:0},r={array:[],stride:0},i={array:[],stride:0},a={array:[],stride:0},c={array:[],stride:0},l=[],d=[],u=new BufferGeometry,f=[];let h=0;for(let o=0;o<e.length;o++){const m=e[o],p=m.inputs;let g=0;switch(m.type){case"lines":case"linestrips":g=2*m.count;break;case"triangles":g=3*m.count;break;case"polylist":for(let e=0;e<m.count;e++){const t=m.vcount[e];switch(t){case 3:g+=3;break;case 4:g+=6;break;default:g+=3*(t-2)}}break;default:console.warn("THREE.ColladaLoader: Unknow primitive type:",m.type)}u.addGroup(h,g,o),h+=g,m.material&&f.push(m.material);for(const o in p){const u=p[o];switch(o){case"VERTEX":for(const o in n){const f=n[o];switch(o){case"POSITION":const n=s.array.length;if(ue(m,t[f],u.offset,s.array),s.stride=t[f].stride,t.skinWeights&&t.skinIndices&&(ue(m,t.skinIndices,u.offset,l),ue(m,t.skinWeights,u.offset,d)),!1===m.hasUV&&!0===e.uvsNeedsFix){const e=(s.array.length-n)/s.stride;for(let t=0;t<e;t++)i.array.push(0,0)}break;case"NORMAL":ue(m,t[f],u.offset,r.array),r.stride=t[f].stride;break;case"COLOR":ue(m,t[f],u.offset,c.array),c.stride=t[f].stride;break;case"TEXCOORD":ue(m,t[f],u.offset,i.array),i.stride=t[f].stride;break;case"TEXCOORD1":ue(m,t[f],u.offset,a.array),i.stride=t[f].stride;break;default:console.warn('THREE.ColladaLoader: Semantic "%s" not handled in geometry build process.',o)}}break;case"NORMAL":ue(m,t[u.id],u.offset,r.array),r.stride=t[u.id].stride;break;case"COLOR":ue(m,t[u.id],u.offset,c.array,!0),c.stride=t[u.id].stride;break;case"TEXCOORD":ue(m,t[u.id],u.offset,i.array),i.stride=t[u.id].stride;break;case"TEXCOORD1":ue(m,t[u.id],u.offset,a.array),a.stride=t[u.id].stride}}}return s.array.length>0&&u.setAttribute("position",new Float32BufferAttribute(s.array,s.stride)),r.array.length>0&&u.setAttribute("normal",new Float32BufferAttribute(r.array,r.stride)),c.array.length>0&&u.setAttribute("color",new Float32BufferAttribute(c.array,c.stride)),i.array.length>0&&u.setAttribute("uv",new Float32BufferAttribute(i.array,i.stride)),a.array.length>0&&u.setAttribute("uv1",new Float32BufferAttribute(a.array,a.stride)),l.length>0&&u.setAttribute("skinIndex",new Float32BufferAttribute(l,4)),d.length>0&&u.setAttribute("skinWeight",new Float32BufferAttribute(d,4)),o.data=u,o.type=e[0].type,o.materialKeys=f,o}function ue(e,t,n,o,s=!1){const r=e.p,i=e.stride,a=e.vcount;function c(e){let t=r[e+n]*d;const i=t+d;for(;t<i;t++)o.push(l[t]);if(s){const e=o.length-d-1;ze.setRGB(o[e+0],o[e+1],o[e+2]).convertSRGBToLinear(),o[e+0]=ze.r,o[e+1]=ze.g,o[e+2]=ze.b}}const l=t.array,d=t.stride;if(void 0!==e.vcount){let e=0;for(let t=0,n=a.length;t<n;t++){const n=a[t];if(4===n){const t=e+1*i,n=e+2*i,o=e+3*i;c(e+0*i),c(t),c(o),c(t),c(n),c(o)}else if(3===n){const t=e+1*i,n=e+2*i;c(e+0*i),c(t),c(n)}else if(n>4)for(let t=1,o=n-2;t<=o;t++){const n=e+i*t,o=e+i*(t+1);c(e+0*i),c(n),c(o)}e+=i*n}}else for(let e=0,t=r.length;e<t;e+=i)c(e)}function fe(e){return f(Qe.geometries[e],le)}function he(e){return void 0!==e.build?e.build:e}function me(e,t){for(let n=0;n<e.childNodes.length;n++){const o=e.childNodes[n];if(1===o.nodeType)switch(o.nodeName){case"joint":t.joints[o.getAttribute("sid")]=pe(o);break;case"link":t.links.push(be(o))}}}function pe(e){let t;for(let n=0;n<e.childNodes.length;n++){const o=e.childNodes[n];if(1===o.nodeType)switch(o.nodeName){case"prismatic":case"revolute":t=ge(o)}}return t}function ge(e){const t={sid:e.getAttribute("sid"),name:e.getAttribute("name")||"",axis:new Vector3,limits:{min:0,max:0},type:e.nodeName,static:!1,zeroPosition:0,middlePosition:0};for(let n=0;n<e.childNodes.length;n++){const o=e.childNodes[n];if(1===o.nodeType)switch(o.nodeName){case"axis":const e=s(o.textContent);t.axis.fromArray(e);break;case"limits":const n=o.getElementsByTagName("max")[0],r=o.getElementsByTagName("min")[0];t.limits.max=parseFloat(n.textContent),t.limits.min=parseFloat(r.textContent)}}return t.limits.min>=t.limits.max&&(t.static=!0),t.middlePosition=(t.limits.min+t.limits.max)/2,t}function be(e){const t={sid:e.getAttribute("sid"),name:e.getAttribute("name")||"",attachments:[],transforms:[]};for(let n=0;n<e.childNodes.length;n++){const o=e.childNodes[n];if(1===o.nodeType)switch(o.nodeName){case"attachment_full":t.attachments.push(ye(o));break;case"matrix":case"translate":case"rotate":t.transforms.push(Ne(o))}}return t}function ye(e){const t={joint:e.getAttribute("joint").split("/").pop(),transforms:[],links:[]};for(let n=0;n<e.childNodes.length;n++){const o=e.childNodes[n];if(1===o.nodeType)switch(o.nodeName){case"link":t.links.push(be(o));break;case"matrix":case"translate":case"rotate":t.transforms.push(Ne(o))}}return t}function Ne(e){const t={type:e.nodeName},n=s(e.textContent);switch(t.type){case"matrix":t.obj=new Matrix4,t.obj.fromArray(n).transpose();break;case"translate":t.obj=new Vector3,t.obj.fromArray(n);break;case"rotate":t.obj=new Vector3,t.obj.fromArray(n),t.angle=MathUtils.degToRad(n[3])}return t}function xe(e,t){for(let n=0;n<e.childNodes.length;n++){const o=e.childNodes[n];1===o.nodeType&&"technique_common"===o.nodeName&&ke(o,t)}}function ke(e,t){for(let n=0;n<e.childNodes.length;n++){const o=e.childNodes[n];if(1===o.nodeType)switch(o.nodeName){case"inertia":t.inertia=s(o.textContent);break;case"mass":t.mass=s(o.textContent)[0]}}}function we(e){const t={target:e.getAttribute("target").split("/").pop()};for(let n=0;n<e.childNodes.length;n++){const o=e.childNodes[n];if(1===o.nodeType&&"axis"===o.nodeName){const e=o.getElementsByTagName("param")[0];t.axis=e.textContent;const n=t.axis.split("inst_").pop().split("axis")[0];t.jointIndex=n.substring(0,n.length-1)}}return t}function Ae(e){return void 0!==e.build?e.build:e}function ve(e){const t=[],n=Pe.querySelector('[id="'+e.id+'"]');for(let e=0;e<n.childNodes.length;e++){const o=n.childNodes[e];if(1!==o.nodeType)continue;let r,i;switch(o.nodeName){case"matrix":r=s(o.textContent);const e=(new Matrix4).fromArray(r).transpose();t.push({sid:o.getAttribute("sid"),type:o.nodeName,obj:e});break;case"translate":case"scale":r=s(o.textContent),i=(new Vector3).fromArray(r),t.push({sid:o.getAttribute("sid"),type:o.nodeName,obj:i});break;case"rotate":r=s(o.textContent),i=(new Vector3).fromArray(r);const n=MathUtils.degToRad(r[3]);t.push({sid:o.getAttribute("sid"),type:o.nodeName,obj:i,angle:n})}}return t}const Te=new Matrix4,Ce=new Vector3;function Ee(e){const t={name:e.getAttribute("name")||"",type:e.getAttribute("type"),id:e.getAttribute("id"),sid:e.getAttribute("sid"),matrix:new Matrix4,nodes:[],instanceCameras:[],instanceControllers:[],instanceLights:[],instanceGeometries:[],instanceNodes:[],transforms:{}};for(let n=0;n<e.childNodes.length;n++){const o=e.childNodes[n];if(1!==o.nodeType)continue;let r;switch(o.nodeName){case"node":t.nodes.push(o.getAttribute("id")),Ee(o);break;case"instance_camera":t.instanceCameras.push(i(o.getAttribute("url")));break;case"instance_controller":t.instanceControllers.push(_e(o));break;case"instance_light":t.instanceLights.push(i(o.getAttribute("url")));break;case"instance_geometry":t.instanceGeometries.push(_e(o));break;case"instance_node":t.instanceNodes.push(i(o.getAttribute("url")));break;case"matrix":r=s(o.textContent),t.matrix.multiply(Te.fromArray(r).transpose()),t.transforms[o.getAttribute("sid")]=o.nodeName;break;case"translate":r=s(o.textContent),Ce.fromArray(r),t.matrix.multiply(Te.makeTranslation(Ce.x,Ce.y,Ce.z)),t.transforms[o.getAttribute("sid")]=o.nodeName;break;case"rotate":r=s(o.textContent);const e=MathUtils.degToRad(r[3]);t.matrix.multiply(Te.makeRotationAxis(Ce.fromArray(r),e)),t.transforms[o.getAttribute("sid")]=o.nodeName;break;case"scale":r=s(o.textContent),t.matrix.scale(Ce.fromArray(r)),t.transforms[o.getAttribute("sid")]=o.nodeName;break;case"extra":break;default:console.log(o)}}return Ie(t.id)?console.warn("THREE.ColladaLoader: There is already a node with ID %s. Exclude current node from further processing.",t.id):Qe.nodes[t.id]=t,t}function _e(e){const t={id:i(e.getAttribute("url")),materials:{},skeletons:[]};for(let n=0;n<e.childNodes.length;n++){const o=e.childNodes[n];switch(o.nodeName){case"bind_material":const e=o.getElementsByTagName("instance_material");for(let n=0;n<e.length;n++){const o=e[n],s=o.getAttribute("symbol"),r=o.getAttribute("target");t.materials[s]=i(r)}break;case"skeleton":t.skeletons.push(i(o.textContent))}}return t}function Le(e,t){const n=[],o=[];let s,r,i;for(s=0;s<e.length;s++){const o=e[s];let r;if(Ie(o))r=Be(o),Me(r,t,n);else if(a=o,void 0!==Qe.visualScenes[a]){const e=Qe.visualScenes[o].children;for(let o=0;o<e.length;o++){const s=e[o];"JOINT"===s.type&&Me(Be(s.id),t,n)}}else console.error("THREE.ColladaLoader: Unable to find root bone of skeleton with ID:",o)}var a;for(s=0;s<t.length;s++)for(r=0;r<n.length;r++)if(i=n[r],i.bone.name===t[s].name){o[s]=i,i.processed=!0;break}for(s=0;s<n.length;s++)i=n[s],!1===i.processed&&(o.push(i),i.processed=!0);const c=[],l=[];for(s=0;s<o.length;s++)i=o[s],c.push(i.bone),l.push(i.boneInverse);return new Skeleton(c,l)}function Me(e,t,n){e.traverse((function(e){if(!0===e.isBone){let o;for(let n=0;n<t.length;n++){const s=t[n];if(s.name===e.name){o=s.boneInverse;break}}void 0===o&&(o=new Matrix4),n.push({bone:e,boneInverse:o,processed:!1})}}))}function Re(e){const t=[],n=e.matrix,o=e.nodes,s=e.type,r=e.instanceCameras,i=e.instanceControllers,a=e.instanceLights,c=e.instanceGeometries,l=e.instanceNodes;for(let e=0,n=o.length;e<n;e++)t.push(Be(o[e]));for(let e=0,n=r.length;e<n;e++){const n=ee(r[e]);null!==n&&t.push(n.clone())}for(let e=0,n=i.length;e<n;e++){const n=i[e],o=(d=n.id,f(Qe.controllers[d],R)),s=je(fe(o.id),n.materials),r=Le(n.skeletons,o.skin.joints);for(let e=0,n=s.length;e<n;e++){const n=s[e];n.isSkinnedMesh&&(n.bind(r,o.skin.bindMatrix),n.normalizeSkinWeights()),t.push(n)}}var d;for(let e=0,n=a.length;e<n;e++){const n=se(a[e]);null!==n&&t.push(n.clone())}for(let e=0,n=c.length;e<n;e++){const n=c[e],o=je(fe(n.id),n.materials);for(let e=0,n=o.length;e<n;e++)t.push(o[e])}for(let e=0,n=l.length;e<n;e++)t.push(Be(l[e]).clone());let u;if(0===o.length&&1===t.length)u=t[0];else{u="JOINT"===s?new Bone:new Group;for(let e=0;e<t.length;e++)u.add(t[e])}return u.name="JOINT"===s?e.sid:e.name,u.matrix.copy(n),u.matrix.decompose(u.position,u.quaternion,u.scale),u}const Se=new MeshBasicMaterial({color:16711935});function Oe(e,t){const n=[];for(let o=0,s=e.length;o<s;o++){const s=t[e[o]];void 0===s?(console.warn("THREE.ColladaLoader: Material with key %s not found. Apply fallback material.",e[o]),n.push(Se)):n.push(K(s))}return n}function je(e,t){const n=[];for(const o in e){const s=e[o],r=Oe(s.materialKeys,t);if(0===r.length&&("lines"===o||"linestrips"===o?r.push(new LineBasicMaterial):r.push(new MeshPhongMaterial)),"lines"===o||"linestrips"===o)for(let e=0,t=r.length;e<t;e++){const t=r[e];if(!0===t.isMeshPhongMaterial||!0===t.isMeshLambertMaterial){const n=new LineBasicMaterial;n.color.copy(t.color),n.opacity=t.opacity,n.transparent=t.transparent,r[e]=n}}const i=void 0!==s.data.attributes.skinIndex,a=1===r.length?r[0]:r;let c;switch(o){case"lines":c=new LineSegments(s.data,a);break;case"linestrips":c=new Line(s.data,a);break;case"triangles":case"polylist":c=i?new SkinnedMesh(s.data,a):new Mesh(s.data,a)}n.push(c)}return n}function Ie(e){return void 0!==Qe.nodes[e]}function Be(e){return f(Qe.nodes[e],Re)}function qe(e){const t=new Group;t.name=e.name;const n=e.children;for(let e=0;e<n.length;e++){const o=n[e];t.add(Be(o.id))}return t}function Ue(e){return f(Qe.visualScenes[e],qe)}if(0===e.length)return{scene:new Scene};const Fe=(new DOMParser).parseFromString(e,"application/xml"),Pe=n(Fe,"COLLADA")[0],He=Fe.getElementsByTagName("parsererror")[0];if(void 0!==He){const e=n(He,"div")[0];let t;return t=e?e.textContent:function(e){let t="";const n=[e];for(;n.length;){const e=n.shift();e.nodeType===Node.TEXT_NODE?t+=e.textContent:(t+="\n",n.push.apply(n,e.childNodes))}return t.trim()}(He),console.error("THREE.ColladaLoader: Failed to parse collada file.\n",t),null}const Ve=Pe.getAttribute("version");console.debug("THREE.ColladaLoader: File version",Ve);const Ge=function(e){return{unit:c(n(e,"unit")[0]),upAxis:l(n(e,"up_axis")[0])}}(n(Pe,"asset")[0]),De=new TextureLoader(this.manager);let We;De.setPath(this.resourcePath||t).setCrossOrigin(this.crossOrigin),TGALoader&&(We=new TGALoader(this.manager),We.setPath(this.resourcePath||t));const ze=new Color,Je=[];let Xe={},Ke=0;const Qe={animations:{},clips:{},controllers:{},images:{},effects:{},materials:{},cameras:{},lights:{},geometries:{},nodes:{},visualScenes:{},kinematicsModels:{},physicsModels:{},kinematicsScenes:{}};d(Pe,"library_animations","animation",(function e(t){const n={sources:{},samplers:{},channels:{}};let o=!1;for(let s=0,r=t.childNodes.length;s<r;s++){const r=t.childNodes[s];if(1!==r.nodeType)continue;let i;switch(r.nodeName){case"source":i=r.getAttribute("id"),n.sources[i]=re(r);break;case"sampler":i=r.getAttribute("id"),n.samplers[i]=h(r);break;case"channel":i=r.getAttribute("target"),n.channels[i]=m(r);break;case"animation":e(r),o=!0;break;default:console.log(r)}}!1===o&&(Qe.animations[t.getAttribute("id")||MathUtils.generateUUID()]=n)})),d(Pe,"library_animation_clips","animation_clip",(function(e){const t={name:e.getAttribute("id")||"default",start:parseFloat(e.getAttribute("start")||0),end:parseFloat(e.getAttribute("end")||0),animations:[]};for(let n=0,o=e.childNodes.length;n<o;n++){const o=e.childNodes[n];1===o.nodeType&&"instance_animation"===o.nodeName&&t.animations.push(i(o.getAttribute("url")))}Qe.clips[e.getAttribute("id")]=t})),d(Pe,"library_controllers","controller",(function(e){const t={};for(let n=0,o=e.childNodes.length;n<o;n++){const o=e.childNodes[n];if(1===o.nodeType)switch(o.nodeName){case"skin":t.id=i(o.getAttribute("source")),t.skin=_(o);break;case"morph":t.id=i(o.getAttribute("source")),console.warn("THREE.ColladaLoader: Morph target animation not supported yet.")}}Qe.controllers[e.getAttribute("id")]=t})),d(Pe,"library_images","image",(function(e){const t={init_from:n(e,"init_from")[0].textContent};Qe.images[e.getAttribute("id")]=t})),d(Pe,"library_effects","effect",(function(e){const t={};for(let n=0,o=e.childNodes.length;n<o;n++){const o=e.childNodes[n];1===o.nodeType&&"profile_COMMON"===o.nodeName&&(t.profile=j(o))}Qe.effects[e.getAttribute("id")]=t})),d(Pe,"library_materials","material",(function(e){const t={name:e.getAttribute("name")};for(let n=0,o=e.childNodes.length;n<o;n++){const o=e.childNodes[n];1===o.nodeType&&"instance_effect"===o.nodeName&&(t.url=i(o.getAttribute("url")))}Qe.materials[e.getAttribute("id")]=t})),d(Pe,"library_cameras","camera",(function(e){const t={name:e.getAttribute("name")};for(let n=0,o=e.childNodes.length;n<o;n++){const o=e.childNodes[n];1===o.nodeType&&"optics"===o.nodeName&&(t.optics=Q(o))}Qe.cameras[e.getAttribute("id")]=t})),d(Pe,"library_lights","light",(function(e){let t={};for(let n=0,o=e.childNodes.length;n<o;n++){const o=e.childNodes[n];1===o.nodeType&&"technique_common"===o.nodeName&&(t=te(o))}Qe.lights[e.getAttribute("id")]=t})),d(Pe,"library_geometries","geometry",(function(e){const t={name:e.getAttribute("name"),sources:{},vertices:{},primitives:[]},o=n(e,"mesh")[0];if(void 0!==o){for(let e=0;e<o.childNodes.length;e++){const n=o.childNodes[e];if(1!==n.nodeType)continue;const s=n.getAttribute("id");switch(n.nodeName){case"source":t.sources[s]=re(n);break;case"vertices":t.vertices=ie(n);break;case"polygons":console.warn("THREE.ColladaLoader: Unsupported primitive type: ",n.nodeName);break;case"lines":case"linestrips":case"polylist":case"triangles":t.primitives.push(ae(n));break;default:console.log(n)}}Qe.geometries[e.getAttribute("id")]=t}})),d(Pe,"library_nodes","node",Ee),d(Pe,"library_visual_scenes","visual_scene",(function(e){const t={name:e.getAttribute("name"),children:[]};!function(e){const t=e.getElementsByTagName("node");for(let e=0;e<t.length;e++){const n=t[e];!1===n.hasAttribute("id")&&n.setAttribute("id","three_default_"+Ke++)}}(e);const o=n(e,"node");for(let e=0;e<o.length;e++)t.children.push(Ee(o[e]));Qe.visualScenes[e.getAttribute("id")]=t})),d(Pe,"library_kinematics_models","kinematics_model",(function(e){const t={name:e.getAttribute("name")||"",joints:{},links:[]};for(let n=0;n<e.childNodes.length;n++){const o=e.childNodes[n];1===o.nodeType&&"technique_common"===o.nodeName&&me(o,t)}Qe.kinematicsModels[e.getAttribute("id")]=t})),d(Pe,"library_physics_models","physics_model",(function(e){const t={name:e.getAttribute("name")||"",rigidBodies:{}};for(let n=0;n<e.childNodes.length;n++){const o=e.childNodes[n];1===o.nodeType&&"rigid_body"===o.nodeName&&(t.rigidBodies[o.getAttribute("name")]={},xe(o,t.rigidBodies[o.getAttribute("name")]))}Qe.physicsModels[e.getAttribute("id")]=t})),d(Pe,"scene","instance_kinematics_scene",(function(e){const t={bindJointAxis:[]};for(let n=0;n<e.childNodes.length;n++){const o=e.childNodes[n];1===o.nodeType&&"bind_joint_axis"===o.nodeName&&t.bindJointAxis.push(we(o))}Qe.kinematicsScenes[i(e.getAttribute("url"))]=t})),u(Qe.animations,p),u(Qe.clips,C),u(Qe.controllers,R),u(Qe.images,S),u(Qe.effects,J),u(Qe.materials,X),u(Qe.cameras,$),u(Qe.lights,oe),u(Qe.geometries,le),u(Qe.visualScenes,qe),function(){const e=Qe.clips;if(!0===a(e)){if(!1===a(Qe.animations)){const e=[];for(const t in Qe.animations){const n=g(t);for(let t=0,o=n.length;t<o;t++)e.push(n[t])}Je.push(new AnimationClip("default",-1,e))}}else for(const t in e)Je.push(E(t))}(),function(){const e=Object.keys(Qe.kinematicsModels)[0],t=Object.keys(Qe.kinematicsScenes)[0],n=Object.keys(Qe.visualScenes)[0];if(void 0===e||void 0===t)return;const o=(s=e,f(Qe.kinematicsModels[s],he));var s;const r=function(e){return f(Qe.kinematicsScenes[e],Ae)}(t),i=Ue(n),a=r.bindJointAxis,c={};for(let e=0,t=a.length;e<t;e++){const t=a[e],n=Pe.querySelector('[sid="'+t.target+'"]');if(n){const e=n.parentElement;l(t.jointIndex,e)}}function l(e,t){const n=t.getAttribute("name"),s=o.joints[e];i.traverse((function(o){o.name===n&&(c[e]={object:o,transforms:ve(t),joint:s,position:s.zeroPosition})}))}const d=new Matrix4;Xe={joints:o&&o.joints,getJointValue:function(e){const t=c[e];if(t)return t.position;console.warn("THREE.ColladaLoader: Joint "+e+" doesn't exist.")},setJointValue:function(e,t){const n=c[e];if(n){const o=n.joint;if(t>o.limits.max||t<o.limits.min)console.warn("THREE.ColladaLoader: Joint "+e+" value "+t+" outside of limits (min: "+o.limits.min+", max: "+o.limits.max+").");else if(o.static)console.warn("THREE.ColladaLoader: Joint "+e+" is static.");else{const s=n.object,r=o.axis,i=n.transforms;Te.identity();for(let n=0;n<i.length;n++){const s=i[n];if(s.sid&&-1!==s.sid.indexOf(e))switch(o.type){case"revolute":Te.multiply(d.makeRotationAxis(r,MathUtils.degToRad(t)));break;case"prismatic":Te.multiply(d.makeTranslation(r.x*t,r.y*t,r.z*t));break;default:console.warn("THREE.ColladaLoader: Unknown joint type: "+o.type)}else switch(s.type){case"matrix":Te.multiply(s.obj);break;case"translate":Te.multiply(d.makeTranslation(s.obj.x,s.obj.y,s.obj.z));break;case"scale":Te.scale(s.obj);break;case"rotate":Te.multiply(d.makeRotationAxis(s.obj,s.angle))}}s.matrix.copy(Te),s.matrix.decompose(s.position,s.quaternion,s.scale),c[e].position=t}}else console.log("THREE.ColladaLoader: "+e+" does not exist.")}}}();const Ze=function(e){return Ue(i(n(e,"instance_visual_scene")[0].getAttribute("url")))}(n(Pe,"scene")[0]);return Ze.animations=Je,"Z_UP"===Ge.upAxis&&(console.warn("THREE.ColladaLoader: You are loading an asset with a Z-UP coordinate system. The loader just rotates the asset to transform it into Y-UP. The vertex data are not converted, see #24289."),Ze.rotation.set(-Math.PI/2,0,0)),Ze.scale.multiplyScalar(Ge.unit),{get animations(){return console.warn("THREE.ColladaLoader: Please access animations over scene.animations now."),Je},kinematics:Xe,library:Qe,scene:Ze}}}export{ColladaLoader};