import '../public/css/draft_common.css';
import '../public/css/b_home.css';
import '../public/css/post.css';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

//------------------------------
gsap.registerPlugin(ScrollTrigger);

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
}

navCommon();