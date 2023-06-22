import '../public/css/draft_common.css';
import '../public/css/midarm.css';


import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

// import fragment from "./shader/fragment.glsl";
// import vertex from "./shader/vertex.glsl";
import GUI from 'lil-gui';
import gsap from 'gsap';

import env from '../public/midwam/environment-map.jpg';
// import model from '../public/models/logo_hs.glb';
import model from '../public/midwam/human.glb';
import { HoloEffect } from "./HoloEffect";

export default class Sketch {
  constructor(options) {
    this.scene = new THREE.Scene();

    this.container = options.dom;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x000000, 1); 

    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      1000
    );

    this.camera.position.set(-1, 0, 0);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.time = 0;

    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath('./jsm/libs/draco/');
    this.dracoLoader.setDecoderConfig( { type: 'js' } );
    this.gltf = new GLTFLoader();
    this.gltf.setDRACOLoader(this.dracoLoader);
    
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.8;

    this.isPlaying = true;
    
    //this.addLights();
    this.settings();
    this.initPost();
    this.addObjects();
    this.resize();
    this.render();
    this.setupResize();
    
  }

  initPost(){
    this.renderScene = new RenderPass( this.scene, this.camera );

    this.bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
    this.bloomPass.threshold = this.settings.bloomThreshold;
    this.bloomPass.strength = this.settings.bloomStrength;
    this.bloomPass.radius = this.settings.bloomRadius;

    this.holoEffect = new ShaderPass(HoloEffect);

    this.composer = new EffectComposer( this.renderer );
    this.composer.addPass( this.renderScene );
    this.composer.addPass( this.bloomPass );
    this.composer.addPass(this.holoEffect);
  }

  settings() {
    let that = this;
    this.settings = {
      progress: 0,
      exposure: 2,
      bloomStrength: 2.5,
      bloomThreshold:0.2,
      bloomRadius:0.8,
      
    };
    this.gui = new GUI();
    this.gui.add(this.settings, "progress", 0, 3, 0.01).onChange(()=>{
      that.holoEffect.uniforms.progress.value = this.settings.progress;
    });
    this.gui.add(this.settings, "exposure", 0, 3, 0.01).onChange(()=>{
      that.renderer.toneMappingExposure = this.settings.exposure;
    });
    this.gui.add(this.settings, "bloomStrength", 0, 3, 0.01).onChange((val)=>{
      that.bloomPass.strength = val;
    });
    this.gui.add(this.settings, "bloomThreshold", 0, 3, 0.01).onChange((val)=>{
      that.bloomPass.threshold = val;
    });
    this.gui.add(this.settings, "bloomRadius", 0, 3, 0.01).onChange((val)=>{
      that.bloomPass.radius = val;
    });
    
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.composer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  addLights() {
    const light1 = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(light1);
    const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
    light1.position.set(0.5, 0, 0.866);
    this.scene.add(light2);
  }

  addObjects() {

    this.pmremGenerator = new THREE.PMREMGenerator( this.renderer );
    this.pmremGenerator.compileEquirectangularShader();

    this.envMap = new THREE.TextureLoader().load(env, (texture)=>{
    this.envMap = this.pmremGenerator.fromEquirectangular( texture ).texture;

    this.pmremGenerator.dispose();

    });

    this.gltf.load(model, (gltf)=>{
        this.scene.add(gltf.scene)
        this.human = gltf.scene.children[0]
        this.human.scale.set(0.1,0.1,0.1)
        this.human.geometry.center()
        this.human.rotation.set(1.5,0,0)
        this.m = new THREE.MeshStandardMaterial({
          metalness: 1,
          roughness: 0.28
        });

        this.m.envMap = this.envMap;

        this.m.onBeforeCompile = (shader) => {

          shader.uniforms.uTime =  { value:0 };

          shader.fragmentShader = `
            uniform float uTime;
            mat4 rotationMatrix(vec3 axis, float angle) {
              axis = normalize(axis);
              float s = sin(angle);
              float c = cos(angle);
              float oc = 1.0 - c;
              
              return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                          oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                          oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                          0.0,                                0.0,                                0.0,                                1.0);
            }
          
            vec3 rotate(vec3 v, vec3 axis, float angle) {
              mat4 m = rotationMatrix(axis, angle);
              return (m * vec4(v, 1.0)).xyz;
            }
          ` + shader.fragmentShader;

          shader.fragmentShader = shader.fragmentShader.replace(
            `#include <envmap_physical_pars_fragment>`,
            `#if defined( USE_ENVMAP )
              vec3 getIBLIrradiance( const in vec3 normal ) {
                #if defined( ENVMAP_TYPE_CUBE_UV )
                  vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
                  vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
                  return PI * envMapColor.rgb * envMapIntensity;
                #else
                  return vec3( 0.0 );
                #endif
              }
              vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
                #if defined( ENVMAP_TYPE_CUBE_UV )
                  vec3 reflectVec = reflect( - viewDir, normal );
                  // Mixing the reflection with the normal is more accurate and keeps rough objects from gathering light from behind their tangent plane.
                  reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
                  reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
                  reflectVec = rotate(reflectVec, vec3(1.0, 0.0, 0.0), uTime * 0.3);
                  vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
                  return envMapColor.rgb * envMapIntensity;
                #else
                  return vec3( 0.0 );
                #endif
              }
            #endif
            `
          )
          this.m.userData.shader = shader
        }
        this.human.material = this.m;
    });

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

    requestAnimationFrame(this.render.bind(this));
    // this.renderer.render(this.scene, this.camera);
    this.composer.render(this.scene, this.camera);

    if(this.human){
      if(this.m.userData){
        this.human.material.userData.shader.uniforms.uTime.value = this.time;

        this.holoEffect.uniforms.uTime.value = this.time;
      }
      //this.human.rotation.z = this.time * 0.05;
    }

  }
}

new Sketch({
  dom: document.getElementById("hero-canvas")
});
