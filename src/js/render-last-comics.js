import Swiper from 'swiper';

import { refs } from './utils/refs';

import { getLastWeekComics } from './api-service';
import { hideSpinner, showSpinner } from './spinner';
import { createMarkupCard } from './utils/create-card-markup';

async function createCardMarkup() {
  const { data } = await getLastWeekComics();
  return createMarkupCard(data, true);
}

async function createMarkup() {
  showSpinner();
  const data = await createCardMarkup();
  hideSpinner();
  refs.listComics.insertAdjacentHTML('beforeend', data);
}
createMarkup();

new Swiper('.last-comics-swiper', {
  breakpoints: {
    1399.8: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    767.98: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    374.98: {
      slidesPerView: 1,
    },
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
