import { getComicsById } from './api-service';

const listComics = document.querySelector('.last-comics-wrapper');

async function onClickComics(evt) {
  if (!evt.target.closest('.my-swiper-slide')) {
    return;
  }
  const id = evt.target.closest('.my-swiper-slide').id;
    const { data } = await getComicsById(id);
    

    
}
listComics.addEventListener('click', onClickComics);
