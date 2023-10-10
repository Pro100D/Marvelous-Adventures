import Swiper from 'swiper';
import { Autoplay } from 'swiper/swiper-bundle.mjs';

new Swiper('.mySwiper', {
  direction: 'horizontal',
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 3000,
  },
  breakpoints: {
    767.98: {
      direction: 'vertical',
    },
  },
});
