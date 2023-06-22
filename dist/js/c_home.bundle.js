(()=>{"use strict";var e,n={2523:(e,n,t)=>{var i=t(429),r=t(7087);const o=t.p+"./img/b8bbe172062b0bbf0462..png",a=t.p+"./img/49f5508ef89c364876cc..png",s=t.p+"./img/6089585022e81f80b51f..png",c=t.p+"./img/dffb4f3b4fe52d99e523..png",u=t.p+"./img/4ae8261a94734d023425..png",l=t.p+"./img/d48b408a079f10d798d9..png",v=t.p+"./img/d6346df51f7df58aa4a9..png",f=t.p+"./img/5c57398d7820e8dc97c0..png",d=t.p+"./img/f812087c308c489877db..png",m=t.p+"./img/85a7a29e2e68c9038419..png",p=(t.p,t.p+"./img/48898208a42a7030f2c1..png"),h=t.p+"./img/97e2c3d62a77b83bfe04..png",y=t.p+"./img/59156ddb0188621eb924..png",g=t.p+"./img/ed688ccbe18544cf2472..png",x=t.p+"./img/4207b735e651c7b56f77..png",b=t.p+"./img/764fb1774d69feff275f..png",w=t.p+"./img/711dd856170520c1a032..png",z=t.p+"./img/dc95e2a880d4eb133889..png",P=t.p+"./img/ffcdd6f3f70c91f6f2b3..png",S=t.p+"./img/2508873639624b0c690d..png";function C(e){return C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},C(e)}function V(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,(void 0,r=function(e,n){if("object"!==C(e)||null===e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var i=t.call(e,"string");if("object"!==C(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(i.key),"symbol"===C(r)?r:String(r)),i)}var r}var j=function(){function e(n){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.scene=new i.xsS,this.container=n.dom,this.width=this.container.offsetWidth,this.height=this.container.offsetHeight,this.renderer=new i.CP7({antialias:!0,transparent:!0}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(this.width,this.height),this.renderer.setClearColor(16777215,0),this.renderer.outputColorSpace=i.KI_,this.container.appendChild(this.renderer.domElement),this.camera=new i.cPb(35,window.innerWidth/window.innerHeight,.001,1e3),this.camera.position.set(0,0,4),this.camera.lookAt(0,0,0),this.time=0,this.isPlaying=!0,this.addObjects(),this.resize(),this.render(),this.setupResize(),this.materials=[],this.meshes=[],this.groups=[],this.handleImages(),this.viewCenter=new i.Tme,this.viewCenter.position.set(0,0,0),this.scene.add(this.viewCenter)}var n,t;return n=e,(t=[{key:"handleImages",value:function(){var e=this;[u,p,a,y,s,g,c,x,o,h,l,b,v,w,f,z,d,P,m,S].forEach((function(n,t){var r=e.material.clone();e.materials.push(r);var o=new i.ZAu;r.uniforms.uTexture.value=(new i.dpR).load(n,void 0,(function(){r.uniforms.uTexture.value.needsUpdate=!0}));var a=new i._12(1.5,.9,28,20),s=new i.Kj0(a,r);o.add(s),e.groups.push(o),e.scene.add(o),e.meshes.push(s),s.position.y=1.1*t,o.position.x=.2,o.position.y=.05,o.position.z=1.2}))}},{key:"settings",value:function(){this.settings={progress:0},this.gui=new r.ZP,this.gui.add(this.settings,"progress",0,3,.01)}},{key:"setupResize",value:function(){window.addEventListener("resize",this.resize.bind(this))}},{key:"resize",value:function(){var e,n;this.width=this.container.offsetWidth,this.height=this.container.offsetHeight,this.renderer.setSize(this.width,this.height),this.camera.aspect=this.width/this.height,this.imageAspect=858/1280,this.height/HTMLDListElement.width>this.imageAspect?(e=this.width/this.height*this.imageAspect,n=1):(e=1,n=this.height/this.width/this.imageAspect),this.material.uniforms.resolution.value.x=this.width,this.material.uniforms.resolution.value.y=this.height,this.material.uniforms.resolution.value.z=e,this.material.uniforms.resolution.value.w=n,this.camera.updateProjectionMatrix()}},{key:"addObjects",value:function(){this.material=new i.jyz({extensions:{derivatives:"#extension GL_OES_standard_derivatives: enable"},side:i.ehD,uniforms:{time:{type:"f",value:0},distanceFromCenter:{type:"f",value:0},uTexture:{type:"t",value:null},resolution:{type:"v4",value:new i.Ltg},uvRate1:{value:new i.FM8(1,1)},uProg:{value:.01},uIndex:{value:1},rVx:{type:"f",value:.01},rVy:{type:"f",value:.018},gVx:{type:"f",value:.004},gVy:{type:"f",value:.004}},vertexShader:"precision mediump float;\n#define GLSLIFY 1\n\nuniform float time;\nuniform float distanceFromCenter;\nvarying vec2 vUv;\nvarying float wave;\nvarying vec3 vPosition;\nuniform vec2 pixels;\nuniform float uProg;\nuniform float uIndex;\n\nuniform float rVx;\nuniform float rVy;\nuniform float gVx;\nuniform float gVy;\n\n// #pragma glslify: noise = require(glsl-noise/simplex/3d);\n//---------------\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n     return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy;\n  vec3 x3 = x0 - D.yyy;      \n\n// Permutations\n  i = mod289(i);\n  vec4 p = permute( permute( permute(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 6.8 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n//-------------------\n\nfloat PI = 3.141592653589793238;\n\nvoid main() {\n  // vUv = (uv-vec2(0.5))*(0.8 - 0.2*distanceFromCenter*(2. - distanceFromCenter)) + vec2(0.5);\n  // vUv = (uv-vec2(0.5))+ vec2(0.5);\n  vec3 pos = position;\n\n  if (uIndex < 3.) {      \n    pos.z += snoise(vec3(pos.x * 4. + time, pos.y, 0.)) * uProg;\n    wave = pos.z;\n    pos.z *= 3.;    \n  } else if (uIndex < 6.) {\n    float pr = smoothstep(0., 0.5 - sin(pos.y), uProg) * 5.;\n    pos.z += pr;\n  } else {\n    pos.z += sin(pos.y * 5. + time) * 2. * uProg;\n    wave = pos.z;\n  }\n\n  vUv = uv;\n\n  pos.z += sin(PI*uv.x)*0.02;\n  pos.y += sin(time*0.3)*0.02;\n  vUv.y -= sin(time*0.3)*0.02;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );\n}",fragmentShader:"precision mediump float;\n#define GLSLIFY 1\n\nvarying vec2 vUv;\nvarying float wave;\n\nuniform float time;\nuniform float progress;\nuniform float uProg;\nuniform float distanceFromCenter;\nuniform sampler2D uTexture;\nuniform vec4 resolution;\nuniform float uIndex;\n\nuniform float rVx;\nuniform float rVy;\nuniform float gVx;\nuniform float gVy;\n\nvarying vec3 vPosition;\nfloat PI = 3.141592653589793238;\n\nvoid main()\t{\n\n\tvec2 uv = vUv;\n  vec2 dUv = vec2(uv.x, uv.y);\n  vec3 texture1;\n  \n  // float rVx = 0.01 ;\n\t// float rVy = 0.008 ;\n\t// float gVx = 0.004 ;\n\t// float gVy = 0.004 ;\n\tfloat rVx = 0.008 ;\n\tfloat rVy = 0.008 ;\n\tfloat gVx = 0. ;\n\tfloat gVy = 0. ;\n\ndUv.y += wave * 0.05;\n    float r = texture2D(uTexture, dUv + vec2(rVx*sin(time), rVy*sin(time))).r;\n    float g = texture2D(uTexture, dUv + vec2(gVx, gVy)).g;\n    float b = texture2D(uTexture, dUv + vec2(0., -0.02) * uProg).b;\n    texture1 = vec3(r, g, b);\n\n\tvec4 t = texture2D(uTexture, vUv);\n\tfloat bw = (t.r + t.g + t.b)/3.;\n\tvec4 another = vec4(bw,bw,bw,1.);\n\tgl_FragColor = mix(another,t,distanceFromCenter);\n\tgl_FragColor.a = clamp(distanceFromCenter, 0.3, 1.);\n\n\tgl_FragColor = vec4(texture1, gl_FragColor.a);\n}",transparent:!0})}},{key:"stop",value:function(){this.isPlaying=!1}},{key:"play",value:function(){this.isPlaying||(this.render(),this.isPlaying=!0)}},{key:"render",value:function(){var e=this;this.isPlaying&&(this.time+=.05,this.materials&&this.materials.forEach((function(n){n.uniforms.time.value=e.time})),requestAnimationFrame(this.render.bind(this)),this.renderer.render(this.scene,this.camera))}}])&&V(n.prototype,t),Object.defineProperty(n,"prototype",{writable:!1}),e}(),A=t(522);function E(e){return function(e){if(Array.isArray(e))return I(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,n){if(e){if("string"==typeof e)return I(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?I(e,n):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function I(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,i=new Array(n);t<n;t++)i[t]=e[t];return i}var O=new j({dom:document.getElementById("hero-canvas")}),_=!1,F=0,T=0,k=0,U=document.querySelector(".hero-title-group"),L=E(document.querySelectorAll(".hero-title-wrap")),M=E(document.querySelectorAll(".cards-nav-item")),q=document.querySelector(".cards-nav");window.addEventListener("mousewheel",(function(e){O.meshes[0].position.y>=-1&&O.meshes[0].position.y<21?T+=4e-4*e.deltaY:T+=1e-4*e.deltaY}));var D=Array(20).fill({dist:0});!function e(){k+=T,T*=.85,D.forEach((function(e,n){e.dist=Math.min(Math.abs(k-n),1),e.dist=1-Math.pow(e.dist,2),M[n].style.transform="scale(".concat(1+.15*e.dist,")"),M[n].style.opacity="".concat(.4+.5*e.dist);var t=1+.1*e.dist;O.meshes[n].position.y=-1.1*n+1.1*k,O.meshes[n].scale.set(t,t,t),O.meshes[n].material.uniforms.distanceFromCenter.value=e.dist}));var n=Math.round(k)-k;_?(k+=.02*-(k-F),U.style.transform="translate(0,".concat(-k*window.innerHeight,"px)"),L.forEach((function(e){e.style.transform="scale(0.8)"}))):(k+=Math.sign(n)*Math.pow(Math.abs(n),.7)*.035,U.style.transform="translate(0,".concat(-k*window.innerHeight,"px)"),q.style.transform="translate(0,".concat(50*-k,"px)"),L.forEach((function(e){e.style.transform="scale(1)"}))),window.requestAnimationFrame(e)}();var Z=E(document.querySelectorAll(".cards-nav-item")),H=document.querySelector(".cards-nav"),R=O.groups.map((function(e){return e.rotation})),G=O.groups.map((function(e){return e.position}));H.addEventListener("mouseenter",(function(){_=!0,A.ZP.to(R,{duration:.3,x:-.7,y:0,z:0}),A.ZP.to(G,{z:0})})),H.addEventListener("mouseleave",(function(){_=!1,A.ZP.to(R,{duration:.3,x:0,y:0,z:0}),A.ZP.to(G,{z:1.1})})),Z.forEach((function(e){e.addEventListener("mouseover",(function(e){F=Number(e.target.getAttribute("data-nav"))}))})),window.addEventListener("load",(function(){A.ZP.fromTo(R,{duration:2,x:-1.2,y:0,z:0},{duration:1,x:0,y:0,z:0}),A.ZP.fromTo(G,{duration:6,z:-9,y:10},{duration:1,z:1.1,y:.1})})),document.querySelector(".hero-bg")}},t={};function i(e){var r=t[e];if(void 0!==r)return r.exports;var o=t[e]={exports:{}};return n[e](o,o.exports,i),o.exports}i.m=n,e=[],i.O=(n,t,r,o)=>{if(!t){var a=1/0;for(l=0;l<e.length;l++){for(var[t,r,o]=e[l],s=!0,c=0;c<t.length;c++)(!1&o||a>=o)&&Object.keys(i.O).every((e=>i.O[e](t[c])))?t.splice(c--,1):(s=!1,o<a&&(a=o));if(s){e.splice(l--,1);var u=r();void 0!==u&&(n=u)}}return n}o=o||0;for(var l=e.length;l>0&&e[l-1][2]>o;l--)e[l]=e[l-1];e[l]=[t,r,o]},i.d=(e,n)=>{for(var t in n)i.o(n,t)&&!i.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},i.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),i.j=590,i.p="",(()=>{var e={590:0};i.O.j=n=>0===e[n];var n=(n,t)=>{var r,o,[a,s,c]=t,u=0;if(a.some((n=>0!==e[n]))){for(r in s)i.o(s,r)&&(i.m[r]=s[r]);if(c)var l=c(i)}for(n&&n(t);u<a.length;u++)o=a[u],i.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return i.O(l)},t=self.webpackChunkthree_sandbox=self.webpackChunkthree_sandbox||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))})();var r=i.O(void 0,[216],(()=>i(2523)));r=i.O(r)})();