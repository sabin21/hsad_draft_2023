import '../public/css/draft_common.css';
import '../public/css/a_home.css';
import '../public/css/post.css';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

//------------------------------

gsap.registerPlugin(ScrollTrigger);

  const caseHead = document.querySelector('.case-hero-wrap');
  gsap.to('.case-hero-outer', {
    scrollTrigger:{
      trigger: '.case-hero-outer',
      scrub:1,
      pin: '.case-hero-outer',
      start: 'top top',
      end: 'bottom -30%'
    }
  });
  gsap.to(caseHead, {
    height:'100vh', width:'100%', borderRadius:0, duration:1,
    scrollTrigger: {
      trigger: caseHead,
      scrub:1,
      start: 'top 50%',
      end: 'bottom bottom',
    }
  });

  const infoNum = document.querySelectorAll('.big-num');

  let startCount = { num : 0 };
  infoNum.forEach((i)=>{
    gsap.to(startCount, {
      num: i.getAttribute('data-count'), duration:2, ease:"none",
      onUpdate: ()=>{
        i.innerText = (startCount.num).toFixed();
      },
      scrollTrigger: {
        trigger: '.case-info-wrap',
        toggleActions: "restart none reverse none",
      }
    })
  });

  const summaryWraps = gsap.utils.toArray('.block-wrap');

  summaryWraps.forEach((summary, i)=>{
    gsap.fromTo(summary.querySelector('.big-typo'), {left:'-100vw', color:'#040A2E'},{
      left:'10vw', color:'#2371B8',
      scrollTrigger:{
        trigger:summary,
        scrub:true,
        start:'top 50%',
        end:'top 10%'
      }
    });
    gsap.fromTo(summary.querySelectorAll('.copy-item'),{opacity:0, y:200, scale:1.4}, {
      opacity: 1, y:0, scale:1, duration:1,
      // delay: 0.5 + (0.5*i),
      scrollTrigger:{
        trigger:summary,
        scrub:true,
        start:'top 50%',
        end:'bottom 90%'
      }
    })
  });
//------------------------------



// Work cards Stack -----

let cards = gsap.utils.toArray('.card');
let stackHeight = window.innerHeight * 0.25;

cards.forEach((card, i) => {
  gsap.fromTo(card, {
    scale: 1,
    transformOrigin: "center top",
  }, {
    y: gsap.utils.mapRange(1, cards.length, -20, -stackHeight + 20, cards.length - i),
    scale: gsap.utils.mapRange(1, cards.length, 0.4, 0.9, i),
    // filter: "brightness(" + gsap.utils.mapRange(1, cards.length, 0.1 , 1., i)+ ")",
    scrollTrigger: {
      trigger: card,
      scrub: true,
      start: "top " + stackHeight,
      end: "+=" + window.innerHeight*2,
      invalidateOnRefresh: true
    }
  });
  
  ScrollTrigger.create({
    trigger: card,
    // markers: true,
    pin: true,
    start: "top " + stackHeight,
    endTrigger: ".section-service", 
    // end: "top " + (stackHeight + 100),
    end: "top "+ window.innerHeight,
    pinSpacing: false
  });
});

const workBack = document.querySelector('.work-back');

