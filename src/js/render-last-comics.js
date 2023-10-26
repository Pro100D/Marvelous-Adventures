import Swiper from 'swiper';

import { getLastWeekComics } from './api-service';

const listComics = document.querySelector('.last-comics-wrapper');

async function createCardMarkup() {
  const { data } = await getLastWeekComics();

  return data.results
    .map(comics => {
      console.log(comics);
      return `
    <li class="my-swiper-slide swiper-slide">
    <img src="${comics.thumbnail.path}.${comics.thumbnail.extension}"/>
    </li>
      `;
    })
    .join('');
}

async function createMarkup() {
  const data = await createCardMarkup();
  listComics.insertAdjacentHTML('beforeend', data);
}
createMarkup();

new Swiper('.last-comics-swiper', {
  breakpoints: {
    1399.8: {
      slidesPerView: 3,
    },
    767.98: {
      slidesPerView: 2,
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
