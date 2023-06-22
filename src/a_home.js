import 'swiper/css';
import 'swiper/css/navigation';

import '../public/css/draft_common.css';
import '../public/css/a_home.css';

import { gsap, Power3 } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
// import LocomotiveScroll from 'locomotive-scroll';

window.addEventListener('load', ()=>{
  init();
});
function init(){
  const swiper = new Swiper('#cards-hero', {
    modules:[Navigation, Pagination, Autoplay],
    slidesPerView: 1,
    loop: true,
    pagination:{
      el:'.hero-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      }
    },
    autoplay: {
      delay: 4500,
      disableOnInteraction: false
    },
    // initialSlide:2,
  });
}

//--------------------------
gsap.registerPlugin(ScrollTrigger);


let pinBoxes = document.querySelectorAll(".works-scroller > .card-wrok");
let pinWrap = document.querySelector(".works-scroller");
let pinWrapWidth = pinWrap.offsetWidth;
// let horizontalScrollLength = pinWrapWidth - window.innerWidth*0.25;
let horizontalScrollLength = 3200;

gsap.to(".works-scroller", {
  scrollTrigger: {
    // scroller: pageContainer,
    trigger: ".section-works",
    scrub: true,
    pin: true,
    start: "top top",
    end: pinWrapWidth
  },
  x: -horizontalScrollLength,
  ease: "none"
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