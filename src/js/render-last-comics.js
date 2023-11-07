import Swiper from 'swiper';

import { getLastWeekComics } from './api-service';
import { format } from 'date-fns/esm';

const listComics = document.querySelector('.last-comics-wrapper');

async function createCardMarkup() {
  const { data } = await getLastWeekComics();

  return data.results
    .map(comics => {
      return `
    <li class="my-swiper-slide swiper-slide" id=${comics.id}>
   <a href="#" class="comics-link" data-id=${comics.id}>
    <img class="comics-img" src="${comics.thumbnail.path}.${comics.thumbnail.extension}"/>
    </a>
    <p class="comics-title">${comics.title}</p>
    <p class="comics-text">${comics.creators.items[0].name}</p>
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
