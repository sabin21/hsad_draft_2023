import '../public/css/draft_common.css';
import '../public/css/d_home.css';

import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

//------------------------------

// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import vertex from "../public/shader/d_shader/vertex.glsl";
import fragment from "../public/shader/d_shader/fragment.glsl";
import * as dat from 'dat.gui';
import t from '../public/img/d_home/copy_line.png';

export default class Sketch {
  constructor(options) {
    this.scene = new THREE.Scene();

    this.container = options.dom;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0xeeeeee, 1); 
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.container.appendChild(this.renderer.domElement);

    // this.camera = new THREE.PerspectiveCamera(
    //   70,
    //   window.innerWidth / window.innerHeight,
    //   0.001,
    //   1000
    // );

    var frustumSize = 1;
    var aspect = 1;
    this.camera = new THREE.OrthographicCamera( 
      frustumSize / - 2, frustumSize / 2, frustumSize / 2, frustumSize / - 2, -1000, 1000 
    );
    this.camera.position.set(0, 0, 2);
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.time = 0;

    this.isPlaying = true;
    
    this.addObjects();
    this.resize();
    this.render();
    this.setupResize();
    this.settings();
  }

  settings() {
    let that = this;
    this.settings = {
      progress: 0,
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

    //image cover

    this.imageAspect = 853/1280;
    let a1; let a2;
    if(this.height/this.width>this.imageAspect){
      a1 = (this.width/this.height)*this.imageAspect ;
      a2 =1;
    }else {
      a1=1;
      a2 = (this.width/this.height)/this.imageAspect;
    }
    this.material.uniforms.resolution.value.x = this.width;
    this.material.uniforms.resolution.value.y = this.height;
    this.material.uniforms.resolution.value.z = a1;
    this.material.uniforms.resolution.value.w = a2;

  }

  addObjects() {
    let that = this;

    let tt = new THREE.TextureLoader().load(t);
    tt.magFilter = THREE.NearestFilter;
    tt.minFilter = THREE.NearestFilter;

    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable"
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: "f", value: 0 },
        progress: { type: "f", value: 0 },
        texture1: {type : "t", value: tt},
        resolution: { type: "v4", value: new THREE.Vector4() },
        uvRate1: {
          value: new THREE.Vector2(1, 1)
        }
      },
      // wireframe: true,
      // transparent: true,
      vertexShader: vertex,
      fragmentShader: fragment
    });

    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);

    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
  }

  stop() {
    this.isPlaying = false;
  }

  play() {
    if(!this.isPlaying){
      this.render()
      this.isPlaying = true;
    }
  }

  render() {
    if (!this.isPlaying) return;
    this.time += 0.05;
    this.material.uniforms.time.value = this.time;
    this.material.uniforms.progress.value = this.settings.progress;
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
}

let heroCanvas = new Sketch({
  dom: document.getElementById("hero-canvas")
});

//---------------------

gsap.to(heroCanvas.settings,{
  duration:3,
  progress:1,
  ease: "expo.inOut"
});

let lineWrap = document.querySelector('.line-wrap');
let wrapper = document.querySelector('.wrapper');
let wrapwidth = document.querySelector('.wrapper').offsetWidth;
let lineWidth = document.querySelector('.line-wrap').offsetWidth;

gsap.to('.wrapper', {
  // x:-wrapwidth,
  x:() => -(wrapper.scrollWidth - document.documentElement.clientWidth*0.5) + "px",
  ease: "none",
  scrollTrigger:{
    trigger:lineWrap,
    pin:true,
    scrub:1,
    onUpdate:(self)=>{
      heroCanvas.time = self.progress*500.;
    },
    invalidateOnRefresh: true,
    end: () => "+=" + (wrapper.offsetWidth - innerWidth)
  }
});

//---------------------

const btnFilter = document.querySelector('.filter');
const filterFull = document.querySelector('.search-full');

btnFilter.addEventListener('click', ()=>{
  filterFull.classList.add('active');  
});

filterFull.addEventListener('click', ()=>{
  filterFull.classList.remove('active');  
});
