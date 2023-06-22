import '../public/css/draft_common.css';
import '../public/css/b_home.css';


import { gsap, Power3 } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import * as THREE from 'three';

//------------------------------

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('scroll', ()=>{
  if(window.scrollY > 50){
    gsap.to('.page-head', {y:'-100%', duration:0.75});
  }else{
    gsap.to('.page-head', {y:0, duration:0.75});
  }
});

//------------------------------

function navCommon() {
  const bodyWrap = document.querySelector('.page-wrap');
  const header = document.querySelector('.header');
  // const btnScrollTop = document.querySelector('.btn-page-top');

  const pageScroll = ScrollTrigger.create({
  trigger:bodyWrap,
  start: "top 200",
  onUpdate: (self)=> {
    if(self.direction === -1 && window.scrollY > 80){
      header.classList.add('active');
      header.style.top = '0px';  
    }else if(self.direction === -1 && window.scrollY < 80){
      header.classList.remove('active');
    }
    else{
      header.classList.remove('active');
    };

    if(self.direction === 1 && window.scrollY > 80){
      header.style.top = '-100px';
    } else if(self.direction === -1){

    }   
    }
  });

// btnScrollTop.addEventListener('click', ()=>
//   gsap.to(window,{scrollTo:0})
// );

// const btnDoante = document.querySelector('.btn-donate');
// const gnbDonate = document.querySelector('.gnb-donate-wrap');

// btnDoante.addEventListener('click', ()=>{
//   btnDoante.classList.toggle('active');
//   if(btnDoante.classList.contains('active')){
//     gnbDonate.classList.add('active');
//   }else {
//     gnbDonate.classList.remove('active');
//   }
// });
}

navCommon();

//------------------------------

import vertex from "./shader/vertex_b.glsl";
import fragment from "./shader/fragment_b.glsl";

import t1 from "../public/img/1.png";
import t2 from "../public/img/2.png";

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { CustomPass } from 'CustomPass.js';

export default class Sketch {
  constructor(options){
    this.scene = new THREE.Scene();

    this.urls = [t1, t2];
    this.textures = this.urls.map(url=>new THREE.TextureLoader().load(url));

    this.container = options.dom;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer = new THREE.WebGLRenderer({antialias:true});
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.TextureEncoding = THREE.SRGBColorSpace;

    this.container.appendChild(this.renderer.domElement);
    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.001, 10000 );

    this.camera.position.set(0, 0, 2);
    this.time= 0;

    this.playing = true;
    
    this.initPost();
    this.addObjcets();
    this.resize();
    this.render();
    this.setupResize();
    this.settings(); 
    
  }

  initPost(){

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass( this.scene, this.camera));

    this.effect1 = new ShaderPass ( CustomPass );
    this.composer.addPass (this.effect1);
  }

  settings() {
    // let that = this;
    this.settings = {
      progress:1,
      scale:1,
    };
    // this.gui = new dat.GUI();
    // this.gui.add(this.settings, "progress", 0, 1, 0.01);
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  addObjcets(){

    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives: enable"
      },
      side: THREE.DoubleSide,
      uniforms:{
        time: { value:0 },
        uTexture: { value: this.textures[0] },
        resolution: {value: new THREE.Vector4()}
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    this.geometry = new THREE.PlaneGeometry(1.8/2, 1.1/2, 1, 1);
    this.meshes = [];

    this.textures.forEach((t, i)=>{
      let m = this.material.clone();
      m.uniforms.uTexture.value = t;
      let mesh = new THREE.Mesh(this.geometry, m);
      this.scene.add(mesh);
      this.meshes.push(mesh);

      mesh.position.x = i-0.5;
      mesh.position.z = + 0.9;
      mesh.position.y = 0.2;  
    });
  }

  render() {

    this.meshes.forEach((m,i)=>{
      // m.position.y = -this.settings.progress;
      m.rotation.z = -this.settings.progress*Math.PI/2;
    });
    this.time += 0.003;
    this.material.uniforms.time.value = this.time;

    this.effect1.uniforms[ 'time'].value = this.time;
    this.effect1.uniforms[ 'progress'].value = this.settings.progress;
    this.effect1.uniforms[ 'scale'].value = this.settings.scale;
    requestAnimationFrame(this.render.bind(this));

    this.composer.render();
  }
}

const heroCanvas = new Sketch({
  dom: document.getElementById("hero-canvas")
});

//---------------------

let prevScrollPost = 0;
let scrollDown = false;

const handleScroll = () =>{
  let currentScrollPost = window.scrollY || window.pageYOffset;
  if(currentScrollPost > prevScrollPost){
    return scrollDown = true;
  }else {
    return scrollDown = false;
  }
}

let caseTitles = document.querySelectorAll('.case-study-title');

window.addEventListener('scroll', ()=>{
  if(window.scrollY > 50){
    gsap.to(heroCanvas.settings, {progress:0., duration:0.75});
    caseTitles.forEach((caseTitle)=>{
      caseTitle.style.opacity = 1;
      caseTitle.style.top = '70vh';
    });
    //caseTitles[0]
  }else if(window.scrollY <= 50){
    gsap.to(heroCanvas.settings, {progress:0.95, duration:0.75});
    caseTitles.forEach((caseTitle)=>{
      caseTitle.style.opacity = 0;
      caseTitle.style.top = '100vh';
    });
  }
  if(window.scrollY > 600){
    gsap.to(heroCanvas.camera.position, {z: 2.5, duration: 1});
    caseTitles.forEach((caseTitle)=>{
      gsap.to(caseTitle, {opacity: 0, duration: 0.25})
    });
    gsap.to('.hero-overlay', { opacity: 0.8, duration: 0.75});
  }else if(window.scrollY < 600 && window.scrollY > 200){
    gsap.to(heroCanvas.camera.position, {z: 2, duration: 0.75});
    caseTitles.forEach((caseTitle)=>{
      gsap.to(caseTitle, {opacity: 1, duration: 0.25})
    });
    gsap.to('.hero-overlay', { opacity: 0., duration: 0.75});
  }
});

//------------------------

class HoverImage {
  constructor(element) {
    this.el = element;
    this.imgUrl = element.dataset.hoverImg;
    this.img = this.createHoverImage();
    this.listeners();

    this.x = 0;
    this.y = 0;
    this.lastX = 0;
    this.lastY = 0;
    this.velDelta = 0.005;
    this.vel = { x: 0, y: 0 };
  }
  listeners() {
    this.el.parentElement.addEventListener("mousemove", (e) => {
      this.x = e.clientX;
      this.y = e.clientY;
      this.move();
      this.lastX = this.x;
      this.lastY = this.y;
    });
    this.el.addEventListener("mouseenter", () =>
      this.toggleVisibility(this.img, true)
    );
    this.el.addEventListener("mouseleave", () =>
      this.toggleVisibility(this.img, false)
    );
  }
  createHoverImage() {
    let imageElm = new Image(900);
    imageElm.src = this.imgUrl;
    imageElm.classList.add("hover-image");
    // let the browser rasterize the image and hide it after
    // cause strange behavior where browser dont really load images with opacity set to 0
    imageElm.addEventListener("load", () => {
      imageElm.style.opacity = "0.01";
      this.el.appendChild(imageElm);
      setTimeout(() => {
        this.toggleVisibility(imageElm, false, 0);
      }, 100);
    });
    return imageElm;
  }
  move() {
    const elRect = this.el.getBoundingClientRect();
    const imgRect = this.el.getBoundingClientRect();
    const top = this.y - elRect.top;
    const left = this.x - elRect.left;

    this.vel = { x: this.x - this.lastX, y: this.y - this.lastY };
    const distance = Math.sqrt(Math.pow(this.vel.x, 2) + Math.pow(this.vel.y, 2));
    const scale = Math.min(distance * this.velDelta, 1);
    const angle = (this.vel.x * this.velDelta * 180) / Math.PI;

    gsap.to(this.img, {
      top: top,
      left: left,
      rotate: angle,
      scale: 1 - scale,
    });
  }
  toggleVisibility(el, show, duration = null) {
    let time = {};
    if (duration !== null) {
      time = {
        duration: 0
      };
    }
    gsap.to(el, {
      opacity: show ? 1 : 0,
      scale: show ? 1 : 0.4,
      ...time
    });
  }
}

for (const item of document.querySelectorAll("[data-hover-img]")) {
  new HoverImage(item);
}