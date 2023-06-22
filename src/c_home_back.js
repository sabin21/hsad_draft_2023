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
let wrap = document.querySelector('.indicator-wrap');
let elems = [...document.querySelectorAll('.n')];

window.addEventListener('mousewheel', (e)=>{
 if(sketch.meshes[0].position.y >= -1 && sketch.meshes[0].position.y < 11){
  speed += e.deltaY*0.0004;
  }else{
    speed += e.deltaY*0.0001;
  }

  heroAct(0); heroAct(1); heroAct(2); heroAct(3); heroAct(4); heroAct(5);
  heroAct(6); heroAct(7); heroAct(8); heroAct(9);
  
});

// window.addEventListener('scroll', ()=>{
//   // if(sketch.meshes[0].position.y >= -2){
//   const scrollY = window.scrollY ;
//   speed = scrollY;
//   // }
//   console.log(scrollY);
//   heroAct(0); heroAct(1); heroAct(2);
  
// });
console.log(elems[0].style.transform.split('(')[1]);
function checkCenter(){
  
  let cardCenterd = false;
}

let objs = Array(10).fill({dist:0});
let meshActive = false;

function raf(){
  position += speed;
  // position = speed/500;
  speed *= 0.85;


  objs.forEach((o,i)=>{
    o.dist = Math.min(Math.abs(position - i), 1);
    o.dist = 1 - o.dist**2;
    elems[i].style.transform = `scale(${1 + 0.6*o.dist})`;

    let scale = 1 + 0.1*o.dist;
    sketch.meshes[i].position.y = i*-1.2 + position*1.2;
    sketch.meshes[i].scale.set(scale,scale,scale);
    sketch.meshes[i].material.uniforms.distanceFromCenter.value = o.dist;

    if(sketch.meshes[i].scale.x > 1.00001){
      sketch.meshes[i].meshActive = true;
    }else{
      sketch.meshes[i].meshActive = false;
    }

    
  });

  rounded = Math.round(position);
  
  let diff = (rounded - position);

  if(attractMode){
    position += -(position - attractTo)*0.02 ;
  }else{
    position += Math.sign(diff)*Math.pow(Math.abs(diff),0.7)*0.035;
    wrap.style.transform = `translate(0,${-position*40}px)`;
  }
  window.requestAnimationFrame(raf)
}

raf();

let navs = [...document.querySelectorAll('.cards-nav-item')];
let nav = document.querySelector('.cards-nav');

let rots = sketch.groups.map(e=>e.rotation);

nav.addEventListener('mouseenter',()=>{
  attractMode = true;
  gsap.to(rots,{
    duration:0.3,
    x:-0., y:0, z:0
  });
});

nav.addEventListener('mouseleave',()=>{
  attractMode = false;
  gsap.to(rots,{
    duration:0.3,
    x:-0.2, y:-0.6, z:-0.05
  });
});

navs.forEach((el)=>{
  el.addEventListener('mouseover', (e)=>{
    attractTo = Number(e.target.getAttribute('data-nav'));
    for(let i = 0; i < 11; i++ ){
      cardAct(i)
    }
  });  
})

const heroBack = document.querySelector('.hero-bg');

function cardAct(i){
  if(attractTo === i){
    // sketch.meshes[i].meshActive = true;
    heroBack.classList.add('hero-bg-'+ `${i}`);
  }else{
    // sketch.meshes[i].meshActive = false;
    heroBack.classList.remove('hero-bg-'+ `${i}`);
  }
}

function heroAct(i){
  if(sketch.meshes[i].meshActive == true){
    heroBack.classList.add('hero-bg-'+ `${i}`);
  }else{
    heroBack.classList.remove('hero-bg-'+ `${i}`);
  }
}