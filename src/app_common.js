
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

window.addEventListener('load',()=>{
  navCommon();
});

function navCommon() {
    const bodyWrap = document.querySelector('.body-wrap');
    const header = document.querySelector('.header-wrap');
    const btnScrollTop = document.querySelector('.btn-page-top');
    const footer = document.querySelector('.footer');
    const bottomBar = document.querySelector('.bottom-bar-wrap');
    const articleWrap = document.querySelector('.article-wrap');

  let pageScroll = ScrollTrigger.create({
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
        if(document.body.contains(bottomBar)){
          bottomBar.classList.add('show');
          if(window.scrollY > (articleWrap.offsetHeight-window.innerHeight)){
            bottomBar.classList.remove('show');
          }
        }
      }else if(self.direction === -1){
        if(document.body.contains(bottomBar)){
          bottomBar.classList.remove('show');
        }
      }
      
      if(window.scrollY >= 200){
        btnScrollTop.style.opacity = '1';
      }else {
        btnScrollTop.style.opacity = '0';
      }
      if(window.scrollY > (bodyWrap.offsetHeight - window.innerHeight*1.075)){
        btnScrollTop.style.bottom = `${footer.offsetHeight + 40}` + 'px';
      }else {
        btnScrollTop.style.bottom = '16px';
      }    
    }
  });

  btnScrollTop.addEventListener('click', ()=>
    gsap.to(window,{scrollTo:0})
  );

  const btnDoante = document.querySelector('.btn-donate');
  const gnbDonate = document.querySelector('.gnb-donate-wrap');

  btnDoante.addEventListener('click', ()=>{
    btnDoante.classList.toggle('active');
    if(btnDoante.classList.contains('active')){
      gnbDonate.classList.add('active');
    }else {
      gnbDonate.classList.remove('active');
    }
  });

}
