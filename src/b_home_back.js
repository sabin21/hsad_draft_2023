import '../public/css/draft_common.css';
import './css/b_home.css';


import { gsap, Power3 } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import * as THREE from 'three';

window.addEventListener('load', ()=>{
  init();
  run();
});

//------------------------------
gsap.registerPlugin(ScrollTrigger);

let trigger = document.querySelector('.section-insights');
let rowPin = document.querySelector('.row-scroller');

let horizontal = gsap.to(rowPin, {
  x: -(rowPin.scrollWidth - rowPin.clientWidth),
    ease: "none",
    scrollTrigger: {
        trigger: trigger,
        pin: rowPin,
        scrub: 1,
        start: "top top",
        end: 'bottom bottom',
        ease: 'none'
    }
});

let slides = document.querySelectorAll('.card-big');
    slides.forEach( slide => {
        gsap.from(slide, {
            scale: 0.6,
            opacity: 1,
            transformOrigin: '8% 0%',
            scrollTrigger: {
                trigger: slide,
                containerAnimation: horizontal,
                start: "left right",
                end: "left 30%",
                scrub: true,
                ease: 'none'
            },
            ease: 'none'
        });
        gsap.fromTo(slide, {opacity: 1}, {
            opacity: 1,
            scrollTrigger: {
                trigger: slide,
                containerAnimation: horizontal,
                start: "left left",
                end: "right left",
                scrub: true,
                ease: 'none'
            },
            ease: 'none',
        })
});


//------------------------------

let composer;
let camera, scene, renderer;
let clock, plane1Mat, plane2Mat, image_tex;

const vertex1 = `
precision mediump float;

varying vec2 vUv;
uniform float uTime;

//
// Description : Array and textureless GLSL 2D/3D/4D simplex
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  
  // First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;
  
  // Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
  
  // Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
           
  // Gradients: 7x7 points over a square, mapped onto an octahedron.
  // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  
  // Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  
  // Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}

void main() {
  vUv = uv;

  vec3 pos = position;
  float noiseFreq = 1.5;
  float noiseAmp = 0.15; 
  vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
  pos.z += snoise(noisePos) * noiseAmp;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}
`
const fragment1 = `
  precision mediump float;

  varying vec2 vUv;
  uniform sampler2D uTexture;

  void main() {
    vec3 texture = texture2D(uTexture, vUv).rgb;
    gl_FragColor = vec4(texture, 1.);
  }
`
const texture1Arr = [
  './img/plane_texture_1.png',
  './img/plane_texture_2.png'
];
let texture1Show = 0;

//------------
const image_url = '/img/tex_headline.png'
image_tex = new THREE.TextureLoader().load(image_url)
image_tex.wrapT = THREE.RepeatWrapping
//------------
class StairsGeom extends THREE.BufferGeometry {
  constructor(n_steps = 1) { // +ve int
    super()
    this.type = 'StairsGeom'
    const pos = new Float32Array(3 * 6 * n_steps) //six 3tuple per step
    const norm = new Float32Array(3 * 6 * n_steps) //six 3tuple per step
    const uv = new Float32Array(2 * 6 * n_steps) //six 2tuple per step
    const idx = new Uint16Array(12 * n_steps) //12 indices per step
    const avg = new THREE.Vector3(0, 1, 1).normalize().toArray() // avg normal
    for (let i = 0; i < n_steps; ++i) {
      const r0 = i / n_steps
      const r1 = (i + 1) / n_steps
      pos.set([
        -0.5, r0 - 0.5, 0.5 - r0, // near lower L
        +0.5, r0 - 0.5, 0.5 - r0, // near lower R
        -0.5, r1 - 0.5, 0.5 - r0, // near upper L
        +0.5, r1 - 0.5, 0.5 - r0, // near upper R
        -0.5, r1 - 0.5, 0.5 - r1, // far upper L
        +0.5, r1 - 0.5, 0.5 - r1, // far upper R
      ], i * 18)
      norm.set([
        0, 0, 1, 0, 0, 1, // near lower L and R
        ...avg, ...avg,   // near upper L and R
        0, 1, 0, 0, 1, 0  // far upper L and R
      ], i * 18)
      const rmid = r0 + (r1 - r0) / 2
      uv.set([
        0, r0, 1, r0,     // near lower L and R
        0, rmid, 1, rmid, // near upper L and R
        0, r1, 1, r1      // far upper L and R
      ], i * 12)
      const k = 6 * i
      idx.set([
        k, k + 1, k + 2, k + 2, k + 1, k + 3, // quad (upright)
        k + 2, k + 3, k + 4, k + 4, k + 3, k + 5 // quad
      ], i * 12)
    }
    this.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
    this.setAttribute('normal', new THREE.Float32BufferAttribute(norm, 3))
    this.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2))
    this.setIndex(new THREE.Uint16BufferAttribute(idx, 1))
  }
}

//------------
function init(){
  
  const container = document.getElementById( 'hero-canvas' );
  camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.set(0, 0, 2.2);

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x060606 );

  renderer = new THREE.WebGL1Renderer({ antialias: true, alpha: true });
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild( renderer.domElement );

  // const light = new THREE.PointLight('white', 4, 2, 0.5);
  const light = new THREE.DirectionalLight( 0xffffff, 3.0);
  light.position.set(-1, 1, 1)
  scene.add(light)
  scene.add(new THREE.AmbientLight('white', 0.3))

  window.addEventListener( 'resize', onWindowResize );

  let plane1Geo = new THREE.PlaneGeometry(1,0.6,80,50);
  let plane2Geo = new THREE.PlaneGeometry(1,0.6,80,50);
  const planeLoader = new THREE.TextureLoader();

  const pict1 = planeLoader.load(texture1Arr[0], function(tex){
    plane1Mat.map = tex;
    scene.add(plane1);
  });
  const pict2 = planeLoader.load(texture1Arr[1], function(tex){
    plane2Mat.map = tex;
    scene.add(plane2);
  });

  plane1Mat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: {value:0.0},
      uTexture: { value: pict1}
    },
    vertexShader: vertex1,
    fragmentShader: fragment1,
  }    
  );
  plane2Mat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: {value:0.0},
      uTexture: { value: pict2}
    },
    vertexShader: vertex1,
    fragmentShader: fragment1,
  }    
  );
  const plane1 = new THREE.Mesh(plane1Geo, plane1Mat);
  const plane2 = new THREE.Mesh(plane2Geo, plane2Mat);
  
  plane1.position.set( 0.4, 0.1, 0.3);
  plane2.position.set(-1.3,-0.6,-1.5);

  clock = new THREE.Clock();

  const geom = new StairsGeom(3);
  const mat = new THREE.MeshBasicMaterial({ 
    alphaMap: image_tex, alphaTest: 0.2, 
    map: image_tex, 
    // side: THREE.DoubleSide
  });
const mesh = new THREE.Mesh(geom, mat);
mesh.position.set(-0.6, 0.1,-0.4);
mesh.rotation.set(Math.PI*0.1, Math.PI*0.20, 0);
scene.add(mesh)

}//----init ----

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  // composer.setSize( window.innerWidth, window.innerHeight );
}

function run(){
  requestAnimationFrame( run );
  render();
}
function render(){
  image_tex.offset.y = clock.getElapsedTime() * 0.07;
  plane1Mat.uniforms.uTime.value = clock.getElapsedTime()*0.5;
  plane2Mat.uniforms.uTime.value = clock.getElapsedTime()*0.5;
  renderer.render(scene, camera);
  camera.lookAt( 0,0,0 );
}

//--------------------------
