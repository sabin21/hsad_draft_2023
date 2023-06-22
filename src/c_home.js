import '../public/css/draft_common.css';
import '../public/css/c_home.css';

import Sketch from './c_sketch';
import gsap from 'gsap';


let sketch = new Sketch({
  dom: document.getElementById("hero-canvas")
});

let attractMode = false;
let attractTo = 0;
let speed = 0;
let position = 0;
let rounded = 0;
// let wrap = document.querySelector('.indicator-wrap');
let titleWrap = document.querySelector('.hero-title-group');
let titleItems = [...document.querySelectorAll('.hero-title-wrap')];
let elems = [...document.querySelectorAll('.cards-nav-item')];
const cardsNav = document.querySelector('.cards-nav');

window.addEventListener('mousewheel', (e)=>{
 if(sketch.meshes[0].position.y >= -1 && sketch.meshes[0].position.y < 21){
  speed += e.deltaY*0.0004;
  }else{
    speed += e.deltaY*0.0001;
  }
});

let objs = Array(20).fill({dist:0});

function raf(){
  position += speed;
  speed *= 0.85;

  objs.forEach((o,i)=>{
    o.dist = Math.min(Math.abs(position - i), 1);
    o.dist = 1 - o.dist**2;
    elems[i].style.transform = `scale(${1 + 0.15*o.dist})`;
    elems[i].style.opacity = `${0.4 + 0.5*o.dist}`;

    let scale = 1 + 0.1*o.dist;

    sketch.meshes[i].position.y = i*-1.1 + position*1.1;
    sketch.meshes[i].scale.set(scale,scale,scale);
    sketch.meshes[i].material.uniforms.distanceFromCenter.value = o.dist;

    // if(sketch.meshes[i].scale.x > 1.00001){
    //   sketch.meshes[i].meshActive = true;
    // }else{
    //   sketch.meshes[i].meshActive = false;
    // } 
  });

  rounded = Math.round(position);  
  let diff = (rounded - position);

  if(attractMode){
    position += -(position - attractTo)*0.02 ;
    titleWrap.style.transform = `translate(0,${-position*window.innerHeight}px)`;
    titleItems.forEach((i)=>{
      i.style.transform = `scale(0.8)`;
    });
  }else{
    position += Math.sign(diff)*Math.pow(Math.abs(diff),0.7)*0.035;
    titleWrap.style.transform = `translate(0,${-position*window.innerHeight}px)`;
    cardsNav.style.transform = `translate(0,${-position*50}px)`;
    titleItems.forEach((i)=>{
      i.style.transform = `scale(1)`;
    });
  }
  window.requestAnimationFrame(raf)
}

raf();

let navs = [...document.querySelectorAll('.cards-nav-item')];
let nav = document.querySelector('.cards-nav');

let rots = sketch.groups.map(e=>e.rotation);
let pos = sketch.groups.map(e=>e.position);

nav.addEventListener('mouseenter',()=>{
  attractMode = true;
  gsap.to(rots,{
    duration:0.3,
    x:-0.7, y:0, z:0
  });
  gsap.to(pos, {
    z:0
  });
  // heroBack.classList.add('hero-bg-black');
});

nav.addEventListener('mouseleave',()=>{
  attractMode = false;
  gsap.to(rots,{
    duration:0.3,
    x:0, y:0, z:0
  });
  gsap.to(pos, {
    z:1.1
  });
  // heroBack.classList.remove('hero-bg-black');
});

navs.forEach((el)=>{
  el.addEventListener('mouseover', (e)=>{
    attractTo = Number(e.target.getAttribute('data-nav'));
  });  
})

window.addEventListener('load', ()=>{
  gsap.fromTo(rots,
    { duration: 2, x:-1.2, y:0, z:0 },{ duration: 1, x:0, y:0, z:0 }
  );
  gsap.fromTo(pos,
    { duration: 6, z:-9, y: 10},{ duration: 1, z:1.1, y:0.1 }
  );
});
const heroBack = document.querySelector('.hero-bg');

function heroAct(i){
  if(sketch.meshes[i].meshActive == true){
    heroBack.classList.add('hero-bg-'+ `${i}`);
  }else{
    heroBack.classList.remove('hero-bg-'+ `${i}`);
  }
}