import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import fragment from "../public/shader/fragment.glsl";
import vertex from "../public/shader/vertex.glsl";
// import glsl from 'glslify';

import GUI from 'lil-gui';

import heroWork1 from '../public/img/c_hero/hero_work_1.png';
import heroWork2 from '../public/img/c_hero/hero_work_2.png';
import heroWork3 from '../public/img/c_hero/hero_work_3.png';
import heroWork4 from '../public/img/c_hero/hero_work_4.png';
import heroWork5 from '../public/img/c_hero/hero_work_5.png';
import heroWork6 from '../public/img/c_hero/hero_work_6.png';
import heroWork7 from '../public/img/c_hero/hero_work_7.png';
import heroWork8 from '../public/img/c_hero/hero_work_8.png';
import heroWork9 from '../public/img/c_hero/hero_work_9.png';
import heroWork10 from '../public/img/c_hero/hero_work_10.png';
import heroPost1 from '../public/img/c_hero/hero_post_1.png';
import heroPost11 from '../public/img/c_hero/hero_post_1_1.png';
import heroPost2 from '../public/img/c_hero/hero_post_2.png';
import heroPost3 from '../public/img/c_hero/hero_post_3.png';
import heroPost4 from '../public/img/c_hero/hero_post_4.png';
import heroPost5 from '../public/img/c_hero/hero_post_5.png';
import heroPost6 from '../public/img/c_hero/hero_post_6.png';
import heroPost7 from '../public/img/c_hero/hero_post_7.png';
import heroPost8 from '../public/img/c_hero/hero_post_8.png';
import heroPost9 from '../public/img/c_hero/hero_post_9.png';
import heroPost10 from '../public/img/c_hero/hero_post_10.png';

export default class Sketch {
  constructor(options) {
    this.scene = new THREE.Scene();

    this.container = options.dom;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, transparent:true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0xffffff, 0); 
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.container.appendChild(this.renderer.domElement);
    this.camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.001,1000 );

    this.camera.position.set(0, 0, 4);
    this.camera.lookAt(0,0,0);
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.time = 0;
    
    // this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // this.renderer.toneMappingExposure = 0.8;

    this.isPlaying = true;

    this.addObjects();
    this.resize();
    this.render();
    this.setupResize();

    this.materials = [];
    this.meshes = [];
    this.groups = [];
    this.handleImages();

    this.viewCenter = new THREE.Object3D();
    this.viewCenter.position.set(0,0,0);
    this.scene.add(this.viewCenter);
    
  }

  handleImages() {
    let images =[
      heroWork5, heroPost11, heroWork2, heroPost3, heroWork3,
      heroPost4, heroWork4, heroPost5, heroWork1, heroPost2,
      heroWork6, heroPost6, heroWork7, heroPost7, heroWork8, 
      heroPost8, heroWork9, heroPost9, heroWork10,heroPost10
    ];

    images.forEach((im, i)=>{
      let mat = this.material.clone();
      this.materials.push(mat);
      let group = new THREE.Group();
      mat.uniforms.uTexture.value = new THREE.TextureLoader().load(im,undefined, ()=>{
        mat.uniforms.uTexture.value.needsUpdate = true;
      });

      let geo = new THREE.PlaneGeometry(1.5, 0.9, 28, 20);
      let mesh = new THREE.Mesh(geo, mat);

      group.add(mesh);
      this.groups.push(group);
      this.scene.add(group);
      this.meshes.push(mesh);
      mesh.position.y = i*1.1;

      group.position.x = 0.2;
      group.position.y = 0.05;
      group.position.z = 1.2;
       
    })
  }

  settings() {
    let that = this;
    this.settings = {
      progress: 0,     
    };
    this.gui = new GUI();
    this.gui.add(this.settings, "progress", 0, 3, 0.01);   
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    
    this.imageAspect = 858/1280;
    let a1; let a2;
    if(this.height/HTMLDListElement.width>this.imageAspect){
      a1= (this.width/this.height) * this.imageAspect;
      a2 = 1;
    } else{
      a1 = 1;
      a2 = (this.height/this.width) / this.imageAspect;
    }

    this.material.uniforms.resolution.value.x = this.width;
    this.material.uniforms.resolution.value.y = this.height;
    this.material.uniforms.resolution.value.z = a1;
    this.material.uniforms.resolution.value.w = a2;

    this.camera.updateProjectionMatrix();
  }

  addObjects() {
    
    this.material = new THREE.ShaderMaterial({
      extensions:{
        derivatives: "#extension GL_OES_standard_derivatives: enable"
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { type:"f", value: 0 },
        distanceFromCenter : { type: "f", value: 0},
        uTexture: { type:"t", value: null },
        resolution: { type:"v4", value: new THREE.Vector4() },
        uvRate1: {
          value: new THREE.Vector2(1,1)
        },
        uProg: { value: 0.01 },
        uIndex: { value: 1.0 },
        rVx: { type: 'f', value: 0.01 },
        rVy: { type: 'f', value: 0.018 },
        gVx: { type: 'f', value: 0.004 },
        gVy: { type: 'f', value: 0.004 }
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent:true
    });
    // this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    // this.plane = new THREE.Mesh(this.geometry, this.material);
    // this.scene.add(this.plane);
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
    if(this.materials){
      this.materials.forEach(m=>{
        m.uniforms.time.value = this.time
      });
    }
    
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
}
