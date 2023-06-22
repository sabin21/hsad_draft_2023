import 'swiper/css';
import 'swiper/css/navigation';

import '../public/css/draft_common.css';
import '../public/css/a_home.css';

import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';

const swiper = new Swiper('#home-2-hero', {
  modules:[Navigation, Pagination, Autoplay],
  slidesPerView: 4,
  loop: true,
  pagination:{
    el:'.home-2-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    }
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  spaceBetween: 16,
  // initialSlide:2,
});