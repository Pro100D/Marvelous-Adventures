import Swiper from 'swiper';
import { Autoplay } from 'swiper/swiper-bundle.mjs';

new Swiper('.mySwiper', {
  direction: 'horizontal',
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  // autoplay: {
  //   delay: 5000,
  // },
  breakpoints: {
    767.98: {
      direction: 'vertical',
    },
  },
  effect: 'coverflow',

  speed: 750,
  on: {
    slideChange: function () {
      const btn = document.querySelector('.hero__btn');
      const activeBullet = document.querySelector(
        '.swiper-pagination-bullet-active'
      );
      const bullets = document.querySelector('.swiper-pagination-bullet');

      switch (this.activeIndex) {
        case 0:
          btn.style.backgroundColor = '#34387f';
          activeBullet.style.backgroundColor = '#34387f';
          break;
        case 1:
          btn.style.backgroundColor = '#5b7f3c';
          activeBullet.style.backgroundColor = '#5b7f3c';
          break;
        case 2:
          btn.style.backgroundColor = '#600404';
          activeBullet.style.backgroundColor = '#600404';
          break;

        default:
          break;
      }
    },
  },
});
